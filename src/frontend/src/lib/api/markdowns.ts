import { apiFetch } from "./client";
import type { PagedResult } from "./types";

export type MarkdownItemDto = {
  id: string;
  name: string;
  category: string;
  originalPrice: number;
  newPrice: number;
  discountPercentage: number;
  stockQuantity: number;
};

type GetMarkdownItemsParams = {
  shopId: string;
  includeZeroStock?: boolean;
  page?: number;
  pageSize?: number;
};

export function getMarkdownItems({
  shopId,
  includeZeroStock = false,
  page = 1,
  pageSize = 25,
}: GetMarkdownItemsParams): Promise<PagedResult<MarkdownItemDto>> {
  const params = new URLSearchParams({
    shopId,
    includeZeroStock: includeZeroStock.toString(),
    page: page.toString(),
    pageSize: pageSize.toString(),
  });

  return apiFetch<PagedResult<MarkdownItemDto>>(`/api/markdowns?${params.toString()}`);
}