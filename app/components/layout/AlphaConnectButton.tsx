"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "@/app/components/ui/button";
import { Loader2, Wallet, LogOut } from "lucide-react";

interface AlphaConnectButtonProps {
    className?: string;
    size?: "default" | "sm" | "lg" | "icon";
    isMobile?: boolean;
}

export function AlphaConnectButton({ className, size = "default", isMobile = false }: AlphaConnectButtonProps) {
    return (
        <ConnectButton.Custom>
            {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                authenticationStatus,
                mounted,
            }) => {
                const ready = mounted && authenticationStatus !== "loading";
                const connected =
                    ready &&
                    account &&
                    chain &&
                    (!authenticationStatus ||
                        authenticationStatus === "authenticated");

                if (!ready) {
                    return (
                        <Button disabled size={size} className={className}>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Loading
                        </Button>
                    );
                }

                if (!connected) {
                    return (
                        <Button
                            onClick={openConnectModal}
                            size={size}
                            className={`bg-[#F7931A] hover:bg-[#F7931A]/90 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(247,147,26,0.2)] ${className}`}
                        >
                            Connect Wallet
                        </Button>
                    );
                }

                if (chain.unsupported) {
                    return (
                        <Button
                            onClick={openChainModal}
                            size={size}
                            className={`bg-red-600 hover:bg-red-700 text-white rounded-xl ${className}`}
                        >
                            Wrong Network
                        </Button>
                    );
                }

                return (
                    <div className="flex items-center gap-2">
                        {!isMobile && (
                            <Button
                                onClick={openChainModal}
                                variant="outline"
                                size={size}
                                className="hidden md:flex items-center gap-2 px-3 border-white/10 bg-white/5 hover:bg-white/10 rounded-xl"
                            >
                                {chain.hasIcon && (
                                    <div
                                        style={{
                                            background: chain.iconBackground,
                                            width: 20,
                                            height: 20,
                                            borderRadius: 999,
                                            overflow: "hidden",
                                        }}
                                    >
                                        {chain.iconUrl && (
                                            <img
                                                alt={chain.name ?? "Chain icon"}
                                                src={chain.iconUrl}
                                                style={{ width: 20, height: 20 }}
                                            />
                                        )}
                                    </div>
                                )}
                                <span className="text-white font-medium">{chain.name}</span>
                            </Button>
                        )}

                        <Button
                            onClick={openAccountModal}
                            size={size}
                            className={`bg-white/10 hover:bg-white/20 border border-white/10 text-white font-medium rounded-xl backdrop-blur-md ${className}`}
                        >
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                {account.displayName}
                                {/* Show balance on desktop if available */}
                                <span className="hidden md:inline text-gray-400 border-l border-white/20 pl-2 ml-2">
                                    {account.displayBalance
                                        ? ` (${account.displayBalance})`
                                        : ""}
                                </span>
                            </div>
                        </Button>
                    </div>
                );
            }}
        </ConnectButton.Custom>
    );
}
