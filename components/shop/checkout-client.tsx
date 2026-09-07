"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/utils";
import { ShieldCheck, Truck, CreditCard, CheckCircle2, Loader2, Tag } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { validateCoupon } from "@/lib/actions/coupons";
import { toast } from "react-hot-toast";

interface CheckoutClientProps {
  settings?: any[];
}

export function CheckoutClient({ settings }: CheckoutClientProps) {
  const { items, totalPrice } = useCart();
  const [step, setStep] = React.useState(1); // 1: Shipping, 2: Payment, 3: Confirmation
  const [orderId, setOrderId] = React.useState<string>("");
  
  // Coupon state
  const [couponCode, setCouponCode] = React.useState("");
  const [isApplyingCoupon, setIsApplyingCoupon] = React.useState(false);
  const [appliedCoupon, setAppliedCoupon] = React.useState<any>(null);

  // Shipping logic
  const shippingConfig = settings?.find(s => s.key === 'shipping')?.value || {
    flat_rate: 0,
    free_shipping_threshold: 0
  };

  const shippingCost = React.useMemo(() => {
    // Check if coupon provides free shipping
    if (appliedCoupon?.type === 'free_shipping') return 0;
    
    // Check if total meets free shipping threshold
    if (shippingConfig.free_shipping_threshold > 0 && totalPrice >= shippingConfig.free_shipping_threshold) {
      return 0;
    }
    
    return shippingConfig.flat_rate || 0;
  }, [totalPrice, shippingConfig, appliedCoupon]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setOrderId(Math.floor(Math.random() * 1000000).toString().padStart(6, "0"));
    }, 0);
    return () => clearTimeout(timeout);
  }, []);

  const handleApplyCoupon = async () => {
    if (!couponCode) return;
    setIsApplyingCoupon(true);
    try {
      const result = await validateCoupon(couponCode, totalPrice);
      if (result.error) {
        toast.error(result.error);
        setAppliedCoupon(null);
      } else {
        toast.success("Coupon applied successfully!");
        setAppliedCoupon(result.coupon);
      }
    } catch {
      toast.error("Failed to apply coupon");
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    toast.success("Coupon removed");
  };

  const discountAmount = React.useMemo(() => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.type === "percentage") {
      return (totalPrice * appliedCoupon.value) / 100;
    } else if (appliedCoupon.type === "fixed") {
      return Math.min(appliedCoupon.value, totalPrice);
    }
    return 0; 
  }, [appliedCoupon, totalPrice]);

  const finalPrice = Math.max(0, totalPrice - discountAmount + shippingCost);

  if (items.length === 0 && step !== 3) {
    return (
      <main className="flex-grow flex flex-col items-center justify-center p-6 text-center space-y-4">
        <h2 className="text-2xl font-bold">Your cart is empty</h2>
        <p className="text-muted-foreground">Add some products to your cart before checking out.</p>
        <Link href="/shop">
          <Button>Go to Shop</Button>
        </Link>
      </main>
    );
  }

  return (
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
                    <Input placeholder="+233 ..." />
                  </div>
                  <div className="sm:col-span-2 space-y-2">
                    <label className="text-sm font-medium">Street Address</label>
                    <Input placeholder="123 Tech Lane" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">City</label>
                    <Input placeholder="Accra" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">State/Region</label>
                    <Input placeholder="Greater Accra Region" />
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
                    Pay {formatPrice(finalPrice)}
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
                
                {/* Coupon Code Section */}
                <div className="space-y-3 mb-6 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-700">Promo Code</p>
                    {appliedCoupon && (
                      <button onClick={handleRemoveCoupon} className="text-xs text-rose-500 hover:text-rose-600 font-bold">Remove</button>
                    )}
                  </div>
                  
                  {!appliedCoupon ? (
                    <div className="flex gap-2">
                      <div className="relative flex-grow">
                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input 
                          placeholder="Enter code" 
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          className="pl-9 rounded-xl font-mono uppercase bg-slate-50"
                          onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
                        />
                      </div>
                      <Button 
                        variant="secondary" 
                        onClick={handleApplyCoupon}
                        disabled={isApplyingCoupon || !couponCode}
                        className="rounded-xl w-20"
                      >
                        {isApplyingCoupon ? <Loader2 className="h-4 w-4 animate-spin" /> : "Apply"}
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-100">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-md bg-emerald-100 text-emerald-600">
                          <Tag className="h-4 w-4" />
                        </div>
                        <span className="font-bold text-sm text-emerald-800 uppercase tracking-widest">{appliedCoupon.code}</span>
                      </div>
                      <span className="text-sm font-bold text-emerald-600">
                        -{appliedCoupon.type === 'percentage' ? `${appliedCoupon.value}%` : formatPrice(appliedCoupon.value)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-2 pt-4 border-t">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-emerald-600 font-medium">Discount</span>
                      <span className="text-emerald-600 font-bold">-{formatPrice(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    {shippingCost === 0 ? (
                      <span className="text-emerald-600 font-bold uppercase text-[10px] tracking-widest">Free</span>
                    ) : (
                      <span className="font-bold">{formatPrice(shippingCost)}</span>
                    )}
                  </div>
                  <div className="flex justify-between text-lg font-extrabold pt-4 border-t">
                    <span>Total</span>
                    <span className="text-primary">{formatPrice(finalPrice)}</span>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

