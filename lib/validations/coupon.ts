import * as z from "zod";

export const couponSchema = z.object({
  code: z.string().min(3, "Coupon code must be at least 3 characters").transform(v => v.toUpperCase()),
  type: z.enum(["percentage", "fixed", "free_shipping"]),
  value: z.coerce.number().min(0, "Value cannot be negative"),
  min_order_value: z.coerce.number().min(0).default(0),
  usage_limit: z.union([
    z.coerce.number().int().positive(),
    z.literal("").transform(() => null),
    z.literal(0).transform(() => null)
  ]).optional().nullable(),
  expires_at: z.string().optional().nullable().transform(v => v === "" ? null : v),
  is_active: z.boolean().default(true),
});

export type CouponValues = z.infer<typeof couponSchema>;
