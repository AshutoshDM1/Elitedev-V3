import db from "@/db/db";
import { projects, techStack } from "@/db/schema";
import { eq, inArray, notInArray, and } from "drizzle-orm";
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
      isMonorepo,
      repoUrl,
      backgroundImage,
      isActivelyMaintining,
      islatestReadme,
      isCustomDomain,
      isSelfHostingDatabase,
      isNeonDatabase,
      isLLDAvailable,
      isAuth,
      isGoogleAuth,
      isGithubAuth,
      techStackIds,
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
        isMonorepo: !!isMonorepo,
        repoUrl: repoUrl || null,
        backgroundImage: backgroundImage || "background.jpg",
        isActivelyMaintining: isActivelyMaintining !== undefined ? !!isActivelyMaintining : true,
        islatestReadme: !!islatestReadme,
        isCustomDomain: !!isCustomDomain,
        isSelfHostingDatabase: !!isSelfHostingDatabase,
        isNeonDatabase: !!isNeonDatabase,
        isLLDAvailable: !!isLLDAvailable,
        isAuth: !!isAuth,
        isGoogleAuth: !!isGoogleAuth,
        isGithubAuth: !!isGithubAuth,
        updatedAt: new Date(),
      })
      .where(eq(projects.id, projectId))
      .returning();

    if (updated.length === 0) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    if (techStackIds && Array.isArray(techStackIds)) {
      const ids = techStackIds.map(id => parseInt(id, 10)).filter(id => !isNaN(id));
      if (ids.length > 0) {
        // Reset tech stacks that were associated with this project but are no longer in selected ids
        await db
          .update(techStack)
          .set({ projectId: null })
          .where(
            and(
              eq(techStack.projectId, projectId),
              notInArray(techStack.id, ids)
            )
          );
        // Link the selected tech stacks to this project
        await db
          .update(techStack)
          .set({ projectId })
          .where(inArray(techStack.id, ids));
      } else {
        // Clear all tech stacks associated with this project
        await db
          .update(techStack)
          .set({ projectId: null })
          .where(eq(techStack.projectId, projectId));
      }
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
