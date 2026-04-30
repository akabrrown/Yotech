import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/home/hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Laptop, Cpu, MousePointer2, Headphones, Database, Shield, Wrench, Monitor, LucideIcon } from "lucide-react";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";


import { getProducts, getCategories, getProductCount } from "@/lib/actions/products";
import { type Category } from "@/types";
import Image from "next/image";

const categoryIcons: { [key: string]: LucideIcon } = {
  "Laptops": Laptop,
  "Desktops": Monitor,
  "Desktop PCs": Monitor,
  "Desktop PC's": Monitor,
  "Components": Cpu,
  "Software": Database,
  "Accessories": MousePointer2,
  "Monitors": Monitor,
  "Networking": Cpu,
};

export default async function Home() {
  const [products, dbCategories, productCount] = await Promise.all([
    getProducts({ featured: true, limit: 4 }),
    getCategories(),
    getProductCount()
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <Hero productCount={productCount} />

        {/* Categories Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Browse by Category</h2>
                <p className="text-muted-foreground mt-2">Find exactly what you need for your tech setup.</p>
              </div>
              <Link href="/shop">
                <Button variant="link" className="text-primary font-semibold">View All Categories</Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {dbCategories.slice(0, 4).map((category: Category) => {
                const Icon = categoryIcons[category.name] || Laptop;
                return (
                  <Link key={category.id} href={`/shop/${category.slug}`}>
                    <Card className="group hover:border-primary/50 transition-all duration-300 hover:shadow-md cursor-pointer overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                            <Icon className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg">{category.name}</h3>
                            <p className="text-sm text-muted-foreground">Browse Collection</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Featured Hardware</h2>
                <p className="text-muted-foreground mt-2">Handpicked premium products for professionals.</p>
              </div>
              <Link href="/shop">
                <Button variant="outline">Shop All Products</Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 border-none bg-muted/20 overflow-hidden">
                  <Link href={`/product/${product.slug}`}>
                    <div className="aspect-[4/5] relative overflow-hidden bg-muted">
                      <Image
                        src={product.featured_image || product.images[0] || "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=400&auto=format&fit=crop"}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                      {product.compare_at_price && (
                        <div className="absolute top-4 left-4">
                          <Badge variant="success" className="bg-white/90 text-primary border-none shadow-sm backdrop-blur-md">
                            Sale
                          </Badge>
                        </div>
                      )}
                    </div>
                  </Link>
                  <CardContent className="p-6">
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2 font-semibold">
                      {product.category?.name}
                    </p>
                    <Link href={`/product/${product.slug}`}>
                      <h3 className="font-bold text-lg mb-4 line-clamp-1 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="font-extrabold text-xl">
                          {formatPrice(product.price)}
                        </span>
                        {product.compare_at_price && (
                          <span className="text-xs text-muted-foreground line-through">
                            {formatPrice(product.compare_at_price)}
                          </span>
                        )}
                      </div>
                      <Button size="sm" variant="primary" className="rounded-full shadow-lg shadow-primary/20">
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Services / Why Us Section */}
        <section className="py-20 bg-primary text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 -mt-24 -mr-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-extrabold leading-tight mb-6">
                  Professional Tech Support & Hardware Services
                </h2>
                <p className="text-primary-light text-lg mb-8 leading-relaxed">
                  Our certified technicians are ready to assist you with system upgrades, repairs, and software troubleshooting. We don&apos;t just sell tech; we ensure it works perfectly for you.
                </p>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-white/20">
                      <Shield className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl">Authorized Partners</h4>
                      <p className="text-primary-light text-sm">We only stock 100% genuine products with manufacturer warranties.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-white/20">
                      <Wrench className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl">On-Site Assistance</h4>
                      <p className="text-primary-light text-sm">Hardware repairs and networking setup available at your location.</p>
                    </div>
                  </div>
                </div>
                <Link href="/contact" className="inline-block mt-10">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                    Get Support Now
                  </Button>
                </Link>
              </div>
              <div className="hidden lg:block relative">
                <div className="aspect-square rounded-3xl bg-white/10 border border-white/20 p-4 relative overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-tr from-primary to-transparent" />
                   <Image 
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop" 
                    alt="Support" 
                    fill
                    className="object-cover rounded-2xl opacity-80"
                    unoptimized
                   />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
