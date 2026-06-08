import "dotenv/config";
import db from "./db";
import {
  techStack,
  techCategory,
} from "./schema";
import { TechStack } from "../data/techStack";

async function main() {
  console.log("Clearing all tables in the database...");
  try {
    // Clear existing tables in correct order due to foreign key constraints
    await db.delete(techStack);
    await db.delete(techCategory);
    console.log("All tables cleared successfully. Database is clean!");

    // Extract unique categories
    const categoriesMap = new Map();
    for (const stack of TechStack) {
      if (!categoriesMap.has(stack.techCategoryId)) {
        categoriesMap.set(stack.techCategoryId, {
          id: stack.techCategoryId,
          name: stack.techCategoryName,
        });
      }
    }
    const uniqueCategories = Array.from(categoriesMap.values());

    console.log(`Seeding ${uniqueCategories.length} tech categories...`);
    if (uniqueCategories.length > 0) {
      await db.insert(techCategory).values(uniqueCategories);
      console.log("Tech categories seeded successfully.");
    }

    console.log(`Seeding ${TechStack.length} tech stacks...`);
    if (TechStack.length > 0) {
      const stacksToInsert = TechStack.map(stack => ({
        id: stack.id,
        name: stack.name,
        techCategoryId: stack.techCategoryId,
        order: stack.order || 0,
        logoLight: stack.logoLight,
        logoDark: stack.logoDark,
        createdAt: new Date(stack.createdAt),
        updatedAt: new Date(stack.updatedAt),
      }));

      await db.insert(techStack).values(stacksToInsert);
      console.log("Tech stacks seeded successfully.");
    }

    console.log("Seeding complete!");
  } catch (error) {
    console.error("Seeding database failed:", error);
    process.exit(1);
  }
}

main();
