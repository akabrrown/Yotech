export type UserRole = "customer" | "admin";

export interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  avatar_url: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  parent_id: string | null;
  parent_name?: string;
  image_url: string | null;
  description: string | null;
  created_at: string;
}

export interface Review {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  profiles?: {
    full_name: string | null;
    avatar_url: string | null;
  };
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  brand: string | null;
  price: number;
  compare_at_price: number | null;
  category_id: string | null;
  stock_qty: number;
  featured_image: string | null;
  images: string[];
  is_featured: boolean;
  is_archived: boolean;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  rating?: number;
  reviews_count?: number;
  // Joined fields
  category?: Category;
  reviews?: Review[];
}

export interface Order {
  id: string;
  order_number: string;
  user_id: string | null;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded";
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping_cost: number;
  discount_amount: number;
  total: number;
  shipping_address: {
    street: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
  payment_status: string;
  payment_reference: string | null;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  product_id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}
