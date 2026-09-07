import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tag, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { getCoupons } from "@/lib/actions/coupons";
import { CouponsClient } from "./coupons-client";

export default async function CouponsPage() {
  const coupons = await getCoupons();

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Coupons</h1>
          <p className="text-slate-500 font-medium">Create and manage discount codes for your customers.</p>
        </div>
        <Link href="/dashboard/coupons/new">
          <Button className="rounded-xl shadow-lg shadow-primary/20 gap-2">
            <Plus className="h-4 w-4" />
            Create Coupon
          </Button>
        </Link>
      </div>

      <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
        <CardHeader className="border-b bg-slate-50/50 p-6">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search coupons..." 
              className="pl-10 rounded-xl border-slate-200 bg-white"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <CouponsClient coupons={coupons} />
        </CardContent>
      </Card>
    </div>
  );
}

