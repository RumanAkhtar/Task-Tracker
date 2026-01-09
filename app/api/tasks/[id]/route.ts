import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { Task } from "@/models/Task"
import mongoose from "mongoose"

interface RouteContext {
  params: Promise<{
    id: string
  }>
}

/* ---------- UPDATE TASK ---------- */
export async function PUT(
  req: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params
    await connectDB()

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid task ID" },
        { status: 400 }
      )
    }

    const body = await req.json()

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    )

    if (!updatedTask) {
      return NextResponse.json(
        { message: "Task not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(updatedTask, { status: 200 })
  } catch (error) {
    console.error("PUT /api/tasks/[id] error:", error)
    return NextResponse.json(
      { message: "Failed to update task" },
      { status: 500 }
    )
  }
}

/* ---------- DELETE TASK ---------- */
export async function DELETE(
  _req: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params
    await connectDB()

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid task ID" },
        { status: 400 }
      )
    }

    console.log("Deleting task:", id)

    const deletedTask = await Task.findByIdAndDelete(id)

    if (!deletedTask) {
      return NextResponse.json(
        { message: "Task not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { success: true },
      { status: 200 }
    )
  } catch (error) {
    console.error("DELETE /api/tasks/[id] error:", error)
    return NextResponse.json(
      { message: "Failed to delete task" },
      { status: 500 }
    )
  }
}
