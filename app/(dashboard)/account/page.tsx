import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Mail, Phone, Shield, Camera, MapPin } from "lucide-react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <div className="p-6 sm:p-10 space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight">My Profile</h1>
          <p className="text-muted-foreground">Manage your personal information and account security.</p>
        </div>
        <Button className="rounded-xl shadow-lg shadow-primary/10">Save Changes</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Profile Info */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex flex-col sm:flex-row gap-8 items-start">
            <div className="relative group">
              <div className="h-32 w-32 rounded-3xl overflow-hidden bg-muted border-4 border-white shadow-xl relative">
                <Image 
                  src={profile?.avatar_url || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop"} 
                  alt="Profile" 
                  fill 
                  className="object-cover"
                />
              </div>
              <button className="absolute -bottom-2 -right-2 p-2 bg-primary text-white rounded-xl shadow-lg hover:scale-110 transition-transform">
                <Camera className="h-4 w-4" />
              </button>
            </div>
            
            <div className="flex-grow space-y-1 pt-2">
              <h2 className="text-2xl font-bold">{profile?.full_name || "New User"}</h2>
              <p className="text-muted-foreground flex items-center gap-2">
                <Shield className="h-4 w-4 text-emerald-500" />
                {profile?.role === 'admin' ? 'Administrator' : 'Verified Customer'}
              </p>
              <div className="flex gap-2 pt-2">
                <div className="px-3 py-1 bg-muted rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  Ghana
                </div>
                {profile?.role === 'admin' && (
                  <div className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-xs font-bold uppercase tracking-wider">Admin Access</div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold flex items-center gap-2">
                <User className="h-4 w-4 text-primary" /> Full Name
              </label>
              <Input defaultValue={profile?.full_name || ""} className="rounded-xl h-12" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" /> Email Address
              </label>
              <Input defaultValue={user.email} disabled className="rounded-xl h-12 bg-muted/50" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" /> Phone Number
              </label>
              <Input defaultValue={profile?.phone || ""} placeholder="No phone number set" className="rounded-xl h-12" />
            </div>
          </div>
        </div>

        {/* Security / Activity */}
        <div className="space-y-6">
          <div className="p-6 bg-muted/20 rounded-3xl border border-muted/50 space-y-4">
            <h3 className="font-bold flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Security Status
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Two-Factor Auth</span>
                <span className="text-destructive font-bold">Disabled</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Password Strength</span>
                <span className="text-emerald-500 font-bold">Strong</span>
              </div>
              <Button variant="outline" className="w-full rounded-xl">Change Password</Button>
            </div>
          </div>

          <div className="p-6 bg-primary/5 rounded-3xl border border-primary/10 space-y-4">
            <h3 className="font-bold">Member Since</h3>
            <p className="text-3xl font-extrabold text-primary">
              {profile?.created_at ? new Date(profile.created_at).toLocaleDateString('en-GH', { month: 'long', year: 'numeric' }) : "April 2026"}
            </p>
            <p className="text-xs text-muted-foreground">Thank you for being part of YoTech!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
