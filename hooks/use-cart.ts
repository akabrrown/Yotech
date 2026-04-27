import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  quantity: number;
  stock_qty: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,
      addItem: (item) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((i) => i.id === item.id);
        let newItems = [...currentItems];

        if (existingItem) {
          const newQuantity = existingItem.quantity + item.quantity;
          if (newQuantity > item.stock_qty) return;
          newItems = currentItems.map((i) =>
            i.id === item.id ? { ...i, quantity: newQuantity } : i
          );
        } else {
          newItems = [...currentItems, item];
        }

        set({
          items: newItems,
          totalItems: newItems.reduce((sum, i) => sum + i.quantity, 0),
          totalPrice: newItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
        });
      },
      removeItem: (id) => {
        const newItems = get().items.filter((i) => i.id !== id);
        set({
          items: newItems,
          totalItems: newItems.reduce((sum, i) => sum + i.quantity, 0),
          totalPrice: newItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
        });
      },
      updateQuantity: (id, quantity) => {
        const item = get().items.find((i) => i.id === id);
        if (item && quantity <= item.stock_qty && quantity > 0) {
          const newItems = get().items.map((i) =>
            i.id === id ? { ...i, quantity } : i
          );
          set({
            items: newItems,
            totalItems: newItems.reduce((sum, i) => sum + i.quantity, 0),
            totalPrice: newItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
          });
        }
      },
      clearCart: () => set({ items: [], totalItems: 0, totalPrice: 0 }),
    }),
    {
      name: "yotech-cart",
    }
  )
);
