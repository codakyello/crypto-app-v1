"use client";

import { useAccount, useBalance } from "wagmi";
import { formatUnits } from "viem";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { AlphaConnectButton } from "@/app/components/layout/AlphaConnectButton";
import { QrCode, Clock, Wallet, ArrowRight, Loader2, Trophy, TrendingUp, History, CreditCard } from "lucide-react";
import Link from "next/link";
import { services } from "@/app/data/mock-services";
import { useEffect, useState } from "react";
import { useAlphaTier } from "@/app/hooks/useAlphaTier";
import { cn } from "@/app/lib/utils";
import { TIER_IDS } from "@/app/lib/constants";

export default function DashboardPage() {
  const { isConnected, address } = useAccount();
  const { data: balance, isLoading: isBalanceLoading } = useBalance({
    address: address,
  });

  const { currentTier, nextTier, progress, requiredForNext } = useAlphaTier();

  // Hydration fix
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return null;

  if (!isConnected) {
    return (
      <div className="min-h-screen pt-32 pb-12 px-4 flex flex-col items-center justify-center text-center">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full" />
          <div className="relative z-10 w-24 h-24 bg-[#111] rounded-3xl border border-white/10 flex items-center justify-center text-primary shadow-2xl">
            <Wallet className="w-10 h-10" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-heading tracking-tight">Access Restricted</h1>
        <p className="text-gray-400 max-w-md mx-auto mb-8 text-lg">
          Connect your wallet to access the Alpha Member Dashboard your assets.
        </p>
        <div className="scale-110">
          <AlphaConnectButton />
        </div>
      </div>
    );
  }

  // Mock Active Passes
  const activePasses = [
    {
      id: "pass-1",
      service: services[0], // Alpha Grand Hotel
      date: "2026-02-15",
      status: "Active",
      type: "Hotel Stay"
    },
    {
      id: "pass-2",
      service: services[3], // Founders Dinner
      date: "2026-03-01",
      status: "Confirmed",
      type: "Exclusive Event"
    }
  ];

  // Mock Transactions
  const transactions = [
    { id: 1, type: "Redemption", item: "Alpha Grand Hotel", amount: -500, date: "2 mins ago" },
    { id: 2, type: "Deposit", item: "Wallet Transfer", amount: +2500, date: "1 day ago" },
    { id: 3, type: "Redemption", item: "Skyline VIP Lounge", amount: -50, date: "3 days ago" },
  ];

  return (
    <div className="min-h-screen pt-28 pb-20 spacing-container max-w-[1400px] mx-auto">

      {/* Header Row */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 border-b border-white/5 pb-8">
        <div className="w-full md:w-auto">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-primary/10 text-primary border border-primary/20">
              Verified Member
            </span>
            <span className="text-xs text-gray-500 font-mono">{address?.slice(0, 6)}...{address?.slice(-4)}</span>
          </div>
          <h1 className="text-fluid-h1 font-bold text-white font-heading uppercase tracking-tighter leading-none">
            Command Center
          </h1>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="h-10 border-white/10 text-gray-300 hover:text-white hover:bg-white/5">
            <History className="w-4 h-4 mr-2" /> Activity
          </Button>
          <Button className="h-10 bg-primary text-black font-bold hover:bg-primary/90">
            <TrendingUp className="w-4 h-4 mr-2" /> Top Up
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* LEFT COLUMN - STATS & ASSETS (8/12) */}
        <div className="lg:col-span-8 space-y-8">

          {/* Net Worth / Stats Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-[#111] border-white/10 relative overflow-hidden group">
              <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent pointer-events-none" />
              <CardContent className="p-8">
                <p className="text-sm text-gray-400 font-medium uppercase tracking-wider mb-2">Total Balance</p>
                <div className="flex items-baseline gap-1">
                  <div className="text-fluid-h2 font-bold text-white leading-none">
                    {isBalanceLoading || !balance ? (
                      <span className="animate-pulse">---</span>
                    ) : (
                      parseFloat(formatUnits(balance.value, balance.decimals)).toLocaleString(undefined, { maximumFractionDigits: 2 })
                    )}
                  </div>
                  <span className="text-primary font-bold">ALPHA</span>
                </div>
                <div className="mt-4 flex items-center gap-2 text-green-400 text-sm">
                  <TrendingUp className="w-4 h-4" />
                  <span>+12.5% this month</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#111] border-white/10 relative overflow-hidden flex flex-col justify-center">
              <CardContent className="p-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-400 font-medium uppercase tracking-wider">Current Status</span>
                  <Trophy className={cn("w-5 h-5", currentTier === TIER_IDS.LEGACY ? "text-amber-500" : "text-primary")} />
                </div>
                <div className="text-3xl font-bold text-white uppercase font-heading tracking-wide mb-4">
                  {currentTier || "Entry"} Tier
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Progress to {nextTier}</span>
                    <span>{progress.toFixed(0)}%</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Active Passes Section */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white font-heading">Active Passes</h2>
              <Button variant="link" className="text-primary">View All</Button>
            </div>

            <div className="space-y-4">
              {activePasses.map(pass => (
                <div key={pass.id} className="relative bg-[#0F0F0F] rounded-2xl border border-white/5 overflow-hidden flex flex-col md:flex-row shadow-lg transition-transform hover:scale-[1.01] hover:border-primary/20 group">
                  {/* Metallic Shine Effect */}
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none" />

                  {/* Left: Visual */}
                  <div className="w-full md:w-32 bg-gray-800 relative">
                    <img src={pass.service.image} alt="" className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-500" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <QrCode className="w-12 h-12 text-white opacity-80" />
                    </div>
                  </div>

                  {/* Middle: Info */}
                  <div className="p-6 grow flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/5 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/5 to-transparent">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-white/10 text-white border border-white/10">
                        {pass.type}
                      </span>
                      <span className="text-green-500 text-xs font-bold uppercase flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" /> {pass.status}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">{pass.service.name}</h3>
                    <p className="text-gray-400 text-sm flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5" /> Valid until {pass.date}
                    </p>
                  </div>

                  {/* Right: Actions */}
                  <div className="p-6 md:w-56 flex flex-col justify-center gap-3 bg-[#0a0a0a]">
                    <Button className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/10">
                      View Ticket
                    </Button>
                    <Button variant="ghost" className="w-full h-10 text-xs font-bold text-gray-500 hover:text-white hover:bg-white/5 uppercase tracking-wider whitespace-nowrap">
                      Add to Wallet
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN - ASIDE (4/12) */}
        <div className="lg:col-span-4 space-y-8">

          {/* Quick Actions */}
          <Card className="bg-[#111] border-white/10">
            <CardHeader>
              <CardTitle className="text-lg text-white font-bold uppercase tracking-wide">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              <Link href="/explore">
                <div className="aspect-square rounded-xl bg-white/5 border border-white/5 hover:bg-primary/20 hover:border-primary/50 transition-all flex flex-col items-center justify-center gap-3 cursor-pointer group">
                  <CreditCard className="w-8 h-8 text-gray-400 group-hover:text-primary transition-colors" />
                  <span className="text-xs font-bold text-gray-300 group-hover:text-white">Redeem</span>
                </div>
              </Link>
              <div className="aspect-square rounded-xl bg-white/5 border border-white/5 hover:bg-primary/20 hover:border-primary/50 transition-all flex flex-col items-center justify-center gap-3 cursor-pointer group">
                <TrendingUp className="w-8 h-8 text-gray-400 group-hover:text-primary transition-colors" />
                <span className="text-xs font-bold text-gray-300 group-hover:text-white">Top Up</span>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <div className="bg-[#0F0F0F] rounded-2xl border border-white/10 p-6">
            <h3 className="text-white font-bold mb-6 flex items-center justify-between">
              Recent Activity
              <span className="text-xs text-primary cursor-pointer">View All</span>
            </h3>

            <div className="space-y-6">
              {transactions.map(tx => (
                <div key={tx.id} className="flex items-center justify-between group cursor-pointer hover:bg-white/5 -mx-2 p-2 rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center text-lg",
                      tx.amount > 0 ? "bg-green-500/10 text-green-500" : "bg-white/5 text-white"
                    )}>
                      {tx.amount > 0 ? "+" : "-"}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white leading-tight">{tx.item}</p>
                      <p className="text-xs text-gray-500">{tx.date}</p>
                    </div>
                  </div>
                  <span className={cn(
                    "font-mono font-bold text-sm",
                    tx.amount > 0 ? "text-green-500" : "text-white"
                  )}>
                    {tx.amount > 0 ? "+" : ""}{tx.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
