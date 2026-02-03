"use client";

import { useEffect, useState, useCallback } from "react";
import { useMotionValue, useMotionTemplate, useSpring, motion, AnimatePresence } from "framer-motion";

interface Ripple {
    id: number;
    x: number;
    y: number;
}

export default function GeometricBackground() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Primary spotlight - follows cursor closely
    const smoothX = useSpring(mouseX, { stiffness: 200, damping: 30, mass: 0.5 });
    const smoothY = useSpring(mouseY, { stiffness: 200, damping: 30, mass: 0.5 });

    // Secondary aura - trails behind with more delay (larger, more diffuse)
    const auraX = useSpring(mouseX, { stiffness: 80, damping: 40, mass: 1.2 });
    const auraY = useSpring(mouseY, { stiffness: 80, damping: 40, mass: 1.2 });

    // Click ripples
    const [ripples, setRipples] = useState<Ripple[]>([]);

    useEffect(() => {
        const handleMouseMove = ({ clientX, clientY }: MouseEvent) => {
            mouseX.set(clientX);
            mouseY.set(clientY);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    // Click ripple handler - ignore clicks on interactive elements to avoid performance issues
    const handleClick = useCallback((e: MouseEvent) => {
        const target = e.target as HTMLElement;
        // Skip ripple for interactive elements to avoid blocking UI
        if (target.closest('button, a, nav, [role="button"], input, select, textarea')) {
            return;
        }
        const newRipple: Ripple = {
            id: Date.now(),
            x: e.clientX,
            y: e.clientY,
        };
        setRipples(prev => [...prev, newRipple]);
        // Remove ripple after animation
        setTimeout(() => {
            setRipples(prev => prev.filter(r => r.id !== newRipple.id));
        }, 1500);
    }, []);

    useEffect(() => {
        window.addEventListener("click", handleClick);
        return () => window.removeEventListener("click", handleClick);
    }, [handleClick]);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none font-sans overflow-hidden">
            {/* Deep Black Background */}
            <div className="absolute inset-0 bg-black" />

            {/* Subtle Noise/Grain Texture */}
            <div
                className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Base Grid (Subtle, always visible) */}
            <div
                className="absolute inset-0 opacity-[0.12]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23444' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
            />

            {/* Ambient Pulse Layer (Breathing animation) */}
            <motion.div
                className="absolute inset-0 opacity-[0.08]"
                animate={{
                    opacity: [0.05, 0.12, 0.05],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23F97316' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
            />

            {/* Secondary Aura (Large, diffuse, trails behind) */}
            <motion.div
                className="absolute inset-0"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23F97316' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    maskImage: useMotionTemplate`radial-gradient(600px circle at ${auraX}px ${auraY}px, black 0%, transparent 70%)`,
                    WebkitMaskImage: useMotionTemplate`radial-gradient(600px circle at ${auraX}px ${auraY}px, black 0%, transparent 70%)`,
                }}
            />

            {/* Primary Spotlight (Tight, vibrant, follows cursor) */}
            <motion.div
                className="absolute inset-0"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23F97316' fill-opacity='0.9'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    maskImage: useMotionTemplate`radial-gradient(350px circle at ${smoothX}px ${smoothY}px, black 0%, transparent 75%)`,
                    WebkitMaskImage: useMotionTemplate`radial-gradient(350px circle at ${smoothX}px ${smoothY}px, black 0%, transparent 75%)`,
                }}
            />

            {/* Click Ripples */}
            <AnimatePresence>
                {ripples.map((ripple) => (
                    <motion.div
                        key={ripple.id}
                        className="absolute rounded-full border-2 border-primary/60 pointer-events-none"
                        style={{
                            left: ripple.x,
                            top: ripple.y,
                            x: "-50%",
                            y: "-50%",
                        }}
                        initial={{ width: 0, height: 0, opacity: 0.8 }}
                        animate={{ width: 400, height: 400, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                    />
                ))}
            </AnimatePresence>

            {/* Large Geometric Lines (Triangles) - Kept Subtle */}
            <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#F97316', stopOpacity: 0 }} />
                        <stop offset="50%" style={{ stopColor: '#F97316', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: '#F97316', stopOpacity: 0 }} />
                    </linearGradient>
                </defs>
                <line x1="0" y1="100%" x2="50%" y2="0" stroke="url(#grad1)" strokeWidth="1" />
                <line x1="100%" y1="100%" x2="50%" y2="0" stroke="url(#grad1)" strokeWidth="1" />
            </svg>

            {/* Radial Vignette to focus center */}
            <div className="absolute inset-0 bg-radial-[circle_at_center_transparent_0%,_#000000_90%]" />
        </div>
    );
}
