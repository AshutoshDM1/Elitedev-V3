import db from "@/db/db";
import { techStack, techCategory, projects } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await db
      .select({
        id: techStack.id,
        name: techStack.name,
        techCategoryId: techStack.techCategoryId,
        techCategoryName: techCategory.name,
        logoLight: techStack.logoLight,
        logoDark: techStack.logoDark,
        svg: techStack.svg,
        svgTheme: techStack.svgTheme,
        projectId: techStack.projectId,
        projectTitle: projects.title,
        createdAt: techStack.createdAt,
        updatedAt: techStack.updatedAt,
      })
      .from(techStack)
      .leftJoin(techCategory, eq(techStack.techCategoryId, techCategory.id))
      .leftJoin(projects, eq(techStack.projectId, projects.id))
      .orderBy(techStack.id);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch tech stack:", error);
    return NextResponse.json({ error: "Failed to fetch tech stack" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, techCategoryId, logoLight, logoDark, projectId, svg, svgTheme } = body;

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const hasImages = logoLight?.trim() || logoDark?.trim();
    const hasSvg = svg?.trim();

    if (!hasImages && !hasSvg) {
      return NextResponse.json(
        { error: "Either logo images (both logoLight and logoDark) or inline SVG must be provided" },
        { status: 400 }
      );
    }

    if (hasImages && hasSvg) {
      return NextResponse.json(
        { error: "Provide either logo images or inline SVG, not both" },
        { status: 400 }
      );
    }

    if (hasImages && (!logoLight?.trim() || !logoDark?.trim())) {
      return NextResponse.json(
        { error: "Both logoLight and logoDark must be provided for image logo option" },
        { status: 400 }
      );
    }

    if (hasSvg && (!svgTheme || (svgTheme !== "light" && svgTheme !== "dark"))) {
      return NextResponse.json(
        { error: "svgTheme ('light' or 'dark') is required when svg is provided" },
        { status: 400 }
      );
    }

    const newStack = await db
      .insert(techStack)
      .values({
        name,
        techCategoryId: techCategoryId ? parseInt(techCategoryId, 10) : null,
        logoLight: hasImages ? logoLight.trim() : null,
        logoDark: hasImages ? logoDark.trim() : null,
        svg: hasSvg ? svg.trim() : null,
        svgTheme: hasSvg ? svgTheme : "dark",
        projectId: projectId ? parseInt(projectId, 10) : null,
      })
      .returning();

    return NextResponse.json(newStack[0]);
  } catch (error) {
    console.error("Failed to create tech stack:", error);
    return NextResponse.json({ error: "Failed to create tech stack" }, { status: 500 });
  }
}
