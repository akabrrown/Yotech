"use server";

import { createClient } from "@/lib/supabase/server";
import { Review } from "@/types";
import { revalidatePath } from "next/cache";

export async function getProductReviews(productId: string) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("reviews")
    .select("*, profiles(full_name, avatar_url)")
    .eq("product_id", productId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }

  return data as Review[];
}

export async function submitReview(data: {
  product_id: string;
  rating: number;
  comment: string;
}) {
  const supabase = await createClient();
  
  // Get current user
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error("You must be logged in to submit a review");
  }

  const { error } = await supabase
    .from("reviews")
    .insert({
      product_id: data.product_id,
      user_id: user.id,
      rating: data.rating,
      comment: data.comment,
    });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/product/[slug]`, 'page');
}
