import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Bell, Eye, ShieldCheck, Smartphone } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="p-6 sm:p-10 space-y-12">
      <div className="space-y-1">
        <h1 className="text-3xl font-extrabold tracking-tight">Account Settings</h1>
        <p className="text-muted-foreground">Manage your password, security, and notification preferences.</p>
      </div>

      {/* Security Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b">
          <Lock className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold">Password & Security</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-bold">Current Password</label>
              <div className="relative">
                <Input type="password" placeholder="••••••••" className="rounded-xl h-12 pr-10" />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary">
                  <Eye className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold">New Password</label>
              <Input type="password" placeholder="Enter new password" className="rounded-xl h-12" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold">Confirm New Password</label>
              <Input type="password" placeholder="Confirm new password" className="rounded-xl h-12" />
            </div>
            <Button className="rounded-xl px-8 shadow-lg shadow-primary/10">Update Password</Button>
          </div>

          <div className="p-6 bg-muted/20 rounded-3xl border border-muted/50 space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white rounded-2xl shadow-sm text-primary">
                <Smartphone className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <p className="font-bold">Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground">Add an extra layer of security to your account.</p>
              </div>
            </div>
            <Button variant="outline" className="w-full rounded-xl border-dashed">Set Up 2FA</Button>
            
            <div className="pt-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Active Sessions</span>
                <span className="text-primary font-bold">1 session</span>
              </div>
              <p className="text-xs text-muted-foreground italic">You are currently logged in from Accra, Ghana.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Notifications Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b">
          <Bell className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold">Notification Preferences</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted/5 rounded-2xl border border-muted/50">
            <div>
              <p className="font-bold">Order Updates</p>
              <p className="text-sm text-muted-foreground">Receive emails when your order status changes.</p>
            </div>
            <div className="h-6 w-12 bg-primary rounded-full relative cursor-pointer">
              <div className="absolute right-1 top-1 h-4 w-4 bg-white rounded-full" />
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-muted/5 rounded-2xl border border-muted/50">
            <div>
              <p className="font-bold">Promotions & News</p>
              <p className="text-sm text-muted-foreground">Hear about new products and special offers.</p>
            </div>
            <div className="h-6 w-12 bg-muted-foreground/30 rounded-full relative cursor-pointer">
              <div className="absolute left-1 top-1 h-4 w-4 bg-white rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Delete Account */}
      <section className="pt-8 border-t">
        <div className="p-6 bg-destructive/5 rounded-3xl border border-destructive/20 space-y-4">
          <h3 className="text-destructive font-bold flex items-center gap-2">
            <ShieldCheck className="h-5 w-5" /> Danger Zone
          </h3>
          <p className="text-sm text-muted-foreground">Once you delete your account, there is no going back. Please be certain.</p>
          <Button variant="danger" className="rounded-xl">Delete My Account</Button>
        </div>
      </section>
    </div>
  );
}
