type IncludeZeroStockToggleProps = {
    checked: boolean;
    onChange: (checked: boolean) => void;
};

export function IncludeZeroStockToggle({ checked, onChange }: Readonly<IncludeZeroStockToggleProps>) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            onClick={() => onChange(!checked)}
            className="inline-flex cursor-pointer items-center gap-3 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bhf-red"
        >
            <span className="text-sm font-medium text-gray-700">Include zero stock</span>

            <span
                aria-hidden="true"
                className={`relative h-6 w-11 rounded-full transition-colors ${checked ? "bg-bhf-red" : "bg-gray-300"}`}
            >
                <span
                    className={`absolute left-0.5 top-0.5 size-5 rounded-full bg-white shadow-sm transition-transform ${
                        checked ? "translate-x-5" : "translate-x-0"
                    }`}
                />
            </span>
        </button>
    );
}
