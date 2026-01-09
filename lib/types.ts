export type TaskStatus = "Pending" | "Completed"
export type TaskPriority = "Low" | "Medium" | "High"

export type TaskSortBy = "dueDate" | "priority" | "createdAt"

export interface TaskFilters {
  status?: TaskStatus
  priority?: TaskPriority
  sortBy: TaskSortBy
  search?: string
}
