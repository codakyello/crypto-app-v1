"use client";

import { useState } from "react";
import { TierCard } from "@/components/tiers/TierCard";
import { TierData } from "@/components/tiers/TierCard";
import { tiers } from "@/app/data/tiers";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Shield, Star, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAlphaTier } from "@/app/hooks/useAlphaTier";

const tierIcons = {
    entry: Star,
    influence: Zap,
    power: Shield,
    legacy: Crown,
};

const tierColors = {
    entry: {
        badge: "bg-gradient-to-r from-amber-500 to-yellow-400 text-black",
        accent: "text-amber-400",
        icon: "text-amber-400",
    },
    influence: {
        badge: "bg-gradient-to-r from-orange-600 to-amber-700 text-white",
        accent: "text-orange-500",
        icon: "text-orange-500",
    },
    power: {
        badge: "bg-gradient-to-r from-gray-400 to-gray-300 text-black",
        accent: "text-gray-300",
        icon: "text-gray-300",
    },
    legacy: {
        badge: "bg-gradient-to-r from-red-900 to-red-600 text-white",
        accent: "text-red-600",
        icon: "text-red-600",
    },
};

export default function TiersPage() {
    const [selectedTier, setSelectedTier] = useState<TierData | null>(null);
    const { currentTier, isConnected } = useAlphaTier();

    // Map tier name to ID for comparison
    const getStatus = (tierName: string) => {
        if (!isConnected) return 'locked';

        // Define hierarchy
        const hierarchy = ['Entry', 'Influence', 'Power', 'Legacy'];
        const currentIdx = currentTier ? hierarchy.indexOf(currentTier.charAt(0).toUpperCase() + currentTier.slice(1)) : -1;
        const tierIdx = hierarchy.indexOf(tierName);

        if (currentIdx === tierIdx) return 'active';
        if (currentIdx > tierIdx) return 'unlocked';
        return 'locked';
    };

    return (
        <div className="min-h-screen bg-[#050505]">
            {/* Hero Section ... */}
            {/* Hero Section ... */}
            <section className="relative spacing-section spacing-container overflow-hidden">
                {/* ... */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />

                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <h1 className="text-fluid-h1 font-bold tracking-tighter mb-8 font-heading uppercase leading-none">
                        <span className="text-white">ACCESS IS</span>{" "}
                        <span className="text-primary text-glow">POWER</span>
                    </h1>
                    <p className="text-fluid-body text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        $ALPHA transforms holdings into access. Your tier determines your level of
                        influence, community, and opportunities.
                    </p>

                    {/* Status Indicator */}
                    {isConnected && currentTier && (
                        <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                            <span className="text-gray-400 text-sm">Current Status:</span>
                            <span className="text-primary font-bold uppercase">{currentTier}</span>
                        </div>
                    )}
                </div>
            </section>

            {/* Tier Cards Grid */}
            <section className="spacing-container pb-24">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {tiers.map((tier) => (
                            <TierCard
                                key={tier.id}
                                tier={tier}
                                onSelect={setSelectedTier}
                                status={getStatus(tier.name)}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Exclusive Access Section */}
            <section className="relative spacing-container pb-24">
                <div className="max-w-7xl mx-auto">
                    <div className="relative rounded-3xl overflow-hidden border border-white/10 group">
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
                        <img
                            src="/images/alpha-founders-dinner.png"
                            alt="Alpha Founders Dinner"
                            className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute bottom-0 left-0 p-8 md:p-12 z-20 max-w-2xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest mb-6">
                                <Crown className="w-3 h-3" />
                                Legacy Tier Exclusive
                            </div>
                            <h2 className="text-fluid-h2 font-heading font-bold text-white mb-4 leading-none">
                                Alpha Founders Dinner
                            </h2>
                            <p className="text-fluid-body text-gray-300 mb-8">
                                An annual exclusive gathering for Legacy tier members. Connect with fellow visionaries, industry leaders, and the core team in an intimate, high-end setting.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Unlock Your Tier CTA */}
            <section className="relative spacing-section spacing-container flex justify-center">
                <div data-v-7713af15="" className="content max-w-4xl w-full bg-[#181310] p-6 md:p-12 rounded-3xl border border-white/5 text-center shadow-2xl">
                    <h3 data-v-7713af15="" className="font-heading text-fluid-h2 uppercase font-bold text-white mb-6 tracking-tighter">
                        Unlock Your Tier
                    </h3>
                    <p data-v-7713af15="" className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                        Connect your wallet to validate your $ALPHA holdings and gain instant access to your tier level and exclusive community.
                    </p>
                    <a
                        data-v-7713af15=""
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary shadow hover:bg-primary/90 h-10 px-5 text-background font-bold text-base"
                        type="button"
                        href="https://guild.xyz/alphapride"
                        target="_blank"
                    >
                        Verify & Access
                    </a>
                </div>
            </section>

            {/* Tier Detail Modal */}
            <Dialog open={!!selectedTier} onOpenChange={() => setSelectedTier(null)}>
                <DialogContent className="sm:max-w-lg bg-[#0A0A0A] border-white/10 max-h-[85vh] overflow-y-auto">
                    {selectedTier && (
                        <>
                            <DialogHeader className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className={cn(
                                        "px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded-md border bg-opacity-10 w-fit",
                                        selectedTier.color === 'entry' && "border-amber-500/30 text-amber-400 bg-amber-500/10",
                                        selectedTier.color === 'influence' && "border-red-500/30 text-red-500 bg-red-500/10",
                                        selectedTier.color === 'power' && "border-white/30 text-white bg-white/10",
                                        selectedTier.color === 'legacy' && "border-amber-600/30 text-amber-600 bg-amber-600/10",
                                    )}>
                                        {selectedTier.name}
                                    </div>
                                </div>

                                <DialogTitle className="text-3xl font-bold text-white font-heading uppercase tracking-wide leading-none">
                                    {selectedTier.title}
                                </DialogTitle>
                                <div className="flex items-center gap-2 pt-2 pb-4 border-b border-white/10">
                                    <span className="text-xs text-gray-500 uppercase font-mono">Requirement:</span>
                                    <span className="text-lg font-bold text-primary">{selectedTier.requirement}</span>
                                </div>
                            </DialogHeader>

                            <div className="mt-4">
                                <p className="text-gray-400 leading-relaxed mb-6">
                                    {selectedTier.description}
                                </p>

                                <h4 className="text-white font-semibold mb-4">Benefits</h4>
                                <ul className="space-y-3">
                                    {selectedTier.benefits.map((benefit, i) => (
                                        <li key={i} className="flex items-start gap-3 text-gray-300 text-sm">
                                            <Check
                                                className={cn(
                                                    "w-4 h-4 mt-0.5 shrink-0",
                                                    tierColors[selectedTier.color].accent
                                                )}
                                            />
                                            <span>{benefit}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Button className="w-full mt-8 py-6 text-base font-bold bg-primary text-black hover:bg-primary/90 shadow-[0_0_20px_rgba(247,147,26,0.2)]">
                                    Join Now
                                </Button>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
