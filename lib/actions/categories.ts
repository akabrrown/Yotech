"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createCategory(values: {
  name: string;
  description?: string;
  image_url?: string;
  parent_id?: string | null;
}) {
  const supabase = await createClient();
  
  // Create slug from name
  const slug = values.name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");

  const { data, error } = await supabase
    .from("categories")
    .insert({
      ...values,
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
  const supabase = await createClient();
  
  const slug = values.name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");

  const { data, error } = await supabase
    .from("categories")
    .update({
      ...values,
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
  const supabase = await createClient();

  const { error } = await supabase
    .from("categories")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/dashboard/categories");
}
