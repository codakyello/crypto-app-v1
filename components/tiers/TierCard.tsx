"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Lock } from "lucide-react";

export interface TierData {
    id: number;
    name: string;
    title: string;
    requirement: string;
    requirementValue: string;
    tagline: string;
    description: string;
    benefits: string[];
    color: "entry" | "influence" | "power" | "legacy";
}

const tierColors = {
    entry: {
        badge: "bg-gradient-to-r from-amber-500 to-yellow-400 text-black",
        border: "border-amber-500/30 hover:border-amber-500",
        glow: "hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]",
        accent: "text-amber-400",
        activeBorder: "border-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.3)]",
    },
    influence: {
        badge: "bg-gradient-to-r from-orange-600 to-amber-700 text-white",
        border: "border-orange-500/30 hover:border-orange-500",
        glow: "hover:shadow-[0_0_30px_rgba(249,115,22,0.15)]",
        accent: "text-orange-500",
        activeBorder: "border-orange-500 shadow-[0_0_30px_rgba(249,115,22,0.3)]",
    },
    power: {
        badge: "bg-gradient-to-r from-gray-400 to-gray-300 text-black",
        border: "border-gray-400/30 hover:border-gray-400",
        glow: "hover:shadow-[0_0_30px_rgba(156,163,175,0.15)]",
        accent: "text-gray-300",
        activeBorder: "border-gray-300 shadow-[0_0_30px_rgba(255,255,255,0.2)]",
    },
    legacy: {
        badge: "bg-gradient-to-r from-red-900 to-red-600 text-white",
        border: "border-red-600/30 hover:border-red-600",
        glow: "hover:shadow-[0_0_30px_rgba(220,38,38,0.2)]",
        accent: "text-red-600",
        activeBorder: "border-red-600 shadow-[0_0_30px_rgba(220,38,38,0.4)]",
    },
};

interface TierCardProps {
    tier: TierData;
    onSelect?: (tier: TierData) => void;
    isCompact?: boolean;
    status?: 'locked' | 'active' | 'unlocked';
}

export function TierCard({ tier, onSelect, isCompact = false, status = 'unlocked' }: TierCardProps) {
    const colors = tierColors[tier.color];
    const isLocked = status === 'locked';
    const isActive = status === 'active';

    return (
        <div
            className={cn(
                "relative group rounded-xl bg-[#0A0A0A] border transition-all duration-300 cursor-pointer overflow-hidden flex flex-col h-full",
                isActive ? colors.activeBorder : "border-white/10 hover:border-white/20", // Neutral border unless active
                !isLocked && !isActive && "hover:border-opacity-100",
                isCompact ? "p-4" : "p-5",
                isLocked ? "opacity-60 grayscale hover:opacity-80 hover:grayscale-0" : "opacity-100",
                isActive && "ring-1 ring-white/10 bg-white/[0.02]" // Subtle highlight for active
            )}
            onClick={() => onSelect?.(tier)}
        >
            {isActive && (
                <div className="absolute top-0 inset-x-0 h-1 bg-linear-to-r from-transparent via-white/50 to-transparent opacity-50" />
            )}

            {/* Badge Header */}
            <div className="mb-4 flex justify-between items-center">
                <div
                    className={cn(
                        "px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded-md border bg-opacity-10 backdrop-blur-md",
                        tier.color === 'entry' && "border-amber-500/30 text-amber-400 bg-amber-500/10",
                        tier.color === 'influence' && "border-red-500/30 text-red-500 bg-red-500/10",
                        tier.color === 'power' && "border-white/30 text-white bg-white/10",
                        tier.color === 'legacy' && "border-amber-600/30 text-amber-600 bg-amber-600/10",
                    )}
                >
                    {tier.name}
                </div>

                {isLocked && <Lock className="w-3 h-3 text-white/20" />}
                {isActive && <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />}
            </div>

            {/* Requirement */}
            <p className="text-xs text-gray-500 mb-1 font-mono tracking-tight uppercase">
                Minimum Holding
            </p>
            <p className="text-sm font-semibold text-white mb-4">
                {tier.requirement}
            </p>

            {/* Title */}
            <h3 className="text-lg font-bold text-white mb-2 leading-tight min-h-[56px] flex items-center">{tier.title}</h3>

            {/* Description - only show in non-compact mode */}
            {!isCompact && (
                <p className="text-sm text-gray-400 mb-6 leading-relaxed line-clamp-3">{tier.description}</p>
            )}

            {/* Benefits Preview */}
            {!isCompact && (
                <ul className="space-y-2 mb-6 grow">
                    {tier.benefits.slice(0, 3).map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-gray-300">
                            <Check className={cn("w-3.5 h-3.5 mt-0.5 shrink-0 opacity-80", colors.accent)} />
                            <span className="line-clamp-2">{benefit}</span>
                        </li>
                    ))}
                </ul>
            )}

            {/* Actions */}
            <div className="flex gap-2 mt-auto pt-4 border-t border-white/5">
                <Button
                    variant="outline"
                    size="sm"
                    className="h-9 text-xs text-gray-400 border-white/10 hover:border-white/20 hover:text-white w-full hover:bg-white/5"
                >
                    View Details
                </Button>
            </div>
        </div>
    );
}
