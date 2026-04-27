import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function getDashboardStats() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
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

  // 1. Total Revenue
  const { data: revenueData } = await supabase
    .from("orders")
    .select("total")
    .eq("payment_status", "paid");
  
  const totalRevenue = revenueData?.reduce((acc, order) => acc + Number(order.total), 0) || 0;

  // 2. Total Orders
  const { count: totalOrders } = await supabase
    .from("orders")
    .select("*", { count: "exact", head: true });

  // 3. New Customers (last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const { count: newCustomers } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true })
    .eq("role", "customer")
    .gte("created_at", thirtyDaysAgo.toISOString());

  // 4. Recent Orders
  const { data: recentOrders } = await supabase
    .from("orders")
    .select(`
      id,
      order_number,
      total,
      status,
      created_at,
      profiles (
        full_name
      )
    `)
    .order("created_at", { ascending: false })
    .limit(5);

  // 5. Low Stock Count
  const { count: lowStockCount } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true })
    .lte("stock_qty", 5);

  return {
    totalRevenue,
    totalOrders: totalOrders || 0,
    newCustomers: newCustomers || 0,
    lowStockCount: lowStockCount || 0,
    recentOrders: recentOrders || [],
  };
}

export async function getAnalyticsData() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
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

  // Fetch orders for the last 10 days to build a chart
  const tenDaysAgo = new Date();
  tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);

  const { data: orders } = await supabase
    .from("orders")
    .select("total, created_at")
    .gte("created_at", tenDaysAgo.toISOString())
    .order("created_at", { ascending: true });

  // Group by day
  const dailyData = Array.from({ length: 10 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (9 - i));
    const dateStr = d.toISOString().split('T')[0];
    
    const dayOrders = orders?.filter(o => o.created_at.startsWith(dateStr)) || [];
    return {
      date: dateStr,
      revenue: dayOrders.reduce((acc, o) => acc + Number(o.total), 0),
      count: dayOrders.length
    };
  });

  return dailyData;
}
