import { getCategories } from "@/lib/actions/products";
import { FilterSidebarClient } from "./filter-sidebar-client";

export async function FilterSidebar({ className }: { className?: string }) {
  const categories = await getCategories();

  return <FilterSidebarClient categories={categories} className={className} />;
}
