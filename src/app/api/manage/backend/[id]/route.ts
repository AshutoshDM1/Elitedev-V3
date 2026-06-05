import db from "@/db/db";
import { backend } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const backendId = parseInt(resolvedParams.id, 10);

    if (isNaN(backendId)) {
      return NextResponse.json({ error: "Invalid backend ID" }, { status: 400 });
    }

    const body = await req.json();
    const {
      projectId,
      title,
      description,
      techStackId,
      liveUrl,
      cicd,
      cicdTool,
      containerization,
      containerizationTool,
      deploymentPlatform,
      isCliTool,
      npmVersion,
      isMonorepo,
      repoUrl,
      rootPath,
      isActivelyMaintining,
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
      .update(backend)
      .set({
        projectId: parseInt(projectId, 10),
        title,
        description,
        techStackId: techStackId ? parseInt(techStackId, 10) : null,
        liveUrl: liveUrl || null,
        cicd: cicd !== undefined ? !!cicd : true,
        cicdTool: cicdTool || null,
        containerization: containerization !== undefined ? !!containerization : true,
        containerizationTool: containerizationTool || null,
        deploymentPlatform: deploymentPlatform || null,
        isCliTool: isCliTool !== undefined ? !!isCliTool : false,
        npmVersion: npmVersion !== undefined ? !!npmVersion : false,
        isMonorepo: !!isMonorepo,
        repoUrl: repoUrl || null,
        rootPath: rootPath || null,
        isActivelyMaintining: isActivelyMaintining !== undefined ? !!isActivelyMaintining : true,
        status: status || "unknown",
        stars: stars !== undefined ? parseInt(stars, 10) : 0,
        forks: forks !== undefined ? parseInt(forks, 10) : 0,
        openIssues: openIssues !== undefined ? parseInt(openIssues, 10) : 0,
        updatedAt: new Date(),
      })
      .where(eq(backend.id, backendId))
      .returning();

    if (updated.length === 0) {
      return NextResponse.json({ error: "Backend stack not found" }, { status: 404 });
    }

    return NextResponse.json(updated[0]);
  } catch (error) {
    console.error("Failed to update backend stack:", error);
    return NextResponse.json({ error: "Failed to update backend stack" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const backendId = parseInt(resolvedParams.id, 10);

    if (isNaN(backendId)) {
      return NextResponse.json({ error: "Invalid backend ID" }, { status: 400 });
    }

    const deleted = await db
      .delete(backend)
      .where(eq(backend.id, backendId))
      .returning();

    if (deleted.length === 0) {
      return NextResponse.json({ error: "Backend stack not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Backend stack deleted successfully" });
  } catch (error) {
    console.error("Failed to delete backend stack:", error);
    return NextResponse.json({ error: "Failed to delete backend stack" }, { status: 500 });
  }
}
