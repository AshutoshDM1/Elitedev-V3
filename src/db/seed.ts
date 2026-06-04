import "dotenv/config";
import db from "./db";
import {
  projects,
  frontend,
  backend,
  projectTasks,
  techStack,
  techCategory,
} from "./schema";

async function main() {
  console.log("Clearing all tables in the database...");
  try {
    // Clear existing tables in correct order due to foreign key constraints
    await db.delete(projectTasks);
    await db.delete(frontend);
    await db.delete(backend);
    await db.delete(techStack);
    await db.delete(projects);
    await db.delete(techCategory);
    console.log("All tables cleared successfully. Database is clean!");
  } catch (error) {
    console.error("Clearing database failed:", error);
    process.exit(1);
  }
}

main();
