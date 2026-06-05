import db from "@/db/db";
import { projects, techCategory, techStack } from "@/db/schema";
import { eq, inArray } from "drizzle-orm";
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
        isMonorepo: projects.isMonorepo,
        repoUrl: projects.repoUrl,
        backgroundImage: projects.backgroundImage,
        isActivelyMaintining: projects.isActivelyMaintining,
        islatestReadme: projects.islatestReadme,
        isCustomDomain: projects.isCustomDomain,
        isSelfHostingDatabase: projects.isSelfHostingDatabase,
        isNeonDatabase: projects.isNeonDatabase,
        isLLDAvailable: projects.isLLDAvailable,
        isAuth: projects.isAuth,
        isGoogleAuth: projects.isGoogleAuth,
        isGithubAuth: projects.isGithubAuth,
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

    const newProject = await db
      .insert(projects)
      .values({
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
      })
      .returning();

    if (techStackIds && Array.isArray(techStackIds) && techStackIds.length > 0) {
      const ids = techStackIds.map(id => parseInt(id, 10)).filter(id => !isNaN(id));
      if (ids.length > 0) {
        await db
          .update(techStack)
          .set({ projectId: newProject[0].id })
          .where(inArray(techStack.id, ids));
      }
    }

    return NextResponse.json(newProject[0]);
  } catch (error) {
    console.error("Failed to create project:", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
