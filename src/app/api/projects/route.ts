import db from "@/db/db";
import { projects } from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await db.select().from(projects).orderBy(projects.id);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, image, tags, liveUrl, clientRepo, serverRepo, isActive } = body;

    if (!title || !description || !image) {
      return NextResponse.json(
        { error: "Title, description, and image URL are required" },
        { status: 400 }
      );
    }

    const newProject = await db
      .insert(projects)
      .values({
        title,
        description,
        image,
        tags: tags || "",
        liveUrl: liveUrl || null,
        clientRepo: clientRepo || null,
        serverRepo: serverRepo || null,
        isActive: isActive !== undefined ? isActive : true,
      })
      .returning();

    return NextResponse.json(newProject[0]);
  } catch (error) {
    console.error("Failed to create project:", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
