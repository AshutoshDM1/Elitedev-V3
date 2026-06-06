import { NextResponse } from "next/server";
import { Aset } from "aset-sdk";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Convert Web File API object to Node.js Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Initialize the ASET SDK client using keys from environment variables
    const apiKey = process.env.Aset_API_ID;
    const apiSecret = process.env.Aset_API_SECRET;
    const endpoint = process.env.Aset_API_ENDPOINT || "http://localhost:5000";

    if (!apiKey || !apiSecret) {
      console.error("Missing ASET SDK credentials in environment variables");
      return NextResponse.json(
        { error: "ASET SDK credentials not configured on server" },
        { status: 500 },
      );
    }

    const aset = new Aset({
      apiKey,
      apiSecret,
      endpoint,
    });

    // Upload the buffer
    const uploadedFile = await aset.upload(buffer, {
      name: file.name,
      folderId: "8b657827-6e83-471a-b674-266abd2e7755",
      contentType: file.type || "application/octet-stream",
    });

    return NextResponse.json({
      success: true,
      url: uploadedFile.url,
      name: uploadedFile.name,
      id: uploadedFile.id,
      sizeMb: uploadedFile.sizeMb,
    });
  } catch (error: any) {
    console.error("Upload failed in API route:", error);
    return NextResponse.json(
      { error: error.message || "Failed to upload file to storage" },
      { status: 500 },
    );
  }
}
