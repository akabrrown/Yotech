import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { Package, Truck, Calendar, MapPin, CreditCard, ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { getOrderById } from "@/lib/actions/orders";
import { notFound } from "next/navigation";

export default async function OrderDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const order = await getOrderById(id);

  if (!order) {
    notFound();
  }

  return (
    <div className="p-6 sm:p-10 space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <Link href="/account/orders" className="text-sm font-bold text-primary flex items-center gap-1 mb-2">
            <ChevronLeft className="h-4 w-4" /> Back to Orders
          </Link>
          <h1 className="text-3xl font-extrabold tracking-tight">Order #{order.order_number}</h1>
          <p className="text-muted-foreground flex items-center gap-2">
            <Calendar className="h-4 w-4" /> Placed on {new Date(order.created_at).toLocaleDateString()}
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl">Invoice PDF</Button>
          <Button className="rounded-xl">Track Order</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Order Items */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-3xl border border-muted/50 overflow-hidden">
            <div className="bg-muted/30 p-4 border-b flex items-center justify-between">
              <span className="font-bold">Items Summary</span>
              <Badge variant="success" className="capitalize">{order.status}</Badge>
            </div>
            <div className="divide-y">
              {order.order_items?.map((item: { id: string; qty: number; price: number; products: { name: string; images: string[] } | null }) => (
                <div key={item.id} className="p-6 flex gap-6">
                  <div className="h-24 w-24 shrink-0 rounded-2xl overflow-hidden border bg-muted relative flex items-center justify-center">
                    {item.products?.images?.[0] ? (
                      <Image src={item.products.images[0]} alt={item.products.name} fill className="object-cover" />
                    ) : (
                      <Package className="h-8 w-8 text-slate-300" />
                    )}
                  </div>
                  <div className="flex-grow space-y-1">
                    <h4 className="font-bold text-lg">{item.products?.name}</h4>
                    <p className="text-muted-foreground text-sm">Qty: {item.qty}</p>
                    <p className="text-primary font-bold">{formatPrice(item.price)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl border border-muted/50 space-y-4">
              <h3 className="font-bold flex items-center gap-2 text-primary">
                <MapPin className="h-5 w-5" /> Shipping Address
              </h3>
              <div className="text-sm space-y-1 text-muted-foreground font-medium">
                <p className="text-foreground font-bold">{order.profiles?.full_name}</p>
                <p>Delivery information handled via Paystack checkout.</p>
                <p className="pt-2">{order.profiles?.email}</p>
              </div>
            </div>
            <div className="p-6 rounded-3xl border border-muted/50 space-y-4">
              <h3 className="font-bold flex items-center gap-2 text-primary">
                <CreditCard className="h-5 w-5" /> Payment Method
              </h3>
              <div className="text-sm space-y-1 text-muted-foreground font-medium">
                <p className="text-foreground font-bold">Paystack</p>
                <p className="capitalize">Status: <span className="text-success font-bold">{order.payment_status}</span></p>
                <p className="text-xs pt-2 font-mono">ID: {order.id.slice(0, 8)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Summary */}
        <div className="space-y-6">
          <div className="p-8 bg-muted/20 rounded-3xl border border-muted/50 space-y-4 sticky top-24">
            <h3 className="font-bold text-xl border-b pb-4">Order Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(order.total)}</span>
              </div>
              <div className="flex justify-between text-sm font-medium">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-success font-bold">FREE</span>
              </div>
              <div className="flex justify-between text-sm font-medium">
                <span className="text-muted-foreground">Tax</span>
                <span>{formatPrice(0)}</span>
              </div>
              <div className="flex justify-between text-2xl font-extrabold pt-4 border-t border-muted-foreground/10">
                <span>Total</span>
                <span className="text-primary">{formatPrice(order.total)}</span>
              </div>
            </div>
            <div className="pt-6 space-y-4">
              <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-muted/50">
                <Truck className="h-5 w-5 text-primary" />
                <div className="text-xs">
                  <p className="font-bold">Shipping via DHL/Local Logistics</p>
                  <p className="text-muted-foreground">Delivery in 3-5 business days</p>
                </div>
              </div>
              <Button variant="outline" className="w-full h-12 rounded-xl">Need Help with Order?</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
