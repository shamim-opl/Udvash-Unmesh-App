"use client";

import { useState } from "react";
import Image from "next/image";
import AppHeader from "@/components/AppHeader";
import BottomNav from "@/components/BottomNav";
import PullToRefresh from "@/components/PullToRefresh";
import { DIVISIONS, type Branch, type Division } from "@/data/branches";

const mapsHref = (branch: Branch, division: Division) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Udvash-Unmesh ${branch.en} ${division.en} Bangladesh`)}`;

const telHref = (phone: string) => `tel:${phone.startsWith("88") ? `+${phone}` : phone}`;

function BranchCard({ branch, division }: { branch: Branch; division: Division }) {
  return (
    <div
      className="group/card flex h-full flex-col gap-3 rounded-[var(--radius-lg)] border bg-[var(--color-surface)] p-3.5 transition-[transform,border-color,box-shadow] duration-150 ease-out hover:-translate-y-0.5 hover:border-[var(--color-brand-primary)] hover:shadow-[var(--shadow-high)]"
      style={{ borderColor: "var(--color-border)", boxShadow: "var(--shadow-subtle)" }}
    >
      <a
        href={mapsHref(branch, division)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${branch.name} শাখা Google Maps-এ দেখুন`}
        className="group flex items-center gap-3"
      >
        <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
          <span className="absolute inset-0 rounded-full" style={{ background: "var(--color-brand-primary)", opacity: "var(--icon-bg-opacity)" }} />
          <span
            className="material-symbols-rounded relative"
            aria-hidden
            style={{ fontSize: 22, color: "var(--color-text-secondary)", opacity: 0.6, fontVariationSettings: '"FILL" 1, "wght" 400, "GRAD" 0, "opsz" 24' }}
          >
            location_on
          </span>
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[15px] font-semibold leading-snug text-[var(--color-text-primary)]">{branch.name}</span>
          <span className="block truncate text-xs leading-snug text-[var(--color-text-secondary)]">{division.name} · ম্যাপে দেখুন</span>
        </span>
        <span
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors duration-150 group-hover:bg-[var(--color-brand-primary)] group-hover:[&>span]:!text-white"
          style={{ background: "color-mix(in srgb, var(--color-brand-primary) 8%, transparent)" }}
        >
          <span className="material-symbols-rounded" aria-hidden style={{ fontSize: 16, color: "var(--color-brand-primary)" }}>
            north_east
          </span>
        </span>
      </a>
      <div className="mt-auto flex flex-wrap gap-2 border-t pt-3" style={{ borderColor: "color-mix(in srgb, var(--color-border) 60%, transparent)" }}>
        {branch.phones.map((phone) => (
          <a
            key={phone}
            href={telHref(phone)}
            aria-label={`${branch.name} শাখায় কল করুন ${phone}`}
            className="tap inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors hover:!bg-[var(--color-brand-primary)] hover:!text-white"
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
        <div className="relative mt-3 aspect-[2172/724] w-full overflow-hidden rounded-[8px]">
          <Image
            src="/branches-banner-v3.png"
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

        <div className="hidden md:block">
          {q ? (
            <div className="mt-6 flex flex-col gap-8">
              {filtered.map((division) => (
                <section key={division.slug} aria-label={division.name}>
                  <h2 className="mb-3 text-sm font-semibold text-[var(--color-text-primary)]">
                    {division.name} <span className="font-normal text-[var(--color-text-secondary)]">· {division.branches.length}টি শাখা</span>
                  </h2>
                  <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
                    {division.branches.map((branch) => (
                      <BranchCard key={branch.name} branch={branch} division={division} />
                    ))}
                  </div>
                </section>
              ))}
              {filtered.length === 0 && (
                <p className="py-8 text-center text-sm text-[var(--color-text-secondary)]">কোনো শাখা পাওয়া যায়নি।</p>
              )}
            </div>
          ) : (
            <>
              <div className="mt-5 grid grid-cols-4 gap-3" role="tablist" aria-label="বিভাগ">
                {DIVISIONS.map((division) => {
                  const active = (openDivision ?? DIVISIONS[0].slug) === division.slug;
                  return (
                    <button
                      key={division.slug}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setOpenDivision(division.slug)}
                      className="tap flex items-center gap-2.5 rounded-[var(--radius-lg)] border px-3 py-2.5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)]"
                      style={{
                        borderColor: active ? "var(--color-brand-primary)" : "var(--color-border)",
                        background: active
                          ? "color-mix(in srgb, var(--color-brand-primary) 6%, var(--color-surface))"
                          : "var(--color-surface)",
                        boxShadow: active ? "none" : "var(--shadow-subtle)",
                      }}
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold leading-snug text-[var(--color-text-primary)]">{division.name}</span>
                        <span className="block text-xs leading-snug text-[var(--color-text-secondary)]">{division.branches.length}টি শাখা</span>
                      </span>
                    </button>
                  );
                })}
              </div>
              {(() => {
                const division = DIVISIONS.find((d) => d.slug === (openDivision ?? DIVISIONS[0].slug)) ?? DIVISIONS[0];
                return (
                  <section className="mt-6" role="tabpanel" aria-label={division.name}>
                    <h2 className="mb-3 text-sm font-semibold text-[var(--color-text-primary)]">
                      {division.name} <span className="font-normal text-[var(--color-text-secondary)]">· {division.branches.length}টি শাখা</span>
                    </h2>
                    <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
                      {division.branches.map((branch) => (
                        <BranchCard key={branch.name} branch={branch} division={division} />
                      ))}
                    </div>
                  </section>
                );
              })()}
            </>
          )}
        </div>

        <div className="mt-4 flex flex-col gap-3 md:hidden">
          {filtered.map((division) => {
            const open = openDivision === division.slug || Boolean(q);
            return (
              <div
                key={division.slug}
                data-division={division.slug}
                className="scroll-mt-4 overflow-hidden rounded-[var(--radius-lg)] border bg-[var(--color-surface)] transition-colors duration-200"
                style={{
                  borderColor: open ? "var(--color-brand-primary)" : "transparent",
                  boxShadow: open ? "none" : "var(--shadow-subtle)",
                }}
              >
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={(e) => {
                    const opening = !(open && !q);
                    setOpenDivision(opening ? division.slug : null);
                    if (opening) {
                      const card = e.currentTarget.closest("[data-division]");
                      requestAnimationFrame(() => card?.scrollIntoView({ behavior: "smooth", block: "start" }));
                    }
                  }}
                  className="tap flex w-full items-center gap-3 p-4 text-left transition-colors duration-200"
                  style={{ background: open ? "color-mix(in srgb, var(--color-brand-primary) 6%, var(--color-surface))" : undefined }}
                >
                  <span className="flex-1">
                    <span
                      className="block text-sm font-semibold"
                      style={{ color: open ? "var(--color-brand-primary)" : "var(--color-text-primary)" }}
                    >
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
                    stroke={open ? "var(--color-brand-primary)" : "var(--color-text-secondary)"}
                    strokeWidth={open ? 2.5 : 2}
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
                            aria-hidden
                            style={{ fontSize: 20, color: "var(--color-text-secondary)", opacity: 0.6, fontVariationSettings: '"FILL" 1, "wght" 400, "GRAD" 0, "opsz" 24' }}
                          >
                            location_on
                          </span>
                          <div className="min-w-0 flex-1">
                            <a
                              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                `Udvash-Unmesh ${branch.en} ${division.en} Bangladesh`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${branch.name} শাখা Google Maps-এ দেখুন`}
                              className="block truncate text-sm font-semibold text-[var(--color-text-primary)] underline-offset-2 hover:underline"
                            >
                              {branch.name}
                            </a>
                            <p className="mt-0.5 flex flex-wrap gap-x-3 gap-y-1 text-xs">
                              {branch.phones.map((phone) => (
                                <a
                                  key={phone}
                                  href={`tel:${phone.startsWith("88") ? `+${phone}` : phone}`}
                                  aria-label={`${branch.name} শাখায় কল করুন ${phone}`}
                                  className="py-0.5 font-medium underline underline-offset-2"
                                  style={{ color: "var(--color-brand-primary)" }}
                                >
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
