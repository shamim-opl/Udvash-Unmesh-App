"use client";

import AppHeader from "@/components/AppHeader";
import BottomNav from "@/components/BottomNav";

const DOWNLOADS = [
  { id: "1819363", title: "৯ম শ্রেণি একাডেমিক প্রোগ্রাম ২০২৬", subject: "গণিত — অধ্যায় ৩" },
  { id: "1819364", title: "HSC'28 1st Year একাডেমিক প্রোগ্রাম", subject: "পদার্থবিজ্ঞান — অধ্যায় ৫" },
  { id: "1819365", title: "ইঞ্জিনিয়ারিং এডমিশন প্রোগ্রাম ২০২৬", subject: "রসায়ন — মডেল টেস্ট" },
];

export default function DownloadsPage() {
  return (
    <>
      <AppHeader />
      <header className="relative mb-2 flex items-center justify-center gap-3 px-4 py-3">
        <h1 className="font-heading text-[18px] font-semibold leading-none text-[#616161]">Your Downloads</h1>
      </header>

      <main className="flex-1 px-4 pb-6">
        <div className="flex flex-col gap-3 lg:grid lg:grid-cols-2">
          {DOWNLOADS.map((item) => (
            <button
              key={item.id}
              type="button"
              className="tap flex items-center gap-3 rounded-[10px] bg-[var(--color-surface)] p-3 text-left shadow-[var(--shadow-subtle)]"
            >
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px]"
                style={{ background: "color-mix(in srgb, var(--color-brand-primary) 10%, transparent)" }}
              >
                <span className="material-symbols-rounded" style={{ fontSize: 22, color: "var(--color-brand-primary)" }}>
                  download_done
                </span>
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-[var(--color-text-primary)]">{item.title}</p>
                <p className="truncate text-xs text-[var(--color-text-secondary)]">{item.subject}</p>
              </div>
              <span className="material-symbols-rounded" style={{ fontSize: 18, color: "var(--color-text-secondary)" }}>
                chevron_right
              </span>
            </button>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-[var(--color-text-secondary)]">App version: 1.2.5 (Beta)</p>
      </main>

      <BottomNav />
    </>
  );
}
