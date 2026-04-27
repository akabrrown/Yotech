-- Add missing admin policies for categories table
CREATE POLICY "Admins can manage categories" ON public.categories
  FOR ALL USING (public.is_admin());
