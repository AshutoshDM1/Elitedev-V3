import db from "@/db/db";
import { backend, projects, techStack } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await db
      .select({
        id: backend.id,
        projectId: backend.projectId,
        projectTitle: projects.title,
        title: backend.title,
        description: backend.description,
        techStackId: backend.techStackId,
        techStackName: techStack.name,
        liveUrl: backend.liveUrl,
        cicd: backend.cicd,
        cicdTool: backend.cicdTool,
        containerization: backend.containerization,
        containerizationTool: backend.containerizationTool,
        deploymentPlatform: backend.deploymentPlatform,
        isCliTool: backend.isCliTool,
        npmVersion: backend.npmVersion,
        isMonorepo: backend.isMonorepo,
        repoUrl: backend.repoUrl,
        rootPath: backend.rootPath,
        isActivelyMaintining: backend.isActivelyMaintining,
        status: backend.status,
        stars: backend.stars,
        forks: backend.forks,
        openIssues: backend.openIssues,
        lastCommitMessage: backend.lastCommitMessage,
        lastCommitAt: backend.lastCommitAt,
        createdAt: backend.createdAt,
        updatedAt: backend.updatedAt,
      })
      .from(backend)
      .leftJoin(projects, eq(backend.projectId, projects.id))
      .leftJoin(techStack, eq(backend.techStackId, techStack.id))
      .orderBy(backend.id);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch admin backends:", error);
    return NextResponse.json({ error: "Failed to fetch backend stacks" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
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

    const newBackend = await db
      .insert(backend)
      .values({
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
      })
      .returning();

    return NextResponse.json(newBackend[0]);
  } catch (error) {
    console.error("Failed to create backend stack:", error);
    return NextResponse.json({ error: "Failed to create backend stack" }, { status: 500 });
  }
}
