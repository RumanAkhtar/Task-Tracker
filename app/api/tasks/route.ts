import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { Task } from "../../../models/Task"

export async function GET() {
  try {
    await connectDB()
    const tasks = await Task.find().sort({ createdAt: -1 })
    return NextResponse.json(tasks)
  } catch (error) {
    console.error("GET /api/tasks error:", error)
    return NextResponse.json(
      { message: "Failed to fetch tasks" },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    await connectDB()
    const body = await req.json()
    const task = await Task.create(body)
    return NextResponse.json(task, { status: 201 })
  } catch (error) {
    console.error("POST /api/tasks error:", error)
    return NextResponse.json(
      { message: "Failed to create task" },
      { status: 500 }
    )
  }
}
