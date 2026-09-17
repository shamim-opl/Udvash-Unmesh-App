"use client";

import { useState } from "react";
import Image from "next/image";
import AppHeader from "@/components/AppHeader";
import BottomNav from "@/components/BottomNav";
import PullToRefresh from "@/components/PullToRefresh";
import { DIVISIONS } from "@/data/branches";

export default function BranchesPage() {
  const [query, setQuery] = useState("");
  const [openDivision, setOpenDivision] = useState<string | null>(null);

  const totalBranches = DIVISIONS.reduce((sum, d) => sum + d.branches.length, 0);
  const q = query.trim().toLowerCase();
  const filtered = q
    ? DIVISIONS.map((d) => ({
        ...d,
        branches: d.branches.filter(
          (b) =>
            b.name.toLowerCase().includes(q) ||
            b.en.toLowerCase().includes(q) ||
            b.phones.some((p) => p.includes(q)) ||
            d.name.toLowerCase().includes(q) ||
            d.en.toLowerCase().includes(q)
        ),
      })).filter((d) => d.branches.length > 0)
    : DIVISIONS;

  return (
    <>
      <AppHeader />
      <main className="flex-1 px-4 pb-6">
       <PullToRefresh>
        <div className="relative aspect-[1900/560] w-full overflow-hidden rounded-[8px]">
          <Image
            src="/branches-banner-v2.png"
            alt={`আপনার কাছে সবচেয়ে কাছে উদ্ভাস-উন্মেষ, সারা দেশে ${totalBranches}+ শাখা`}
            fill
            className="object-cover"
            priority
          />
        </div>

        <p className="mt-4 text-sm text-[var(--color-text-secondary)]">
          সারা দেশে আমাদের {totalBranches}+ শাখা
        </p>

        <div className="mt-3 flex items-center gap-2 rounded-[5px] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2.5 transition-colors duration-150 ease-out has-[:focus-visible]:border-[var(--color-brand-primary)]">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-secondary)" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="শাখা খুঁজুন (জেলা বা নাম)"
            className="w-full bg-transparent text-sm text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-secondary)]"
          />
        </div>

        <div className="mt-4 flex flex-col gap-3">
          {filtered.map((division) => {
            const open = openDivision === division.slug || Boolean(q);
            return (
              <div key={division.slug} className="rounded-[var(--radius-lg)] bg-[var(--color-surface)] shadow-[var(--shadow-subtle)]">
                <button
                  type="button"
                  onClick={() => setOpenDivision(open && !q ? null : division.slug)}
                  className="tap flex w-full items-center gap-3 p-4 text-left"
                >
                  <span className="material-symbols-rounded" aria-hidden style={{ fontSize: 22, color: "var(--color-brand-primary)" }}>
                    directions
                  </span>
                  <span className="flex-1">
                    <span className="block text-sm font-semibold text-[var(--color-text-primary)]">
                      {division.name}
                    </span>
                    <span className="block text-xs text-[var(--color-text-secondary)]">
                      {division.branches.length}টি শাখা
                    </span>
                  </span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--color-text-secondary)"
                    strokeWidth="2"
                    style={{ transform: open ? "rotate(90deg)" : undefined, transition: "transform 200ms ease-out" }}
                  >
                    <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {open && (
                  <div className="animate-dropdown-in max-h-[420px] overflow-y-auto border-t border-[var(--color-border)] p-3">
                    <div className="flex flex-col gap-2">
                      {division.branches.map((branch) => (
                        <div
                          key={branch.name}
                          className="flex items-center gap-3 rounded-[var(--radius-md)] bg-[var(--color-bg-canvas)] px-3 py-2.5"
                        >
                          <span
                            className="material-symbols-rounded shrink-0"
                            style={{ fontSize: 18, color: "var(--color-text-secondary)", opacity: 0.6 }}
                          >
                            location_on
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold text-[var(--color-text-primary)]">{branch.name}</p>
                            <p className="flex flex-wrap gap-x-2 text-xs text-[var(--color-text-secondary)]">
                              {branch.phones.map((phone) => (
                                <a key={phone} href={`tel:${phone}`} className="underline-offset-2 hover:underline">
                                  {phone}
                                </a>
                              ))}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          {filtered.length === 0 && (
            <p className="py-8 text-center text-sm text-[var(--color-text-secondary)]">
              কোনো শাখা পাওয়া যায়নি।
            </p>
          )}
        </div>
       </PullToRefresh>
      </main>
      <BottomNav />
    </>
  );
}
