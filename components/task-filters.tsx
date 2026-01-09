"use client"

import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Filter, X } from "lucide-react"
import type {
  TaskFilters,
  TaskStatus,
  TaskPriority,
  TaskSortBy,
} from "@/lib/types"

interface TaskFiltersProps {
  filters: TaskFilters
  onChange: (filters: TaskFilters) => void
}

const STATUS_OPTIONS: { label: string; value?: TaskStatus }[] = [
  { label: "All", value: undefined },
  { label: "Pending", value: "Pending" },
  { label: "Completed", value: "Completed" },
]

const PRIORITY_OPTIONS: { label: string; value?: TaskPriority }[] = [
  { label: "All", value: undefined },
  { label: "Low", value: "Low" },
  { label: "Medium", value: "Medium" },
  { label: "High", value: "High" },
]

const SORT_OPTIONS: { label: string; value: TaskSortBy }[] = [
  { label: "Due Date", value: "dueDate" },
  { label: "Priority", value: "priority" },
  { label: "Created", value: "createdAt" },
]

export default function TaskFilters({ filters, onChange }: TaskFiltersProps) {
  const hasActiveFilters =
    filters.status || filters.priority || filters.search

  return (
    <Card className="space-y-4 animate-slide-in">
      <div className="flex items-center gap-2">
        <Filter className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Filters & Sort</h3>
      </div>

      {/* Search */}
      <Input
        placeholder="Search tasks..."
        value={filters.search ?? ""}
        onChange={(e) =>
          onChange({
            ...filters,
            search: e.target.value || undefined,
          })
        }
      />

      {/* Status & Priority */}
      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Status"
          options={STATUS_OPTIONS}
          value={filters.status}
          onChange={(e) =>
            onChange({
              ...filters,
              status: e.target.value as TaskStatus | undefined,
            })
          }
        />

        <Select
          label="Priority"
          options={PRIORITY_OPTIONS}
          value={filters.priority}
          onChange={(e) =>
            onChange({
              ...filters,
              priority: e.target.value as TaskPriority | undefined,
            })
          }
        />
      </div>

      {/* Sort */}
      <Select
        label="Sort By"
        options={SORT_OPTIONS}
        value={filters.sortBy}
        onChange={(e) =>
          onChange({
            ...filters,
            sortBy: e.target.value as TaskSortBy,
          })
        }
      />

      {/* Clear */}
      {hasActiveFilters && (
        <Button
          variant="secondary"
          className="w-full"
          onClick={() =>
            onChange({
              sortBy: "dueDate",
            })
          }
        >
          <X className="w-4 h-4 mr-2" />
          Clear Filters
        </Button>
      )}
    </Card>
  )
}
