"use client"

import React, { createContext, useState, useCallback, type ReactNode } from "react"
import type { Toast } from "@/hooks/use-toast"
import ToastContainer from "./toast-container"

export const ToastContext = createContext<{
  addToast: (toast: Omit<Toast, "id">) => string
  removeToast: (id: string) => void
} | null>(null)

export const useToast = () => {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within ToastProvider")
  }
  return context
}

export default function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast = { ...toast, id, duration: toast.duration || 3000 }

    setToasts((prev) => [...prev, newToast])

    if (newToast.duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, newToast.duration)
    }

    return id
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  )
}
