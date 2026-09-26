"use client";

import AsyncSelect from "react-select/async";

import { shops } from "@/data/mockShops";

export type ShopOption = {
  value: number;
  label: string;
};

type ShopSelectProps = {
  value: ShopOption | null;
  onChange: (shop: ShopOption | null) => void;
};

function searchShops(inputValue: string): Promise<ShopOption[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const search = inputValue.trim().toLowerCase();

      if (search.length < 2) {
        resolve([]);
        return;
      }

      resolve(
        shops.filter((shop) =>
          shop.label.toLowerCase().includes(search),
        ),
      );
    }, 300);
  });
}

export function ShopSelect({
  value,
  onChange,
}: Readonly<ShopSelectProps>) {
  return (
    <div className="w-full max-w-md">
      <label
        htmlFor="shop-select"
        className="mb-2 block text-sm font-medium text-gray-900"
      >
        Shop
      </label>

      <AsyncSelect<ShopOption>
        instanceId="shop-select"
        inputId="shop-select"
        value={value}
        loadOptions={searchShops}
        onChange={onChange}
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