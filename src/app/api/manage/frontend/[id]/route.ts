import db from "@/db/db";
import { frontend } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const frontendId = parseInt(resolvedParams.id, 10);

    if (isNaN(frontendId)) {
      return NextResponse.json({ error: "Invalid frontend ID" }, { status: 400 });
    }

    const body = await req.json();
    const {
      projectId,
      title,
      description,
      techStackId,
      liveUrl,
      isMonorepo,
      repoUrl,
      rootPath,
      isActivelyMaintining,
      deploymentPlatform,
      cicd,
      cicdTool,
      status,
      stars,
      forks,
      openIssues,
    } = body;

    if (!projectId || !title || !description) {
      return NextResponse.json(
        { error: "Project ID, Title, and Description are required" },
        { status: 400 }
      );
    }

    const updated = await db
      .update(frontend)
      .set({
        projectId: parseInt(projectId, 10),
        title,
        description,
        techStackId: techStackId ? parseInt(techStackId, 10) : null,
        liveUrl: liveUrl || null,
        isMonorepo: !!isMonorepo,
        repoUrl: repoUrl || null,
        rootPath: rootPath || null,
        isActivelyMaintining: isActivelyMaintining !== undefined ? !!isActivelyMaintining : true,
        deploymentPlatform: deploymentPlatform || null,
        cicd: cicd !== undefined ? !!cicd : true,
        cicdTool: cicdTool || null,
        status: status || "unknown",
        stars: stars !== undefined ? parseInt(stars, 10) : 0,
        forks: forks !== undefined ? parseInt(forks, 10) : 0,
        openIssues: openIssues !== undefined ? parseInt(openIssues, 10) : 0,
        updatedAt: new Date(),
      })
      .where(eq(frontend.id, frontendId))
      .returning();

    if (updated.length === 0) {
      return NextResponse.json({ error: "Frontend stack not found" }, { status: 404 });
    }

    return NextResponse.json(updated[0]);
  } catch (error) {
    console.error("Failed to update frontend stack:", error);
    return NextResponse.json({ error: "Failed to update frontend stack" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const frontendId = parseInt(resolvedParams.id, 10);

    if (isNaN(frontendId)) {
      return NextResponse.json({ error: "Invalid frontend ID" }, { status: 400 });
    }

    const deleted = await db
      .delete(frontend)
      .where(eq(frontend.id, frontendId))
      .returning();

    if (deleted.length === 0) {
      return NextResponse.json({ error: "Frontend stack not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Frontend stack deleted successfully" });
  } catch (error) {
    console.error("Failed to delete frontend stack:", error);
    return NextResponse.json({ error: "Failed to delete frontend stack" }, { status: 500 });
  }
}
