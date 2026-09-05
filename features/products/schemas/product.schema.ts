import { z } from "zod";

export const productQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(12),
  search: z.string().optional(),
  category: z.string().optional(),
});

export type ProductQuery = z.infer<typeof productQuerySchema>;
