"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, Bell, Shield, Globe, CreditCard, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateStoreSetting } from "@/lib/actions/settings";
import { toast } from "react-hot-toast";
import { cn } from "@/lib/utils";

interface StoreSetting {
  key: string;
  value: Record<string, unknown>;
  description?: string;
  updated_at?: string;
}

interface SettingsFormProps {
  initialSettings: StoreSetting[];
}

export function SettingsForm({ initialSettings }: SettingsFormProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  
  // Parse initial settings into state
  const general = initialSettings.find(s => s.key === 'general')?.value || {};
  const payment = initialSettings.find(s => s.key === 'payment')?.value || {};
  const notifications = initialSettings.find(s => s.key === 'notifications')?.value || {};

  const [generalSettings, setGeneralSettings] = React.useState<Record<string, string>>(general as Record<string, string>);
  const [notifs, setNotifs] = React.useState<Record<string, boolean>>(notifications as Record<string, boolean>);
  const [paymentSettings, setPaymentSettings] = React.useState<Record<string, any>>(payment as Record<string, any>);
  const [showPaystackConfig, setShowPaystackConfig] = React.useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await Promise.all([
        updateStoreSetting('general', generalSettings),
        updateStoreSetting('payment', paymentSettings),
        updateStoreSetting('notifications', notifs)
      ]);
      toast.success("Settings updated successfully");
    } catch (error: unknown) {
      const err = error as Error;
      toast.error(err.message || "Failed to update settings");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleNotif = (key: string) => {
    setNotifs((prev: Record<string, boolean>) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Site Settings</h1>
          <p className="text-slate-500 font-medium">Configure your store preferences and global settings.</p>
        </div>
        <Button 
          onClick={handleSave} 
          disabled={isLoading}
          className="rounded-xl shadow-lg shadow-primary/20 gap-2 min-w-[140px]"
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
            <CardHeader className="border-b bg-slate-50/50 p-6">
              <CardTitle className="text-lg flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                General Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Store Name</label>
                  <Input 
                    value={generalSettings.store_name || ""} 
                    onChange={(e) => setGeneralSettings({...generalSettings, store_name: e.target.value})}
                    className="rounded-xl" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Support Email</label>
                  <Input 
                    value={generalSettings.support_email || ""} 
                    onChange={(e) => setGeneralSettings({...generalSettings, support_email: e.target.value})}
                    className="rounded-xl" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone Number</label>
                  <Input 
                    value={generalSettings.phone || ""} 
                    onChange={(e) => setGeneralSettings({...generalSettings, phone: e.target.value})}
                    className="rounded-xl" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Address</label>
                  <Input 
                    value={generalSettings.address || ""} 
                    onChange={(e) => setGeneralSettings({...generalSettings, address: e.target.value})}
                    className="rounded-xl" 
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
            <CardHeader className="border-b bg-slate-50/50 p-6">
              <CardTitle className="text-lg flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-emerald-500" />
                Payment & Currency
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                <div>
                  <p className="font-bold text-emerald-900">Paystack Integration</p>
                  <p className="text-sm text-emerald-700">
                    {paymentSettings.paystack_enabled ? "Currently active for all transactions." : "Paystack is currently disabled."}
                  </p>
                </div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => setShowPaystackConfig(!showPaystackConfig)}
                  className="bg-white border-emerald-200"
                >
                  {showPaystackConfig ? "Close" : "Configure"}
                </Button>
              </div>
              
              {showPaystackConfig && (
                <div className="p-4 border rounded-2xl space-y-4 bg-slate-50/50">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">Enable Paystack</h4>
                      <p className="text-xs text-slate-500">Allow customers to pay via card, mobile money, and USSD.</p>
                    </div>
                    <button 
                      onClick={() => setPaymentSettings({...paymentSettings, paystack_enabled: !paymentSettings.paystack_enabled})}
                      className={cn(
                        "h-6 w-11 rounded-full p-1 flex transition-colors duration-200",
                        paymentSettings.paystack_enabled ? "bg-emerald-500 justify-end" : "bg-slate-300 justify-start"
                      )}
                    >
                      <div className="h-4 w-4 bg-white rounded-full shadow-sm" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700">Public Key</label>
                    <Input 
                      placeholder="pk_live_..." 
                      value={paymentSettings.paystack_public_key || ""}
                      onChange={(e) => setPaymentSettings({...paymentSettings, paystack_public_key: e.target.value})}
                      className="rounded-xl font-mono text-xs" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700">Secret Key</label>
                    <Input 
                      type="password"
                      placeholder="sk_live_..." 
                      value={paymentSettings.paystack_secret_key || ""}
                      onChange={(e) => setPaymentSettings({...paymentSettings, paystack_secret_key: e.target.value})}
                      className="rounded-xl font-mono text-xs" 
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium">Store Currency</label>
                <div className="flex items-center gap-3">
                  <Input defaultValue={(payment.currency as string) || "GHS"} disabled className="max-w-[100px] rounded-xl bg-slate-50" />
                  <span className="text-sm text-slate-500">Ghanaian Cedi (GHS)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-none shadow-sm rounded-3xl bg-[#0F172A] text-white overflow-hidden">
            <CardHeader className="p-6 pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {[
                { label: "Order Confirmation", key: "order_confirmation" },
                { label: "Inventory Alerts", key: "inventory_alerts" },
                { label: "Customer Signups", key: "customer_signup" },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between py-3 border-b border-slate-800 last:border-0">
                  <span className="text-sm font-medium">{item.label}</span>
                  <button 
                    onClick={() => toggleNotif(item.key)}
                    className={cn(
                      "h-6 w-11 rounded-full p-1 flex transition-colors duration-200",
                      notifs[item.key] ? "bg-primary justify-end" : "bg-slate-700 justify-start"
                    )}
                  >
                    <div className="h-4 w-4 bg-white rounded-full shadow-sm" />
                  </button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
            <CardHeader className="border-b bg-rose-50/50 p-6">
              <CardTitle className="text-lg flex items-center gap-2 text-rose-600">
                <Shield className="h-5 w-5" />
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-sm font-medium">All systems operational</span>
                </div>
                <Button variant="outline" className="w-full rounded-xl border-rose-100 text-rose-600 hover:bg-rose-50 hover:text-rose-700">Maintenance Mode</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
