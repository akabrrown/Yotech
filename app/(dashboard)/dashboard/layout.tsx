"use client";

import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { AdminHeader } from "@/components/layout/admin-header";
import { createClient } from "@/lib/supabase/client";
import { useSidebar } from "@/hooks/use-sidebar";
import * as React from "react";
import { cn } from "@/lib/utils";

import { type Profile } from "@/types";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isCollapsed } = useSidebar();
  const [profile, setProfile] = React.useState<Profile | null>(null);
  const supabase = createClient();

  React.useEffect(() => {
    const getData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single();
        setProfile(data);
      }
    };
    getData();
  }, [supabase]);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Sidebar */}
      <AdminSidebar profile={profile} />

       {/* Main Content Area */}
      <div className={cn(
        "flex flex-col min-h-screen transition-all duration-300",
        isCollapsed ? "lg:pl-20" : "lg:pl-64",
        "pl-0"
      )}>
        <AdminHeader profile={profile} />

        {/* Dashboard Content */}
        <main className="p-8 flex-grow">
          <div className="max-w-[1600px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
