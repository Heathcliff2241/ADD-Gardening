import express from "express";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import apiApp from "./api/index.ts";

dotenv.config();

declare const IS_PRODUCTION: boolean | undefined;

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Permissive CORS and preflight handling for all /api routes
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, x-admin-code");
    if (req.method === "OPTIONS") {
      return res.sendStatus(204);
    }
    next();
  });

  // Mount all backend API routes (/api/chat, /api/quote, /api/book, /api/health, /api/admin/*)
  app.use(apiApp);

  // Determine whether we are in production or development mode
  // In the bundled dist/server.cjs, IS_PRODUCTION is compiled to true by esbuild
  const isBundled = typeof IS_PRODUCTION !== "undefined" && IS_PRODUCTION === true;
  const isCjsBundle = typeof __filename !== "undefined" && __filename.endsWith(".cjs");
  const isProduction =
    isBundled ||
    isCjsBundle ||
    process.env.NODE_ENV === "production" ||
    (fs.existsSync(path.join(process.cwd(), "dist", "index.html")) && process.env.NODE_ENV !== "development");

  if (!isProduction) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));

    // Ensure any unmatched /api routes return 404 JSON rather than index.html
    app.all("/api/*", (req, res) => {
      res.status(404).json({ error: `API endpoint ${req.method} ${req.path} not found` });
    });

    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // Global server error handler
  app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error("Unhandled server error:", err);
    res.status(500).json({ error: "Internal server error", details: err?.message });
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`ADD Gardening Server running on http://0.0.0.0:${PORT} [mode: ${isProduction ? "production" : "development"}]`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});

