"use client";

import { useAccount, useBalance } from "wagmi";
import { formatUnits } from "viem";
import { TIER_THRESHOLDS, TIER_IDS } from "@/app/lib/constants";

export type TierId = typeof TIER_IDS[keyof typeof TIER_IDS];

export function useAlphaTier() {
    const { address, isConnected } = useAccount();
    const { data: balanceData, isLoading } = useBalance({ address });

    // Default to 0 if not connected or loading
    const rawBalance = balanceData ? parseFloat(formatUnits(balanceData.value, balanceData.decimals)) : 0;

    // Determine Tier
    let currentTier: TierId | null = null;
    let nextTier: TierId | null = TIER_IDS.ENTRY;
    let progress = 0;
    let requiredForNext = TIER_THRESHOLDS.ENTRY;

    if (rawBalance >= TIER_THRESHOLDS.LEGACY) {
        currentTier = TIER_IDS.LEGACY;
        nextTier = null;
        progress = 100;
    } else if (rawBalance >= TIER_THRESHOLDS.POWER) {
        currentTier = TIER_IDS.POWER;
        nextTier = TIER_IDS.LEGACY;
        requiredForNext = TIER_THRESHOLDS.LEGACY;
        progress = ((rawBalance - TIER_THRESHOLDS.POWER) / (TIER_THRESHOLDS.LEGACY - TIER_THRESHOLDS.POWER)) * 100;
    } else if (rawBalance >= TIER_THRESHOLDS.INFLUENCE) {
        currentTier = TIER_IDS.INFLUENCE;
        nextTier = TIER_IDS.POWER;
        requiredForNext = TIER_THRESHOLDS.POWER;
        progress = ((rawBalance - TIER_THRESHOLDS.INFLUENCE) / (TIER_THRESHOLDS.POWER - TIER_THRESHOLDS.INFLUENCE)) * 100;
    } else if (rawBalance >= TIER_THRESHOLDS.ENTRY) {
        currentTier = TIER_IDS.ENTRY;
        nextTier = TIER_IDS.INFLUENCE;
        requiredForNext = TIER_THRESHOLDS.INFLUENCE;
        progress = ((rawBalance - TIER_THRESHOLDS.ENTRY) / (TIER_THRESHOLDS.INFLUENCE - TIER_THRESHOLDS.ENTRY)) * 100;
    } else {
        // No Tier
        currentTier = null;
        nextTier = TIER_IDS.ENTRY;
        requiredForNext = TIER_THRESHOLDS.ENTRY;
        progress = (rawBalance / TIER_THRESHOLDS.ENTRY) * 100;
    }

    // Cap progress at 100
    progress = Math.min(Math.max(progress, 0), 100);

    return {
        currentTier,
        nextTier,
        progress,
        balance: rawBalance,
        isConnected,
        isLoading,
        requiredForNext
    };
}
