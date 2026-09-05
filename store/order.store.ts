"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ProductListItem } from "@/types/product";

export interface OrderItem {
  product: ProductListItem;
  quantity: number;
  price: number;
}

export type PaymentMethod = "cod" | "bkash";

export interface ShippingMethod {
  id: string;
  label: string;
  cost: number;
  eta: string;
}

export interface OrderCustomer {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  notes?: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  customer: OrderCustomer;
  shipping: ShippingMethod;
  payment: PaymentMethod;
  subtotal: number;
  shippingCost: number;
  total: number;
  status: "processing" | "shipped" | "delivered";
  createdAt: string;
}

interface OrderState {
  orders: Order[];
  placeOrder: (order: Order) => void;
  getOrder: (id: string) => Order | undefined;
}

export const FREE_SHIPPING_THRESHOLD = 2000;
export const STANDARD_SHIPPING_COST = 120;

export const SHIPPING_METHODS: ShippingMethod[] = [
  { id: "standard", label: "Standard Delivery", cost: STANDARD_SHIPPING_COST, eta: "5-7 days" },
  { id: "express", label: "Express Delivery", cost: 250, eta: "2-3 days" },
];

export function generateOrderId() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `FS-${y}${m}${d}-${rand}`;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],
      placeOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
      getOrder: (id) => get().orders.find((o) => o.id === id),
    }),
    {
      name: "orders",
      skipHydration: true,
    }
  )
);
