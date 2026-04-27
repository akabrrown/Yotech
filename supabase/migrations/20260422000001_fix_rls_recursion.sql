-- Fix infinite recursion in RLS policies
-- The problem: admin policies query the 'profiles' table to check if a user is admin,
-- but that SELECT itself triggers the profiles RLS policies, causing infinite recursion.
-- The fix: use a SECURITY DEFINER function to bypass RLS when checking admin status,
-- and also use auth.jwt() metadata where possible.

-- 1. Create a helper function that bypasses RLS to check admin status
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- 2. Drop the problematic policies
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can manage products" ON public.products;
DROP POLICY IF EXISTS "Admins can manage orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can manage tickets" ON public.support_tickets;

-- 3. Recreate them using the helper function (no recursion!)
CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (public.is_admin());

CREATE POLICY "Admins can manage products" ON public.products
  FOR ALL USING (public.is_admin());

CREATE POLICY "Admins can manage orders" ON public.orders
  FOR ALL USING (public.is_admin());

CREATE POLICY "Admins can manage tickets" ON public.support_tickets
  FOR ALL USING (public.is_admin());

-- 4. Add missing public read policies for categories (needed for product joins)
CREATE POLICY "Public can view categories" ON public.categories
  FOR SELECT USING (true);

-- 5. Add missing policies for other public-facing tables
CREATE POLICY "Public can view reviews" ON public.reviews
  FOR SELECT USING (true);

CREATE POLICY "Users can manage own reviews" ON public.reviews
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can manage own wishlists" ON public.wishlists
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own cart" ON public.carts
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own notifications" ON public.notifications
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Admins can view inventory" ON public.inventory_log
  FOR ALL USING (public.is_admin());

CREATE POLICY "Admins can manage coupons" ON public.coupons
  FOR ALL USING (public.is_admin());

CREATE POLICY "Public can view active coupons" ON public.coupons
  FOR SELECT USING (is_active = true);
