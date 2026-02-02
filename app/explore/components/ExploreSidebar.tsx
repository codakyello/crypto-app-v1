"use strict";
import { Label } from "@/app/components/ui/label";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Slider } from "@/app/components/ui/slider";
import { Button } from "@/app/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/app/components/ui/input";

interface SidebarProps {
    categories: string[];
    selectedCategories: string[];
    onCategoryChange: (category: string) => void;
    priceRange: [number, number];
    onPriceChange: (value: [number, number]) => void;
    searchQuery: string;
    onSearchChange: (value: string) => void;
    onClearFilters: () => void;
    selectedTiers: string[];
    onTierChange: (tier: string) => void;
}

export function ExploreSidebar({
    categories,
    selectedCategories,
    onCategoryChange,
    priceRange,
    onPriceChange,
    searchQuery,
    onSearchChange,
    onClearFilters,
    selectedTiers,
    onTierChange,
}: SidebarProps) {
    const tiers = ["Entry", "Influence", "Power", "Legacy"];

    return (
        <div className="space-y-8 bg-white/5 p-6 rounded-xl border border-white/5 backdrop-blur-md h-fit top-24 sticky">
            {/* Search */}
            <div className="space-y-4">
                <h3 className="text-lg font-bold text-white font-heading uppercase tracking-wide">Search</h3>
                <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input
                        placeholder="Search services..."
                        className="pl-9 bg-black/40 border-white/10 text-white placeholder:text-gray-600 focus:border-primary/50"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>
            </div>

            {/* Categories */}
            <div className="space-y-4">
                <h3 className="text-lg font-bold text-white font-heading uppercase tracking-wide">Categories</h3>
                <div className="space-y-3">
                    {categories.map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                            <Checkbox
                                id={category}
                                checked={selectedCategories.includes(category)}
                                onCheckedChange={() => onCategoryChange(category)}
                                className="border-white/20 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                            />
                            <Label
                                htmlFor={category}
                                className="text-gray-400 font-medium cursor-pointer hover:text-white transition-colors"
                            >
                                {category}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tiers */}
            <div className="space-y-4">
                <h3 className="text-lg font-bold text-white font-heading uppercase tracking-wide">Min. Tier</h3>
                <div className="space-y-3">
                    {tiers.map((tier) => (
                        <div key={tier} className="flex items-center space-x-2">
                            <Checkbox
                                id={`tier-${tier}`}
                                checked={selectedTiers.includes(tier)}
                                onCheckedChange={() => onTierChange(tier)}
                                className="border-white/20 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                            />
                            <Label
                                htmlFor={`tier-${tier}`}
                                className="text-gray-400 font-medium cursor-pointer hover:text-white transition-colors"
                            >
                                {tier}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Price Range */}
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-white font-heading uppercase tracking-wide">Price Range</h3>
                    <span className="text-xs text-primary font-mono">{priceRange[0]} - {priceRange[1]} ALPHA</span>
                </div>
                <Slider
                    defaultValue={[0, 5000]}
                    max={5000}
                    step={100}
                    value={priceRange}
                    onValueChange={(val) => onPriceChange(val as [number, number])}
                    className="py-4"
                />
                <div className="flex justify-between text-xs text-gray-500">
                    <span>0</span>
                    <span>5000+</span>
                </div>
            </div>

            {/* Clear */}
            <Button
                variant="ghost"
                onClick={onClearFilters}
                className="w-full text-gray-500 hover:text-white hover:bg-white/5"
            >
                Reset Filters
            </Button>
        </div>
    );
}
