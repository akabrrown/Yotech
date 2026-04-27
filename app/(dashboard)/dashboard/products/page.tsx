import { Package, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getProducts } from "@/lib/actions/products";
import { ProductsClient } from "./products-client";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Products</h1>
          <p className="text-slate-500 font-medium">Manage your inventory and product listings.</p>
        </div>
        <Link href="/dashboard/products/new">
          <Button className="rounded-xl shadow-lg shadow-primary/20 gap-2">
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        </Link>
      </div>

      <ProductsClient products={products} />
    </div>
  );
}
