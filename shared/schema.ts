import { pgTable, text, serial, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description").notNull(),
  url: text("url").notNull(),
  license: varchar("license", { length: 50 }).notNull(),
  licenseUrl: text("license_url").notNull(),
  tags: text("tags").array().notNull(),
  githubUrl: text("github_url").notNull()
});

export const insertProjectSchema = createInsertSchema(projects).pick({
  name: true,
  description: true,
  url: true,
  license: true,
  licenseUrl: true,
  tags: true,
  githubUrl: true
});

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;