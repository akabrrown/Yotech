"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { couponSchema, type CouponValues } from "@/lib/validations/coupon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { updateCoupon } from "@/lib/actions/coupons";

interface CouponFormProps {
  initialData?: any;
}

export function CouponForm({ initialData }: CouponFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const supabase = createClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: zodResolver(couponSchema),
    defaultValues: initialData ? {
      ...initialData,
      expires_at: initialData.expires_at ? new Date(initialData.expires_at).toISOString().split('T')[0] : "",
    } : {
      type: "percentage" as const,
      value: 0,
      min_order_value: 0,
      is_active: true,
    },
  });

  const onSubmit = async (values: CouponValues) => {
    setIsLoading(true);
    try {
      if (initialData?.id) {
        await updateCoupon(initialData.id, values);
        toast.success("Coupon updated successfully!");
      } else {
        const { error } = await supabase
          .from("coupons")
          .insert(values);

        if (error) {
          toast.error(error.message);
          setIsLoading(false);
          return;
        }
        toast.success("Coupon created successfully!");
      }

      setIsLoading(false);
      
      // Navigate in a separate tick to ensure the loading spinner stops first
      setTimeout(() => {
        router.push("/dashboard/coupons");
        router.refresh();
      }, 100);
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none shadow-sm rounded-3xl">
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Coupon Code</label>
                <Input placeholder="e.g. SUMMER25" {...register("code")} className="rounded-xl font-mono uppercase" />
                {errors.code?.message && <p className="text-xs text-destructive">{String(errors.code.message)}</p>}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Discount Type</label>
                  <select 
                    className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-primary outline-none transition-all"
                    {...register("type")}
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount (GHS)</option>
                    <option value="free_shipping">Free Shipping</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Value</label>
                  <Input type="number" step="0.01" {...register("value")} className="rounded-xl" />
                  {errors.value?.message && <p className="text-xs text-destructive">{String(errors.value.message)}</p>}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm rounded-3xl">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-bold text-lg">Restrictions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Minimum Order Value (GHS)</label>
                  <Input type="number" {...register("min_order_value")} className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Usage Limit</label>
                  <Input type="number" placeholder="No limit" {...register("usage_limit")} className="rounded-xl" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-none shadow-sm rounded-3xl">
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Expiry Date</label>
                <Input type="date" {...register("expires_at")} className="rounded-xl" />
              </div>

              <div className="flex items-center gap-3 py-2">
                <input type="checkbox" id="is_active" {...register("is_active")} className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary" />
                <label htmlFor="is_active" className="text-sm font-medium">Coupon is Active</label>
              </div>
            </CardContent>
          </Card>

          <Button type="submit" className="w-full h-14 rounded-2xl text-lg font-bold shadow-lg shadow-primary/20" disabled={isLoading}>
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : initialData ? "Update Coupon" : "Create Coupon"}
          </Button>
        </div>
      </div>
    </form>
  );
}
