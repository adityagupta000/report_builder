import { writeFile, readdir } from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

// POST: Upload image to /public/sports
export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json(
      { success: false, error: "No file uploaded" },
      { status: 400 }
    );
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const fileName = `${Date.now()}-${file.name}`;
  const filePath = path.join(process.cwd(), "public", "sports", fileName);

  try {
    await writeFile(filePath, buffer);
    const publicUrl = `/sports/${fileName}`;
    return NextResponse.json({ success: true, url: publicUrl });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to save file" },
      { status: 500 }
    );
  }
}

// GET: Return list of images in /public/sports
export async function GET() {
  try {
    const dirPath = path.join(process.cwd(), "public", "sports");
    const files = await readdir(dirPath);

    const images = files.map((file) => ({
      label: path.parse(file).name.toLowerCase(), // "dumbbell"
      url: `/sports/${file}`,
    }));

    return NextResponse.json({ success: true, images });
  } catch (error) {
    console.error("Failed to read sports directory:", error);
    return NextResponse.json(
      { success: false, error: "Could not read sports folder" },
      { status: 500 }
    );
  }
}
