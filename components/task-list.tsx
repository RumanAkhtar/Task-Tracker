"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import TaskCard from "@/components/task-card"
import TaskFilters from "@/components/task-filters"
import { Card } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import type { Task, TaskFilters as Filters, TaskStatus } from "@/lib/types"

interface TaskListProps {
  tasks: Task[]
  onStatusChange: (id: string, status: TaskStatus) => void
  onDelete: (id: string) => void
}

const INITIAL_FILTERS: Filters = {
  sortBy: "dueDate",
}

export default function TaskList({
  tasks,
  onStatusChange,
  onDelete,
}: TaskListProps) {
  const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS)

  /* ---------- Filter + Sort ---------- */
  const filteredTasks = useMemo(() => {
    let result = [...tasks]

    if (filters.status) {
      result = result.filter((t) => t.status === filters.status)
    }

    if (filters.priority) {
      result = result.filter((t) => t.priority === filters.priority)
    }

    if (filters.search) {
      const term = filters.search.toLowerCase()
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(term) ||
          t.description?.toLowerCase().includes(term)
      )
    }

    const priorityOrder: Record<string, number> = {
      High: 0,
      Medium: 1,
      Low: 2,
    }

    result.sort((a, b) => {
      switch (filters.sortBy) {
        case "priority":
          return priorityOrder[a.priority] - priorityOrder[b.priority]
        case "createdAt":
          return (
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
          )
        case "dueDate":
        default:
          return (
            new Date(a.dueDate).getTime() -
            new Date(b.dueDate).getTime()
          )
      }
    })

    return result
  }, [tasks, filters])

  /* ---------- Stats ---------- */
  const stats = useMemo(() => {
    const completed = tasks.filter(
      (t) => t.status === "Completed"
    ).length

    return {
      total: tasks.length,
      completed,
      pending: tasks.length - completed,
    }
  }, [tasks])

  return (
    <div className="grid gap-6 lg:grid-cols-4">
      {/* Filters */}
      <div className="lg:col-span-1">
        <TaskFilters filters={filters} onChange={setFilters} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="mt-6">
            <h3 className="mb-4 text-lg font-semibold gradient-text">
              Overview
            </h3>

            <div className="space-y-3">
              <Stat label="Total Tasks" value={stats.total} />
              <Stat
                label="Completed"
                value={stats.completed}
                color="text-success"
              />
              <Stat
                label="Pending"
                value={stats.pending}
                color="text-warning"
              />

              {stats.total > 0 && (
                <div className="mt-4 border-t border-white/5 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Completion Rate
                    </span>
                    <span className="font-bold text-success">
                      {Math.round(
                        (stats.completed / stats.total) * 100
                      )}
                      %
                    </span>
                  </div>

                  <motion.div className="mt-2 h-2 overflow-hidden rounded-full bg-card">
                    <motion.div
                      className="h-full gradient-primary-to-secondary"
                      initial={{ width: 0 }}
                      animate={{
                        width: `${
                          (stats.completed / stats.total) * 100
                        }%`,
                      }}
                      transition={{ duration: 1 }}
                    />
                  </motion.div>
                </div>
              )}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Task List */}
      <div className="lg:col-span-3">
        {filteredTasks.length === 0 ? (
          <EmptyState hasTasks={tasks.length > 0} />
        ) : (
          <motion.div
            className="space-y-4"
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.05 },
              },
            }}
          >
            {filteredTasks.map((task) => (
              /* ✅ Key is on a stable wrapper */
              <div key={task._id}>
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.4 },
                    },
                  }}
                >
                  <TaskCard
                    task={task}
                    onStatusChange={onStatusChange}
                    onDelete={onDelete}
                  />
                </motion.div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}

/* ---------- Helper Components ---------- */

function Stat({
  label,
  value,
  color = "text-primary",
}: {
  label: string
  value: number
  color?: string
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className={`text-lg font-bold ${color}`}>{value}</span>
    </div>
  )
}

function EmptyState({ hasTasks }: { hasTasks: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="flex flex-col items-center gap-4 py-12">
        <motion.div
          className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <AlertCircle className="h-8 w-8 text-primary" />
        </motion.div>

        <div className="text-center">
          <h3 className="text-lg font-semibold">No tasks found</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {hasTasks
              ? "No tasks match your filters"
              : "Create your first task to get started"}
          </p>
        </div>
      </Card>
    </motion.div>
  )
}
