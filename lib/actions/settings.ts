"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

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

export async function getStoreSettings() {
  const supabase = await getSupabase();
  const { data, error } = await supabase
    .from("store_settings")
    .select("*");

  if (error) {
    console.error("Error fetching settings:", error);
    return [];
  }

  return data;
}

export async function updateStoreSetting(key: string, value: unknown) {
  const supabase = await getSupabase();
  const { error } = await supabase
    .from("store_settings")
    .upsert({ key, value, updated_at: new Date().toISOString() });

  if (error) {
    throw new Error(error.message);
  }

  return { success: true };
}
