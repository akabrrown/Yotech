"use server";

import { createClient, requireAdmin } from "@/lib/supabase/server";
import { Product, Category } from "@/types";
import { updateProductSchema } from "@/lib/validations/admin";

export async function getProducts(options?: {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  limit?: number;
  featured?: boolean;
  inStock?: boolean;
  query?: string;
}) {
  const supabase = await createClient();
  
  let query = supabase
    .from("products")
    .select("*, categories(name, slug)")
    .eq("is_archived", false);

  if (options?.category) {
    // Get the category and all its children
    const { data: catData } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", options.category)
      .single();
    
    if (catData) {
      // Find IDs of all sub-categories
      const { data: subCats } = await supabase
        .from("categories")
        .select("id")
        .eq("parent_id", catData.id);
      
      const categoryIds = [catData.id, ...(subCats?.map(c => c.id) || [])];
      query = query.in("category_id", categoryIds);
    }
  }

  if (options?.brand) {
    query = query.eq("brand", options.brand);
  }

  if (options?.query) {
    query = query.ilike("name", `%${options.query}%`);
  }

  if (options?.minPrice) {
    query = query.gte("price", options.minPrice);
  }

  if (options?.maxPrice) {
    query = query.lte("price", options.maxPrice);
  }

  if (options?.featured) {
    query = query.eq("is_featured", true);
  }

  if (options?.inStock) {
    query = query.gt("stock_qty", 0);
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query.order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products:", JSON.stringify(error, null, 2));
    return [];
  }

  // Map to match the Product interface (categories -> category)
  return (data as (Product & { categories: { name: string; slug: string } | null })[]).map((item) => ({
    ...item,
    category: item.categories || undefined,
  })) as Product[];
}

export async function getProductBySlug(slug: string) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("products")
    .select("*, category:categories(name)")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error(`Error fetching product with slug [${slug}]:`, error);
    return null;
  }

  if (!data) return null;

  return data as Product;
}

export async function getCategories() {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("categories")
    .select("*, parent:parent_id(name)")
    .order("name");

  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }

  return (data as (Category & { parent: { name: string } | null })[]).map((cat) => ({
    ...cat,
    parent_name: cat.parent?.name
  }));
}

export async function getProductCount() {
  const supabase = await createClient();
  const { count, error } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true })
    .eq("is_archived", false);

  if (error) {
    console.error("Error fetching product count:", error);
    return 0;
  }

  return count || 0;
}

export async function deleteProduct(id: string) {
  const { supabase } = await requireAdmin();

  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  const { revalidatePath } = await import("next/cache");
  revalidatePath("/dashboard/products");
}

export async function getProductById(id: string) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("products")
    .select("*, categories(name, slug)")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching product:", error);
    return null;
  }

  return {
    ...data,
    category: data.categories || undefined,
  } as Product;
}

export async function updateProduct(id: string, rawValues: Partial<Product>) {
  const { supabase } = await requireAdmin();
  
  const values = updateProductSchema.parse(rawValues);

  const updateData: Partial<Product> = {
    ...values,
    updated_at: new Date().toISOString(),
  };

  if (values.name) {
    updateData.slug = values.name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  const { data, error } = await supabase
    .from("products")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  const { revalidatePath } = await import("next/cache");
  revalidatePath("/dashboard/products");
  return data;
}
