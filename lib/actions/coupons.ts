"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/supabase/server";
import { couponSchema } from "@/lib/validations/admin";

async function getSupabase() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
      },
    }
  );
}

export async function getCoupons() {
  const supabase = await getSupabase();
  const { data, error } = await supabase
    .from("coupons")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching coupons:", error);
    return [];
  }

  return data;
}

export async function validateCoupon(code: string, orderTotal: number) {
  const supabase = await getSupabase();
  
  const { data: coupon, error } = await supabase
    .from("coupons")
    .select("*")
    .eq("code", code.toUpperCase())
    .single();

  if (error || !coupon) {
    return { error: "Invalid coupon code" };
  }

  if (!coupon.is_active) {
    return { error: "This coupon is no longer active" };
  }

  if (coupon.expires_at && new Date(coupon.expires_at) < new Date()) {
    return { error: "This coupon has expired" };
  }

  if (coupon.min_order_value && orderTotal < coupon.min_order_value) {
    return { error: `Minimum order value of GHS ${coupon.min_order_value} required` };
  }

  if (coupon.usage_limit && coupon.usage_count >= coupon.usage_limit) {
    return { error: "This coupon has reached its usage limit" };
  }

  return { success: true, coupon };
}

export async function deleteCoupon(id: string) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase
    .from("coupons")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/dashboard/coupons");
  return { success: true };
}

export async function getCouponById(id: string) {
  const supabase = await getSupabase();
  const { data, error } = await supabase
    .from("coupons")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching coupon:", error);
    return null;
  }

  return data;
}

export async function updateCoupon(id: string, values: any) {
  const { supabase } = await requireAdmin();
  const validValues = couponSchema.parse(values);
  
  const { error } = await supabase
    .from("coupons")
    .update(validValues)
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/dashboard/coupons");
  return { success: true };
}
