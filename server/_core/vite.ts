import express, { type Express } from "express";
import fs from "fs";
import { type Server } from "http";
import { nanoid } from "nanoid";
import path from "path";
import { createServer as createViteServer } from "vite";
import viteConfig from "../../vite.config";
import { buildTitle, resolveTitle } from "./titleMap";

/** Inject a page-specific <title> into an HTML string based on the request path. */
function injectTitle(html: string, pathname: string): string {
  // Strip query string and hash from pathname
  const cleanPath = pathname.split('?')[0].split('#')[0] || '/';
  const pageTitle = resolveTitle(cleanPath);
  const fullTitle = buildTitle(pageTitle);
  // Replace the existing <title>...</title> tag (handles any content between tags)
  return html.replace(/<title>[^<]*<\/title>/, `<title>${fullTitle}</title>`);
}

/**
 * Read the Vite manifest and return the hashed entry script path.
 * Falls back to null if the manifest is missing or malformed.
 */
function readManifestEntry(distPath: string): { js: string; css: string[] } | null {
  try {
    const manifestPath = path.join(distPath, ".vite", "manifest.json");
    if (!fs.existsSync(manifestPath)) return null;
    const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
    for (const [, entry] of Object.entries(manifest) as [string, any][]) {
      if (entry.isEntry) {
        return {
          js: `/${entry.file}`,
          css: (entry.css ?? []).map((c: string) => `/${c}`),
        };
      }
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Rewrite the entry script tag in the HTML to use the correct hashed bundle.
 * This ensures the HTML always references the correct bundle even if the
 * static index.html on disk was built at a different time.
 */
function injectManifestEntry(
  html: string,
  entry: { js: string; css: string[] }
): string {
  // Replace any existing hashed entry script (index-*.js)
  let result = html.replace(
    /<script[^>]*type="module"[^>]*src="\/assets\/js\/index-[^"]*"[^>]*><\/script>/,
    `<script type="module" crossorigin src="${entry.js}"></script>`
  );
  // Also inject CSS link if not already present
  for (const cssFile of entry.css) {
    if (!result.includes(cssFile)) {
      result = result.replace(
        '</head>',
        `  <link rel="stylesheet" crossorigin href="${cssFile}">\n  </head>`
      );
    }
  }
  return result;
}

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "../..",
        "client",
        "index.html"
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      // Use originalUrl to get the full path (req.path may be normalized by middleware)
      const reqPath = new URL(req.originalUrl, 'http://localhost').pathname;
      const injected = injectTitle(page, reqPath);
      res.status(200).set({ "Content-Type": "text/html" }).end(injected);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath =
    process.env.NODE_ENV === "development"
      ? path.resolve(import.meta.dirname, "../..", "dist", "public")
      : path.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    console.error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }

  // Read the Vite manifest once at startup to get the correct hashed entry script.
  // This ensures the HTML always references the correct bundle even if the static
  // index.html on disk was built at a different time (e.g. cached deployment).
  const manifestEntry = readManifestEntry(distPath);
  if (manifestEntry) {
    console.log(`[serveStatic] Manifest entry: ${manifestEntry.js}`);
  } else {
    console.warn(`[serveStatic] No manifest found at ${distPath}/.vite/manifest.json — using static index.html as-is`);
  }

  // Immutable cache for hashed assets (JS/CSS/fonts with content hash in filename)
  // Both Cache-Control and Expires are set: Cache-Control for modern browsers,
  // Expires for legacy tools (Pingdom YSlow, older proxies).
  const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;
  const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;
  const ONE_HOUR_MS = 60 * 60 * 1000;

  app.use(
    "/assets",
    express.static(path.join(distPath, "assets"), {
      maxAge: "1y",
      immutable: true,
      setHeaders: (res) => {
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        res.setHeader("Expires", new Date(Date.now() + ONE_YEAR_MS).toUTCString());
      },
    })
  );

  // Root-level static files with appropriate cache durations
  app.use(
    express.static(distPath, {
      setHeaders: (res, filePath) => {
        if (filePath.endsWith(".html")) {
          // HTML must always be fresh (no hash in filename)
          res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
          res.setHeader("Expires", "0");
        } else if (
          filePath.endsWith(".xml") ||
          filePath.endsWith(".txt") ||
          filePath.endsWith(".json")
        ) {
          res.setHeader("Cache-Control", "public, max-age=3600"); // 1 hour
          res.setHeader("Expires", new Date(Date.now() + ONE_HOUR_MS).toUTCString());
        } else if (
          filePath.endsWith(".ico") ||
          filePath.endsWith(".png") ||
          filePath.endsWith(".webp") ||
          filePath.endsWith(".svg")
        ) {
          res.setHeader("Cache-Control", "public, max-age=604800"); // 1 week
          res.setHeader("Expires", new Date(Date.now() + ONE_WEEK_MS).toUTCString());
        }
      },
    })
  );

  // fall through to index.html if the file doesn't exist
  // Inject a page-specific <title> so crawlers that read static HTML see unique titles.
  // Also inject the correct hashed entry script from the Vite manifest if available.
  app.use("*", (req, res) => {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    const indexPath = path.resolve(distPath, "index.html");
    fs.readFile(indexPath, "utf-8", (err, html) => {
      if (err) {
        res.sendFile(indexPath);
        return;
      }
      const reqPath = new URL(req.originalUrl, 'http://localhost').pathname;
      let result = injectTitle(html, reqPath);
      // If manifest is available, rewrite the entry script to the correct hash.
      // This is the key fix: even if the static index.html on disk references an
      // old bundle hash, the server will always serve the correct current bundle.
      if (manifestEntry) {
        result = injectManifestEntry(result, manifestEntry);
      }
      res.setHeader("Content-Type", "text/html");
      res.send(result);
    });
  });
}
