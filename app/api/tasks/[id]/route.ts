import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { Task } from "@/models/Task"

interface Params {
  params: {
    id: string
  }
}

/* ---------- UPDATE TASK ---------- */
export async function PUT(req: Request, { params }: Params) {
  try {
    await connectDB()

    const body = await req.json()

    const updatedTask = await Task.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    )

    if (!updatedTask) {
      return NextResponse.json(
        { message: "Task not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(updatedTask)
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
  { params }: Params
) {
  try {
    await connectDB()

    const deletedTask = await Task.findByIdAndDelete(params.id)

    if (!deletedTask) {
      return NextResponse.json(
        { message: "Task not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("DELETE /api/tasks/[id] error:", error)
    return NextResponse.json(
      { message: "Failed to delete task" },
      { status: 500 }
    )
  }
}
