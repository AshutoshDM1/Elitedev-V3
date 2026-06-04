import db from "@/db/db";
import { projects, techCategory } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await db
      .select({
        id: projects.id,
        title: projects.title,
        description: projects.description,
        shortDescription: projects.shortDescription,
        projectImage: projects.projectImage,
        techCategoryId: projects.techCategoryId,
        techCategoryName: techCategory.name,
        liveUrl: projects.liveUrl,
        frontendRepo: projects.frontendRepo,
        backendRepo: projects.backendRepo,
        isMonorepo: projects.isMonorepo,
        repoUrl: projects.repoUrl,
        backgroundImage: projects.backgroundImage,
        isActive: projects.isActive,
        createdAt: projects.createdAt,
        updatedAt: projects.updatedAt,
      })
      .from(projects)
      .leftJoin(techCategory, eq(projects.techCategoryId, techCategory.id))
      .orderBy(projects.id);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch admin projects:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      title,
      description,
      shortDescription,
      projectImage,
      techCategoryId,
      liveUrl,
      frontendRepo,
      backendRepo,
      isMonorepo,
      repoUrl,
      backgroundImage,
      isActive,
    } = body;

    if (!title || !description || !shortDescription || !projectImage) {
      return NextResponse.json(
        { error: "Title, description, short description, and project image are required" },
        { status: 400 }
      );
    }

    const newProject = await db
      .insert(projects)
      .values({
        title,
        description,
        shortDescription,
        projectImage,
        techCategoryId: techCategoryId ? parseInt(techCategoryId, 10) : null,
        liveUrl: liveUrl || null,
        frontendRepo: frontendRepo || null,
        backendRepo: backendRepo || null,
        isMonorepo: !!isMonorepo,
        repoUrl: repoUrl || null,
        backgroundImage: backgroundImage || "background.jpg",
        isActive: isActive !== undefined ? !!isActive : true,
      })
      .returning();

    return NextResponse.json(newProject[0]);
  } catch (error) {
    console.error("Failed to create project:", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
