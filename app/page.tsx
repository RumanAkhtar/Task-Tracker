"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import TaskForm from "@/components/task-form"
import TaskList from "@/components/task-list"
import { CheckSquare } from "lucide-react"
import type { Task, TaskStatus, CreateTaskDTO } from "@/lib/types"

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(false)

  /* ---------- Fetch Tasks ---------- */
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("/api/tasks")
        if (!res.ok) {
          throw new Error("Failed to fetch tasks")
        }

        const data: Task[] = await res.json()
        setTasks(data)
      } catch (error) {
        console.error("Fetch tasks error:", error)
      }
    }

    fetchTasks()
  }, [])

  /* ---------- Create Task ---------- */
  const handleCreateTask = async (
    data: CreateTaskDTO
  ): Promise<void> => {
    try {
      setIsLoading(true)

      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        throw new Error("Failed to create task")
      }

      const newTask: Task = await res.json()
      setTasks((prev) => [newTask, ...prev])
    } catch (error) {
      console.error("Create task error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  /* ---------- Update Status ---------- */
  const handleStatusChange = async (
    id: string,
    status: TaskStatus
  ): Promise<void> => {
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })

      if (!res.ok) {
        throw new Error("Failed to update task")
      }

      setTasks((prev) =>
        prev.map((task) =>
          task._id === id ? { ...task, status } : task
        )
      )
    } catch (error) {
      console.error("Update task error:", error)
    }
  }

  /* ---------- Delete Task ---------- */
  const handleDeleteTask = async (
    id: string
  ): Promise<boolean> => {
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      })

      if (!res.ok) {
        return false
      }

      setTasks((prev) =>
        prev.filter((task) => task._id !== id)
      )

      return true
    } catch (error) {
      console.error("Delete task error:", error)
      return false
    }
  }

  return (
    <main className="min-h-screen bg-background px-4 pt-12 pb-20 sm:px-6 lg:px-8">
      {/* Background Effects */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-primary/20 blur-3xl opacity-20"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-8 right-1/4 h-96 w-96 rounded-full bg-secondary/20 blur-3xl opacity-20"
          animate={{ scale: [1.2, 1, 1.2] }}
          transition={{ duration: 6, repeat: Infinity, delay: 1 }}
        />
      </div>

      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-4 flex items-center gap-3">
            <motion.div
              className="rounded-lg gradient-primary-to-secondary p-3"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <CheckSquare className="h-6 w-6 text-white" />
            </motion.div>
            <h1 className="text-5xl font-bold gradient-text">
              Task Tracker
            </h1>
          </div>
          <p className="mt-2 text-lg text-muted-foreground">
            Organize, prioritize, and track your daily tasks
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Form */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <TaskForm
              onSubmit={handleCreateTask}
              isLoading={isLoading}
            />
          </motion.div>

          {/* Task List */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <TaskList
              tasks={tasks}
              onStatusChange={handleStatusChange}
              onDelete={handleDeleteTask}
            />
          </motion.div>
        </div>
      </div>
    </main>
  )
}
