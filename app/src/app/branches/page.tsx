"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AppHeader from "@/components/AppHeader";
import BottomNav from "@/components/BottomNav";
import PullToRefresh from "@/components/PullToRefresh";
import DragScroll from "@/components/DragScroll";
import { DIVISIONS, telHref, slugify, type Branch, type Division } from "@/data/branches";

function BranchCard({ branch, division }: { branch: Branch; division: Division }) {
  const router = useRouter();
  const href = `/branches/${division.slug}/${slugify(branch.en)}`;

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={() => router.push(href)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          router.push(href);
        }
      }}
      aria-label={`${branch.name} শাখার বিবরণ দেখুন`}
      className="group/card flex h-full cursor-pointer flex-col gap-3 rounded-[var(--radius-lg)] border bg-[var(--color-surface)] p-3.5 transition-[transform,border-color,box-shadow] duration-150 ease-out hover:-translate-y-0.5 hover:border-[var(--color-brand-primary)] hover:shadow-[var(--shadow-high)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)]"
      style={{ borderColor: "var(--color-border)", boxShadow: "var(--shadow-subtle)" }}
    >
      <div className="flex items-center gap-3">
        <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
          <span
            className="material-symbols-rounded relative"
            aria-hidden
            style={{ fontSize: 28, color: "var(--color-text-secondary)", opacity: 0.6, fontVariationSettings: '"FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24' }}
          >
            pin_drop
          </span>
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[15px] font-semibold leading-snug text-[var(--color-text-primary)]">{branch.name}</span>
          <span className="block truncate text-xs leading-snug text-[var(--color-text-secondary)]">{division.name}</span>
        </span>
        <span
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors duration-150 group-hover/card:bg-[var(--color-brand-primary)] group-hover/card:[&>span]:!text-white"
          style={{ background: "color-mix(in srgb, var(--color-brand-primary) 8%, transparent)" }}
        >
          <span className="material-symbols-rounded" aria-hidden style={{ fontSize: 16, color: "var(--color-brand-primary)" }}>
            chevron_right
          </span>
        </span>
      </div>
      <div className="mt-auto flex flex-wrap gap-1.5 border-t pt-3" style={{ borderColor: "color-mix(in srgb, var(--color-border) 60%, transparent)" }}>
        {branch.phones.map((phone) => (
          <a
            key={phone}
            href={telHref(phone)}
            onClick={(e) => e.stopPropagation()}
            aria-label={`${branch.name} শাখায় কল করুন ${phone}`}
            className="tap inline-flex min-w-0 items-center gap-1 rounded-full px-2 py-1.5 text-xs font-medium transition-colors hover:!bg-[var(--color-brand-primary)] hover:!text-white"
            style={{ background: "color-mix(in srgb, var(--color-brand-primary) 8%, transparent)", color: "var(--color-brand-primary)" }}
          >
            <span className="material-symbols-rounded" aria-hidden style={{ fontSize: 14 }}>
              call
            </span>
            {phone}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function BranchesPage() {
  const [query, setQuery] = useState("");
  const [mobileTab, setMobileTab] = useState<string | null>(null);

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
        <div className="relative mt-3 aspect-[2172/724] w-full overflow-hidden rounded-[8px] lg:aspect-auto lg:h-[165px]">
          <Image
            src="/branches-banner-v3.png"
            alt={`আপনার কাছে সবচেয়ে কাছে উদ্ভাস-উন্মেষ, সারা দেশে ${totalBranches}+ শাখা`}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="mt-5 flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 transition-colors duration-150 ease-out has-[:focus-visible]:border-[var(--color-brand-primary)]">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-secondary)" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search branch or district"
            className="w-full bg-transparent text-sm text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-secondary)]"
          />
        </div>

        <div className="mt-5">
          <DragScroll
            tag="div"
            role="tablist"
            aria-label="বিভাগ"
            className="-mx-4 flex cursor-grab gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <button
              type="button"
              role="tab"
              aria-selected={mobileTab === null}
              onClick={() => setMobileTab(null)}
              className="tap shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors"
              style={{
                borderColor: mobileTab === null ? "var(--color-brand-primary)" : "var(--color-border)",
                background: mobileTab === null ? "var(--color-brand-primary)" : "var(--color-surface)",
                color: mobileTab === null ? "white" : "var(--color-text-primary)",
              }}
            >
              All
            </button>
            {DIVISIONS.map((division) => {
              const active = mobileTab === division.slug;
              return (
                <button
                  key={division.slug}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setMobileTab(division.slug)}
                  className="tap shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors"
                  style={{
                    borderColor: active ? "var(--color-brand-primary)" : "var(--color-border)",
                    background: active ? "var(--color-brand-primary)" : "var(--color-surface)",
                    color: active ? "white" : "var(--color-text-primary)",
                  }}
                >
                  {division.en}
                </button>
              );
            })}
          </DragScroll>

          {(() => {
            const tabFiltered = mobileTab ? filtered.filter((d) => d.slug === mobileTab) : filtered;
            const branchCount = tabFiltered.reduce((sum, d) => sum + d.branches.length, 0);
            return (
              <>
                <p className="mb-3 mt-4 text-sm font-medium text-[var(--color-brand-primary)]">
                  {branchCount}টি শাখা পাওয়া গেছে
                </p>
                <div className="flex flex-col gap-3 md:grid md:grid-cols-2 lg:grid-cols-3">
                  {tabFiltered.map((division) =>
                    division.branches.map((branch) => (
                      <BranchCard key={`${division.slug}-${branch.name}`} branch={branch} division={division} />
                    ))
                  )}
                </div>
                {branchCount === 0 && (
                  <p className="py-8 text-center text-sm text-[var(--color-text-secondary)]">
                    কোনো শাখা পাওয়া যায়নি।
                  </p>
                )}
              </>
            );
          })()}
        </div>
       </PullToRefresh>
      </main>
      <BottomNav />
    </>
  );
}
