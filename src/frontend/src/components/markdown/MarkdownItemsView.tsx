"use client";

import { useEffect, useState } from "react";

import {
  ShopOption,
  ShopSelect,
} from "@/components/shops/ShopSelect";
import { MarkdownItemsTable } from "@/components/markdown/MarkdownItemsTable";
import { markdownItemsByShop } from "@/data/mockMarkdownItems";
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

  const items = selectedShop
    ? markdownItemsByShop[selectedShop.value] ?? []
    : [];

  return (
    <div>
      <ShopSelect
        value={selectedShop}
        onChange={handleShopChange}
      />

      {selectedShop && (
        <MarkdownItemsTable items={items} />
      )}
    </div>
  );
}