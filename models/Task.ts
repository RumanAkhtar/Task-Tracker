import mongoose, { Schema, model, models } from "mongoose"

const TaskSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    status: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Pending",
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    dueDate: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

export const Task =
  models.Task || model("Task", TaskSchema)
