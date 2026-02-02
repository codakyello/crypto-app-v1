"use strict";
import * as React from "react"
import { cn } from "@/app/lib/utils"
// Simplified check box without Radix UI for now to avoid dependency issues
// Logic handled by parent state

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    onCheckedChange?: (checked: boolean) => void;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
    ({ className, onCheckedChange, ...props }, ref) => (
        <input
            type="checkbox"
            ref={ref}
            className={cn(
                "h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 accent-primary bg-black/50",
                className
            )}
            onChange={(e) => onCheckedChange?.(e.target.checked)}
            {...props}
        />
    )
)
Checkbox.displayName = "Checkbox"

export { Checkbox }
