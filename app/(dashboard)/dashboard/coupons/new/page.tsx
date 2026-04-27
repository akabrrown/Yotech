import { CouponForm } from "./coupon-form";

export default function NewCouponPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Create Coupon</h1>
        <p className="text-slate-500 font-medium">Generate a new discount code for your store.</p>
      </div>
      
      <CouponForm />
    </div>
  );
}
