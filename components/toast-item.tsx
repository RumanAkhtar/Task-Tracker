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
    success: <Check className="w-5 h-5" aria-hidden="true" />,
    error: <AlertCircle className="w-5 h-5" aria-hidden="true" />,
    info: <Info className="w-5 h-5" aria-hidden="true" />,
  }

  const variantClasses = {
    success: "bg-success/20 border-success/50 text-success",
    error: "bg-destructive/20 border-destructive/50 text-destructive",
    info: "bg-primary/20 border-primary/50 text-primary",
  }

  return (
    <div
      role="alert"
      className={`pointer-events-auto card-glass border ${
        variantClasses[toast.variant]
      } flex min-w-80 max-w-md items-start gap-3 animate-slide-in ${
        isExiting ? "animate-slide-up opacity-0" : ""
      }`}
    >
      <div className="mt-0.5 shrink-0">
        {icons[toast.variant]}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-semibold">{toast.title}</h3>
        {toast.description && (
          <p className="mt-1 text-xs text-muted-foreground">
            {toast.description}
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={handleClose}
        aria-label="Close notification"
        title="Close notification"
        className="shrink-0 text-muted-foreground transition hover:text-foreground"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  )
}
