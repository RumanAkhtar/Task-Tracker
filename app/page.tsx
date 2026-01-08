"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import TaskForm, { type TaskFormData } from "@/components/task-form"
import TaskList from "@/components/task-list"
import { DUMMY_TASKS, type Task } from "@/lib/dummy-data"
import { CheckSquare } from "lucide-react"

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>(DUMMY_TASKS)

  const handleCreateTask = (formData: TaskFormData) => {
    const newTask: Task = {
      id: Math.random().toString(36).substr(2, 9),
      ...formData,
      createdAt: new Date().toISOString().split("T")[0],
    }

    setTasks((prev) => [newTask, ...prev])
  }

  const handleStatusChange = (id: string, status: "Pending" | "Completed") => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, status } : task)))
  }

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  return (
    <main className="min-h-screen bg-background pt-12 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
        ></motion.div>
        <motion.div
          className="absolute -bottom-8 right-1/4 w-96 h-96 bg-secondary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{ scale: [1.2, 1, 1.2] }}
          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
        ></motion.div>
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <motion.div
              className="p-3 rounded-lg gradient-primary-to-secondary"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <CheckSquare className="w-6 h-6 text-white" />
            </motion.div>
            <h1 className="text-5xl font-bold gradient-text">Task Tracker</h1>
          </div>
          <p className="text-muted-foreground text-lg mt-2">
            Organize, prioritize, and track your daily tasks with ease
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <TaskForm onSubmit={handleCreateTask} />
          </motion.div>

          {/* Tasks */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <TaskList tasks={tasks} onStatusChange={handleStatusChange} onDelete={handleDeleteTask} />
          </motion.div>
        </div>
      </div>
    </main>
  )
}
