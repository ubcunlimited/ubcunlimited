import "dotenv/config";
import express from "express";
import cors from "cors";
import compression from "compression";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import { seoAuditScheduledHandler } from "../scheduledHandlers";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

// Allowed origins: the deployed domains + localhost dev
const ALLOWED_ORIGINS = [
  "https://ubcunlimited.com",
  "https://www.ubcunlimited.com",
  /\.up\.railway\.app$/,  // Railway-generated deploy domains
  /^http:\/\/localhost/,  // local dev
  /^http:\/\/127\.0\.0\.1/,  // local dev (IP form)
];

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Gzip compression for all responses — reduces JS/CSS/HTML transfer size by ~70%
  app.use(compression({ level: 6, threshold: 1024 }));

  // CORS — must be registered before any routes
  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (server-to-server, curl, Postman)
        if (!origin) return callback(null, true);
        const allowed = ALLOWED_ORIGINS.some(o =>
          typeof o === "string" ? o === origin : o.test(origin)
        );
        // Never throw: an Error here becomes a 500 on every asset the browser
        // requests with an Origin header (module scripts are crossorigin), which
        // blanks the page. Disallowed origins simply get no CORS headers —
        // same-origin requests still work fine without them.
        callback(null, allowed);
      },
      credentials: true,          // required for session cookies
      methods: ["GET", "POST", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  // Lightweight health-check / warmup endpoint — keeps the Autoscale instance warm
  app.get("/api/ping", (_req, res) => {
    res.json({ ok: true, ts: Date.now() });
  });

  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  // ── Scheduled endpoints (Heartbeat cron callbacks) ──────────────────────────
  // MUST be registered before Vite/static fallthrough
  app.post("/api/scheduled/seo-audit", seoAuditScheduledHandler);

  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
