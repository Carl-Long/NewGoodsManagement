"use client";

import { useEffect, useState } from "react";

import { IncludeZeroStockToggle } from "@/components/markdown/IncludeZeroStockToggle";
import { ShopSelect } from "@/components/shops/ShopSelect";
import { ApiError } from "@/lib/api/client";
import {
  getShop,
  type ShopDto,
} from "@/lib/api/shops";

const STORAGE_KEY = "newGoodsManagement.lastShopId";

export function MarkdownItemsView() {
  const [selectedShop, setSelectedShop] = useState<ShopDto | null>(null);

  const [includeZeroStock, setIncludeZeroStock] = useState(false);

  useEffect(() => {
    const storedShopId = localStorage.getItem(STORAGE_KEY);

    if (!storedShopId) {
      return;
    }

    let cancelled = false;

    async function restoreShop() {
      try {
        const shop = await getShop(storedShopId!);

        if (!cancelled) {
          setSelectedShop(shop);
        }
      } catch (error) {
        if (error instanceof ApiError && error.status === 404) {
          localStorage.removeItem(STORAGE_KEY);
        }
      }
    }

    void restoreShop();

    return () => {
      cancelled = true;
    };
  }, []);

  function handleShopChange(shop: ShopDto | null) {
    setSelectedShop(shop);

    if (shop) {
      localStorage.setItem(STORAGE_KEY, shop.id);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  return (
    <div>
      <ShopSelect
        value={selectedShop}
        onChange={handleShopChange}
      />

      {selectedShop && (
        <div className="mt-6">
          <IncludeZeroStockToggle
            checked={includeZeroStock}
            onChange={setIncludeZeroStock}
          />
        </div>
      )}
    </div>
  );
}