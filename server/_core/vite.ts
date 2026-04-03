import express, { type Express } from "express";
import fs from "fs";
import { type Server } from "http";
import { nanoid } from "nanoid";
import path from "path";
import { createServer as createViteServer } from "vite";
import viteConfig from "../../vite.config";

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
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
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
  app.use("*", (_req, res) => {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
