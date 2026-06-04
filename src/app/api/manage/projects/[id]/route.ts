import db from "@/db/db";
import { projects } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const projectId = parseInt(resolvedParams.id, 10);

    if (isNaN(projectId)) {
      return NextResponse.json({ error: "Invalid project ID" }, { status: 400 });
    }

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

    const updated = await db
      .update(projects)
      .set({
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
        updatedAt: new Date(),
      })
      .where(eq(projects.id, projectId))
      .returning();

    if (updated.length === 0) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(updated[0]);
  } catch (error) {
    console.error("Failed to update project:", error);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const projectId = parseInt(resolvedParams.id, 10);

    if (isNaN(projectId)) {
      return NextResponse.json({ error: "Invalid project ID" }, { status: 400 });
    }

    const deleted = await db
      .delete(projects)
      .where(eq(projects.id, projectId))
      .returning();

    if (deleted.length === 0) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Failed to delete project:", error);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
