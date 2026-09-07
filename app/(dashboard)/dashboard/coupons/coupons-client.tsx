"use client";

import * as React from "react";
import { Tag, Edit, Trash2, Hash, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice, cn } from "@/lib/utils";
import { deleteCoupon } from "@/lib/actions/coupons";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Coupon {
  id: string;
  code: string;
  type: string;
  value: number;
  usage_limit: number | null;
  usage_count: number;
  is_active: boolean;
  expires_at: string | null;
}

interface CouponsClientProps {
  coupons: Coupon[];
}

export function CouponsClient({ coupons }: CouponsClientProps) {
  const [isDeleting, setIsDeleting] = React.useState<string | null>(null);
  const router = useRouter();

  const onDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this coupon? This action cannot be undone.")) {
      setIsDeleting(id);
      try {
        await deleteCoupon(id);
        toast.success("Coupon deleted successfully");
        router.refresh();
      } catch (error: any) {
        toast.error(error.message || "Failed to delete coupon");
      } finally {
        setIsDeleting(null);
      }
    }
  };

  if (coupons.length === 0) {
    return (
      <div className="h-96 flex flex-col items-center justify-center text-center p-12">
        <div className="h-16 w-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 mb-4">
          <Tag className="h-8 w-8" />
        </div>
        <h3 className="text-lg font-bold text-slate-900">No coupons active</h3>
        <p className="text-slate-500 max-w-xs mt-1">
          Create your first coupon to start offering discounts.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-100">
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Code</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Type</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Value</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Usage</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {coupons.map((coupon) => (
            <tr key={coupon.id} className="hover:bg-slate-50/50 transition-colors group">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <Tag className="h-4 w-4" />
                  </div>
                  <span className="font-extrabold text-slate-900 group-hover:text-primary transition-colors tracking-wider uppercase">
                    {coupon.code}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4">
                <Badge variant="outline" className="rounded-lg font-bold text-[10px] uppercase tracking-widest bg-slate-50 border-slate-200">
                  {coupon.type.replace('_', ' ')}
                </Badge>
              </td>
              <td className="px-6 py-4 font-bold text-slate-900">
                {coupon.type === 'percentage' ? `${coupon.value}%` : formatPrice(coupon.value)}
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
                    <Hash className="h-3 w-3 text-slate-400" />
                    {coupon.usage_count || 0} / {coupon.usage_limit || '∞'}
                  </div>
                  <div className="w-16 h-1 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full" 
                      style={{ width: `${coupon.usage_limit ? (coupon.usage_count / coupon.usage_limit) * 100 : 0}%` }} 
                    />
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <Badge className={cn(
                  "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                  coupon.is_active ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100" : "bg-slate-100 text-slate-500 hover:bg-slate-100"
                )}>
                  {coupon.is_active ? 'Active' : 'Inactive'}
                </Badge>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <Link href={`/dashboard/coupons/${coupon.id}`}>
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl">
                      <Edit className="h-4 w-4 text-slate-400" />
                    </Button>
                  </Link>
                  
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-9 w-9 rounded-xl hover:text-rose-500 hover:bg-rose-50"
                    disabled={isDeleting === coupon.id}
                    onClick={() => onDelete(coupon.id)}
                  >
                    {isDeleting === coupon.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

