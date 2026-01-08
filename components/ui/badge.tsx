import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-lg px-3 py-1 text-xs font-semibold w-fit whitespace-nowrap shrink-0 gap-1 transition-all duration-300 ease-out",
  {
    variants: {
      variant: {
        primary: "bg-primary/20 text-primary border border-primary/30",
        secondary: "bg-secondary/20 text-secondary border border-secondary/30",
        success: "bg-success/20 text-success border border-success/30",
        warning: "bg-warning/20 text-warning border border-warning/30",
        danger: "bg-destructive/20 text-destructive border border-destructive/30",
        default: "bg-card text-foreground border border-border",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

interface BadgeProps extends React.ComponentProps<"span">, VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(({ className, variant, ...props }, ref) => (
  <span ref={ref} data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />
))
Badge.displayName = "Badge"

export { Badge, badgeVariants }
