-- SQL Migration for YoTech remaining features and database consistency

-- 1. ORDER ITEMS (Separating from JSONB for better querying)
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    variant_id UUID REFERENCES public.product_variants(id) ON DELETE SET NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(12, 2) NOT NULL,
    total_price DECIMAL(12, 2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own order items" ON public.order_items
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.orders 
            WHERE id = order_items.order_id AND user_id = auth.uid()
        )
    );

CREATE POLICY "Admins can manage order items" ON public.order_items
    FOR ALL USING (public.is_admin());

-- 2. STORE SETTINGS (For dynamic Site Settings page)
CREATE TABLE IF NOT EXISTS public.store_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    description TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.store_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view store settings" ON public.store_settings
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage store settings" ON public.store_settings
    FOR ALL USING (public.is_admin());

-- Seed initial settings
INSERT INTO public.store_settings (key, value, description) VALUES
('general', '{"store_name": "YoTech Systems", "support_email": "support@yotech.com", "phone": "+233 24 123 4567", "address": "Accra, Ghana"}', 'General store information'),
('payment', '{"currency": "GHS", "paystack_enabled": true}', 'Payment gateway and currency configuration'),
('notifications', '{"order_confirmation": true, "inventory_alerts": true, "customer_signup": true}', 'Notification preferences')
ON CONFLICT (key) DO NOTHING;

-- 3. MARKETING BANNERS (For Hero sliders)
CREATE TABLE IF NOT EXISTS public.banners (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    subtitle TEXT,
    image_url TEXT NOT NULL,
    button_text TEXT,
    button_link TEXT,
    is_active BOOLEAN DEFAULT true,
    priority INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.banners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view banners" ON public.banners
    FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage banners" ON public.banners
    FOR ALL USING (public.is_admin());

-- 4. FUNCTION TO AUTO-GENERATE ORDER NUMBER (e.g., YT-2026-XXXX)
CREATE OR REPLACE FUNCTION generate_order_number() 
RETURNS TRIGGER AS $$
DECLARE
    new_order_number TEXT;
BEGIN
    new_order_number := 'YT-' || to_char(NOW(), 'YYYY') || '-' || LPAD(nextval('order_number_seq')::TEXT, 5, '0');
    NEW.order_number := new_order_number;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create sequence for order numbers if it doesn't exist
CREATE SEQUENCE IF NOT EXISTS order_number_seq START 1000;

-- Attach trigger to orders table
DROP TRIGGER IF EXISTS tr_generate_order_number ON public.orders;
CREATE TRIGGER tr_generate_order_number
    BEFORE INSERT ON public.orders
    FOR EACH ROW
    WHEN (NEW.order_number IS NULL OR NEW.order_number = '')
    EXECUTE FUNCTION generate_order_number();

-- 5. UPDATE TRIGGER FOR UPDATED_AT COLUMNS
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_support_tickets_updated_at BEFORE UPDATE ON public.support_tickets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
