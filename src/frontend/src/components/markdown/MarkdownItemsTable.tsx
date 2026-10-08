import type { MarkdownItemDto } from "@/lib/api/markdowns";

type MarkdownItemsTableProps = {
    items: MarkdownItemDto[];
};

export function MarkdownItemsTable({ items }: Readonly<MarkdownItemsTableProps>) {
    if (items.length === 0) {
        return (
            <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-6">
                <p className="text-sm text-gray-600">No markdown items found for this shop.</p>
            </div>
        );
    }

    return (
        <div className="mt-8 overflow-hidden rounded-lg border border-gray-200">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Item</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Category</th>
                            <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Original price</th>
                            <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">New price</th>
                            <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Discount</th>
                            <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Stock</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 bg-white">
                        {items.map((item) => (
                            <tr key={item.id} className="transition-colors hover:bg-gray-50">
                                <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.name}</td>

                                <td className="px-4 py-3 text-sm text-gray-600">{item.category}</td>

                                <td className="px-4 py-3 text-right text-sm text-gray-600">
                                    £{item.originalPrice.toFixed(2)}
                                </td>

                                <td className="px-4 py-3 text-right text-sm font-medium text-gray-900">
                                    £{item.newPrice.toFixed(2)}
                                </td>

                                <td className="px-4 py-3 text-right text-sm text-gray-600">
                                    {item.discountPercentage}%
                                </td>

                                <td className="px-4 py-3 text-right text-sm text-gray-600">{item.stockQuantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
