"use client";

import { useEffect, useState } from "react";
import AsyncSelect from "react-select/async";

type ShopOption = {
    value: number;
    label: string;
};

const shops: ShopOption[] = [
    { value: 1, label: "7001 - Oxford" },
    { value: 2, label: "7002 - Oxford Headington" },
    { value: 3, label: "7003 - Reading" },
    { value: 4, label: "7004 - Swindon" },
    { value: 5, label: "7005 - Bristol" },
    { value: 6, label: "7006 - Bath" },
    { value: 7, label: "7007 - Cheltenham" },
    { value: 8, label: "7008 - Gloucester" },
    { value: 9, label: "7009 - Cardiff" },
    { value: 10, label: "7010 - Newport" },
];

const STORAGE_KEY = "newGoodsManagement.lastShopId";

function searchShops(inputValue: string): Promise<ShopOption[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const search = inputValue.trim().toLowerCase();

            if (search.length < 2) {
                resolve([]);
                return;
            }

            const results = shops.filter((shop) =>
                shop.label.toLowerCase().includes(search),
            );

            resolve(results);
        }, 300);
    });
}

export function ShopSelect() {
    const [selectedShop, setSelectedShop] = useState<ShopOption | null>(null);

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

    function handleChange(shop: ShopOption | null) {
        setSelectedShop(shop);

        if (shop) {
            localStorage.setItem(STORAGE_KEY, shop.value.toString());
        } else {
            localStorage.removeItem(STORAGE_KEY);
        }
    }

    return (
        <div className="w-full max-w-md">
            <label
                htmlFor="shop-select"
                className="mb-2 block text-sm font-medium text-gray-900"
            >
                Choose your Shop
            </label>

            <AsyncSelect<ShopOption>
                instanceId="shop-select"
                inputId="shop-select"
                value={selectedShop}
                loadOptions={searchShops}
                onChange={handleChange}
                placeholder="Search for a shop..."
                noOptionsMessage={({ inputValue }) =>
                    inputValue.length < 2
                        ? "Type at least 2 characters"
                        : "No shops found"
                }
                isClearable
                cacheOptions
            />
        </div>
    );
}