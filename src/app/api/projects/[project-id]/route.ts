import db from "@/db/db";
import { projects, frontend, backend, projectTasks, techStack } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ "project-id": string }> }
) {
  try {
    const resolvedParams = await params;
    const projectIdStr = resolvedParams["project-id"];
    const id = parseInt(projectIdStr, 10);

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid project ID" }, { status: 400 });
    }

    // 1. Fetch the project
    const projectResults = await db
      .select()
      .from(projects)
      .where(eq(projects.id, id))
      .limit(1);

    if (projectResults.length === 0) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const project = projectResults[0];

    // 2. Fetch frontends with tech stack names joined
    const rawFrontends = await db
      .select({
        id: frontend.id,
        projectId: frontend.projectId,
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
      })
      .from(frontend)
      .leftJoin(techStack, eq(frontend.techStackId, techStack.id))
      .where(eq(frontend.projectId, id));

    // Map frontend records to include `techStack` string
    const frontends = rawFrontends.map((fe) => ({
      ...fe,
      techStack: fe.techStackName || "",
    }));

    // 3. Fetch backends with tech stack names joined
    const rawBackends = await db
      .select({
        id: backend.id,
        projectId: backend.projectId,
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
        serverRepo: backend.serverRepo,
        isMonorepo: backend.isMonorepo,
        repoUrl: backend.repoUrl,
        rootPath: backend.rootPath,
        isActive: backend.isActive,
        status: backend.status,
        stars: backend.stars,
        forks: backend.forks,
        openIssues: backend.openIssues,
        lastCommitMessage: backend.lastCommitMessage,
        lastCommitAt: backend.lastCommitAt,
      })
      .from(backend)
      .leftJoin(techStack, eq(backend.techStackId, techStack.id))
      .where(eq(backend.projectId, id));

    // Map backend records to include `techStack` string
    const backends = rawBackends.map((be) => ({
      ...be,
      techStack: be.techStackName || "",
    }));

    // 4. Fetch tasks
    const tasks = await db
      .select()
      .from(projectTasks)
      .where(eq(projectTasks.projectId, id))
      .orderBy(projectTasks.id);

    // 5. Aggregate tags for the project
    const feTags = frontends.map((fe) => fe.techStack).filter(Boolean);
    const beTags = backends.map((be) => be.techStack).filter(Boolean);
    const uniqueTags = Array.from(new Set([...feTags, ...beTags]));
    const tagsString = uniqueTags.join(", ");

    const projectWithTags = {
      ...project,
      image: project.projectImage,
      tags: tagsString,
    };

    return NextResponse.json({
      project: projectWithTags,
      frontends,
      backends,
      tasks,
      envVars: [], // Env vars table is removed from schema, return empty list to maintain interface contract
    });
  } catch (error) {
    console.error("Failed to fetch project details:", error);
    return NextResponse.json(
      { error: "Failed to fetch project details" },
      { status: 500 }
    );
  }
}
