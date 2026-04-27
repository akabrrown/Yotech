import Link from "next/link";
import Image from "next/image";
import { Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";

import { AddToCartButton } from "./add-to-cart-button";
import { type Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const isOutOfStock = product.stock_qty <= 0;
  const isLowStock = product.stock_qty > 0 && product.stock_qty <= 5;

  return (
    <Card className="group overflow-hidden border-none bg-muted/20 hover:shadow-xl transition-all duration-300">
      <Link href={`/product/${product.slug}`}>
        <div className="aspect-square relative overflow-hidden bg-muted">
          <Image
            src={product.featured_image || product.images[0] || "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=400&auto=format&fit=crop"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <Button
              variant="secondary"
              size="icon"
              className="h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Heart className="h-4 w-4" />
            </Button>
          </div>
          {isOutOfStock ? (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <Badge variant="destructive" className="px-4 py-1 text-sm uppercase">Out of Stock</Badge>
            </div>
          ) : isLowStock ? (
            <div className="absolute bottom-3 left-3">
              <Badge variant="secondary" className="bg-amber-500 text-white border-none">Low Stock: {product.stock_qty}</Badge>
            </div>
          ) : null}
        </div>
      </Link>
      <CardContent className="p-4 space-y-2">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
          {product.category?.name || "Hardware"}
        </p>
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-bold text-sm line-clamp-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                "h-3 w-3",
                i < (product.rating || 5) ? "fill-primary text-primary" : "fill-muted text-muted"
              )}
            />
          ))}
          <span className="text-[10px] text-muted-foreground ml-1">
            ({product.reviews_count || 0})
          </span>
        </div>
        <p className="text-lg font-extrabold">{formatPrice(product.price)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <AddToCartButton 
          product={product} 
          size="sm"
          className="w-full gap-2 rounded-full shadow-lg shadow-primary/10"
        />
      </CardFooter>
    </Card>
  );
}

import { cn } from "@/lib/utils";
