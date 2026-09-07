"use client";

import * as React from "react";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FilterSidebarClient } from "./filter-sidebar-client";
import { type Category } from "@/types";

interface MobileFiltersProps {
  categories: Category[];
}

export function MobileFilters({ categories }: MobileFiltersProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="lg:hidden w-full gap-2 mb-6">
          <SlidersHorizontal className="h-4 w-4" />
          Show Filters
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Filters</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <FilterSidebarClient 
            categories={categories} 
            className="block" 
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
