"use client";

import { Search, Bell, HelpCircle, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { useSidebar } from "@/hooks/use-sidebar";
import { type Profile } from "@/types";
import Image from "next/image";

interface AdminHeaderProps {
  profile: Profile | null;
}

export function AdminHeader({ profile }: AdminHeaderProps) {
  const { isOpen, setIsOpen } = useSidebar();

  const handleHelp = () => {
    toast.success("Our support team will be with you shortly!", {
      icon: "💁",
    });
  };

  const handleNotifications = () => {
    toast("No new notifications to show right now.", {
      icon: "🔔",
    });
  };

  return (
    <header className="h-20 bg-white border-b sticky top-0 z-40 px-4 md:px-8 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="lg:hidden" 
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu className="h-6 w-6 text-slate-600" />
        </Button>

        <div className="relative w-40 sm:w-64 md:w-96 hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input 
            placeholder="Search anything..." 
            className="w-full bg-slate-50 border-none rounded-xl pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-primary outline-none transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-slate-500 rounded-xl hover:bg-slate-50 transition-colors"
          onClick={handleHelp}
        >
          <HelpCircle className="h-5 w-5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative text-slate-500 rounded-xl hover:bg-slate-50 transition-colors"
          onClick={handleNotifications}
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive border-2 border-white" />
        </Button>
        <div className="h-10 w-[1px] bg-slate-200 mx-2" />
        <div className="flex items-center gap-3 pl-2">
          <div className="flex flex-col text-right">
            <span className="text-sm font-bold text-slate-900">{profile?.full_name || "Admin User"}</span>
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{profile?.role === 'admin' ? 'Master Admin' : 'Staff'}</span>
          </div>
          <div className="h-10 w-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden shadow-inner">
            {profile?.avatar_url ? (
              <Image 
                src={profile.avatar_url} 
                alt="Admin" 
                width={40} 
                height={40} 
                className="w-full h-full object-cover" 
              />
            ) : (
              <div className="h-full w-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                {profile?.full_name?.charAt(0) || "A"}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
