import { apiFetch } from "./client";

export type ShopDto = {
  id: string;
  name: string;
  code: string;
};

export function searchShops(search: string): Promise<ShopDto[]> {
  const params = new URLSearchParams({
    search,
  });

  return apiFetch<ShopDto[]>(`/api/shops?${params.toString()}`);
}

export function getShop(id: string): Promise<ShopDto> {
  return apiFetch<ShopDto>(`/api/shops/${encodeURIComponent(id)}`);
}