"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm, type SubmitHandler, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "react-hot-toast";
import { Loader2, Upload, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { type Category, type Product } from "@/types";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";

const productFormSchema = z.object({
  name: z.string().min(2, "Product name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  brand: z.string().min(1, "Brand is required"),
  price: z.number().positive("Price must be a positive number"),
  compare_at_price: z.number().positive("Regular price must be a positive number").optional().nullable(),
  category_id: z.string().uuid("Please select a category"),
  stock_qty: z.number().int().min(0, "Stock cannot be negative"),
  is_featured: z.boolean(),
  featured_image: z.string().min(1, "Featured image is required"),
  images: z.array(z.string()),
  metadata: z.record(z.string(), z.any()).optional(),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

import { updateProduct } from "@/lib/actions/products";

interface ProductFormProps {
  categories: Category[];
  initialData?: Product | null;
}

export function ProductForm({ categories, initialData }: ProductFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const supabase = createClient();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: initialData ? {
      name: initialData.name,
      description: initialData.description || "",
      brand: initialData.brand || "",
      price: Number(initialData.price),
      compare_at_price: initialData.compare_at_price ? Number(initialData.compare_at_price) : null,
      category_id: initialData.category_id || "",
      stock_qty: initialData.stock_qty || 0,
      is_featured: initialData.is_featured || false,
      featured_image: initialData.featured_image || "",
      images: initialData.images || [],
      metadata: (initialData.metadata as Record<string, string>) || {},
    } : {
      name: "",
      description: "",
      brand: "",
      price: 0,
      compare_at_price: null,
      category_id: "",
      stock_qty: 0,
      is_featured: false,
      featured_image: "",
      images: [],
      metadata: {},
    },
  });

  const watchedMetadata = useWatch({ control, name: "metadata" }) || {};
  const watchedFeaturedImage = useWatch({ control, name: "featured_image" });
  const watchedGalleryImages = useWatch({ control, name: "images" }) || [];

  const onSubmit: SubmitHandler<ProductFormValues> = async (values) => {
    setIsLoading(true);
    try {
      if (initialData) {
        await updateProduct(initialData.id, values);
        toast.success("Product updated successfully!");
      } else {
        // Create slug from name
        const slug = values.name
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, "")
          .replace(/[\s_-]+/g, "-")
          .replace(/^-+|-+$/g, "");
        
        const { error } = await supabase
          .from("products")
          .insert({
            ...values,
            slug,
          });

        if (error) {
          toast.error(error.message);
          return;
        }

        toast.success("Product created successfully!");
      }
      
      router.push("/dashboard/products");
      router.refresh();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none shadow-sm rounded-3xl">
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Product Name</label>
                <Input placeholder="e.g. MacBook Pro 16-inch" {...register("name")} className="rounded-xl" />
                {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <textarea 
                  className="w-full min-h-[150px] bg-white border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary outline-none transition-all"
                  placeholder="Describe your product in detail..."
                  {...register("description")}
                />
                {errors.description && <p className="text-xs text-destructive">{errors.description.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Brand</label>
                <Input 
                  placeholder="e.g. Apple, HP, Lenovo" 
                  {...register("brand")} 
                  className="rounded-xl" 
                  list="brand-suggestions"
                />
                <datalist id="brand-suggestions">
                  <option value="Apple" />
                  <option value="Dell" />
                  <option value="HP" />
                  <option value="Lenovo" />
                  <option value="ASUS" />
                  <option value="Logitech" />
                  <option value="Microsoft" />
                  <option value="Intel" />
                  <option value="NVIDIA" />
                  <option value="Samsung" />
                  <option value="Sony" />
                  <option value="Acer" />
                </datalist>
                {errors.brand && <p className="text-xs text-destructive">{errors.brand.message}</p>}
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm rounded-3xl">
            <CardContent className="p-6 space-y-4">
               <div className="flex items-center justify-between">
                 <h3 className="font-bold text-lg">Product Specifications</h3>
                 <Button 
                   type="button" 
                   variant="outline" 
                   size="sm" 
                   onClick={() => {
                     const currentMetadata = (getValues("metadata") as Record<string, string>) || {};
                     setValue("metadata", { ...currentMetadata, "": "" });
                   }}
                 >
                   Add Spec
                 </Button>
               </div>
                <div className="space-y-4">
                  {(() => {
                    const entries = Object.entries(watchedMetadata);
                    
                    if (entries.length === 0) {
                      return <p className="text-sm text-slate-400 italic">No specifications added yet.</p>;
                    }

                    return entries.map(([key, value], index) => (
                      <div key={index} className="flex gap-4 items-start">
                     <Input 
                       placeholder="Label (e.g. RAM)" 
                       defaultValue={key}
                       onBlur={(e) => {
                         const newKey = e.target.value;
                         const currentMetadata = { ...getValues("metadata") };
                         const val = currentMetadata[key];
                         delete currentMetadata[key];
                         currentMetadata[newKey] = val;
                         setValue("metadata", currentMetadata);
                       }}
                       className="rounded-xl flex-1" 
                     />
                     <Input 
                       placeholder="Value (e.g. 16GB)" 
                       defaultValue={value as string}
                       onBlur={(e) => {
                         const currentMetadata = { ...getValues("metadata") };
                         currentMetadata[key] = e.target.value;
                         setValue("metadata", currentMetadata);
                       }}
                       className="rounded-xl flex-1" 
                     />
                     <Button 
                       type="button" 
                       variant="ghost" 
                       size="icon"
                        onClick={() => {
                          const currentMetadata = { ...getValues("metadata") };
                          delete currentMetadata[key];
                          setValue("metadata", currentMetadata);
                        }}
                     >
                       <X className="h-4 w-4 text-rose-500" />
                     </Button>
                   </div>
                    ));
                  })()}
                </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm rounded-3xl">
            <CardContent className="p-6 space-y-4">
               <h3 className="font-bold text-lg">Featured Image</h3>
               <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Paste featured image URL here..." 
                      className="rounded-xl"
                      id="featuredImageUrlInput"
                    />
                    <Button 
                      type="button" 
                      variant="secondary"
                      className="rounded-xl px-6"
                      onClick={() => {
                        const input = document.getElementById("featuredImageUrlInput") as HTMLInputElement;
                        if (input.value) {
                          setValue("featured_image", input.value);
                          input.value = "";
                        }
                      }}
                    >
                      Set
                    </Button>
                    <CldUploadWidget 
                       uploadPreset="YoTech"
                       onSuccess={(result) => {
                         const info = result.info as { secure_url: string };
                         const url = info?.secure_url;
                         if (url) {
                           setValue("featured_image", url);
                         }
                       }}
                     >
                       {({ open }) => (
                         <Button 
                           type="button"
                           variant="outline"
                           className="rounded-xl gap-2 border-primary/20 text-primary hover:bg-primary/5"
                           onClick={() => open()}
                         >
                           <Upload className="h-4 w-4" />
                           Upload Featured
                         </Button>
                       )}
                     </CldUploadWidget>
                  </div>

                  {watchedFeaturedImage && (
                    <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-200 w-full max-w-md">
                      <Image 
                        src={watchedFeaturedImage} 
                        alt="Featured" 
                        fill 
                        className="object-cover"
                        unoptimized
                      />
                      <button 
                        type="button"
                        onClick={() => setValue("featured_image", "")}
                        className="absolute top-2 right-2 p-1.5 bg-rose-500 text-white rounded-lg z-10"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                  {errors.featured_image && <p className="text-xs text-destructive">{errors.featured_image.message}</p>}
               </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm rounded-3xl">
            <CardContent className="p-6 space-y-4">
               <h3 className="font-bold text-lg">Gallery Images</h3>
               <div className="space-y-4">
                 <div className="flex gap-2">
                    <Input 
                      placeholder="Paste image URL here..." 
                      className="rounded-xl"
                      id="imageUrlInput"
                    />
                    <Button 
                      type="button" 
                      variant="secondary"
                      className="rounded-xl px-6"
                      onClick={() => {
                        const input = document.getElementById("imageUrlInput") as HTMLInputElement;
                        if (input.value) {
                          const currentImages = getValues("images") || [];
                          setValue("images", [...currentImages, input.value]);
                          input.value = "";
                        }
                      }}
                    >
                      Add
                    </Button>
                    <CldUploadWidget 
                       uploadPreset="YoTech"
                       onSuccess={(result) => {
                         const info = result.info as { secure_url: string };
                         const url = info?.secure_url;
                         if (url) {
                           const currentImages = getValues("images") || [];
                           setValue("images", [...currentImages, url]);
                         }
                       }}
                     >
                       {({ open }) => (
                         <Button 
                           type="button"
                           variant="outline"
                           className="rounded-xl gap-2 border-primary/20 text-primary hover:bg-primary/5"
                           onClick={() => open()}
                         >
                           <Upload className="h-4 w-4" />
                           Import Media
                         </Button>
                       )}
                     </CldUploadWidget>
                 </div>

                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                   {watchedGalleryImages.map((url, index) => (
                     <div key={index} className="group relative aspect-square rounded-2xl overflow-hidden border border-slate-200">
                        <Image 
                          src={url} 
                          alt={`Product ${index}`} 
                          fill 
                          className="object-cover"
                          unoptimized
                        />
                        <button 
                          type="button"
                          onClick={() => {
                            const currentImages = getValues("images") || [];
                            setValue("images", currentImages.filter((_, i) => i !== index));
                          }}
                          className="absolute top-2 right-2 p-1.5 bg-rose-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"
                        >
                          <X className="h-3 w-3" />
                        </button>
                     </div>
                   ))}
                   <div 
                    className="aspect-square rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 hover:border-primary hover:text-primary transition-all cursor-pointer"
                    onClick={() => document.getElementById("imageUrlInput")?.focus()}
                   >
                      <Upload className="h-6 w-6 mb-2" />
                      <span className="text-xs font-bold uppercase tracking-wider">Add URL</span>
                   </div>
                 </div>
               </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-none shadow-sm rounded-3xl">
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Sale Price (GHS)</label>
                  <Input type="number" step="0.01" placeholder="0.00" {...register("price", { valueAsNumber: true })} className="rounded-xl" />
                  {errors.price && <p className="text-xs text-destructive">{errors.price.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Regular Price (GHS)</label>
                  <Input type="number" step="0.01" placeholder="0.00" {...register("compare_at_price", { valueAsNumber: true })} className="rounded-xl text-slate-400" />
                  {errors.compare_at_price && <p className="text-xs text-destructive">{errors.compare_at_price.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <select 
                  className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-primary outline-none transition-all"
                  {...register("category_id")}
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
                {errors.category_id && <p className="text-xs text-destructive">{errors.category_id.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Stock Quantity</label>
                <Input type="number" {...register("stock_qty", { valueAsNumber: true })} className="rounded-xl" />
                {errors.stock_qty && <p className="text-xs text-destructive">{errors.stock_qty.message}</p>}
              </div>

              <div className="flex items-center gap-3 py-2">
                <input type="checkbox" id="is_featured" {...register("is_featured")} className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary" />
                <label htmlFor="is_featured" className="text-sm font-medium">Featured Product</label>
              </div>
            </CardContent>
          </Card>

          <Button type="submit" className="w-full h-14 rounded-2xl text-lg font-bold shadow-lg shadow-primary/20" disabled={isLoading}>
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : (initialData ? "Update Product" : "Create Product")}
          </Button>
          
          <Button type="button" variant="ghost" onClick={() => router.back()} className="w-full rounded-2xl">
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
}
