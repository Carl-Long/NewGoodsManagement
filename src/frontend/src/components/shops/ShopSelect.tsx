"use client";

import AsyncSelect from "react-select/async";

import { searchShops, type ShopDto } from "@/lib/api/shops";

type ShopOption = {
    value: string;
    label: string;
    shop: ShopDto;
};

type ShopSelectProps = {
    value: ShopDto | null;
    onChange: (shop: ShopDto | null) => void;
};

function toShopOption(shop: ShopDto): ShopOption {
    return {
        value: shop.id,
        label: `${shop.code} - ${shop.name}`,
        shop,
    };
}

async function loadShopOptions(inputValue: string): Promise<ShopOption[]> {
    const search = inputValue.trim();

    if (search.length < 2) {
        return [];
    }

    const shops = await searchShops(search);

    return shops.map(toShopOption);
}

export function ShopSelect({ value, onChange }: Readonly<ShopSelectProps>) {
    return (
        <div className="w-full max-w-md">
            <label htmlFor="shop-select" className="mb-2 block text-sm font-medium text-gray-900">
                Shop
            </label>

            <AsyncSelect<ShopOption>
                instanceId="shop-select"
                inputId="shop-select"
                value={value ? toShopOption(value) : null}
                loadOptions={loadShopOptions}
                onChange={(option) => onChange(option?.shop ?? null)}
                placeholder="Search for a shop..."
                noOptionsMessage={({ inputValue }) =>
                    inputValue.trim().length < 2 ? "Type at least 2 characters" : "No shops found"
                }
                isClearable
                cacheOptions
            />
        </div>
    );
}
