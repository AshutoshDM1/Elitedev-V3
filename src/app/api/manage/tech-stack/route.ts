import db from "@/db/db";
import { techStack, techCategory, projects } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await db
      .select({
        id: techStack.id,
        name: techStack.name,
        techCategoryId: techStack.techCategoryId,
        techCategoryName: techCategory.name,
        logoLight: techStack.logoLight,
        logoDark: techStack.logoDark,
        projectId: techStack.projectId,
        projectTitle: projects.title,
        createdAt: techStack.createdAt,
        updatedAt: techStack.updatedAt,
      })
      .from(techStack)
      .leftJoin(techCategory, eq(techStack.techCategoryId, techCategory.id))
      .leftJoin(projects, eq(techStack.projectId, projects.id))
      .orderBy(techStack.id);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch tech stack:", error);
    return NextResponse.json({ error: "Failed to fetch tech stack" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, techCategoryId, logoLight, logoDark, projectId } = body;

    if (!name || !logoLight || !logoDark) {
      return NextResponse.json(
        { error: "Name, logoLight, and logoDark are required" },
        { status: 400 }
      );
    }

    const newStack = await db
      .insert(techStack)
      .values({
        name,
        techCategoryId: techCategoryId ? parseInt(techCategoryId, 10) : null,
        logoLight,
        logoDark,
        projectId: projectId ? parseInt(projectId, 10) : null,
      })
      .returning();

    return NextResponse.json(newStack[0]);
  } catch (error) {
    console.error("Failed to create tech stack:", error);
    return NextResponse.json({ error: "Failed to create tech stack" }, { status: 500 });
  }
}
