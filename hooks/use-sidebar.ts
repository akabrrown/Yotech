import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SidebarStore {
  isCollapsed: boolean;
  isOpen: boolean; // For mobile
  toggle: () => void;
  setCollapsed: (collapsed: boolean) => void;
  setIsOpen: (open: boolean) => void;
}

export const useSidebar = create<SidebarStore>()(
  persist(
    (set) => ({
      isCollapsed: false,
      isOpen: false,
      toggle: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
      setCollapsed: (collapsed: boolean) => set({ isCollapsed: collapsed }),
      setIsOpen: (open: boolean) => set({ isOpen: open }),
    }),
    {
      name: 'sidebar-storage',
    }
  )
);
