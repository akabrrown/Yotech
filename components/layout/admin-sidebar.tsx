"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Tag, 
  BarChart3, 
  Settings, 
  LifeBuoy,
  LogOut,
  Layers,
  ChevronLeft,
  ChevronRight,
  Monitor
} from "lucide-react";
import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { Logo } from "@/components/ui/logo";
import * as React from "react";
import { useRouter } from "next/navigation";

const menuItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Products", href: "/dashboard/products", icon: Package },
  { name: "Categories", href: "/dashboard/categories", icon: Layers }, 
  { name: "Orders", href: "/dashboard/orders", icon: ShoppingCart },
  { name: "Customers", href: "/dashboard/customers", icon: Users },
  { name: "Coupons", href: "/dashboard/coupons", icon: Tag },
  { name: "Support Queue", href: "/dashboard/tickets", icon: LifeBuoy },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Site Settings", href: "/dashboard/settings", icon: Settings },
];

import { type Profile } from "@/types";

export function AdminSidebar({ profile }: { profile: Profile | null }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isCollapsed, toggle, isOpen, setIsOpen } = useSidebar();
  const supabase = createClient();

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Error signing out:", error);
      window.location.href = "/login";
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-sm lg:hidden transition-all duration-300" 
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-[70] bg-[#0F172A] text-white flex flex-col transition-all duration-300 border-r border-slate-800",
          isCollapsed ? "w-20" : "w-64",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
      <div className={cn("p-6 flex items-center relative transition-all duration-300", isCollapsed ? "justify-center px-2" : "justify-between")}>
        <div className={cn("transition-all duration-300", isCollapsed ? "opacity-100 scale-90" : "opacity-100 scale-100")}>
          <Logo height={isCollapsed ? 24 : 32} />
        </div>
        
        <button 
          onClick={toggle}
          className={cn(
            "absolute -right-3 top-1/2 -translate-y-1/2 h-6 w-6 bg-[#1E293B] border border-slate-700 rounded-full flex items-center justify-center text-white shadow-xl hover:bg-primary hover:border-primary transition-all z-[60]",
            isCollapsed && "right-[-12px]"
          )}
        >
          {isCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
        </button>
      </div>
 
      <nav className="flex-grow px-3 py-6 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 group relative",
                isActive 
                  ? "bg-primary text-white" 
                  : "text-slate-400 hover:bg-slate-800 hover:text-white",
                isCollapsed && "justify-center"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className={cn("h-5 w-5 shrink-0", isActive ? "text-white" : "text-slate-500 group-hover:text-white")} />
                {!isCollapsed && <span>{item.name}</span>}
              </div>
              {!isCollapsed && isActive && <div className="h-1.5 w-1.5 rounded-full bg-white ml-auto" />}
              
              {isCollapsed && (
                <div className="absolute left-full ml-4 px-2 py-1 bg-slate-900 text-white text-xs rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 border border-slate-700 shadow-xl">
                  {item.name}
                </div>
              )}
            </Link>
          );
        })}
      </nav>
 
      <div className={cn("p-4 border-t border-slate-800", isCollapsed && "items-center")}>
        <div className={cn("bg-slate-800/50 rounded-2xl p-4 mb-4 transition-all", isCollapsed ? "p-2" : "p-4")}>
          <div className={cn("flex items-center gap-3 mb-3", isCollapsed && "justify-center mb-0")}>
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs shrink-0">
              {profile?.full_name?.charAt(0) || "A"}
            </div>
            {!isCollapsed && (
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-bold truncate">{profile?.full_name || "Admin User"}</span>
                <span className="text-[10px] text-slate-500 truncate">{profile?.email || "admin@yotech.com"}</span>
              </div>
            )}
          </div>
          {!isCollapsed && (
            <Button 
              variant="ghost" 
              onClick={handleSignOut}
              className="w-full justify-start gap-3 h-10 text-sm text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 rounded-xl px-4 transition-all"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          )}
          {isCollapsed && (
            <button 
              onClick={handleSignOut}
              className="w-full flex justify-center py-2 text-slate-500 hover:text-rose-500 transition-colors mt-2"
              title="Sign Out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          )}
        </div>
        {!isCollapsed && (
          <Link href="/">
            <Button className="w-full h-10 rounded-xl gap-2 text-xs font-bold">
              <Monitor className="h-4 w-4" />
              Live Website
            </Button>
          </Link>
        )}
        {isCollapsed && (
          <Link href="/" title="Live Website" className="flex justify-center text-primary hover:scale-110 transition-transform">
            <Monitor className="h-6 w-6" />
          </Link>
        )}
      </div>
    </aside>
    </>
  );
}
