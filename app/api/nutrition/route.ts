import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

const filePath = path.join(process.cwd(), "data", "report-data.json");

export async function GET() {
  const fileContents = fs.readFileSync(filePath, "utf-8");
  const reportData = JSON.parse(fileContents);
  return NextResponse.json(reportData.nutritionData);
}

export async function PUT(req: NextRequest) {
  try {
    const newNutritionData = await req.json();

    const fileContents = fs.readFileSync(filePath, "utf-8");
    const reportData = JSON.parse(fileContents);

    reportData.nutritionData = newNutritionData;

    fs.writeFileSync(filePath, JSON.stringify(reportData, null, 2));

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to update nutrition data:", err);
    return new NextResponse("Failed to save", { status: 500 });
  }
}
