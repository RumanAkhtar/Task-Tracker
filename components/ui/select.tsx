"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface SelectOption {
  label: string
  value: string
}

interface SelectProps extends Omit<React.ComponentProps<"select">, "children"> {
  label?: string
  error?: string
  options: SelectOption[]
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, ...props }, ref) => (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-foreground mb-2">{label}</label>}
      <div className="relative">
        <select
          ref={ref}
          className={cn(
            "input-field appearance-none pr-10 cursor-pointer",
            error ? "border-destructive focus:ring-destructive/20" : "",
            className,
          )}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
      </div>
      {error && <p className="text-destructive text-xs mt-1">{error}</p>}
    </div>
  ),
)
Select.displayName = "Select"

export { Select }
