"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AppHeader from "@/components/AppHeader";
import BottomNav from "@/components/BottomNav";
import PullToRefresh from "@/components/PullToRefresh";
import DragScroll from "@/components/DragScroll";
import { DIVISIONS, getBranchDistrict, telHref, slugify, type Branch, type Division } from "@/data/branches";
import { DIVISION_DISTRICTS } from "@/data/districts";

function BranchCard({ branch, division }: { branch: Branch; division: Division }) {
  const router = useRouter();
  const href = `/branches/${division.slug}/${slugify(branch.en)}`;
  const phoneSlots = [branch.phones[0] ?? null, branch.phones[1] ?? null];

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
      className="group/card flex h-full cursor-pointer flex-col gap-3 rounded-[var(--radius-lg)] border bg-[var(--color-surface)] p-4 transition-[transform,border-color,box-shadow] duration-150 ease-out md:hover:-translate-y-0.5 md:hover:border-[var(--color-brand-primary)] md:hover:shadow-[var(--shadow-high)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)]"
      style={{ borderColor: "var(--color-border)", boxShadow: "var(--shadow-subtle)" }}
    >
      <div className="flex items-center gap-3">
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[15px] font-semibold leading-snug text-[var(--color-text-primary)]">{branch.name}</span>
          <span className="block truncate text-xs leading-snug text-[var(--color-text-secondary)]">
            {getBranchDistrict(branch) ? `${getBranchDistrict(branch)}, ${division.name}` : division.name}
          </span>
        </span>
        <span
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors duration-150 md:group-hover/card:bg-[var(--color-brand-primary)] md:group-hover/card:[&>span]:!text-white"
          style={{ background: "color-mix(in srgb, var(--color-brand-primary) 8%, transparent)" }}
        >
          <span className="material-symbols-rounded" aria-hidden style={{ fontSize: 16, color: "var(--color-brand-primary)" }}>
            chevron_right
          </span>
        </span>
      </div>
      <div className="mt-auto grid grid-cols-2 border-t" style={{ borderColor: "color-mix(in srgb, var(--color-border) 60%, transparent)" }}>
        {phoneSlots.map((phone, index) => {
          const className = "tap relative flex min-w-0 items-center justify-center gap-2 px-2 pb-1.5 pt-3 text-sm font-medium transition-colors md:hover:!text-[var(--color-brand-primary)]";
          if (!phone) {
            return (
              <span key={`empty-phone-${index}`} className={className} style={{ color: "var(--color-text-secondary)" }}>
                --
                {index === 0 && <span className="pointer-events-none absolute right-0 top-1.5 h-[calc(100%-10px)] w-px bg-[color-mix(in_srgb,var(--color-border)_60%,transparent)]" aria-hidden />}
              </span>
            );
          }

          return (
            <a
              key={phone}
              href={telHref(phone)}
              onClick={(e) => e.stopPropagation()}
              aria-label={`${branch.name} শাখায় কল করুন ${phone}`}
              className={className}
              style={{ color: "var(--color-brand-primary)" }}
            >
              <span className="material-symbols-rounded" aria-hidden style={{ fontSize: 18 }}>
                call
              </span>
              {phone}
              {index === 0 && <span className="pointer-events-none absolute right-0 top-1.5 h-[calc(100%-10px)] w-px bg-[color-mix(in_srgb,var(--color-border)_60%,transparent)]" aria-hidden />}
            </a>
          );
        })}
      </div>
    </div>
  );
}

export default function BranchesPage() {
  const [query, setQuery] = useState("");
  const [mobileTab, setMobileTab] = useState<string | null>(null);
  const [districtTab, setDistrictTab] = useState<string | null>(null);

  const totalBranches = DIVISIONS.reduce((sum, d) => sum + d.branches.length, 0);
  const q = query.trim().toLowerCase();
  const filtered = q
    ? DIVISIONS.map((d) => ({
        ...d,
        branches: d.branches.filter(
          (b) =>
            b.name.toLowerCase().includes(q) ||
            b.en.toLowerCase().includes(q) ||
            (getBranchDistrict(b)?.toLowerCase().includes(q) ?? false) ||
            b.phones.some((p) => p.includes(q)) ||
            d.name.toLowerCase().includes(q) ||
            d.en.toLowerCase().includes(q)
        ),
      })).filter((d) => d.branches.length > 0)
    : DIVISIONS;
  const selectedDivision = mobileTab ? DIVISIONS.find((division) => division.slug === mobileTab) : null;
  const districtOptions = selectedDivision
    ? DIVISION_DISTRICTS.find((division) => division.slug === selectedDivision.slug)?.districts.filter((district) =>
        selectedDivision.branches.some((branch) => getBranchDistrict(branch) === district)
      ) ?? []
    : [];

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
          <div className="grid grid-cols-2 gap-2">
            <label className="min-w-0">
              <span className="mb-1.5 block text-xs font-normal text-[var(--color-text-secondary)]">Division</span>
              <span className="relative block">
                <select
                  value={mobileTab ?? ""}
                  onChange={(event) => {
                    setMobileTab(event.target.value || null);
                    setDistrictTab(null);
                  }}
                  aria-label="Select division"
                  className="w-full appearance-none rounded-[5px] border bg-[var(--color-surface)] px-3 py-2.5 pr-9 text-sm font-semibold text-[var(--color-text-primary)] outline-none"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  <option value="">All Divisions</option>
                  {DIVISIONS.map((division) => (
                    <option key={division.slug} value={division.slug}>
                      {division.en}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 material-symbols-rounded text-[var(--color-text-secondary)]" aria-hidden style={{ fontSize: 18 }}>
                  expand_more
                </span>
              </span>
            </label>

            <label className="min-w-0">
              <span className="mb-1.5 block text-xs font-normal text-[var(--color-text-secondary)]">District</span>
              <span className="relative block">
                <select
                  value={districtTab ?? ""}
                  onChange={(event) => setDistrictTab(event.target.value || null)}
                  aria-label="Select district"
                  disabled={!selectedDivision || districtOptions.length === 0}
                  className="w-full appearance-none rounded-[5px] border bg-[var(--color-surface)] px-3 py-2.5 pr-9 text-sm font-semibold text-[var(--color-text-primary)] outline-none disabled:cursor-not-allowed disabled:opacity-50"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  <option value="">All Districts</option>
                  {districtOptions.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 material-symbols-rounded text-[var(--color-text-secondary)]" aria-hidden style={{ fontSize: 18 }}>
                  expand_more
                </span>
              </span>
            </label>
          </div>

          {(() => {
            const tabFiltered = (mobileTab ? filtered.filter((d) => d.slug === mobileTab) : filtered).map((division) => ({
              ...division,
              branches: districtTab
                ? division.branches.filter((branch) => getBranchDistrict(branch) === districtTab)
                : division.branches,
            }));
            const branchCount = tabFiltered.reduce((sum, d) => sum + d.branches.length, 0);
            return (
              <>
                <p className="mb-3 mt-6 text-sm font-medium text-[var(--color-brand-primary)]">
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
