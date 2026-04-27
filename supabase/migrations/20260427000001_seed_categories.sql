-- Seed initial categories if they don't exist
INSERT INTO public.categories (id, name, slug, description)
VALUES 
  (gen_random_uuid(), 'Laptops', 'laptops', 'Premium laptops for work and gaming.'),
  (gen_random_uuid(), 'Desktop PCs', 'desktops', 'Powerful desktop computers and workstations.'),
  (gen_random_uuid(), 'Mice & Keyboards', 'peripherals', 'High-quality mice, keyboards, and other peripherals.'),
  (gen_random_uuid(), 'Components', 'components', 'PC parts and components for building and upgrading.'),
  (gen_random_uuid(), 'Software', 'software', 'Software licenses for productivity and security.'),
  (gen_random_uuid(), 'Accessories', 'accessories', 'Various tech accessories and add-ons.'),
  (gen_random_uuid(), 'Services', 'services', 'Professional IT services and support.')
ON CONFLICT (slug) DO NOTHING;
