"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/app/lib/utils";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { AlphaConnectButton } from "@/app/components/layout/AlphaConnectButton";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Explore", href: "/explore" },
    { name: "Tiers", href: "/tiers" },
    { name: "Dashboard", href: "/dashboard" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex justify-center pt-6 px-4">
      {/* Floating Pill Container */}
      <nav className="flex items-center justify-between w-full max-w-6xl px-5 py-2 bg-white/10 backdrop-blur-xl border border-white/10 rounded-full shadow-lg shadow-black/20 transition-all duration-300">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-tighter text-white font-heading uppercase leading-none shrink-0 pt-1">
          ALPHA<span className="text-primary">PRIDE</span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6 ml-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === item.href ? "text-primary" : "text-white/90 hover:text-white"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block ml-4">
          <AlphaConnectButton />
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center justify-center rounded-xl p-2 text-gray-400 hover:bg-white/10 hover:text-white focus:outline-none"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-100 bg-[#050505] flex flex-col justify-center items-center animate-in fade-in duration-200">
          {/* Background Pattern */}
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23F97316' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          <div className="absolute top-6 right-6 z-10">
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <X className="h-8 w-8" />
            </button>
          </div>

          <div className="relative z-10 flex flex-col items-center space-y-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-5xl font-bold font-heading uppercase tracking-wider transition-all duration-300",
                  pathname === item.href
                    ? "text-primary scale-110"
                    : "text-white/80 hover:text-primary hover:scale-105"
                )}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            <div className="mt-8 transform scale-125">
              <AlphaConnectButton isMobile />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
