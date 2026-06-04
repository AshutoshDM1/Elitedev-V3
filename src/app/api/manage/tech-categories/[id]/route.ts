import db from "@/db/db";
import { techCategory } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const categoryId = parseInt(resolvedParams.id, 10);

    if (isNaN(categoryId)) {
      return NextResponse.json({ error: "Invalid category ID" }, { status: 400 });
    }

    const body = await req.json();
    const { name } = body;

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const updated = await db
      .update(techCategory)
      .set({
        name,
        updatedAt: new Date(),
      })
      .where(eq(techCategory.id, categoryId))
      .returning();

    if (updated.length === 0) {
      return NextResponse.json({ error: "Tech category not found" }, { status: 404 });
    }

    return NextResponse.json(updated[0]);
  } catch (error) {
    console.error("Failed to update tech category:", error);
    return NextResponse.json({ error: "Failed to update tech category" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const categoryId = parseInt(resolvedParams.id, 10);

    if (isNaN(categoryId)) {
      return NextResponse.json({ error: "Invalid category ID" }, { status: 400 });
    }

    const deleted = await db
      .delete(techCategory)
      .where(eq(techCategory.id, categoryId))
      .returning();

    if (deleted.length === 0) {
      return NextResponse.json({ error: "Tech category not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Tech category deleted successfully" });
  } catch (error) {
    console.error("Failed to delete tech category:", error);
    return NextResponse.json({ error: "Failed to delete tech category" }, { status: 500 });
  }
}
