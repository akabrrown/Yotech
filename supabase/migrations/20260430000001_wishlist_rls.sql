-- RLS Policies for wishlists table
CREATE POLICY "Users can view own wishlist" ON public.wishlists
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can add to own wishlist" ON public.wishlists
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove from own wishlist" ON public.wishlists
    FOR DELETE USING (auth.uid() = user_id);
