"use client";

import { useState, useSyncExternalStore } from "react";

import { IncludeZeroStockToggle } from "@/components/markdown/IncludeZeroStockToggle";
import { MarkdownItemsTable } from "@/components/markdown/MarkdownItemsTable";
import {
  ShopSelect,
  type ShopOption,
} from "@/components/shops/ShopSelect";
import { markdownItemsByShop } from "@/data/mockMarkdownItems";
import { shops } from "@/data/mockShops";

const STORAGE_KEY = "newGoodsManagement.lastShopId";
const STORAGE_EVENT = "newGoodsManagement.shopChanged";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(STORAGE_EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(STORAGE_EVENT, callback);
  };
}

function getSnapshot() {
  return localStorage.getItem(STORAGE_KEY);
}

function getServerSnapshot() {
  return null;
}

export function MarkdownItemsView() {
  const [includeZeroStock, setIncludeZeroStock] = useState(false);

  const storedShopId = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const selectedShop: ShopOption | null = storedShopId
    ? shops.find((shop) => shop.value === Number(storedShopId)) ?? null
    : null;

  function handleShopChange(shop: ShopOption | null) {
    if (shop) {
      localStorage.setItem(STORAGE_KEY, shop.value.toString());
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }

    window.dispatchEvent(new Event(STORAGE_EVENT));
  }

  const items = selectedShop
    ? markdownItemsByShop[selectedShop.value] ?? []
    : [];

  const visibleItems = includeZeroStock
    ? items
    : items.filter((item) => item.stock > 0);

  return (
    <div>
      <ShopSelect
        value={selectedShop}
        onChange={handleShopChange}
      />

      {selectedShop && (
        <>
          <div className="mt-6">
            <IncludeZeroStockToggle
              checked={includeZeroStock}
              onChange={setIncludeZeroStock}
            />
          </div>

          <MarkdownItemsTable items={visibleItems} />
        </>
      )}
    </div>
  );
}