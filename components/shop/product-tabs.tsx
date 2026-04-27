"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TabsProps {
  tabs: {
    label: string;
    content: React.ReactNode;
    count?: number;
  }[];
}

export function ProductTabs({ tabs }: TabsProps) {
  const [activeTab, setActiveTab] = React.useState(0);

  return (
    <div className="space-y-10">
      <div className="flex items-center gap-8 border-b overflow-x-auto whitespace-nowrap scrollbar-hide">
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(index)}
            className={cn(
              "pb-4 text-lg font-bold transition-all relative",
              activeTab === index 
                ? "text-primary" 
                : "text-slate-400 hover:text-slate-900"
            )}
          >
            {tab.label} {tab.count !== undefined && `(${tab.count})`}
            {activeTab === index && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full" />
            )}
          </button>
        ))}
      </div>

      <div className="transition-all duration-300">
        {tabs[activeTab].content}
      </div>
    </div>
  );
}
