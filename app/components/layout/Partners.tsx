"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

const partners = [
    {
        name: "PancakeSwap",
        logo: "/images/pancakeswap.png", // We will use a placeholder or text if image missing
        url: "https://pancakeswap.finance",
        color: "#00E5FF", // Cyan
    },
    {
        name: "LeveX",
        logo: "/images/levex.png",
        url: "#",
        color: "#fff",
    },
    {
        name: "Binance",
        logo: "/images/binance.png",
        url: "#",
        color: "#F3BA2F",
    }
];

export function Partners() {
    return (
        <section className="relative py-24 px-4 overflow-hidden border-t border-white/5">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold font-heading uppercase tracking-tighter text-white mb-16 text-center">
                    Listed <span className="text-gray-500">Exchanges</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {partners.map((partner, index) => (
                        <motion.a
                            key={index}
                            href={partner.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative h-64 bg-[#0A0A0A] border border-white/10 rounded-xl overflow-hidden flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-colors"
                        >
                            {/* Hover Glow */}
                            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Corner Decoration (Subtle) */}
                            <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-white/10 group-hover:bg-primary transition-colors" />

                            {/* Logo/Text */}
                            <div className="relative z-10 text-center">
                                <h3
                                    className="text-2xl font-bold font-heading tracking-widest uppercase transition-transform group-hover:scale-110"
                                    style={{ color: partner.color }}
                                >
                                    {partner.name}
                                </h3>
                            </div>

                            {/* Arrow */}
                            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                                <ArrowUpRight className="text-white/50 w-6 h-6" />
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
}
