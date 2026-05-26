import express from "express";
import path from "node:path";
import { loadEnvironment } from "./config/loadEnv.js";
import { clientDir, clientIndexPath } from "./config/paths.js";
import { contactRoutes } from "./routes/contactRoutes.js";
import { contentRoutes } from "./routes/contentRoutes.js";

export function createApp() {
  loadEnvironment();

  const app = express();

  app.disable("x-powered-by");
  app.use(express.json());
  app.use("/api/content", contentRoutes);
  app.use("/api/contact", contactRoutes);
  app.use(express.static(clientDir));

  app.get("/health", (_request, response) => {
    response.json({ ok: true });
  });

  app.get("*", (request, response, next) => {
    if (path.extname(request.path)) {
      response.status(404).end();
      return;
    }

    response.sendFile(clientIndexPath, (error) => {
      if (error) {
        next(error);
      }
    });
  });

  return app;
}

export const app = createApp();
