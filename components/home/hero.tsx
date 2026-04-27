"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Laptop, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";

export function Hero({ productCount = 0 }: { productCount?: number }) {
  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-32">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold">
              <Zap className="h-4 w-4" />
              <span>Next-Gen IT Solutions</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-[1.1]">
              Empowering Your <span className="text-primary">Digital Journey</span> with Premium Tech
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              From high-performance hardware to essential software licenses, YoTech provides the tools you need to excel in the modern tech landscape.
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
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 p-8 flex items-center justify-center relative">
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <Laptop className="w-64 h-64" />
              </div>
              
              <div className="grid grid-cols-2 gap-4 w-full relative z-10">
                <div className="aspect-[4/3] rounded-xl bg-white shadow-xl border p-4 flex flex-col justify-between">
                  <ShieldCheck className="text-primary h-8 w-8" />
                  <span className="font-bold text-sm">Genuine Software</span>
                </div>
                <div className="aspect-[4/3] rounded-xl bg-primary shadow-xl p-4 flex flex-col justify-between text-white mt-8">
                  <Zap className="h-8 w-8 text-white" />
                  <span className="font-bold text-sm">Fast Delivery</span>
                </div>
                <div className="aspect-[4/3] rounded-xl bg-white shadow-xl border p-4 flex flex-col justify-between">
                  <Laptop className="text-primary h-8 w-8" />
                  <span className="font-bold text-sm">Pro Hardware</span>
                </div>
                <div className="aspect-[4/3] rounded-xl bg-muted shadow-xl border p-4 flex flex-col justify-between mt-8">
                  <Mail className="text-primary h-8 w-8" />
                  <span className="font-bold text-sm">Tech Support</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Helper to avoid import error if Mail is not in lucide-react (it usually is)
import { Mail } from "lucide-react";
