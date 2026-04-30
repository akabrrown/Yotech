"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { toast } from "react-hot-toast";
import { Product } from "@/types";

interface AddToCartButtonProps {
  product: Product;
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
}

export function AddToCartButton({ product, className, size = "lg" }: AddToCartButtonProps) {
  const cart = useCart();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    const timeout = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timeout);
  }, []);

  const handleAddToCart = () => {
    console.log("Adding to cart:", product.name);
    if (product.stock_qty <= 0) {
      toast.error("Product is out of stock");
      return;
    }

    try {
      cart.addItem({
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: Number(product.price),
        image: product.featured_image || product.images[0] || "",
        quantity: 1,
        stock_qty: product.stock_qty,
      });
      
      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      console.error("Cart error:", error);
      toast.error("Failed to add to cart");
    }
  };

  if (!mounted) {
    return (
      <Button size={size} className={className} disabled>
        <ShoppingCart className="mr-2 h-5 w-5" />
        Add to Cart
      </Button>
    );
  }

  return (
    <Button 
      size={size} 
      className={className}
      onClick={handleAddToCart}
      disabled={product.stock_qty <= 0}
    >
      <ShoppingCart className="mr-2 h-5 w-5" />
      Add to Cart
    </Button>
  );
}
