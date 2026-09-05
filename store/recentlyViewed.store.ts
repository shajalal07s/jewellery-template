"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ProductListItem } from "@/types/product";

const MAX_RECENT = 10;

interface RecentlyViewedState {
  items: ProductListItem[];
  addRecent: (product: ProductListItem) => void;
  clearRecent: () => void;
}

export const useRecentlyViewedStore = create<RecentlyViewedState>()(
  persist(
    (set) => ({
      items: [],
      addRecent: (product) =>
        set((state) => ({
          items: [
            product,
            ...state.items.filter((item) => item.id !== product.id),
          ].slice(0, MAX_RECENT),
        })),
      clearRecent: () => set({ items: [] }),
    }),
    { name: "recently-viewed" }
  )
);
