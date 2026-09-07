"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Laptop, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";

export function Hero({ productCount = 0 }: { productCount?: number }) {
  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-32">
      {/* Removed AI Decorative Elements (glowing orbs) */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <p className="text-sm font-bold text-primary tracking-widest uppercase">
              YoTech IT Solutions
            </p>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-[1.1]">
              Equipping Your Business with Reliable Tech
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              From high-performance hardware to essential software licenses, YoTech provides the exact tools you need to run your operations efficiently.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/shop">
                <Button size="lg" className="group w-full sm:w-auto">
                  Shop Hardware
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Book Tech Support
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8 border-t">
              <div className="space-y-1">
                <h3 className="font-bold text-xl">{productCount}+</h3>
                <p className="text-sm text-muted-foreground">Products</p>
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-xl">24/7</h3>
                <p className="text-sm text-muted-foreground">Expert Support</p>
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-xl">100%</h3>
                <p className="text-sm text-muted-foreground">Authentic</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:ml-12"
          >
            <div className="aspect-[4/3] rounded-sm overflow-hidden relative group shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=1200&auto=format&fit=crop"
                alt="Premium IT Hardware"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/10 transition-opacity duration-700 group-hover:bg-black/0" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Helper to avoid import error if Mail is not in lucide-react (it usually is)
import { Mail } from "lucide-react";
