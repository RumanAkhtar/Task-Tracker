import * as React from "react"

import { cn } from "@/lib/utils"

interface InputProps extends React.ComponentProps<"input"> {
  label?: string
  error?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, label, error, ...props }, ref) => (
  <div className="w-full">
    {label && <label className="block text-sm font-medium text-foreground mb-2">{label}</label>}
    <input
      ref={ref}
      type={type}
      data-slot="input"
      className={cn("input-field", error ? "border-destructive focus:ring-destructive/20" : "", className)}
      {...props}
    />
    {error && <p className="text-destructive text-xs mt-1">{error}</p>}
  </div>
))
Input.displayName = "Input"

export { Input }
