import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export function registerRoutes(app: Express): Server {
  app.get("/api/projects", async (_req, res) => {
    const projects = await storage.getAllProjects();
    res.json(projects);
  });

  app.get("/api/projects/recommend", async (_req, res) => {
    const project = await storage.getRandomProject();
    if (!project) {
      res.status(404).json({ message: "No projects found" });
      return;
    }
    res.json(project);
  });

  const httpServer = createServer(app);
  return httpServer;
}
