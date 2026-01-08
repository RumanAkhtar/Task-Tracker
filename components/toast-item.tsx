"use client"

import { useState } from "react"
import type { Toast } from "@/hooks/use-toast"
import { X, Check, AlertCircle, Info } from "lucide-react"

interface ToastItemProps {
  toast: Toast
  onRemove: (id: string) => void
}

export default function ToastItem({ toast, onRemove }: ToastItemProps) {
  const [isExiting, setIsExiting] = useState(false)

  const handleClose = () => {
    setIsExiting(true)
    setTimeout(() => {
      onRemove(toast.id)
    }, 300)
  }

  const icons = {
    success: <Check className="w-5 h-5" />,
    error: <AlertCircle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />,
  }

  const variantClasses = {
    success: "bg-success/20 border-success/50 text-success",
    error: "bg-destructive/20 border-destructive/50 text-destructive",
    info: "bg-primary/20 border-primary/50 text-primary",
  }

  return (
    <div
      className={`pointer-events-auto card-glass border ${variantClasses[toast.variant]} flex items-start gap-3 min-w-80 max-w-md animate-slide-in ${
        isExiting ? "animate-slide-up opacity-0" : ""
      }`}
    >
      <div className="flex-shrink-0 mt-0.5">{icons[toast.variant]}</div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-sm">{toast.title}</h3>
        {toast.description && <p className="text-xs text-muted-foreground mt-1">{toast.description}</p>}
      </div>
      <button
        onClick={handleClose}
        className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-all duration-300 ease-out"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
