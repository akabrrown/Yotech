import { getCouponById } from "@/lib/actions/coupons";
import { CouponForm } from "../new/coupon-form";
import { notFound } from "next/navigation";

interface EditCouponPageProps {
  params: {
    id: string;
  };
}

export default async function EditCouponPage({ params }: EditCouponPageProps) {
  const coupon = await getCouponById(params.id);

  if (!coupon) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Edit Coupon</h1>
        <p className="text-slate-500 font-medium">Update the details of your discount code.</p>
      </div>

      <CouponForm initialData={coupon} />
    </div>
  );
}
