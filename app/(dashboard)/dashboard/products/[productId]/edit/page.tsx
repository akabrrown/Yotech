import { getCategories, getProductById } from "@/lib/actions/products";
import { ProductForm } from "../../new/product-form";
import { notFound } from "next/navigation";

export default async function EditProductPage({
  params,
}: {
  params: { productId: string };
}) {
  const { productId } = await params;
  const [product, categories] = await Promise.all([
    getProductById(productId),
    getCategories(),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Edit Product</h1>
        <p className="text-slate-500 font-medium">Update your product details and inventory.</p>
      </div>

      <ProductForm initialData={product} categories={categories} />
    </div>
  );
}
