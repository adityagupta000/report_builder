import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for demo purposes
let reportData: any = null

export async function GET() {
  if (!reportData) {
    return NextResponse.json({ message: "No data found" }, { status: 404 })
  }

  return NextResponse.json(reportData)
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    reportData = data

    return NextResponse.json({ message: "Data saved successfully" })
  } catch (error) {
    return NextResponse.json({ message: "Error saving data" }, { status: 500 })
  }
}
