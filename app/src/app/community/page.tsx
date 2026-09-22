"use client";

import { useState } from "react";
import AppHeader from "@/components/AppHeader";
import BottomNav from "@/components/BottomNav";

const GROUPS = [
  { name: "HSC'27 ব্যাচ — গণিত", members: 1240, icon: "groups" },
  { name: "ইঞ্জিনিয়ারিং ভর্তি প্রস্তুতি", members: 890, icon: "school" },
  { name: "মেডিকেল ভর্তি প্রস্তুতি", members: 760, icon: "health_and_safety" },
  { name: "৯ম-১০ম একাডেমিক", members: 2100, icon: "diversity_3" },
];

export default function CommunityPage() {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const filtered = GROUPS.filter((g) => !q || g.name.toLowerCase().includes(q));

  return (
    <>
      <AppHeader />
      <header className="relative mb-2 flex items-center justify-center gap-3 px-4 py-3">
        <h1 className="font-heading text-[18px] font-semibold leading-none text-[#616161]">Community</h1>
      </header>

      <main className="flex-1 px-4 pb-6">
        <div className="flex items-center gap-2 rounded-[5px] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2.5 transition-colors duration-150 ease-out has-[:focus-visible]:border-[var(--color-brand-primary)]">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-secondary)" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="গ্রুপ খুঁজুন..."
            className="w-full bg-transparent text-sm text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-secondary)]"
          />
        </div>

        <div className="mt-4 flex flex-col gap-3 lg:grid lg:grid-cols-2">
          {filtered.map((g) => (
            <button
              key={g.name}
              type="button"
              className="tap flex items-center gap-3 rounded-[10px] bg-[var(--color-surface)] p-3 text-left shadow-[var(--shadow-subtle)]"
            >
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px]"
                style={{ background: "color-mix(in srgb, var(--color-brand-primary) 10%, transparent)" }}
              >
                <span className="material-symbols-rounded" style={{ fontSize: 22, color: "var(--color-brand-primary)" }}>
                  {g.icon}
                </span>
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-[var(--color-text-primary)]">{g.name}</p>
                <p className="truncate text-xs text-[var(--color-text-secondary)]">{g.members.toLocaleString("bn")} সদস্য</p>
              </div>
              <span className="material-symbols-rounded" style={{ fontSize: 18, color: "var(--color-text-secondary)" }}>
                chevron_right
              </span>
            </button>
          ))}
          {!filtered.length && (
            <p className="py-8 text-center text-sm text-[var(--color-text-secondary)]">কোনো গ্রুপ পাওয়া যায়নি।</p>
          )}
        </div>
      </main>

      <BottomNav />
    </>
  );
}
