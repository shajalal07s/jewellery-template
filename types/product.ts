export interface Product {
  id: string;
  name: string;
  slug: string;
  sku?: string;
  description: string;
  price: number;
  compareAtPrice?: number | null;
  images: string[];
  colors?: string[];
  sizes?: string[];
  category?: string;
  brand?: string;
  stock: number;
  rating?: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type ProductListItem = Pick<
  Product,
  "id" | "name" | "slug" | "price" | "compareAtPrice" | "images" | "stock" | "category"
>;
