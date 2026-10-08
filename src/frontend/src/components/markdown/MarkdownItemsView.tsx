"use client";

import { useEffect, useState } from "react";

import { IncludeZeroStockToggle } from "@/components/markdown/IncludeZeroStockToggle";
import { MarkdownItemsTable } from "@/components/markdown/MarkdownItemsTable";
import { ShopSelect } from "@/components/shops/ShopSelect";
import { ApiError } from "@/lib/api/client";
import { getMarkdownItems, type MarkdownItemDto } from "@/lib/api/markdowns";
import { getShop, type ShopDto } from "@/lib/api/shops";

const STORAGE_KEY = "newGoodsManagement.lastShopId";

export function MarkdownItemsView() {
    const [selectedShop, setSelectedShop] = useState<ShopDto | null>(null);
    const [includeZeroStock, setIncludeZeroStock] = useState(false);
    const [items, setItems] = useState<MarkdownItemDto[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const storedShopId = localStorage.getItem(STORAGE_KEY);

        if (storedShopId === null) {
            return;
        }

        const shopId = storedShopId;
        let cancelled = false;

        async function restoreShop() {
            try {
                const shop = await getShop(shopId);

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

    useEffect(() => {
        if (selectedShop === null) {
            return;
        }

        const shopId = selectedShop.id;
        let cancelled = false;

        async function loadMarkdownItems() {
            setIsLoading(true);
            setError(null);

            try {
                const result = await getMarkdownItems({
                    shopId,
                    includeZeroStock,
                    page: 1,
                    pageSize: 25,
                });

                if (!cancelled) {
                    setItems(result.items);
                }
            } catch {
                if (!cancelled) {
                    setError("Unable to load markdown items.");
                    setItems([]);
                }
            } finally {
                if (!cancelled) {
                    setIsLoading(false);
                }
            }
        }

        void loadMarkdownItems();

        return () => {
            cancelled = true;
        };
    }, [selectedShop, includeZeroStock]);

    function handleShopChange(shop: ShopDto | null) {
        setSelectedShop(shop);
        setItems([]);
        setError(null);

        if (shop) {
            localStorage.setItem(STORAGE_KEY, shop.id);
        } else {
            localStorage.removeItem(STORAGE_KEY);
        }
    }

    return (
        <div>
            <ShopSelect value={selectedShop} onChange={handleShopChange} />

            {selectedShop && (
                <>
                    <div className="mt-6">
                        <IncludeZeroStockToggle checked={includeZeroStock} onChange={setIncludeZeroStock} />
                    </div>

                    {isLoading && <p className="mt-8 text-sm text-gray-600">Loading markdown items...</p>}

                    {error && <p className="mt-8 text-sm text-red-600">{error}</p>}

                    {!isLoading && !error && <MarkdownItemsTable items={items} />}
                </>
            )}
        </div>
    );
}
