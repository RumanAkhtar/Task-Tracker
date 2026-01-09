Task Tracker Web Application

A modern, full-stack Task Tracker built with Next.js (App Router), MongoDB, and TypeScript.
The app allows users to create, update, filter, and delete tasks with a smooth animated UI and a scalable backend architecture.

🚀 Features

✅ Create, update, and delete tasks (Full CRUD)

🔄 Update task status (Pending / Completed)

🔍 Filter & search tasks by status, priority, and text

📊 Task overview with completion statistics

🎨 Smooth animations using Framer Motion

🌐 MongoDB Atlas integration

🧱 Scalable Next.js App Router architecture

♿ Accessible & keyboard-friendly UI

💡 Fully typed with TypeScript

🛠 Tech Stack
Frontend

Next.js 14 (App Router)

React

TypeScript

Tailwind CSS

Framer Motion

Lucide Icons

Backend

Next.js API Routes (Route Handlers)

MongoDB Atlas

Mongoose

Tooling

pnpm

ESLint

Prettier

Git

📁 Project Structure
task-tracker-web-application/
├── app/
│   ├── api/
│   │   └── tasks/
│   │       ├── route.ts        # GET, POST
│   │       └── [id]/route.ts   # PUT, DELETE
│   └── page.tsx                # Home page
├── components/
│   ├── task-form.tsx
│   ├── task-list.tsx
│   ├── task-card.tsx
│   └── task-filters.tsx
├── lib/
│   ├── mongodb.ts
│   └── types.ts
├── models/
│   └── Task.ts
├── .env.local
├── tsconfig.json
└── README.md

⚙️ Environment Variables

Create a .env.local file in the project root:

MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/tasktracker


⚠️ Never commit .env.local to GitHub.

📦 Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/your-username/task-tracker-web-application.git
cd task-tracker-web-application

2️⃣ Install Dependencies (pnpm)
pnpm install

3️⃣ Run the Development Server
pnpm dev


Open your browser at:

http://localhost:3000

🔌 API Endpoints
Get all tasks
GET /api/tasks

Create a task
POST /api/tasks

Update a task
PUT /api/tasks/:id

Delete a task
DELETE /api/tasks/:id

🧪 Example Task Schema
{
  _id: string
  title: string
  description?: string
  status: "Pending" | "Completed"
  priority: "Low" | "Medium" | "High"
  dueDate: string
  createdAt: string
}

♿ Accessibility

Buttons have explicit type attributes

Icon-only buttons include aria-label

Toast notifications use role="alert"

Fully keyboard navigable

📈 Future Improvements

🔐 Authentication (JWT / NextAuth)

⚡ React Query for caching & mutations

🌍 Server-side filtering & pagination

🧪 Unit & integration testing

🚀 Deployment on Vercel

👨‍💻 Developer

Ruman Akhtar
Full-Stack Developer (MERN & Next.js)

💼 Passionate about scalable web applications

🧠 Strong focus on clean architecture & TypeScript

🚀 Always learning and improving

