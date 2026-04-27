import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, ChevronRight, Search, Filter, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

import { getUserOrders } from "@/lib/actions/orders";
import { cn } from "@/lib/utils";

export default async function OrdersPage() {
  const orders = await getUserOrders();

  return (
    <div className="p-6 sm:p-10 space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-extrabold tracking-tight">Order History</h1>
        <p className="text-muted-foreground">Track and manage your recent purchases.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search orders by ID..." className="pl-10 rounded-xl" />
        </div>
        <Button variant="outline" className="rounded-xl gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div 
            key={order.id} 
            className="flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-3xl border border-muted/50 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 group gap-6"
          >
            <div className="flex items-center gap-6">
              <div className="h-20 w-20 shrink-0 rounded-2xl overflow-hidden border bg-muted relative flex items-center justify-center">
                 <Package className="h-8 w-8 text-slate-300" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-extrabold text-lg">#{order.order_number}</h3>
                  <Badge 
                    variant={order.status === 'delivered' ? 'success' : order.status === 'cancelled' ? 'destructive' : 'secondary'}
                    className="capitalize px-3 py-0.5 rounded-lg text-[10px] font-bold"
                  >
                    {order.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground font-medium">
                  {new Date(order.created_at).toLocaleDateString()} • {order.payment_status}
                </p>
                <p className="text-primary font-bold">{formatPrice(order.total)}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link href={`/account/orders/${order.id}`}>
                <Button variant="outline" size="sm" className="rounded-xl gap-2 px-4 h-10">
                  <Eye className="h-4 w-4" />
                  View Details
                </Button>
              </Link>
              <Button variant="ghost" size="icon" className="rounded-xl h-10 w-10 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex">
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {orders.length === 0 && (
        <div className="text-center py-20 space-y-4">
          <div className="p-6 bg-muted rounded-full inline-block">
            <Package className="h-12 w-12 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-bold">No orders yet</h3>
          <p className="text-muted-foreground">When you make a purchase, it will appear here.</p>
          <Link href="/shop">
            <Button>Start Shopping</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
