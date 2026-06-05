import db from "@/db/db";
import { projects, frontend, backend, techStack } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // 1. Fetch all projects
    const allProjects = await db.select().from(projects).orderBy(projects.id);

    // 2. Fetch all frontends with their tech stack name
    const frontends = await db
      .select({
        projectId: frontend.projectId,
        techStackName: techStack.name,
        repoUrl: frontend.repoUrl,
      })
      .from(frontend)
      .leftJoin(techStack, eq(frontend.techStackId, techStack.id));

    // 3. Fetch all backends with their tech stack name
    const backends = await db
      .select({
        projectId: backend.projectId,
        techStackName: techStack.name,
        repoUrl: backend.repoUrl,
      })
      .from(backend)
      .leftJoin(techStack, eq(backend.techStackId, techStack.id));

    // 4. Map them together
    const data = allProjects.map((proj) => {
      // Find matching frontend/backend tech stacks
      const feStacks = frontends
        .filter((f) => f.projectId === proj.id && f.techStackName)
        .map((f) => f.techStackName as string);
      
      const beStacks = backends
        .filter((b) => b.projectId === proj.id && b.techStackName)
        .map((b) => b.techStackName as string);

      // Combine and filter unique tags
      const uniqueTags = Array.from(new Set([...feStacks, ...beStacks]));
      const tagsString = uniqueTags.join(", ");

      const clientRepoVal = frontends.find((f) => f.projectId === proj.id && f.repoUrl)?.repoUrl || null;
      const serverRepoVal = backends.find((b) => b.projectId === proj.id && b.repoUrl)?.repoUrl || null;

      return {
        ...proj,
        isActive: proj.isActivelyMaintining,
        image: proj.projectImage,
        tags: tagsString,
        clientRepo: clientRepoVal,
        serverRepo: serverRepoVal,
      };
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}
