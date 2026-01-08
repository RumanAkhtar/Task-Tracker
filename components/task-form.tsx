"use client"

import type React from "react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useToast } from "@/components/toast-provider"
import { Plus } from "lucide-react"

export interface TaskFormData {
  title: string
  description: string
  priority: "Low" | "Medium" | "High"
  dueDate: string
  status: "Pending" | "Completed"
}

interface TaskFormProps {
  onSubmit: (data: TaskFormData) => void
  isLoading?: boolean
}

const PRIORITY_OPTIONS = [
  { label: "Low", value: "Low" },
  { label: "Medium", value: "Medium" },
  { label: "High", value: "High" },
]

const STATUS_OPTIONS = [
  { label: "Pending", value: "Pending" },
  { label: "Completed", value: "Completed" },
]

export default function TaskForm({ onSubmit, isLoading = false }: TaskFormProps) {
  const { addToast } = useToast()
  const [errors, setErrors] = useState<Partial<Record<keyof TaskFormData, string>>>({})
  const [formData, setFormData] = useState<TaskFormData>({
    title: "",
    description: "",
    priority: "Medium",
    dueDate: "",
    status: "Pending",
  })

  const validateForm = () => {
    const newErrors: Partial<Record<keyof TaskFormData, string>> = {}

    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    }

    if (!formData.dueDate) {
      newErrors.dueDate = "Due date is required"
    } else {
      const selectedDate = new Date(formData.dueDate)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (selectedDate < today) {
        newErrors.dueDate = "Due date cannot be in the past"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name as keyof TaskFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      addToast({
        title: "Validation Error",
        description: "Please fill in all required fields correctly",
        variant: "error",
      })
      return
    }

    onSubmit(formData)
    setFormData({
      title: "",
      description: "",
      priority: "Medium",
      dueDate: "",
      status: "Pending",
    })
    setErrors({})

    addToast({
      title: "Success",
      description: "Task created successfully",
      variant: "success",
    })
  }

  return (
    <Card className="animate-slide-in">
      <div className="mb-6">
        <h2 className="text-2xl font-bold gradient-text">Create New Task</h2>
        <p className="text-muted-foreground text-sm mt-1">Add a new task to your list</p>
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
          <label className="block text-sm font-medium text-foreground mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Add task description (optional)..."
            disabled={isLoading}
            className="w-full rounded-lg border border-border bg-input text-foreground placeholder-muted-foreground px-4 py-2.5 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
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
          <Plus className="w-4 h-4 mr-2" />
          Create Task
        </Button>
      </form>
    </Card>
  )
}
