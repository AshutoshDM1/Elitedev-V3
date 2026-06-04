import db from "@/db/db";
import { projectTasks } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const taskId = parseInt(resolvedParams.id, 10);

    if (isNaN(taskId)) {
      return NextResponse.json({ error: "Invalid task ID" }, { status: 400 });
    }

    const body = await req.json();
    const { projectId, title, description, status, priority, dueDate } = body;

    if (!projectId || !title) {
      return NextResponse.json(
        { error: "Project ID and Title are required" },
        { status: 400 }
      );
    }

    const updated = await db
      .update(projectTasks)
      .set({
        projectId: parseInt(projectId, 10),
        title,
        description: description || null,
        status: status || "todo",
        priority: priority || "medium",
        dueDate: dueDate ? new Date(dueDate) : null,
        updatedAt: new Date(),
      })
      .where(eq(projectTasks.id, taskId))
      .returning();

    if (updated.length === 0) {
      return NextResponse.json({ error: "Project task not found" }, { status: 404 });
    }

    return NextResponse.json(updated[0]);
  } catch (error) {
    console.error("Failed to update project task:", error);
    return NextResponse.json({ error: "Failed to update project task" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const taskId = parseInt(resolvedParams.id, 10);

    if (isNaN(taskId)) {
      return NextResponse.json({ error: "Invalid task ID" }, { status: 400 });
    }

    const deleted = await db
      .delete(projectTasks)
      .where(eq(projectTasks.id, taskId))
      .returning();

    if (deleted.length === 0) {
      return NextResponse.json({ error: "Project task not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Project task deleted successfully" });
  } catch (error) {
    console.error("Failed to delete project task:", error);
    return NextResponse.json({ error: "Failed to delete project task" }, { status: 500 });
  }
}
