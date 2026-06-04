import db from "@/db/db";
import { techCategory } from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await db.select().from(techCategory).orderBy(techCategory.name);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch tech categories:", error);
    return NextResponse.json({ error: "Failed to fetch tech categories" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name } = body;

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const newCategory = await db
      .insert(techCategory)
      .values({ name })
      .returning();

    return NextResponse.json(newCategory[0]);
  } catch (error) {
    console.error("Failed to create tech category:", error);
    return NextResponse.json({ error: "Failed to create tech category" }, { status: 500 });
  }
}
