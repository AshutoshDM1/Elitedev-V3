import db from "@/db/db";
import { techStack, techCategory } from "@/db/schema";
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
        createdAt: techStack.createdAt,
        updatedAt: techStack.updatedAt,
      })
      .from(techStack)
      .leftJoin(techCategory, eq(techStack.techCategoryId, techCategory.id))
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
    const { name, techCategoryId, logoLight, logoDark } = body;

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    if (!logoLight?.trim() || !logoDark?.trim()) {
      return NextResponse.json(
        { error: "Both logoLight and logoDark must be provided" },
        { status: 400 }
      );
    }

    const newStack = await db
      .insert(techStack)
      .values({
        name,
        techCategoryId: techCategoryId ? parseInt(techCategoryId, 10) : null,
        logoLight: logoLight.trim(),
        logoDark: logoDark.trim(),
      })
      .returning();

    return NextResponse.json(newStack[0]);
  } catch (error) {
    console.error("Failed to create tech stack:", error);
    return NextResponse.json({ error: "Failed to create tech stack" }, { status: 500 });
  }
}
