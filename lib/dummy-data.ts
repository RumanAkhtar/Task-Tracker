export interface Task {
  id: string
  title: string
  description?: string
  priority: "Low" | "Medium" | "High"
  status: "Pending" | "Completed"
  dueDate: string
  createdAt: string
}

export const DUMMY_TASKS: Task[] = [
  {
    id: "1",
    title: "Design new landing page",
    description: "Create modern, responsive landing page with glassmorphism effects",
    priority: "High",
    status: "Pending",
    dueDate: "2026-01-15",
    createdAt: "2026-01-08",
  },
  {
    id: "2",
    title: "Implement user authentication",
    description: "Add JWT-based auth with refresh tokens",
    priority: "High",
    status: "Completed",
    dueDate: "2026-01-12",
    createdAt: "2026-01-05",
  },
  {
    id: "3",
    title: "Setup database schema",
    description: "Create MongoDB collections with proper indexing",
    priority: "High",
    status: "Pending",
    dueDate: "2026-01-10",
    createdAt: "2026-01-06",
  },
  {
    id: "4",
    title: "Write API documentation",
    description: "Document all endpoints with examples and error codes",
    priority: "Medium",
    status: "Pending",
    dueDate: "2026-01-20",
    createdAt: "2026-01-08",
  },
  {
    id: "5",
    title: "Setup CI/CD pipeline",
    description: "Configure GitHub Actions for automated testing and deployment",
    priority: "Medium",
    status: "Pending",
    dueDate: "2026-01-18",
    createdAt: "2026-01-07",
  },
  {
    id: "6",
    title: "Create user profile component",
    description: "Build responsive profile page with edit functionality",
    priority: "Medium",
    status: "Completed",
    dueDate: "2026-01-11",
    createdAt: "2026-01-04",
  },
  {
    id: "7",
    title: "Optimize image loading",
    description: "Implement lazy loading and responsive images",
    priority: "Low",
    status: "Pending",
    dueDate: "2026-01-25",
    createdAt: "2026-01-08",
  },
  {
    id: "8",
    title: "Test responsive design",
    description: "Test app on various screen sizes and devices",
    priority: "Low",
    status: "Pending",
    dueDate: "2026-02-01",
    createdAt: "2026-01-06",
  },
]
