import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ShoppingCart, Search, Filter, Download, ExternalLink, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getOrders } from "@/lib/actions/orders";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default async function OrdersPage() {
  const orders = await getOrders();

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Orders</h1>
          <p className="text-slate-500 font-medium">Track and manage customer orders.</p>
        </div>
        <Button variant="outline" className="rounded-xl border-slate-200 bg-white gap-2 font-bold text-xs uppercase tracking-widest">
          <Download className="h-4 w-4" />
          Export Orders
        </Button>
      </div>

      <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
        <CardHeader className="border-b bg-slate-50/50 p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input 
                placeholder="Search by order ID or customer..." 
                className="pl-10 rounded-xl border-slate-200 bg-white"
              />
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="rounded-xl gap-2 border-slate-200 bg-white font-bold text-xs uppercase tracking-widest">
                <Filter className="h-4 w-4" />
                Status: All
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {orders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Order ID</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Customer</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Date</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Total</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <span className="font-bold text-slate-900">#{order.order_number}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-700">{order.profiles?.full_name || "Guest"}</span>
                          <span className="text-xs text-slate-400">{order.profiles?.email || "No email"}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-slate-600">
                          {new Date(order.created_at).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <Badge className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                          order.status === 'delivered' ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100" :
                          order.status === 'processing' ? "bg-blue-100 text-blue-700 hover:bg-blue-100" :
                          order.status === 'shipped' ? "bg-violet-100 text-violet-700 hover:bg-violet-100" :
                          "bg-amber-100 text-amber-700 hover:bg-amber-100"
                        )}>
                          {order.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 font-extrabold text-slate-900">
                        {formatPrice(order.total)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                           <Button variant="ghost" size="sm" className="h-9 rounded-xl gap-2 font-bold text-xs">
                             <Eye className="h-4 w-4" />
                             Details
                           </Button>
                           <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl">
                             <ExternalLink className="h-4 w-4 text-slate-400" />
                           </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="h-96 flex flex-col items-center justify-center text-center p-12">
              <div className="h-16 w-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 mb-4">
                <ShoppingCart className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">No orders yet</h3>
              <p className="text-slate-500 max-w-xs mt-1">
                When customers start purchasing, their orders will appear here.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
