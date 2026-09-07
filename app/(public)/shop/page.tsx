import { Navbar } from "../../../components/layout/navbar";
import { Footer } from "../../../components/layout/footer";
import { ProductCard } from "../../../components/shop/product-card";
import { FilterSidebar } from "../../../components/shop/filter-sidebar";
import { Button } from "../../../components/ui/button";
import { LayoutGrid, List } from "lucide-react";
import { getProducts, getCategories } from "@/lib/actions/products";
import { MobileFilters } from "../../../components/shop/mobile-filters";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { category, brand, minPrice, maxPrice, inStock, q } = await searchParams;
  
  const [products, categories] = await Promise.all([
    getProducts({
      category: category as string,
      brand: brand as string,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      inStock: inStock === "true",
      query: q as string,
    }),
    getCategories()
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 shrink-0">
            <FilterSidebar className="hidden lg:block sticky top-24" />
            
            <MobileFilters categories={categories} />
          </div>

          {/* Main Content */}
          <div className="flex-grow space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold">
                  {q ? `Search results for "${q}"` : "Shop All Products"}
                </h1>
                <p className="text-muted-foreground">Premium IT hardware and software solutions.</p>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-muted/20 p-4 rounded-xl border border-muted/50">
              <p className="text-sm text-muted-foreground font-medium">
                Showing <span className="text-foreground font-bold">{products.length}</span> products
              </p>
              
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-1 bg-background p-1 rounded-md border">
                  <Button variant="ghost" size="icon" className="h-8 w-8 bg-muted text-primary">
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <List className="h-4 w-4" />
                  </Button>
                </div>
                
                <select className="bg-background border rounded-md text-sm px-3 py-2 outline-none focus:ring-2 focus:ring-primary">
                  <option>Sort by: Newest</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Best Rated</option>
                </select>
              </div>
            </div>

            {/* Grid */}
            {products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-muted/10 rounded-3xl border border-dashed">
                    <p className="text-muted-foreground font-medium">No products found.</p>
                </div>
            )}

            {/* Pagination */}
            {products.length > 12 && (
                <div className="flex justify-center pt-10">
                <div className="flex gap-2">
                    <Button variant="outline" disabled>Previous</Button>
                    <Button variant="primary" className="h-10 w-10 p-0">1</Button>
                    <Button variant="outline">Next</Button>
                </div>
                </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

