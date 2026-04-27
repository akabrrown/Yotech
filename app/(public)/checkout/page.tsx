"use client";

import * as React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/utils";
import { ShieldCheck, Truck, CreditCard, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const { items, totalPrice } = useCart();
  const [step, setStep] = React.useState(1); // 1: Shipping, 2: Payment, 3: Confirmation
  const [orderId, setOrderId] = React.useState<string>("");

  React.useEffect(() => {
    setOrderId(Math.floor(Math.random() * 1000000).toString().padStart(6, "0"));
  }, []);

  if (items.length === 0 && step !== 3) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex flex-col items-center justify-center p-6 text-center space-y-4">
          <h2 className="text-2xl font-bold">Your cart is empty</h2>
          <p className="text-muted-foreground">Add some products to your cart before checking out.</p>
          <Link href="/shop">
            <Button>Go to Shop</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-muted/30">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-5xl mx-auto">
          {/* Checkout Steps Header */}
          <div className="flex items-center justify-between mb-12 relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-muted -z-10" />
            {[
              { id: 1, name: "Shipping", icon: Truck },
              { id: 2, name: "Payment", icon: CreditCard },
              { id: 3, name: "Confirmation", icon: CheckCircle2 },
            ].map((s) => (
              <div key={s.id} className="flex flex-col items-center gap-2">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                  step >= s.id ? "bg-primary border-primary text-white" : "bg-white border-muted text-muted-foreground"
                )}>
                  <s.icon className="h-5 w-5" />
                </div>
                <span className={cn("text-xs font-bold uppercase tracking-wider", step >= s.id ? "text-primary" : "text-muted-foreground")}>
                  {s.name}
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form Area */}
            <div className="lg:col-span-2 space-y-6">
              {step === 1 && (
                <Card className="p-6 sm:p-8 space-y-6 border-none shadow-xl">
                  <h2 className="text-2xl font-bold">Shipping Information</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Full Name</label>
                      <Input placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Phone Number</label>
                      <Input placeholder="+234 ..." />
                    </div>
                    <div className="sm:col-span-2 space-y-2">
                      <label className="text-sm font-medium">Street Address</label>
                      <Input placeholder="123 Tech Lane" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">City</label>
                      <Input placeholder="Lagos" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">State</label>
                      <Input placeholder="Lagos" />
                    </div>
                  </div>
                  <Button onClick={() => setStep(2)} className="w-full h-14 text-lg rounded-xl">
                    Continue to Payment
                  </Button>
                </Card>
              )}

              {step === 2 && (
                <Card className="p-6 sm:p-8 space-y-6 border-none shadow-xl text-center">
                  <h2 className="text-2xl font-bold">Secure Payment</h2>
                  <p className="text-muted-foreground">You will be redirected to Paystack to complete your purchase securely.</p>
                  <div className="p-8 border-2 border-dashed rounded-2xl bg-muted/20 flex flex-col items-center gap-4">
                    <div className="p-4 rounded-full bg-primary/10">
                      <ShieldCheck className="h-12 w-12 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold text-lg">Pay with Paystack</p>
                      <p className="text-sm text-muted-foreground">Cards, Bank Transfer, USSD</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setStep(1)} className="flex-grow h-14 rounded-xl">
                      Back
                    </Button>
                    <Button onClick={() => setStep(3)} className="flex-[2] h-14 text-lg rounded-xl">
                      Pay {formatPrice(totalPrice)}
                    </Button>
                  </div>
                </Card>
              )}

              {step === 3 && (
                <Card className="p-12 space-y-6 border-none shadow-xl text-center flex flex-col items-center animate-in zoom-in duration-500">
                  <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center text-success mb-4">
                    <CheckCircle2 className="h-12 w-12" />
                  </div>
                  <h2 className="text-3xl font-extrabold">Order Confirmed!</h2>
                  <p className="text-muted-foreground max-w-sm">
                    Thank you for your purchase. We&apos;ve sent a confirmation email to your inbox with your order details.
                  </p>
                  <div className="bg-muted/30 p-4 rounded-lg w-full max-w-xs font-mono text-sm">
                    Order ID: #YT-{orderId}
                  </div>
                  <Link href="/shop" className="pt-4">
                    <Button variant="primary" size="lg" className="rounded-xl">
                      Continue Shopping
                    </Button>
                  </Link>
                </Card>
              )}
            </div>

            {/* Order Summary Sidebar */}
            {step !== 3 && (
              <div className="space-y-6">
                <Card className="p-6 border-none shadow-xl sticky top-24">
                  <h3 className="font-bold text-lg mb-6 pb-4 border-b">Order Summary</h3>
                  <div className="space-y-4 mb-6">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{item.name} x {item.quantity}</span>
                        <span className="font-bold">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2 pt-4 border-t">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>{formatPrice(totalPrice)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="text-success font-bold">FREE</span>
                    </div>
                    <div className="flex justify-between text-lg font-extrabold pt-4">
                      <span>Total</span>
                      <span className="text-primary">{formatPrice(totalPrice)}</span>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
