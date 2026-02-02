import * as React from "react"
import { cn } from "@/app/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link" | "glass"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-xl text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 cursor-pointer active:scale-95",
          // Variants
          variant === "default" && "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_15px_rgba(255,153,0,0.4)] hover:shadow-[0_0_25px_rgba(255,153,0,0.6)]",
          variant === "outline" && "border border-primary text-primary hover:bg-primary hover:text-primary-foreground",
          variant === "ghost" && "hover:bg-white/10 text-white",
          variant === "glass" && "bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 hover:border-white/20",
          variant === "link" && "text-primary underline-offset-4 hover:underline",
          // Sizes
          size === "default" && "h-11 px-6 py-2",
          size === "sm" && "h-9 rounded-xl px-3",
          size === "lg" && "h-14 rounded-xl px-10 text-base",
          size === "icon" && "h-10 w-10",
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
