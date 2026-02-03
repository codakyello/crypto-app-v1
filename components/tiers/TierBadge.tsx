import { cn } from "@/lib/utils";

interface TierBadgeProps {
    tier: string;
    name: string;
    className?: string;
}

export function TierBadge({ tier, name, className }: TierBadgeProps) {
    return (
        <div
            className={cn(
                "px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded-md border bg-opacity-10 backdrop-blur-md w-fit",
                tier === 'entry' && "border-amber-500/30 text-amber-500 bg-amber-500/10",
                tier === 'influence' && "border-orange-500/30 text-orange-500 bg-orange-500/10",
                tier === 'power' && "border-white/30 text-white bg-white/10",
                tier === 'legacy' && "border-red-600/30 text-red-600 bg-red-600/10",
                className
            )}
        >
            {name}
        </div>
    );
}
