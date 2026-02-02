"use client";

import { useParams } from "next/navigation";
import { services } from "@/app/data/mock-services";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/app/components/ui/card";
import { MapPin, Star, Check, ArrowLeft, Shield, Crown, Zap, Sparkles } from "lucide-react";
import Link from "next/link";
import { cn } from "@/app/lib/utils";

export default function ServiceDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const service = services.find((s) => s.id === id);

  if (!service) {
    return (
      <div className="min-h-screen pt-32 pb-12 px-4 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Service Not Found</h1>
        <p className="text-gray-400 mb-8">The facility you are looking for does not exist or has been removed.</p>
        <Link href="/explore">
          <Button variant="outline">Back to Explore</Button>
        </Link>
      </div>
    );
  }

  // Helper to get tier discount info
  const getTierPrice = (tierName: string) => {
    if (!service.tierPricing) return undefined;
    const price = service.tierPricing[tierName as keyof typeof service.tierPricing];
    return price;
  };

  return (
    <div className="min-h-screen bg-[#050505] font-sans">
      {/* Hero Image Section */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-t from-[#050505] via-[#050505]/50 to-transparent z-10" />
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-28 left-4 md:left-12 z-20">
          <Link href="/explore">
            <Button variant="ghost" className="text-white hover:text-primary hover:bg-transparent pl-0 gap-2 text-sm font-medium shadow-none">
              <ArrowLeft className="h-4 w-4" /> Back to Explore
            </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto spacing-container -mt-32 relative z-30 pb-20">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* Main Content */}
          <div className="flex-1 space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-primary/20 text-primary hover:bg-primary/30 border-primary/20 px-3 py-1">
                  {service.type}
                </Badge>
                {service.minTier !== "Entry" && (
                  <Badge variant="outline" className="text-white border-white/20">
                    Min. Tier: {service.minTier}
                  </Badge>
                )}
              </div>
              <h1 className="text-fluid-h1 font-bold text-white mb-2 font-heading uppercase tracking-tight text-shadow">
                {service.name}
              </h1>
              <div className="flex flex-col sm:flex-row sm:items-center text-gray-300 gap-2 sm:gap-6 mt-4">
                <div className="flex items-center text-sm md:text-lg">
                  <MapPin className="h-4 w-4 md:h-5 md:w-5 mr-2 text-primary shrink-0" />
                  {service.location}
                </div>
                {service.rating && (
                  <div className="flex items-center text-amber-500 text-sm md:text-lg">
                    <Star className="h-4 w-4 md:h-5 md:w-5 mr-1 fill-amber-500 shrink-0" />
                    <span className="font-bold">{service.rating}</span>
                    <span className="text-gray-500 text-xs md:text-sm ml-1">({service.reviews} reviews)</span>
                  </div>
                )}
              </div>
            </div>

            <div className="prose prose-invert max-w-none">
              <h3 className="text-fluid-h2 font-bold text-white mb-4 font-heading">About this Facility</h3>
              <p className="text-gray-400 text-fluid-body leading-relaxed">
                {service.description}
              </p>
            </div>

            <div>
              <h3 className="text-fluid-h2 font-bold text-white mb-4 font-heading">Amenities & Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center bg-white/5 rounded-xl p-4 border border-white/5">
                    <Check className="h-5 w-5 text-primary mr-3" />
                    <span className="text-white text-fluid-body">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing Sidebar */}
          <div className="w-full lg:w-[400px] shrink-0">
            <div className="sticky top-28 space-y-6">

              {/* Price Card */}
              <Card className="bg-[#0A0A0A] border-white/10 overflow-hidden relative">
                {/* Glass Effect */}
                <div className="absolute inset-0 bg-primary/5 pointer-events-none" />

                <CardContent className="p-8 relative">
                  <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-wider">Pricing Breakdown</h3>

                  <div className="space-y-4">
                    {/* Standard Price */}
                    <div className="flex justify-between items-center p-3 rounded-lg border border-white/5 bg-white/5">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center text-gray-400">
                          <Star className="h-4 w-4" />
                        </div>
                        <span className="text-gray-300 font-medium">Standard</span>
                      </div>
                      <div className="text-right">
                        <span className="text-xl font-bold text-white">{service.price}</span>
                        <span className="text-xs text-primary ml-1">ALPHA</span>
                      </div>
                    </div>

                    {/* Tier Prices */}
                    {['Influence', 'Power', 'Legacy'].map((tier) => {
                      const price = getTierPrice(tier);
                      if (price === undefined || price === null) return null;
                      // Need to cast service.price to number just in case, but it's typed number.
                      // price is number because of logic check.
                      const isDisounted = price < service.price;

                      return (
                        <div key={tier} className={cn(
                          "flex justify-between items-center p-3 rounded-lg border transition-all",
                          tier === 'Power' ? "bg-primary/10 border-primary/30" : "bg-white/5 border-white/5"
                        )}>
                          <div className="flex items-center gap-3">
                            <div className={cn(
                              "h-8 w-8 rounded-full flex items-center justify-center",
                              tier === 'Influence' && "bg-orange-500/20 text-orange-400",
                              tier === 'Power' && "bg-gray-400/20 text-gray-300",
                              tier === 'Legacy' && "bg-red-900/40 text-red-500",
                            )}>
                              {tier === 'Influence' && <Zap className="h-4 w-4" />}
                              {tier === 'Power' && <Shield className="h-4 w-4" />}
                              {tier === 'Legacy' && <Crown className="h-4 w-4" />}
                            </div>
                            <div>
                              <span className={cn(
                                "font-medium block leading-none",
                                tier === 'Power' ? "text-primary" : "text-gray-300"
                              )}>{tier} Tier</span>
                              {isDisounted && <span className="text-[10px] text-green-400 font-bold">SAVE {Math.round((1 - price / service.price) * 100)}%</span>}
                            </div>
                          </div>
                          <div className="text-right">
                            {price === 0 ? (
                              <span className="text-xl font-bold text-green-400">FREE</span>
                            ) : (
                              <>
                                <span className={cn("text-xl font-bold", tier === 'Power' ? "text-primary" : "text-white")}>{price}</span>
                                <span className="text-xs text-primary ml-1">ALPHA</span>
                              </>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/10">
                    <div className="text-sm text-gray-500 mb-4 text-center">
                      Your balance: <span className="text-white font-mono">5,450 ALPHA</span> (Entry Tier)
                    </div>
                    <Button className="w-full h-14 text-base font-bold rounded-xl shadow-[0_0_20px_rgba(255,153,0,0.3)] hover:shadow-[0_0_30px_rgba(255,153,0,0.5)] transition-all">
                      Redeem for {service.price} ALPHA
                    </Button>
                    <p className="text-xs text-center text-gray-500 mt-4">
                      Instant redemption via smart contract. No refunds after confirmation.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
