import { apiRequest } from "@/lib/api";
import type { PaginatedResponse, PaginationParams } from "@/types/common";

export interface Order {
  id: string;
  orderNumber: string;
  total: number;
  status: string;
  items: number;
  createdAt: string;
}

export async function getOrders(params?: PaginationParams) {
  return apiRequest<PaginatedResponse<Order>>({
    method: "GET",
    url: "/orders",
    params,
  });
}

export async function getOrderById(id: string) {
  return apiRequest<Order>({
    method: "GET",
    url: `/orders/${id}`,
  });
}
