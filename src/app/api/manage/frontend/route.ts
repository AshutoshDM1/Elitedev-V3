import db from "@/db/db";
import { frontend, projects, techStack } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await db
      .select({
        id: frontend.id,
        projectId: frontend.projectId,
        projectTitle: projects.title,
        title: frontend.title,
        description: frontend.description,
        techStackId: frontend.techStackId,
        techStackName: techStack.name,
        liveUrl: frontend.liveUrl,
        clientRepo: frontend.clientRepo,
        isMonorepo: frontend.isMonorepo,
        repoUrl: frontend.repoUrl,
        rootPath: frontend.rootPath,
        isActive: frontend.isActive,
        deploymentPlatform: frontend.deploymentPlatform,
        cicd: frontend.cicd,
        cicdTool: frontend.cicdTool,
        status: frontend.status,
        stars: frontend.stars,
        forks: frontend.forks,
        openIssues: frontend.openIssues,
        lastCommitMessage: frontend.lastCommitMessage,
        lastCommitAt: frontend.lastCommitAt,
        createdAt: frontend.createdAt,
        updatedAt: frontend.updatedAt,
      })
      .from(frontend)
      .leftJoin(projects, eq(frontend.projectId, projects.id))
      .leftJoin(techStack, eq(frontend.techStackId, techStack.id))
      .orderBy(frontend.id);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch admin frontends:", error);
    return NextResponse.json({ error: "Failed to fetch frontend stacks" }, { status: 500 });
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
      clientRepo,
      isMonorepo,
      repoUrl,
      rootPath,
      isActive,
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

    const newFrontend = await db
      .insert(frontend)
      .values({
        projectId: parseInt(projectId, 10),
        title,
        description,
        techStackId: techStackId ? parseInt(techStackId, 10) : null,
        liveUrl: liveUrl || null,
        clientRepo: clientRepo || null,
        isMonorepo: !!isMonorepo,
        repoUrl: repoUrl || null,
        rootPath: rootPath || null,
        isActive: isActive !== undefined ? !!isActive : true,
        deploymentPlatform: deploymentPlatform || null,
        cicd: cicd !== undefined ? !!cicd : true,
        cicdTool: cicdTool || null,
        status: status || "unknown",
        stars: stars !== undefined ? parseInt(stars, 10) : 0,
        forks: forks !== undefined ? parseInt(forks, 10) : 0,
        openIssues: openIssues !== undefined ? parseInt(openIssues, 10) : 0,
      })
      .returning();

    return NextResponse.json(newFrontend[0]);
  } catch (error) {
    console.error("Failed to create frontend stack:", error);
    return NextResponse.json({ error: "Failed to create frontend stack" }, { status: 500 });
  }
}
