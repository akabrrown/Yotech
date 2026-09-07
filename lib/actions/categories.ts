"use server";

import { createClient, requireAdmin } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { categorySchema } from "@/lib/validations/admin";

export async function createCategory(values: {
  name: string;
  description?: string;
  image_url?: string;
  parent_id?: string | null;
}) {
  const { supabase } = await requireAdmin();
  const validValues = categorySchema.parse(values);
  
  // Create slug from name
  const slug = validValues.name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");

  const { data, error } = await supabase
    .from("categories")
    .insert({
      ...validValues,
      slug,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/dashboard/categories");
  return data;
}

export async function updateCategory(id: string, values: {
  name: string;
  description?: string;
  image_url?: string;
  parent_id?: string | null;
}) {
  const { supabase } = await requireAdmin();
  const validValues = categorySchema.parse(values);
  
  const slug = validValues.name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");

  const { data, error } = await supabase
    .from("categories")
    .update({
      ...validValues,
      slug,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/dashboard/categories");
  return data;
}

export async function deleteCategory(id: string) {
  const { supabase } = await requireAdmin();

  const { error } = await supabase
    .from("categories")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/dashboard/categories");
}
