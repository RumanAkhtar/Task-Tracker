"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import TaskCard from "@/components/task-card"
import TaskFilters, { type FilterOptions } from "@/components/task-filters"
import { Card } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import type { Task } from "@/lib/dummy-data"

interface TaskListProps {
  tasks: Task[]
  onStatusChange: (id: string, status: "Pending" | "Completed") => void
  onDelete: (id: string) => void
}

export default function TaskList({ tasks, onStatusChange, onDelete }: TaskListProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    status: "",
    priority: "",
    sortBy: "dueDate",
    searchTerm: "",
  })

  const filteredAndSortedTasks = useMemo(() => {
    let result = [...tasks]

    if (filters.status) {
      result = result.filter((task) => task.status === filters.status)
    }

    if (filters.priority) {
      result = result.filter((task) => task.priority === filters.priority)
    }

    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase()
      result = result.filter(
        (task) => task.title.toLowerCase().includes(term) || task.description?.toLowerCase().includes(term),
      )
    }

    const priorityOrder = { High: 0, Medium: 1, Low: 2 }
    result.sort((a, b) => {
      switch (filters.sortBy) {
        case "priority":
          return priorityOrder[a.priority] - priorityOrder[b.priority]
        case "created":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case "dueDate":
        default:
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      }
    })

    return result
  }, [tasks, filters])

  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === "Completed").length,
    pending: tasks.filter((t) => t.status === "Pending").length,
  }

  return (
    <div className="grid lg:grid-cols-4 gap-6">
      {/* Filters Sidebar */}
      <div className="lg:col-span-1">
        <TaskFilters filters={filters} onFilterChange={setFilters} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="mt-6">
            <h3 className="font-semibold text-lg gradient-text mb-4">Overview</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total Tasks</span>
                <span className="font-bold text-lg text-primary">{stats.total}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Completed</span>
                <span className="font-bold text-lg text-success">{stats.completed}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Pending</span>
                <span className="font-bold text-lg text-warning">{stats.pending}</span>
              </div>
              {stats.total > 0 && (
                <div className="mt-4 pt-4 border-t border-white/5">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Completion Rate</span>
                    <span className="font-bold text-success">{Math.round((stats.completed / stats.total) * 100)}%</span>
                  </div>
                  <motion.div className="mt-2 h-2 bg-card rounded-full overflow-hidden">
                    <motion.div
                      className="h-full gradient-primary-to-secondary"
                      initial={{ width: 0 }}
                      animate={{ width: `${(stats.completed / stats.total) * 100}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    ></motion.div>
                  </motion.div>
                </div>
              )}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Tasks Grid */}
      <div className="lg:col-span-3">
        {filteredAndSortedTasks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="py-12 flex flex-col items-center justify-center gap-4">
              <motion.div
                className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                <AlertCircle className="w-8 h-8 text-primary" />
              </motion.div>
              <div className="text-center">
                <h3 className="font-semibold text-lg">No tasks found</h3>
                <p className="text-muted-foreground text-sm mt-1">
                  {tasks.length === 0 ? "Create your first task to get started" : "No tasks match your filters"}
                </p>
              </div>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            className="space-y-4"
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.05,
                  delayChildren: 0,
                },
              },
            }}
          >
            {filteredAndSortedTasks.map((task) => (
              <motion.div
                key={task.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                }}
              >
                <TaskCard task={task} onStatusChange={onStatusChange} onDelete={onDelete} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}
