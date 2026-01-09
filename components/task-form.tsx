"use client"

import type React from "react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useToast } from "@/components/toast-provider"
import { Plus } from "lucide-react"
import type { CreateTaskDTO, TaskPriority, TaskStatus } from "@/lib/types"

interface TaskFormProps {
  onSubmit: (data: CreateTaskDTO) => void
  isLoading?: boolean
}

type FormErrors = Partial<Record<keyof CreateTaskDTO, string>>

const PRIORITY_OPTIONS: { label: string; value: TaskPriority }[] = [
  { label: "Low", value: "Low" },
  { label: "Medium", value: "Medium" },
  { label: "High", value: "High" },
]

const STATUS_OPTIONS: { label: string; value: TaskStatus }[] = [
  { label: "Pending", value: "Pending" },
  { label: "Completed", value: "Completed" },
]

const INITIAL_FORM_STATE: CreateTaskDTO = {
  title: "",
  description: "",
  priority: "Medium",
  dueDate: "",
  status: "Pending",
}

export default function TaskForm({
  onSubmit,
  isLoading = false,
}: TaskFormProps) {
  const { addToast } = useToast()
  const [formData, setFormData] =
    useState<CreateTaskDTO>(INITIAL_FORM_STATE)
  const [errors, setErrors] = useState<FormErrors>({})

  const validate = (): boolean => {
    const nextErrors: FormErrors = {}

    if (!formData.title.trim()) {
      nextErrors.title = "Title is required"
    }

    if (!formData.dueDate) {
      nextErrors.dueDate = "Due date is required"
    } else {
      const selected = new Date(formData.dueDate)
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      if (selected < today) {
        nextErrors.dueDate = "Due date cannot be in the past"
      }
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (errors[name as keyof CreateTaskDTO]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) {
      addToast({
        title: "Validation Error",
        description: "Please correct the highlighted fields",
        variant: "error",
      })
      return
    }

    onSubmit(formData)
    setFormData(INITIAL_FORM_STATE)
    setErrors({})

    addToast({
      title: "Task Created",
      description: "Your task has been added successfully",
      variant: "success",
    })
  }

  return (
    <Card className="animate-slide-in">
      <div className="mb-6">
        <h2 className="text-2xl font-bold gradient-text">
          Create New Task
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Add a new task to your list
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Task Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          error={errors.title}
          placeholder="Enter task title..."
          disabled={isLoading}
        />

        <div>
          <label className="mb-2 block text-sm font-medium">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Optional task description..."
            disabled={isLoading}
            className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-foreground placeholder-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            options={PRIORITY_OPTIONS}
            disabled={isLoading}
          />

          <Input
            label="Due Date"
            name="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={handleChange}
            error={errors.dueDate}
            disabled={isLoading}
          />
        </div>

        <Select
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          options={STATUS_OPTIONS}
          disabled={isLoading}
        />

        <Button type="submit" isLoading={isLoading} className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          Create Task
        </Button>
      </form>
    </Card>
  )
}
