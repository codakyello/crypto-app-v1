"use strict";
import * as React from "react"
import { cn } from "@/app/lib/utils"

interface SliderProps {
    min?: number;
    max?: number;
    step?: number;
    value: [number, number];
    onValueChange: (value: [number, number]) => void;
    className?: string;
    defaultValue?: [number, number]; // Ignored in controlled mode
}

// Simple Dual Slider is complex in pure HTML/React without Libs.
// We will implement a simple Single Value slider for Max Price for now to avoid complexity, 
// or two inputs. Let's do a single "Max Price" slider for simplicity in this mock.

// Actually, let's just make it a standard range input for Max Price.
// The sidebar expects [min, max], so we'll adapt.

export function Slider({ value, onValueChange, max = 100, step = 1, className }: SliderProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVal = Number(e.target.value);
        // Assuming we are changing the UPPER bound
        onValueChange([value[0], newVal]);
    };

    return (
        <div className={cn("relative flex w-full touch-none select-none items-center", className)}>
            <input
                type="range"
                min={0}
                max={max}
                step={step}
                value={value[1]}
                onChange={handleChange}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
            />
        </div>
    )
}
