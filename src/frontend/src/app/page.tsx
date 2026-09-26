import { ShopSelect } from "@/components/shops/ShopSelect";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
          Markdown Items
        </h1>

        <p className="mt-2 text-sm text-gray-600">
          Select your shop to view items that need to be repriced.
        </p>
      </div>

      <ShopSelect />
    </main>
  );
}