import "dotenv/config";
import db from "./db";
import { projects } from "./schema";
import { projects as initialProjects } from "../data/project";

async function main() {
  console.log("Seeding projects data...");
  try {
    // Clear existing projects first
    await db.delete(projects);
    console.log("Cleared existing projects.");

    // Seed the database
    const insertData = initialProjects.map((p) => ({
      title: p.name,
      description: p.description || p.shortDescription || "",
      image: p.projectImage,
      tags: (p.skills || []).join(","),
      liveUrl: p.liveLink || null,
      clientRepo: p.githubLink || null,
      serverRepo: null,
      isActive: true,
    }));

    await db.insert(projects).values(insertData);
    console.log("Projects seeded successfully!");
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

main();
