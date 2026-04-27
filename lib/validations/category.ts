import * as z from "zod";

export const categorySchema = z.object({
  name: z.string().min(2, "Category name must be at least 2 characters"),
  description: z.string().optional(),
  image_url: z.string().url("Invalid image URL").optional().or(z.literal("")),
  parent_id: z.string().uuid().optional().nullable().or(z.literal("")),
});

export type CategoryValues = z.infer<typeof categorySchema>;
