import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface WishlistItem {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
}

interface WishlistStore {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  toggleItem: (item: WishlistItem) => void;
  totalItems: number;
}

export const useWishlist = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      addItem: (item) => {
        const currentItems = get().items;
        if (currentItems.find((i) => i.id === item.id)) return;
        const newItems = [...currentItems, item];
        set({ items: newItems, totalItems: newItems.length });
      },
      removeItem: (id) => {
        const newItems = get().items.filter((i) => i.id !== id);
        set({ items: newItems, totalItems: newItems.length });
      },
      isInWishlist: (id) => {
        return !!get().items.find((i) => i.id === id);
      },
      toggleItem: (item) => {
        const store = get();
        if (store.isInWishlist(item.id)) {
          store.removeItem(item.id);
        } else {
          store.addItem(item);
        }
      },
    }),
    {
      name: "yotech-wishlist",
    }
  )
);
