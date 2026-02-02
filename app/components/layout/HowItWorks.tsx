"use client";

import { motion } from "framer-motion";
import { Wallet, Coins, Crown, Plane } from "lucide-react";
import { Button } from "@/app/components/ui/button";

const steps = [
    {
        icon: Wallet,
        title: "Connect Your Wallet",
        description: "Link your Web3 wallet to creating your identity on the blockchain. No registration forms, just seamless access.",
        action: "Connect Now",
    },
    {
        icon: Coins,
        title: "Acquire $ALPHA",
        description: "$ALPHA is your key to the city. Purchase tokens on our partner exchanges to build your portfolio.",
        action: "Buy $ALPHA",
    },
    {
        icon: Crown,
        title: "Prove Your Status",
        description: "Your holdings determine your tier. Simply holding $ALPHA automatically verifies your Entry, Influence, Power, or Legacy status.",
        action: "View Tiers",
    },
    {
        icon: Plane,
        title: "Access the Extraordinary",
        description: "Unlock gates to exclusive events, luxury concierge services, and high-network opportunities.",
        action: "Explore Services",
    },
];

export function HowItWorks() {
    return (
        <section className="relative py-32 px-4 overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    {/* Left: Sticky Header */}
                    <div className="lg:sticky lg:top-32">
                        <h2 className="text-5xl md:text-6xl font-bold font-heading uppercase tracking-tighter text-white mb-6 leading-[1.0]">
                            Your Journey <br />
                            <span className="text-primary text-glow">Starts Here</span>
                        </h2>
                        <p className="text-gray-200 text-base md:text-lg max-w-md leading-relaxed mb-8">
                            Joining the Alpha Pride is a seamless transition into a world of exclusive access. Follow these simple steps to claim your place.
                        </p>
                        <Button className="rounded-xl px-5 h-10 text-sm font-semibold shadow-[0_0_20px_rgba(247,147,26,0.3)] hover:shadow-[0_0_30px_rgba(247,147,26,0.5)] transition-all">
                            Get Started
                        </Button>
                    </div>

                    {/* Right: Vertical Timeline */}
                    <div className="relative space-y-16 pl-8 border-l border-white/10">
                        {steps.map((step, index) => (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                key={index}
                                className="relative"
                            >
                                {/* Timeline Node */}
                                <div className="absolute -left-[41px] top-0 flex items-center justify-center w-5 h-5 bg-[#0A0A0A] border border-primary/50 shadow-[0_0_15px_rgba(247,147,26,0.5)] rotate-45 z-10">
                                    <div className="w-2 h-2 bg-primary" />
                                </div>

                                {/* Content */}
                                <div className="relative -top-2">
                                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-primary mb-4 border border-white/10">
                                        <step.icon className="w-5 h-5" />
                                    </div>

                                    <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                                    <p className="text-gray-300 mb-4 leading-relaxed max-w-sm text-sm">
                                        {step.description}
                                    </p>

                                    <Button variant="outline" size="sm" className="text-primary border-primary/30 hover:bg-primary/10 hover:text-primary h-8 text-xs font-semibold tracking-wider uppercase">
                                        {step.action}
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
