"use client";

import * as React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Package, Plus, Search, Filter, Edit, Trash2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { formatPrice, cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { deleteProduct } from "@/lib/actions/products";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Product } from "@/types";

interface ProductsClientProps {
  products: Product[];
}

export function ProductsClient({ products: initialProducts }: ProductsClientProps) {
  const [products, setProducts] = React.useState(initialProducts);
  const [searchQuery, setSearchQuery] = React.useState("");
  const router = useRouter();

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        setProducts(products.filter(p => p.id !== id));
        toast.success("Product deleted successfully");
        router.refresh();
      } catch (error: any) {
        toast.error(error.message || "Failed to delete product");
      }
    }
  };

  return (
    <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
      <CardHeader className="border-b bg-slate-50/50 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search products..." 
              className="pl-10 rounded-xl border-slate-200 bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="rounded-xl gap-2 border-slate-200 bg-white font-bold text-xs uppercase tracking-widest">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {filteredProducts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Product</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Category</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Price</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Stock</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 shadow-sm">
                          <img src={product.featured_image || product.images[0] || ""} alt={product.name} className="h-full w-full object-cover" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-900 group-hover:text-primary transition-colors">{product.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono truncate max-w-[150px]">ID: {product.id}</span>
                          <span className="text-[10px] text-primary font-mono truncate max-w-[150px]">Slug: {product.slug}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className="rounded-lg font-bold text-[10px] uppercase tracking-widest bg-slate-50 border-slate-200">
                        {product.category?.name || "Uncategorized"}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900">{formatPrice(product.price)}</span>
                        {product.compare_at_price && (
                          <span className="text-xs text-slate-400 line-through">{formatPrice(product.compare_at_price)}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                         <span className={cn(
                           "text-sm font-bold",
                           product.stock_qty <= 5 ? "text-rose-500" : "text-slate-700"
                         )}>
                           {product.stock_qty} in stock
                         </span>
                         <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className={cn(
                                "h-full rounded-full transition-all",
                                product.stock_qty <= 5 ? "bg-rose-500" : "bg-emerald-500"
                              )} 
                              style={{ width: `${Math.min((product.stock_qty / 50) * 100, 100)}%` }} 
                            />
                         </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link href={`/dashboard/products/${product.id}/edit`}>
                          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-slate-100 hover:text-primary transition-all">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-9 w-9 rounded-xl hover:bg-rose-50 hover:text-rose-500 transition-all"
                          onClick={() => handleDelete(product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Link href={`/product/${product.slug}`} target="_blank">
                          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-slate-100 transition-all">
                            <ExternalLink className="h-4 w-4 text-slate-400" />
                          </Button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="h-96 flex flex-col items-center justify-center text-center p-12">
            <div className="h-16 w-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 mb-4">
              <Package className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No products found</h3>
            <p className="text-slate-500 max-w-xs mt-1">
              Start adding products to your store to see them listed here.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
