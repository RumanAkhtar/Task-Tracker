"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/toast-provider"
import {
  Trash2,
  CheckCircle2,
  Circle,
  Calendar,
} from "lucide-react"
import type { Task, TaskStatus } from "@/lib/types"

interface TaskCardProps {
  task: Task
  onStatusChange: (
    id: string,
    status: TaskStatus
  ) => Promise<void>
  onDelete: (id: string) => Promise<boolean>
}

export default function TaskCard({
  task,
  onStatusChange,
  onDelete,
}: TaskCardProps) {
  const { addToast } = useToast()
  const [isHovered, setIsHovered] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })

  const isOverdue =
    task.status !== "Completed" &&
    new Date(task.dueDate) < new Date()

  /* ---------- Delete ---------- */
  const handleDelete = async () => {
    if (isDeleting) return
    setIsDeleting(true)

    const success = await onDelete(task._id)

    if (success) {
      addToast({
        title: "Task Deleted",
        description: "Task has been permanently removed",
        variant: "success",
      })
    } else {
      addToast({
        title: "Delete Failed",
        description: "Unable to delete task. Please try again.",
        variant: "error",
      })
    }

    setIsDeleting(false)
  }

  /* ---------- Status Toggle ---------- */
  const handleStatusToggle = async () => {
    const newStatus: TaskStatus =
      task.status === "Pending"
        ? "Completed"
        : "Pending"

    await onStatusChange(task._id, newStatus)

    addToast({
      title: "Task Updated",
      description: `Task marked as ${newStatus}`,
      variant: "success",
    })
  }

  const priorityVariant = {
    Low: "primary",
    Medium: "warning",
    High: "danger",
  } as const

  return (
    <motion.div
      whileHover={{ y: -4 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card
        className={`group transition-all duration-300 ${
          isHovered ? "shadow-glow" : ""
        } ${task.status === "Completed" ? "opacity-70" : ""}`}
      >
        <div className="flex gap-4">
          {/* Status Toggle */}
          <motion.button
            type="button"
            onClick={handleStatusToggle}
            className="mt-1 text-muted-foreground hover:text-primary"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle task status"
          >
            {task.status === "Completed" ? (
              <CheckCircle2 className="h-6 w-6 text-success" />
            ) : (
              <Circle className="h-6 w-6" />
            )}
          </motion.button>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3
                  className={`text-lg font-semibold ${
                    task.status === "Completed"
                      ? "line-through text-muted-foreground"
                      : ""
                  }`}
                >
                  {task.title}
                </h3>

                {task.description && (
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                    {task.description}
                  </p>
                )}
              </div>

              <Badge variant={priorityVariant[task.priority]}>
                {task.priority}
              </Badge>
            </div>

            {/* Footer */}
            <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {formatDate(task.dueDate)}
                {isOverdue && (
                  <span className="ml-1 text-xs text-destructive">
                    (Overdue)
                  </span>
                )}
              </div>

              <motion.button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                aria-label="Delete task"
                className={`rounded-lg p-2 transition ${
                  isHovered
                    ? "bg-destructive/20 text-destructive"
                    : "text-muted-foreground"
                } ${
                  isDeleting ? "opacity-50 cursor-not-allowed" : ""
                }`}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
              >
                <Trash2 className="h-4 w-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
