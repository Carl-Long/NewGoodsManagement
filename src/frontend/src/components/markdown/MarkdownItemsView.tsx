"use client";

import { useEffect, useState } from "react";

import { IncludeZeroStockToggle } from "@/components/markdown/IncludeZeroStockToggle";
import { MarkdownItemsTable } from "@/components/markdown/MarkdownItemsTable";
import { PaginationControls } from "@/components/markdown/PaginationControls";
import { ShopSelect } from "@/components/shops/ShopSelect";
import { ApiError } from "@/lib/api/client";
import { getMarkdownItems, type MarkdownItemDto } from "@/lib/api/markdowns";
import { getShop, type ShopDto } from "@/lib/api/shops";
import type { PagedResult } from "@/lib/api/types";

const STORAGE_KEY = "newGoodsManagement.lastShopId";

export function MarkdownItemsView() {
    const [selectedShop, setSelectedShop] = useState<ShopDto | null>(null);
    const [includeZeroStock, setIncludeZeroStock] = useState(false);

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(25);

    const [result, setResult] = useState<PagedResult<MarkdownItemDto> | null>(null);
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
                const markdownResult = await getMarkdownItems({
                    shopId,
                    includeZeroStock,
                    page,
                    pageSize,
                });

                if (!cancelled) {
                    setResult(markdownResult);
                }
            } catch {
                if (!cancelled) {
                    setError("Unable to load markdown items.");
                    setResult(null);
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
    }, [selectedShop, includeZeroStock, page, pageSize]);

    function handleShopChange(shop: ShopDto | null) {
        setSelectedShop(shop);
        setPage(1);
        setResult(null);
        setError(null);

        if (shop) {
            localStorage.setItem(STORAGE_KEY, shop.id);
        } else {
            localStorage.removeItem(STORAGE_KEY);
        }
    }

    function handleIncludeZeroStockChange(checked: boolean) {
        setIncludeZeroStock(checked);
        setPage(1);
        setResult(null);
    }

    function handlePageSizeChange(newPageSize: number) {
        setPageSize(newPageSize);
        setPage(1);
        setResult(null);
    }

    return (
        <div>
            <ShopSelect value={selectedShop} onChange={handleShopChange} />

            {selectedShop && (
                <>
                    <div className="mt-6">
                        <IncludeZeroStockToggle checked={includeZeroStock} onChange={handleIncludeZeroStockChange} />
                    </div>

                    {isLoading && <p className="mt-8 text-sm text-gray-600">Loading markdown items...</p>}

                    {error && <p className="mt-8 text-sm text-red-600">{error}</p>}

                    {!isLoading && !error && result && (
                        <>
                            <MarkdownItemsTable items={result.items} />

                            {result.totalCount > 0 && (
                                <PaginationControls
                                    page={result.page}
                                    pageSize={result.pageSize}
                                    totalCount={result.totalCount}
                                    totalPages={result.totalPages}
                                    onPageChange={setPage}
                                    onPageSizeChange={handlePageSizeChange}
                                />
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    );
}
