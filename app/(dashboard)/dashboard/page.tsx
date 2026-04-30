import { 
  Users, 
  ShoppingBag, 
  DollarSign, 
  ArrowUpRight, 
  Clock,
  ExternalLink,
  Package,
  Tag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

import { getDashboardStats } from "@/lib/actions/dashboard";

interface RecentOrder {
  id: string;
  order_number: string;
  total: number;
  status: string;
  created_at: string;
  profiles: {
    full_name: string | null;
  }[] | { full_name: string | null } | null;
}

export default async function AdminDashboard() {
  const { totalRevenue, totalOrders, newCustomers, recentOrders, lowStockCount } = await getDashboardStats();

  const stats = [
    { 
      label: "Total Revenue", 
      value: totalRevenue, 
      trend: "up", 
      icon: DollarSign, 
      color: "bg-emerald-50 text-emerald-600",
      isCurrency: true
    },
    { 
      label: "Total Orders", 
      value: totalOrders, 
      trend: "up", 
      icon: ShoppingBag, 
      color: "bg-blue-50 text-blue-600",
      isCurrency: false
    },
    { 
      label: "New Customers", 
      value: newCustomers, 
      trend: "up", 
      icon: Users, 
      color: "bg-amber-50 text-amber-600",
      isCurrency: false
    },
    { 
      label: "Low Stock Items", 
      value: lowStockCount, 
      trend: lowStockCount > 0 ? "down" : "up", 
      icon: Package, 
      color: lowStockCount > 0 ? "bg-rose-50 text-rose-600" : "bg-violet-50 text-violet-600",
      isCurrency: false
    },
  ];

  const formattedRecentOrders = (recentOrders as unknown as RecentOrder[]).map((order) => {
    const profile = Array.isArray(order.profiles) ? order.profiles[0] : order.profiles;
    return {
      id: `#${order.order_number}`,
      customer: profile?.full_name || "Guest",
      items: 0,
      total: Number(order.total),
      status: order.status
    };
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Dashboard Overview</h1>
          <p className="text-slate-500 font-medium">Welcome back! Here&apos;s what&apos;s happening with your store today.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl border-slate-200">
            <Clock className="mr-2 h-4 w-4" />
            Last 30 Days
          </Button>
          <Button className="rounded-xl shadow-lg shadow-primary/20">
            Download Report
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-none shadow-sm rounded-2xl overflow-hidden group hover:shadow-md transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className={cn("p-3 rounded-xl transition-transform group-hover:scale-110 duration-300", stat.color)}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className={cn(
                  "flex items-center text-[10px] font-bold px-2 py-1 rounded-lg bg-slate-50 text-slate-400 uppercase tracking-widest"
                )}>
                  Live Data
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <p className="text-2xl font-extrabold text-slate-900">
                  {stat.isCurrency ? formatPrice(stat.value as number) : stat.value}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="xl:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-slate-900">Recent Orders</h2>
            <Link href="/dashboard/orders" className="text-sm font-bold text-primary hover:underline flex items-center">
              View All <ArrowUpRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Total</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {formattedRecentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-900">{order.id}</td>
                      <td className="px-6 py-4 font-medium text-slate-600">{order.customer}</td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                          order.status === 'delivered' ? "bg-emerald-100 text-emerald-700" :
                          order.status === 'processing' ? "bg-blue-100 text-blue-700" :
                          "bg-amber-100 text-amber-700"
                        )}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-900">{formatPrice(order.total)}</td>
                      <td className="px-6 py-4">
                        <Button variant="ghost" size="sm" className="rounded-xl h-8 w-8 p-0">
                          <ExternalLink className="h-4 w-4 text-slate-400" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Quick Actions / Activity */}
        <div className="space-y-4">
          <h2 className="text-xl font-extrabold text-slate-900">Quick Actions</h2>
          <div className="grid gap-4">
            <Button className="w-full h-16 rounded-2xl bg-white border border-slate-200 text-slate-900 hover:bg-slate-50 shadow-none justify-between px-6 group">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                  <Package className="h-5 w-5" />
                </div>
                <span className="font-bold">Add New Product</span>
              </div>
              <ArrowUpRight className="h-5 w-5 text-slate-300 group-hover:text-primary transition-colors" />
            </Button>
            <Button className="w-full h-16 rounded-2xl bg-white border border-slate-200 text-slate-900 hover:bg-slate-50 shadow-none justify-between px-6 group">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center">
                  <Tag className="h-5 w-5" />
                </div>
                <span className="font-bold">Create Coupon</span>
              </div>
              <ArrowUpRight className="h-5 w-5 text-slate-300 group-hover:text-amber-600 transition-colors" />
            </Button>
            <Button className="w-full h-16 rounded-2xl bg-[#0F172A] text-white hover:bg-slate-800 shadow-none justify-between px-6 group">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center">
                  <Users className="h-5 w-5" />
                </div>
                <span className="font-bold">Manage Customers</span>
              </div>
              <ArrowUpRight className="h-5 w-5 text-slate-600 group-hover:text-white transition-colors" />
            </Button>
          </div>

           <Card className={cn(
             "border-none shadow-sm rounded-3xl overflow-hidden relative",
             lowStockCount > 0 ? "bg-rose-500" : "bg-primary"
           )}>
            <div className="absolute top-0 right-0 -mr-12 -mt-12 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
            <CardContent className="p-6 text-white space-y-4 relative z-10">
              <h3 className="font-bold text-lg">Inventory Alert</h3>
              <p className="text-sm text-white/80 font-medium">
                {lowStockCount > 0 
                  ? `${lowStockCount} products are running low on stock. Check your inventory soon.`
                  : "All products are well-stocked. Great job!"}
              </p>
              <Link href="/dashboard/products" className="block">
                <Button className="w-full bg-white text-slate-900 hover:bg-slate-100 rounded-xl font-bold">Review Inventory</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

import { cn } from "@/lib/utils";
