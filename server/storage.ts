import { type Project, type InsertProject } from "@shared/schema";

export interface IStorage {
  getAllProjects(): Promise<Project[]>;
  getProjectById(id: number): Promise<Project | undefined>;
  getRandomProject(): Promise<Project | undefined>;
}

export class MemStorage implements IStorage {
  private projects: Map<number, Project>;

  constructor() {
    this.projects = new Map();
    this.initializeProjects();
  }

  private initializeProjects() {
    const projectsData: InsertProject[] = [
      {
        name: "OpenSourceWebApps.com",
        description: "Collection of open source web applications and tools",
        url: "https://opensourcewebapps.com",
        license: "MIT",
        licenseUrl: "https://opensource.org/licenses/MIT",
        tags: ["Open Source", "Web Apps", "Tools"],
        githubUrl: "https://github.com/kianerfaan/OpenSourceWebApps.com"
      },
      {
        name: "RealTaxRate.com",
        description: "Calculate your effective tax rate with deductions (Coming Soon)",
        url: "https://realtaxrate.com",
        license: "Apache-2.0",
        licenseUrl: "https://opensource.org/licenses/Apache-2.0",
        tags: ["Finance", "Tax", "Calculator"]
      },
      {
        name: "MyTariffs.com",
        description: "Calculate import/export tariffs for international trade",
        url: "https://mytariffs.com",
        license: "Apache-2.0",
        licenseUrl: "https://opensource.org/licenses/Apache-2.0",
        tags: ["Finance", "Trade", "Calculator"],
        githubUrl: "https://github.com/kianerfaan/MyTariffs.com"
      },
      {
        name: "ReasonToSue.com",
        description: "AI-powered legal analysis tool for potential lawsuits",
        url: "https://reasontosue.com",
        license: "Apache-2.0",
        licenseUrl: "https://opensource.org/licenses/Apache-2.0",
        tags: ["Legal", "AI", "Analysis"],
        githubUrl: "https://github.com/kianerfaan/ReasonToSue.com"
      },
      {
        name: "TweetLikeKanye.com",
        description: "Generate tweets in Kanye's unique style using AI",
        url: "https://tweetlikekanye.com",
        license: "Apache-2.0",
        licenseUrl: "https://opensource.org/licenses/Apache-2.0",
        tags: ["AI", "Social Media", "Entertainment"],
        githubUrl: "https://github.com/kianerfaan/TweetLikeKanye.com"
      }
    ];

    projectsData.forEach((project, index) => {
      this.projects.set(index + 1, { ...project, id: index + 1 });
    });
  }

  async getAllProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getProjectById(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async getRandomProject(): Promise<Project | undefined> {
    const projects = Array.from(this.projects.values());
    const randomIndex = Math.floor(Math.random() * projects.length);
    return projects[randomIndex];
  }
}

export const storage = new MemStorage();