-- Add featured_image column to products table
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS featured_image TEXT;
