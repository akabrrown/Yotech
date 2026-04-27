import { getCategories } from "@/lib/actions/products";
import { ProductForm } from "./product-form";

export default async function NewProductPage() {
  const categories = await getCategories();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Add New Product</h1>
          <p className="text-slate-500 font-medium">Create a new product listing for your store.</p>
        </div>
      </div>
      
      <ProductForm categories={categories} />
    </div>
  );
}
