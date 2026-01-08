"use client"

import { useState, useCallback } from "react"

export interface Toast {
  id: string
  title: string
  description?: string
  variant: "success" | "error" | "info"
  duration?: number
}

export const useToast = () => {
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

  return { toasts, addToast, removeToast }
}

export const ToastContext = React.createContext<ReturnType<typeof useToast> | null>(null)

import React from "react"
