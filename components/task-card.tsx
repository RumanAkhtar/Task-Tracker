"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/toast-provider"
import { Trash2, CheckCircle2, Circle, Calendar } from "lucide-react"
import type { Task } from "@/lib/dummy-data"

interface TaskCardProps {
  task: Task
  onStatusChange: (id: string, status: "Pending" | "Completed") => void
  onDelete: (id: string) => void
}

export default function TaskCard({ task, onStatusChange, onDelete }: TaskCardProps) {
  const { addToast } = useToast()
  const [isHovered, setIsHovered] = useState(false)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const isOverdue = () => {
    if (task.status === "Completed") return false
    return new Date(task.dueDate) < new Date()
  }

  const handleDelete = () => {
    onDelete(task.id)
    addToast({
      title: "Task Deleted",
      description: "Task has been removed from your list",
      variant: "success",
    })
  }

  const handleStatusToggle = () => {
    const newStatus = task.status === "Pending" ? "Completed" : "Pending"
    onStatusChange(task.id, newStatus)
    addToast({
      title: "Task Updated",
      description: `Task marked as ${newStatus}`,
      variant: "success",
    })
  }

  const priorityVariant = {
    Low: "primary" as const,
    Medium: "warning" as const,
    High: "danger" as const,
  }

  return (
    <motion.div whileHover={{ y: -4 }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <Card
        className={`group cursor-pointer transition-all duration-300 ease-out ${
          isHovered ? "shadow-glow" : ""
        } ${task.status === "Completed" ? "opacity-70" : ""}`}
      >
        <div className="flex gap-4">
          {/* Status Toggle */}
          <motion.button
            onClick={handleStatusToggle}
            className="flex-shrink-0 text-muted-foreground hover:text-primary transition-all duration-300 ease-out mt-1"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            {task.status === "Completed" ? (
              <CheckCircle2 className="w-6 h-6 text-success" />
            ) : (
              <Circle className="w-6 h-6" />
            )}
          </motion.button>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <h3
                  className={`font-semibold text-lg transition-all duration-300 ease-out ${
                    task.status === "Completed" ? "line-through text-muted-foreground" : "text-foreground"
                  }`}
                >
                  {task.title}
                </h3>
                {task.description && (
                  <p className="text-muted-foreground text-sm mt-1 line-clamp-2">{task.description}</p>
                )}
              </div>
              <Badge variant={priorityVariant[task.priority]} className="flex-shrink-0">
                {task.priority}
              </Badge>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Calendar className="w-4 h-4" />
                {formatDate(task.dueDate)}
                {isOverdue() && <span className="text-destructive text-xs ml-1">(Overdue)</span>}
              </div>

              <motion.button
                onClick={handleDelete}
                className={`p-2 rounded-lg transition-all duration-300 ease-out ${
                  isHovered ? "bg-destructive/20 text-destructive" : "text-muted-foreground"
                }`}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
              >
                <Trash2 className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
