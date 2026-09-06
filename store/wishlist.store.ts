"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ProductListItem } from "@/types/product";

interface WishlistState {
  items: ProductListItem[];
  _hydrated: boolean;
  toggle: (product: ProductListItem) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  _markHydrated: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      _hydrated: false,
      toggle: (product) =>
        set((state) => {
          const exists = state.items.some((item) => item.id === product.id);
          return {
            items: exists
              ? state.items.filter((item) => item.id !== product.id)
              : [...state.items, product],
          };
        }),
      removeItem: (productId) =>
        set((state) => ({ items: state.items.filter((item) => item.id !== productId) })),
      isInWishlist: (productId) =>
        get()._hydrated && get().items.some((item) => item.id === productId),
      clearWishlist: () => set({ items: [] }),
      _markHydrated: () => set({ _hydrated: true }),
    }),
    {
      name: "wishlist",
      skipHydration: true,
      onRehydrateStorage: () => (state) => {
        state?._markHydrated();
      },
    }
  )
);