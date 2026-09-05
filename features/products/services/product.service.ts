import { apiRequest } from "@/lib/api";
import type { Product } from "@/types/product";
import type { PaginatedResponse, PaginationParams } from "@/types/common";

export async function getProducts(params?: PaginationParams) {
  return apiRequest<PaginatedResponse<Product>>({
    method: "GET",
    url: "/products",
    params,
  });
}

export async function getProductBySlug(slug: string) {
  return apiRequest<Product>({
    method: "GET",
    url: `/products/${slug}`,
  });
}
