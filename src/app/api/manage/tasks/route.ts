import db from "@/db/db";
import { projectTasks, projects } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await db
      .select({
        id: projectTasks.id,
        projectId: projectTasks.projectId,
        projectTitle: projects.title,
        title: projectTasks.title,
        description: projectTasks.description,
        status: projectTasks.status,
        priority: projectTasks.priority,
        dueDate: projectTasks.dueDate,
        createdAt: projectTasks.createdAt,
        updatedAt: projectTasks.updatedAt,
      })
      .from(projectTasks)
      .leftJoin(projects, eq(projectTasks.projectId, projects.id))
      .orderBy(projectTasks.id);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch admin tasks:", error);
    return NextResponse.json({ error: "Failed to fetch project tasks" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { projectId, title, description, status, priority, dueDate } = body;

    if (!projectId || !title) {
      return NextResponse.json(
        { error: "Project ID and Title are required" },
        { status: 400 }
      );
    }

    const newTask = await db
      .insert(projectTasks)
      .values({
        projectId: parseInt(projectId, 10),
        title,
        description: description || null,
        status: status || "todo",
        priority: priority || "medium",
        dueDate: dueDate ? new Date(dueDate) : null,
      })
      .returning();

    return NextResponse.json(newTask[0]);
  } catch (error) {
    console.error("Failed to create project task:", error);
    return NextResponse.json({ error: "Failed to create project task" }, { status: 500 });
  }
}
