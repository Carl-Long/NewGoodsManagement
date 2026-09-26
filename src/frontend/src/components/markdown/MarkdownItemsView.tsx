"use client";

import { useEffect, useState } from "react";

import {
  ShopOption,
  ShopSelect,
} from "@/components/shops/ShopSelect";
import { shops } from "@/data/mockShops";

const STORAGE_KEY = "newGoodsManagement.lastShopId";

export function MarkdownItemsView() {
  const [selectedShop, setSelectedShop] =
    useState<ShopOption | null>(null);

  useEffect(() => {
    const storedShopId = localStorage.getItem(STORAGE_KEY);

    if (!storedShopId) {
      return;
    }

    const shop = shops.find(
      (shop) => shop.value === Number(storedShopId),
    );

    if (shop) {
      setSelectedShop(shop);
    }
  }, []);

  function handleShopChange(shop: ShopOption | null) {
    setSelectedShop(shop);

    if (shop) {
      localStorage.setItem(STORAGE_KEY, shop.value.toString());
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
        <p className="mt-6 text-sm text-gray-600">
          Selected shop: {selectedShop.label}
        </p>
      )}
    </div>
  );
}