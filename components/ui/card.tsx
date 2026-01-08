import * as React from "react"

import { cn } from "@/lib/utils"

interface CardProps extends React.ComponentProps<"div"> {
  glass?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className, glass = true, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="card"
    className={cn(glass ? "card-glass" : "bg-card border border-border rounded-xl p-6", className)}
    {...props}
  />
))
Card.displayName = "Card"

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-header" className={cn("flex flex-col gap-2 mb-4", className)} {...props} />
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-title" className={cn("text-xl font-bold text-foreground", className)} {...props} />
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-description" className={cn("text-muted-foreground text-sm", className)} {...props} />
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-content" className={cn("", className)} {...props} />
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center gap-2 mt-4 pt-4 border-t border-border", className)}
      {...props}
    />
  )
}

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
