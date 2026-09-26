import Link from "next/link";

export function AppHeader() {
  return (
    <header className="bg-bhf-red text-white shadow-sm">
      <div className="flex h-16 items-center px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-4"
          aria-label="New Goods Management home"
        >
          <PlaceholderLogo />

          <span className="text-xl font-semibold tracking-tight sm:text-2xl">
            New Goods Management
          </span>
        </Link>
      </div>
    </header>
  );
}

function PlaceholderLogo() {
  return (
    <div
      className="flex size-10 shrink-0 items-center justify-center rounded-md bg-white"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 24 24"
        className="size-7 text-bhf-red"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />
        <path d="M3.5 12h4l1.5-3 3 6 1.5-3h7" />
      </svg>
    </div>
  );
}