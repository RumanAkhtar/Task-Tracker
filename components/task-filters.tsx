"use client"
import { Select } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Filter, X } from "lucide-react"

export interface FilterOptions {
  status: string
  priority: string
  sortBy: "dueDate" | "priority" | "created"
  searchTerm: string
}

interface TaskFiltersProps {
  filters: FilterOptions
  onFilterChange: (filters: FilterOptions) => void
}

const STATUS_OPTIONS = [
  { label: "All", value: "" },
  { label: "Pending", value: "Pending" },
  { label: "Completed", value: "Completed" },
]

const PRIORITY_OPTIONS = [
  { label: "All", value: "" },
  { label: "Low", value: "Low" },
  { label: "Medium", value: "Medium" },
  { label: "High", value: "High" },
]

const SORT_OPTIONS = [
  { label: "Due Date", value: "dueDate" },
  { label: "Priority", value: "priority" },
  { label: "Created", value: "created" },
]

export default function TaskFilters({ filters, onFilterChange }: TaskFiltersProps) {
  const hasActiveFilters = filters.status || filters.priority || filters.searchTerm

  return (
    <Card className="animate-slide-in space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Filters & Sort</h3>
      </div>

      <Input
        placeholder="Search tasks..."
        value={filters.searchTerm}
        onChange={(e) =>
          onFilterChange({
            ...filters,
            searchTerm: e.target.value,
          })
        }
      />

      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Status"
          options={STATUS_OPTIONS}
          value={filters.status}
          onChange={(e) =>
            onFilterChange({
              ...filters,
              status: e.target.value,
            })
          }
        />
        <Select
          label="Priority"
          options={PRIORITY_OPTIONS}
          value={filters.priority}
          onChange={(e) =>
            onFilterChange({
              ...filters,
              priority: e.target.value,
            })
          }
        />
      </div>

      <Select
        label="Sort By"
        options={SORT_OPTIONS}
        value={filters.sortBy}
        onChange={(e) =>
          onFilterChange({
            ...filters,
            sortBy: e.target.value as "dueDate" | "priority" | "created",
          })
        }
      />

      {hasActiveFilters && (
        <Button
          variant="secondary"
          onClick={() =>
            onFilterChange({
              status: "",
              priority: "",
              searchTerm: "",
              sortBy: "dueDate",
            })
          }
          className="w-full"
        >
          <X className="w-4 h-4 mr-2" />
          Clear Filters
        </Button>
      )}
    </Card>
  )
}
