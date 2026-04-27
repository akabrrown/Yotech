"use client";

import * as React from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema, type CategoryValues } from "@/lib/validations/category";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "react-hot-toast";
import { Loader2, Upload, X } from "lucide-react";
import { createCategory, updateCategory } from "@/lib/actions/categories";
import { type Category } from "@/types";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";

interface CategoryFormProps {
  initialData?: Category | null;
  categories: Category[];
  onSuccess?: () => void;
}

export function CategoryForm({ initialData, categories, onSuccess }: CategoryFormProps) {
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm<CategoryValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: initialData ? {
      name: initialData.name,
      description: initialData.description || "",
      image_url: initialData.image_url || "",
      parent_id: initialData.parent_id,
    } : {
      name: "",
      description: "",
      image_url: "",
      parent_id: null,
    },
  });

  const imageUrl = useWatch({
    control,
    name: "image_url",
  });

  const onSubmit = async (values: CategoryValues) => {
    setIsLoading(true);
    try {
      const formattedValues = {
        ...values,
        parent_id: values.parent_id === "" ? null : values.parent_id,
      };

      if (initialData) {
        await updateCategory(initialData.id, formattedValues);
        toast.success("Category updated successfully!");
      } else {
        await createCategory(formattedValues);
        toast.success("Category created successfully!");
        reset();
      }
      if (onSuccess) onSuccess();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Something went wrong";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card className="border-none shadow-sm rounded-3xl">
        <CardContent className="p-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Category Name</label>
            <Input placeholder="e.g. Laptops" {...register("name")} className="rounded-xl" />
            {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <textarea 
              className="w-full min-h-[100px] bg-white border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary outline-none transition-all"
              placeholder="Brief description of the category..."
              {...register("description")}
            />
            {errors.description && <p className="text-xs text-destructive">{errors.description.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Parent Category (Optional)</label>
            <select 
              className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-primary outline-none transition-all"
              {...register("parent_id")}
            >
              <option value="">None (Top Level)</option>
              {categories
                .filter(c => c.id !== initialData?.id)
                .map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            {errors.parent_id && <p className="text-xs text-destructive">{errors.parent_id.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Category Image</label>
            <div className="flex flex-col gap-4">
              <div className="flex gap-2">
                <Input 
                  placeholder="Paste image URL here..." 
                  className="rounded-xl"
                  id="categoryImageUrlInput"
                  {...register("image_url")}
                />
                <CldUploadWidget 
                  uploadPreset="YoTech"
                  options={{ maxFiles: 1 }}
                  onSuccess={(result) => {
                    const info = result.info as { secure_url: string };
                    const url = info?.secure_url;
                    if (url) {
                      setValue("image_url", url);
                      toast.success("Image uploaded!");
                    }
                  }}
                >
                  {({ open }) => (
                    <Button 
                      type="button"
                      variant="outline"
                      className="rounded-xl gap-2 border-primary/20 text-primary hover:bg-primary/5 shrink-0"
                      onClick={() => open()}
                    >
                      <Upload className="h-4 w-4" />
                      Upload
                    </Button>
                  )}
                </CldUploadWidget>
              </div>

              {imageUrl && (
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-200 w-full max-w-[200px]">
                  <Image 
                    src={imageUrl} 
                    alt="Category preview" 
                    fill 
                    className="object-cover"
                    unoptimized
                  />
                  <button 
                    type="button"
                    onClick={() => setValue("image_url", "")}
                    className="absolute top-1.5 right-1.5 p-1 bg-rose-500 text-white rounded-lg shadow-sm hover:bg-rose-600 transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>
            {errors.image_url && <p className="text-xs text-destructive">{errors.image_url.message}</p>}
          </div>
        </CardContent>
      </Card>

      <Button type="submit" className="w-full h-12 rounded-xl font-bold shadow-lg shadow-primary/20" disabled={isLoading}>
        {isLoading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : (initialData ? "Update Category" : "Create Category")}
      </Button>
    </form>
  );
}
