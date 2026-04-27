import { Navbar } from "../../../../components/layout/navbar";
import { Footer } from "../../../../components/layout/footer";
import { Button } from "../../../../components/ui/button";
import { Badge } from "../../../../components/ui/badge";
import { Heart, Star, Share2, ShieldCheck, Truck, RotateCcw, Wrench } from "lucide-react";
import { formatPrice } from "../../../../lib/utils";
import Image from "next/image";
import { AddToCartButton } from "../../../../components/shop/add-to-cart-button";

import { getProductBySlug } from "@/lib/actions/products";
import { getProductReviews } from "@/lib/actions/reviews";
import { notFound } from "next/navigation";
import { ReviewsList } from "../../../../components/shop/reviews-list";
import { ReviewForm } from "../../../../components/shop/review-form";
import { ProductTabs } from "../../../../components/shop/product-tabs";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let product = await getProductBySlug(slug);

  // Fallback: Try to find product by replacing double dashes with single dashes
  if (!product && slug.includes("--")) {
    const fallbackSlug = slug.replace(/--+/g, "-");
    product = await getProductBySlug(fallbackSlug);
  }

  if (!product) {
    notFound();
  }

  const reviews = await getProductReviews(product.id);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Gallery Section */}
          <div className="space-y-4">
            <div className="aspect-[4/3] relative rounded-2xl overflow-hidden bg-muted border shadow-inner">
              <Image
                src={product.featured_image || product.images[0] || "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop"}
                alt={product.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
              />
              {product.compare_at_price && (
                <div className="absolute top-4 left-4">
                  <Badge variant="success" className="bg-white/90 text-primary border-none shadow-sm backdrop-blur-md px-3 py-1">
                    On Sale
                  </Badge>
                </div>
              )}
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[product.featured_image, ...product.images].filter(Boolean).map((img, i) => (
                <div key={i} className={cn("aspect-square relative rounded-xl overflow-hidden border-2 cursor-pointer", i === 0 ? "border-primary shadow-md" : "border-transparent opacity-60 hover:opacity-100 transition-opacity")}>
                  <Image 
                    src={img as string} 
                    alt={`${product.name} ${i}`} 
                    fill 
                    className="object-cover" 
                    sizes="(max-width: 768px) 25vw, 150px"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Info Section */}
          <div className="space-y-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-primary font-bold uppercase tracking-widest">
                {product.brand && <span>{product.brand}</span>}
                {product.brand && product.category?.name && <span className="text-slate-300">•</span>}
                {product.category?.name || "General"}
              </div>
              <h1 className="text-3xl lg:text-5xl font-extrabold leading-tight tracking-tight text-slate-900">
                {product.name}
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-primary">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <span className="text-sm text-slate-500 font-medium">
                  5 / 5 (Verified Customer Reviews)
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-extrabold text-foreground">
                  {formatPrice(product.price)}
                </span>
                {product.compare_at_price && (
                  <span className="text-xl text-slate-400 line-through decoration-primary/30 font-medium">
                    {formatPrice(product.compare_at_price)}
                  </span>
                )}
              </div>
              <p className="text-lg text-slate-600 leading-relaxed max-w-xl whitespace-pre-wrap">
                {product.description}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <AddToCartButton 
                product={product} 
                className="flex-grow h-14 text-lg rounded-2xl shadow-xl shadow-primary/20 font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
              />
              <div className="flex gap-4">
                <Button variant="outline" size="icon" className="h-14 w-14 rounded-2xl border-slate-200 hover:bg-slate-50">
                  <Heart className="h-6 w-6" />
                </Button>
                <Button variant="outline" size="icon" className="h-14 w-14 rounded-2xl border-slate-200 hover:bg-slate-50">
                  <Share2 className="h-6 w-6" />
                </Button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-6 pt-8 border-t border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-primary/5 text-primary">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div className="text-sm">
                  <p className="font-bold text-slate-900">Authentic Product</p>
                  <p className="text-slate-500 text-[12px]">Genuine Brand Warranty</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
                  <Truck className="h-6 w-6" />
                </div>
                <div className="text-sm">
                  <p className="font-bold text-slate-900">Fast Delivery</p>
                  <p className="text-slate-500 text-[12px]">Secure shipping nationwide</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-violet-50 text-violet-600">
                  <RotateCcw className="h-6 w-6" />
                </div>
                <div className="text-sm">
                  <p className="font-bold text-slate-900">7-Day Returns</p>
                  <p className="text-slate-500 text-[12px]">Hassle-free process</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-orange-50 text-orange-600">
                  <Wrench className="h-6 w-6" />
                </div>
                <div className="text-sm">
                  <p className="font-bold text-slate-900">Tech Support</p>
                  <p className="text-slate-500 text-[12px]">Lifetime technical help</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <ProductTabs 
                tabs={[
                  {
                    label: "Technical Specifications",
                    content: (
                      <div className="space-y-10">
                        {product.metadata && Object.keys(product.metadata).length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-1">
                            {Object.entries(product.metadata as Record<string, string>).map(([key, value]) => (
                              <div key={key} className="flex justify-between items-center py-4 border-b border-slate-100 last:border-0 group hover:bg-slate-50/50 px-2 transition-colors">
                                <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">{key}</span>
                                <span className="text-sm font-extrabold text-slate-900">{value}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="bg-slate-50 rounded-3xl p-10 border border-slate-100 text-center">
                            <p className="text-slate-500 font-medium italic">Detailed technical specifications will be available soon as we update our catalog.</p>
                          </div>
                        )}
                      </div>
                    )
                  },
                  {
                    label: "Customer Reviews",
                    count: reviews.length,
                    content: (
                      <div className="space-y-10">
                        <h3 className="text-2xl font-extrabold text-slate-900">Verified Customer Reviews</h3>
                        <ReviewsList reviews={reviews} />
                      </div>
                    )
                  }
                ]}
              />
            </div>

            <div className="space-y-8">
              <div className="sticky top-24">
                <h3 className="text-xl font-extrabold text-slate-900 mb-6">Write a Review</h3>
                <ReviewForm productId={product.id} />
              </div>
            </div>
          </div>
        </div>
      </main>


      <Footer />
    </div>
  );
}

import { cn } from "@/lib/utils";
