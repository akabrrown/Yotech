"use client";

import * as React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FolderPlus, Search, Edit, Trash2, Folder } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CategoryForm } from "./category-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { type Category } from "@/types";
import Image from "next/image";
import { deleteCategory } from "@/lib/actions/categories";
import { toast } from "react-hot-toast";

interface CategoriesClientProps {
  initialCategories: Category[];
}

export function CategoriesClient({ initialCategories }: CategoriesClientProps) {
  const [categories, setCategories] = React.useState(initialCategories);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [editingCategory, setEditingCategory] = React.useState<Category | null>(null);
  const [isEditOpen, setIsEditOpen] = React.useState(false);
  const [isCreateOpen, setIsCreateOpen] = React.useState(false);

  const isClient = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const filteredCategories = categories.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategory(id);
        setCategories(categories.filter(c => c.id !== id));
        toast.success("Category deleted");
      } catch {
        toast.error("Failed to delete category");
      }
    }
  };

  const handleEdit = (e: React.MouseEvent, category: Category) => {
    e.preventDefault();
    e.stopPropagation();
    setEditingCategory(category);
    setIsEditOpen(true);
  };

  if (!isClient) return null;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Categories</h1>
          <p className="text-slate-500 font-medium">Organize your products into logical groups.</p>
        </div>
        
        <Button 
          className="rounded-xl shadow-lg shadow-primary/20 gap-2"
          onClick={() => setIsCreateOpen(true)}
        >
          <FolderPlus className="h-4 w-4" />
          Add Category
        </Button>
      </div>

      {/* Create Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="sm:max-w-[500px] rounded-3xl border-none">
          <DialogHeader>
            <DialogTitle>Create New Category</DialogTitle>
            <DialogDescription>
              Add a new category to your store.
            </DialogDescription>
          </DialogHeader>
          <CategoryForm 
            categories={categories} 
            onSuccess={() => {
              setIsCreateOpen(false);
              window.location.reload();
            }} 
          />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={(open) => {
        setIsEditOpen(open);
        if (!open) setEditingCategory(null);
      }}>
        <DialogContent className="sm:max-w-[500px] rounded-3xl border-none">
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>
              Update the category details below.
            </DialogDescription>
          </DialogHeader>
          {editingCategory && (
            <CategoryForm 
              initialData={editingCategory} 
              categories={categories} 
              onSuccess={() => {
                setIsEditOpen(false);
                setEditingCategory(null);
                window.location.reload();
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
        <CardHeader className="border-b bg-slate-50/50 p-6">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search categories..." 
              className="pl-10 rounded-xl border-slate-200 bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {filteredCategories.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Category</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Slug</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Description</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredCategories.map((category) => (
                    <tr key={category.id} className="hover:bg-slate-50/30 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 shadow-sm flex items-center justify-center">
                            {category.image_url ? (
                              <Image 
                                src={category.image_url} 
                                alt={category.name} 
                                width={40} 
                                height={40} 
                                className="h-full w-full object-cover" 
                                unoptimized
                              />
                            ) : (
                              <Folder className="h-5 w-5 text-slate-400" />
                            )}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-bold text-slate-900">{category.name}</span>
                            {category.parent_id && (
                              <span className="text-[10px] text-primary font-bold uppercase">
                                Sub of: {category.parent_name || "Parent"}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <code className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-600 font-mono">
                          {category.slug}
                        </code>
                      </td>
                      <td className="px-6 py-4 max-w-xs">
                        <p className="text-sm text-slate-500 truncate">
                          {category.description || "No description"}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-9 w-9 rounded-xl hover:bg-slate-100 hover:text-primary transition-all"
                            onClick={(e) => handleEdit(e, category)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-9 w-9 rounded-xl hover:bg-rose-50 hover:text-rose-500 transition-all"
                            onClick={(e) => handleDelete(e, category.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="h-96 flex flex-col items-center justify-center text-center p-12">
              <div className="h-16 w-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 mb-4">
                <Folder className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">No categories found</h3>
              <p className="text-slate-500 max-w-xs mt-1">
                Create categories to organize your product catalog.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
