import * as z from "zod";

export const productSchema = z.object({
  name: z.string().min(2, "Product name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.coerce.number().positive("Price must be a positive number"),
  compare_at_price: z.coerce.number().positive("Regular price must be a positive number").optional().nullable(),
  category_id: z.string().uuid("Please select a category"),
  stock_qty: z.coerce.number().int().min(0, "Stock cannot be negative"),
  is_featured: z.boolean().default(false),
  featured_image: z.string().min(1, "Featured image is required").url("Invalid image URL"),
  images: z.array(z.string()).default([]),
});

export interface ProductValues {
  name: string;
  description: string;
  price: number;
  compare_at_price?: number | null;
  category_id: string;
  stock_qty: number;
  is_featured: boolean;
  featured_image: string;
  images: string[];
}
