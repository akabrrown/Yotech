"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  User, 
  Package, 
  MapPin, 
  Heart, 
  LifeBuoy, 
  Settings, 
  LogOut,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { createClient } from "@/lib/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";

const menuItems = [
  { name: "My Profile", href: "/account", icon: User },
  { name: "Order History", href: "/account/orders", icon: Package },
  { name: "Address Book", href: "/account/addresses", icon: MapPin },
  { name: "Wishlist", href: "/account/wishlist", icon: Heart },
  { name: "Support Tickets", href: "/account/tickets", icon: LifeBuoy },
  { name: "Settings", href: "/account/settings", icon: Settings },
];

export function CustomerSidebar() {
  const pathname = usePathname();
  const [userName, setUserName] = React.useState<string>("User");
  const supabase = createClient();

  React.useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.user_metadata?.full_name) {
        setUserName(user.user_metadata.full_name);
      } else if (user?.app_metadata?.full_name) {
        setUserName(user.app_metadata.full_name);
      }
    };
    getUser();
  }, []);

  return (
    <aside className="w-full lg:w-64 space-y-2">
      <div className="p-6 bg-primary rounded-2xl text-white mb-6 shadow-lg shadow-primary/20">
        <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">Welcome back,</p>
        <h3 className="text-xl font-bold line-clamp-1">{userName}</h3>
      </div>

      <nav className="space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group",
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className={cn("h-5 w-5", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                {item.name}
              </div>
              {isActive && <ChevronRight className="h-4 w-4" />}
            </Link>
          );
        })}
      </nav>

      <div className="pt-6 border-t mt-6">
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10 rounded-xl px-4 py-3"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
