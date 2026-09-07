import { z } from "zod";

export const updateProductSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  description: z.string().nullable().optional(),
  brand: z.string().nullable().optional(),
  price: z.coerce.number().min(0).optional(),
  compare_at_price: z.coerce.number().min(0).nullable().optional(),
  category_id: z.string().uuid().nullable().optional(),
  stock_qty: z.coerce.number().int().min(0).optional(),
  featured_image: z.string().url().nullable().optional(),
  images: z.array(z.string().url()).optional(),
  is_featured: z.boolean().optional(),
  is_archived: z.boolean().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const categorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().nullable().optional(),
  image_url: z.string().url().nullable().optional(),
  parent_id: z.string().uuid().nullable().optional(),
});

export const couponSchema = z.object({
  code: z.string().min(1, "Coupon code is required").toUpperCase(),
  type: z.enum(["percentage", "fixed", "free_shipping"]).optional(),
  value: z.coerce.number().min(0).optional(),
  min_order_value: z.coerce.number().min(0).optional(),
  usage_limit: z.coerce.number().int().min(1).nullable().optional(),
  expires_at: z.string().datetime().nullable().optional(),
  is_active: z.boolean().optional(),
});
