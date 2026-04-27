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

export async function getOrders() {
  const supabase = await getSupabase();
  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      profiles (
        full_name,
        email
      )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching orders:", error);
    return [];
  }

  return data;
}

export async function getUserOrders() {
  const supabase = await getSupabase();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching user orders:", error);
    return [];
  }

  return data;
}

export async function getOrderById(id: string) {
  const supabase = await getSupabase();
  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      profiles (
        full_name,
        email
      ),
      order_items (
        *,
        products (
          name,
          images
        )
      )
    `)
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching order by ID:", error);
    return null;
  }

  return data;
}
