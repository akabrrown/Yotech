"use client";

import * as React from "react";
import Link from "next/link";
import { ShoppingCart, X, Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";

export function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      
      <div className="absolute inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-6 border-b flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingCart className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-bold">Your Cart</h2>
            <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-0.5 rounded-full">
              {items.length}
            </span>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="p-6 rounded-full bg-muted">
                <ShoppingCart className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-bold">Your cart is empty</h3>
              <p className="text-muted-foreground text-sm">Looks like you haven&apos;t added any tech yet.</p>
              <Button onClick={onClose} variant="primary">Start Shopping</Button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 group">
                <div className="h-24 w-24 shrink-0 rounded-xl overflow-hidden border bg-muted relative">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-grow space-y-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-sm line-clamp-1">{item.name}</h4>
                    <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-primary font-bold">{formatPrice(item.price)}</p>
                  
                  <div className="flex items-center gap-3 pt-2">
                    <div className="flex items-center border rounded-lg bg-muted/30">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:text-primary transition-colors disabled:opacity-30"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:text-primary transition-colors disabled:opacity-30"
                        disabled={item.quantity >= item.stock_qty}
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t bg-muted/10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground font-medium">Subtotal</span>
              <span className="text-2xl font-extrabold">{formatPrice(totalPrice)}</span>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Taxes and shipping calculated at checkout
            </p>
            <Link href="/checkout" onClick={onClose}>
              <Button className="w-full h-14 text-lg rounded-xl gap-2 group">
                Proceed to Checkout
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
