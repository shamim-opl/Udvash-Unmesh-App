export default function StatusBar() {
  return (
    <div className="relative flex items-center justify-between px-6 pb-2 pt-3 text-[var(--color-text-primary)]">
      <span className="text-sm font-semibold">9:41</span>

      <span
        aria-hidden
        className="absolute left-1/2 top-2 h-7 w-32 -translate-x-1/2 rounded-full bg-black"
      />

      <span className="flex items-center gap-1.5">
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
          <rect x="0" y="7" width="3" height="5" rx="0.5" fill="currentColor" />
          <rect x="5" y="5" width="3" height="7" rx="0.5" fill="currentColor" />
          <rect x="10" y="3" width="3" height="9" rx="0.5" fill="currentColor" />
          <rect x="15" y="0" width="3" height="12" rx="0.5" fill="currentColor" />
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path
            d="M8 10.5a1.1 1.1 0 1 1 0-2.2 1.1 1.1 0 0 1 0 2.2ZM4.9 7.4a4.4 4.4 0 0 1 6.2 0l-1.1 1.1a2.8 2.8 0 0 0-4 0L4.9 7.4ZM2.3 4.8a8 8 0 0 1 11.4 0l-1.1 1.1a6.4 6.4 0 0 0-9.2 0L2.3 4.8Z"
            fill="currentColor"
          />
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="currentColor" />
          <rect x="2" y="2" width="18" height="8" rx="1.5" fill="currentColor" />
          <rect x="23" y="4" width="1.5" height="4" rx="0.75" fill="currentColor" />
        </svg>
      </span>
    </div>
  );
}
