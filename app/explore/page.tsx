"use client";

import { Card, CardContent, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { services } from "@/app/data/mock-services";
import { MapPin, Star } from "lucide-react";
import Link from "next/link";
import { cn } from "@/app/lib/utils";
import { useState, useMemo } from "react";
import { ExploreSidebar } from "./components/ExploreSidebar";
import Image from "next/image";
import { DARK_BLUR_DATA_URL } from "@/app/lib/image-utils";

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTiers, setSelectedTiers] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);

  // Extract unique categories
  const allCategories = Array.from(new Set(services.map(s => s.type)));

  const filteredServices = useMemo(() => {
    return services.filter(service => {
      const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(service.type);
      const matchesTier = selectedTiers.length === 0 || selectedTiers.includes(service.minTier);
      const matchesPrice = service.price <= priceRange[1];
      return matchesSearch && matchesCategory && matchesTier && matchesPrice;
    });
  }, [searchQuery, selectedCategories, selectedTiers, priceRange]);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const toggleTier = (tier: string) => {
    setSelectedTiers(prev =>
      prev.includes(tier) ? prev.filter(t => t !== tier) : [...prev, tier]
    );
  };

  return (
    <div className="min-h-screen pt-28 pb-12 spacing-container max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-fluid-h1 font-bold text-white mb-6 font-heading uppercase tracking-tighter">Explore Facilities</h1>
        <p className="text-fluid-body text-gray-400 max-w-2xl mx-auto">
          Redeem your ALPHA tokens for real-world luxury. Browse our curated selection of verified partners.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full lg:w-64 shrink-0">
          <ExploreSidebar
            categories={allCategories}
            selectedCategories={selectedCategories}
            onCategoryChange={toggleCategory}
            selectedTiers={selectedTiers}
            onTierChange={toggleTier}
            priceRange={priceRange}
            onPriceChange={setPriceRange}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onClearFilters={() => {
              setSearchQuery("");
              setSelectedCategories([]);
              setSelectedTiers([]);
              setPriceRange([0, 5000]);
            }}
          />
        </div>

        {/* Grid */}
        <div className="flex-grow">
          <div className="mb-4 text-gray-400 text-sm flex justify-between items-center">
            <span>Showing {filteredServices.length} results</span>
            <span className="text-primary/70">Live Inventory</span>
          </div>

          {filteredServices.length === 0 ? (
            <div className="text-center py-20 bg-white/5 rounded-xl border border-dashed border-white/10">
              <p className="text-xl text-gray-500">No services found adjusting your filters.</p>
              <Button
                variant="link"
                onClick={() => { setSearchQuery(""); setSelectedCategories([]); setSelectedTiers([]); setPriceRange([0, 5000]); }}
                className="text-primary"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <Link href={`/redeem/${service.id}`} key={service.id} className="group">
                  <Card className="h-full overflow-hidden border-white/5 bg-white/5 hover:border-primary/50 transition-all hover:bg-white/10 group-hover:shadow-[0_0_20px_rgba(255,153,0,0.2)] flex flex-col">
                    {/* Image Area */}
                    <div className="h-56 bg-gray-800 relative overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        placeholder="blur"
                        blurDataURL={DARK_BLUR_DATA_URL}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />

                      <div className="absolute top-4 right-4 flex gap-2">
                        <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-primary border border-primary/20">
                          {service.type}
                        </div>
                      </div>

                      <div className="absolute bottom-4 left-4">
                        <span className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border backdrop-blur-md",
                          service.minTier === "Entry" && "bg-amber-500/20 text-amber-400 border-amber-500/30",
                          service.minTier === "Influence" && "bg-red-500/20 text-red-400 border-red-500/30",
                          service.minTier === "Power" && "bg-gray-400/20 text-gray-300 border-gray-400/30",
                          service.minTier === "Legacy" && "bg-amber-600/20 text-amber-500 border-amber-600/30",
                        )}>
                          {service.minTier} Tier
                        </span>
                      </div>
                    </div>

                    <CardContent className="p-5 flex-grow flex flex-col">
                      <div className="flex justify-between items-start mb-1">
                        <CardTitle className="text-xl group-hover:text-primary transition-colors font-heading tracking-wide uppercase line-clamp-1">{service.name}</CardTitle>
                      </div>

                      <div className="flex items-center text-gray-400 text-sm mb-3">
                        <MapPin className="h-3.5 w-3.5 mr-1 text-gray-500" />
                        {service.location}
                        {service.rating && (
                          <div className="flex items-center ml-4 text-amber-500">
                            <Star className="h-3.5 w-3.5 mr-1 fill-amber-500" />
                            <span className="text-white font-medium">{service.rating}</span>
                            <span className="text-gray-600 text-xs ml-1">({service.reviews})</span>
                          </div>
                        )}
                      </div>

                      {/* Pricing */}
                      <div className="mt-auto pt-4 border-t border-white/5 space-y-3">
                        <div>
                          <div className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">Base Price</div>
                          <div className="text-lg font-bold text-white leading-none">{service.price} <span className="text-xs font-normal text-primary">ALPHA</span></div>
                        </div>

                        <Button variant="outline" size="sm" className="w-full group-hover:bg-primary group-hover:text-black group-hover:border-primary transition-all rounded-xl h-9 font-semibold uppercase tracking-wider text-xs">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
