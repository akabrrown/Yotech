import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

import { getDashboardStats, getAnalyticsData } from "@/lib/actions/dashboard";
import { formatPrice } from "@/lib/utils";

export default async function AnalyticsPage() {
  const { totalRevenue, totalOrders, newCustomers } = await getDashboardStats();
  const dailyData = await getAnalyticsData();

  // Scale data for charts (0-100)
  const maxRevenue = Math.max(...dailyData.map(d => d.revenue), 1);
  const maxOrders = Math.max(...dailyData.map(d => d.count), 1);
  
  const revenueChartData = dailyData.map(d => (d.revenue / maxRevenue) * 100);
  const ordersChartData = dailyData.map(d => (d.count / maxOrders) * 100);
  // Using a simplified customer trend for now
  const customerChartData = dailyData.map(d => (d.count > 0 ? 50 + (d.count * 5) : 20));

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Analytics</h1>
          <p className="text-slate-500 font-medium">Gain insights into your store&apos;s performance based on real-time data.</p>
        </div>
        <Button variant="outline" className="rounded-xl border-slate-200 bg-white gap-2 font-bold text-xs uppercase tracking-widest">
          <Calendar className="h-4 w-4" />
          Last 30 Days
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="border-none shadow-sm rounded-3xl overflow-hidden hover:shadow-md transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold text-slate-400 uppercase tracking-widest">Customer Base</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2 mb-4">
              <span className="text-3xl font-extrabold text-slate-900">{newCustomers}</span>
              <span className="text-emerald-500 text-xs font-bold flex items-center mb-1">
                <TrendingUp className="h-3 w-3 mr-1" /> New This Month
              </span>
            </div>
            <div className="h-32 flex items-end justify-between gap-1.5">
              {customerChartData.map((h, i) => (
                <div key={i} className="bg-primary/20 hover:bg-primary transition-all duration-500 rounded-t-lg flex-1" style={{ height: `${h}%` }} />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm rounded-3xl overflow-hidden hover:shadow-md transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold text-slate-400 uppercase tracking-widest">Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2 mb-4">
              <span className="text-3xl font-extrabold text-slate-900">{formatPrice(totalRevenue)}</span>
              <span className="text-emerald-500 text-xs font-bold flex items-center mb-1">
                <TrendingUp className="h-3 w-3 mr-1" /> Lifetime
              </span>
            </div>
            <div className="h-32 flex items-end justify-between gap-1.5">
              {revenueChartData.map((h, i) => (
                <div key={i} className="bg-emerald-100 hover:bg-emerald-500 transition-all duration-500 rounded-t-lg flex-1" style={{ height: `${h}%` }} />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm rounded-3xl overflow-hidden hover:shadow-md transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold text-slate-400 uppercase tracking-widest">Order Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2 mb-4">
              <span className="text-3xl font-extrabold text-slate-900">{totalOrders}</span>
              <span className="text-blue-500 text-xs font-bold flex items-center mb-1">
                 Orders Processed
              </span>
            </div>
            <div className="h-32 flex items-end justify-between gap-1.5">
              {ordersChartData.map((h, i) => (
                <div key={i} className="bg-blue-100 hover:bg-blue-500 transition-all duration-500 rounded-t-lg flex-1" style={{ height: `${h}%` }} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
