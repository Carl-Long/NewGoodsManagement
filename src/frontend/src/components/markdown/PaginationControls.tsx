const PAGE_SIZES = [10, 25, 50, 100];

type PaginationControlsProps = {
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (pageSize: number) => void;
};

export function PaginationControls({
    page,
    pageSize,
    totalCount,
    totalPages,
    onPageChange,
    onPageSizeChange,
}: Readonly<PaginationControlsProps>) {
    const firstItem = (page - 1) * pageSize + 1;
    const lastItem = Math.min(page * pageSize, totalCount);

    return (
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-gray-600">
                Showing {firstItem}-{lastItem} of {totalCount}
            </div>

            <div className="flex flex-wrap items-center gap-4">
                <label className="flex items-center gap-2 text-sm text-gray-700">
                    Items per page
                    <select
                        value={pageSize}
                        onChange={(event) => onPageSizeChange(Number(event.target.value))}
                        className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                    >
                        {PAGE_SIZES.map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                </label>

                <div className="text-sm text-gray-600">
                    Page {page} of {totalPages}
                </div>

                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() => onPageChange(page - 1)}
                        disabled={page <= 1}
                        className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Previous
                    </button>

                    <button
                        type="button"
                        onClick={() => onPageChange(page + 1)}
                        disabled={page >= totalPages}
                        className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
