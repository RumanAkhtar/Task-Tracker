export type TaskStatus = "Pending" | "Completed"
export type TaskPriority = "Low" | "Medium" | "High"
export type TaskSortBy = "dueDate" | "priority" | "createdAt"

export interface Task {
  _id: string
  title: string
  description?: string
  status: TaskStatus
  priority: TaskPriority
  dueDate: string
  createdAt: string
}

/* ✅ DTO used by the form + POST API */
export interface CreateTaskDTO {
  title: string
  description?: string
  priority: TaskPriority
  dueDate: string
  status: TaskStatus
}

/* Filters */
export interface TaskFilters {
  status?: TaskStatus
  priority?: TaskPriority
  sortBy: TaskSortBy
  search?: string
}
