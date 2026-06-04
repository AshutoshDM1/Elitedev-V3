import db from "@/db/db";
import { techStack } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const stackId = parseInt(resolvedParams.id, 10);

    if (isNaN(stackId)) {
      return NextResponse.json({ error: "Invalid stack ID" }, { status: 400 });
    }

    const body = await req.json();
    const { name, techCategoryId, logoLight, logoDark, projectId } = body;

    if (!name || !logoLight || !logoDark) {
      return NextResponse.json(
        { error: "Name, logoLight, and logoDark are required" },
        { status: 400 }
      );
    }

    const updated = await db
      .update(techStack)
      .set({
        name,
        techCategoryId: techCategoryId ? parseInt(techCategoryId, 10) : null,
        logoLight,
        logoDark,
        projectId: projectId ? parseInt(projectId, 10) : null,
        updatedAt: new Date(),
      })
      .where(eq(techStack.id, stackId))
      .returning();

    if (updated.length === 0) {
      return NextResponse.json({ error: "Tech stack entry not found" }, { status: 404 });
    }

    return NextResponse.json(updated[0]);
  } catch (error) {
    console.error("Failed to update tech stack:", error);
    return NextResponse.json({ error: "Failed to update tech stack" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const stackId = parseInt(resolvedParams.id, 10);

    if (isNaN(stackId)) {
      return NextResponse.json({ error: "Invalid stack ID" }, { status: 400 });
    }

    const deleted = await db
      .delete(techStack)
      .where(eq(techStack.id, stackId))
      .returning();

    if (deleted.length === 0) {
      return NextResponse.json({ error: "Tech stack entry not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Tech stack entry deleted successfully" });
  } catch (error) {
    console.error("Failed to delete tech stack:", error);
    return NextResponse.json({ error: "Failed to delete tech stack" }, { status: 500 });
  }
}
