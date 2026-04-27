"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Filter, X } from "lucide-react";
import { cn } from "@/lib/utils";

import { type Category } from "@/types";

export function FilterSidebarClient({ 
  className,
  categories 
}: { 
  className?: string;
  categories: Category[];
}) {
  const brands = ["Apple", "Dell", "HP", "Lenovo", "ASUS", "Logitech", "Microsoft", "Intel", "NVIDIA"];
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const currentCategory = searchParams.get("category");
  const currentBrand = searchParams.get("brand");
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";

  const updateFilters = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/shop?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push("/shop");
  };

  return (
    <aside className={cn("space-y-8 pb-10", className)}>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Filter className="h-5 w-5 text-primary" />
          Filters
        </h2>
        {(currentCategory || currentBrand || minPrice || maxPrice) && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="text-primary h-auto p-0 hover:bg-transparent">
            Clear All
          </Button>
        )}
      </div>

      {/* Categories */}
      <div className="space-y-4">
        <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Categories</h3>
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li key={cat.slug}>
              <button
                onClick={() => updateFilters("category", currentCategory === cat.slug ? null : cat.slug)}
                className={cn(
                  "w-full text-left text-sm py-1 flex items-center justify-between group transition-colors",
                  currentCategory === cat.slug ? "text-primary font-bold" : "text-foreground/70 hover:text-primary"
                )}
              >
                {cat.name}
                <ChevronRight className={cn("h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity", currentCategory === cat.slug && "opacity-100")} />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Price Range */}
      <div className="space-y-4">
        <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Price Range (GH₵)</h3>
        <div className="flex gap-2 items-center">
          <Input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => updateFilters("minPrice", e.target.value)}
            className="h-9 px-2"
          />
          <span className="text-muted-foreground">-</span>
          <Input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => updateFilters("maxPrice", e.target.value)}
            className="h-9 px-2"
          />
        </div>
      </div>

      {/* Brands */}
      <div className="space-y-4">
        <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Top Brands</h3>
        <div className="flex flex-wrap gap-2">
          {brands.map((brand) => (
            <Badge
              key={brand}
              variant={currentBrand === brand ? "default" : "outline"}
              className="cursor-pointer hover:border-primary transition-colors py-1 px-3"
              onClick={() => updateFilters("brand", currentBrand === brand ? null : brand)}
            >
              {brand}
            </Badge>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div className="space-y-4 pt-4 border-t">
        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
            checked={searchParams.get("inStock") === "true"}
            onChange={(e) => updateFilters("inStock", e.target.checked ? "true" : null)}
          />
          <span className="text-sm text-foreground/80 group-hover:text-primary transition-colors">In Stock Only</span>
        </label>
      </div>
    </aside>
  );
}
