"use client";

import { useState } from "react";
import BackButton from "@/components/BackButton";
import BottomNav from "@/components/BottomNav";
import PullToRefresh from "@/components/PullToRefresh";
import { PROGRAMS, PROGRAM_CATEGORIES, type ProgramCategory } from "@/data/programs";

const CATEGORY_ICON: Record<ProgramCategory, string> = {
  Admission: "school",
  HSC: "menu_book",
  SSC: "menu_book",
  Academic: "auto_stories",
  "Model Test": "quiz",
  Scholarship: "military_tech",
  Cadet: "shield",
  Text: "import_contacts",
};

const MODES = ["All", "Offline", "Online", "Combo"] as const;
type ModeFilter = (typeof MODES)[number];

export default function ProgramsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"All" | ProgramCategory>("All");
  const [mode, setMode] = useState<ModeFilter>("All");
  const [filterOpen, setFilterOpen] = useState(false);

  const q = query.trim().toLowerCase();
  const filtered = PROGRAMS.filter((p) => {
    const matchesCategory = category === "All" || p.category === category;
    const matchesMode = mode === "All" || p.modes.some((m) => m.includes(mode));
    const matchesQuery = !q || p.title.toLowerCase().includes(q);
    return matchesCategory && matchesMode && matchesQuery;
  });

  const filtersActive = category !== "All" || mode !== "All";

  return (
    <>
      <header className="flex items-center gap-3 px-4 py-3">
        <BackButton href="/" />
        <h1 className="text-base font-bold leading-none text-[var(--color-text-primary)]">প্রোগ্রামসমূহ</h1>
      </header>

      <main className="flex-1 px-4 pb-6">
       <PullToRefresh>
        <div className="flex items-center gap-2">
          <div className="flex flex-1 items-center gap-2 rounded-[5px] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2.5 transition-colors duration-150 ease-out has-[:focus-visible]:border-[var(--color-brand-primary)]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-secondary)" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="কোর্স বা প্রোগ্রাম খুঁজুন..."
              className="w-full bg-transparent text-sm text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-secondary)]"
            />
          </div>
          <button
            type="button"
            onClick={() => setFilterOpen((v) => !v)}
            aria-label="ফিল্টার"
            aria-expanded={filterOpen}
            className="tap relative flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-lg)] border"
            style={
              filterOpen || mode !== "All"
                ? { background: "var(--color-brand-primary)", borderColor: "var(--color-brand-primary)" }
                : { background: "var(--color-surface)", borderColor: "var(--color-border)" }
            }
          >
            <span
              className="material-symbols-rounded"
              style={{ fontSize: 18, color: filterOpen || mode !== "All" ? "white" : "var(--color-text-secondary)" }}
            >
              tune
            </span>
            {mode !== "All" && (
              <span
                aria-hidden
                className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2"
                style={{ background: "var(--color-warning)", borderColor: "var(--color-bg-canvas)" }}
              />
            )}
          </button>
        </div>

        {filterOpen && (
          <div className="animate-dropdown-in mt-3 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-3">
            <p className="mb-2 text-xs font-semibold text-[var(--color-text-secondary)]">ক্লাস মোড</p>
            <div className="flex flex-wrap gap-2">
              {MODES.map((m) => {
                const active = mode === m;
                return (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMode(m)}
                    className="tap rounded-full px-4 py-2.5 text-xs font-semibold"
                    style={
                      active
                        ? { background: "var(--color-brand-primary)", color: "white" }
                        : { background: "var(--color-bg-canvas)", color: "var(--color-text-secondary)", border: "1px solid var(--color-border)" }
                    }
                  >
                    {m === "All" ? "সব" : m}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="mt-3 flex items-center justify-between">
          <p className="text-xs text-[var(--color-text-secondary)]">{filtered.length} টি প্রোগ্রাম পাওয়া গেছে</p>
          {filtersActive && (
            <button
              type="button"
              onClick={() => {
                setCategory("All");
                setMode("All");
              }}
              className="tap flex items-center gap-0.5 text-xs font-semibold"
              style={{ color: "var(--color-brand-primary)" }}
            >
              <span className="material-symbols-rounded" style={{ fontSize: 14 }}>
                close
              </span>
              ফিল্টার মুছুন
            </button>
          )}
        </div>

        {filtersActive && (
          <div className="mt-2 flex flex-wrap gap-2">
            {category !== "All" && (
              <button
                type="button"
                onClick={() => setCategory("All")}
                className="tap inline-flex items-center gap-1 rounded-full py-1.5 pl-3 pr-2 text-xs font-semibold"
                style={{ background: "color-mix(in srgb, var(--color-brand-primary) 12%, transparent)", color: "var(--color-brand-primary)" }}
              >
                {category}
                <span className="material-symbols-rounded" style={{ fontSize: 14 }}>
                  close
                </span>
              </button>
            )}
            {mode !== "All" && (
              <button
                type="button"
                onClick={() => setMode("All")}
                className="tap inline-flex items-center gap-1 rounded-full py-1.5 pl-3 pr-2 text-xs font-semibold"
                style={{ background: "color-mix(in srgb, var(--color-brand-primary) 12%, transparent)", color: "var(--color-brand-primary)" }}
              >
                {mode}
                <span className="material-symbols-rounded" style={{ fontSize: 14 }}>
                  close
                </span>
              </button>
            )}
          </div>
        )}

        <div className="relative -mx-4 mt-4">
          <div className="flex gap-2 overflow-x-auto px-4 pb-1" style={{ scrollbarWidth: "none" }}>
            {PROGRAM_CATEGORIES.map((c) => {
              const active = category === c.key;
              return (
                <button
                  key={c.key}
                  type="button"
                  onClick={() => setCategory(c.key)}
                  className="tap shrink-0 rounded-full px-4 py-2.5 text-xs font-semibold"
                  style={
                    active
                      ? { background: "var(--color-brand-primary)", color: "white" }
                      : { background: "var(--color-surface)", color: "var(--color-text-secondary)", border: "1px solid var(--color-border)" }
                  }
                >
                  {c.label}
                </button>
              );
            })}
          </div>
          <span
            aria-hidden
            className="pointer-events-none absolute right-0 top-0 h-full w-8"
            style={{ background: "linear-gradient(90deg, transparent, var(--color-bg-canvas))" }}
          />
        </div>

        <div className="mt-4 flex flex-col gap-4">
          {filtered.map((program) => (
            <div
              key={program.id}
              className="overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-surface)] shadow-[var(--shadow-subtle)]"
            >
              <div
                className="relative flex h-28 items-end p-4"
                style={{ background: `linear-gradient(135deg, ${program.gradient[0]} 0%, ${program.gradient[1]} 100%)` }}
              >
                <span
                  aria-hidden
                  className="absolute -right-4 -top-4 h-20 w-20 rounded-full"
                  style={{ background: "rgba(255,255,255,0.12)" }}
                />
                <p className="relative text-base font-bold leading-snug text-white">{program.title}</p>
              </div>
              <div className="flex flex-col gap-2 p-4">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold"
                    style={{ background: "var(--color-border)", color: "var(--color-text-primary)" }}
                  >
                    <span className="material-symbols-rounded" style={{ fontSize: 14 }}>
                      {CATEGORY_ICON[program.category]}
                    </span>
                    {program.category}
                  </span>
                  {program.startsAt && (
                    <span className="text-right text-xs text-[var(--color-text-secondary)]">শুরু: {program.startsAt}</span>
                  )}
                </div>
                <div className="flex items-center gap-1 text-xs text-[var(--color-text-secondary)]">
                  <span className="material-symbols-rounded" style={{ fontSize: 14, opacity: 0.7 }}>
                    location_on
                  </span>
                  {program.modes.join(" · ")}
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="py-8 text-center text-sm text-[var(--color-text-secondary)]">কোনো প্রোগ্রাম পাওয়া যায়নি।</p>
          )}
        </div>
       </PullToRefresh>
      </main>
      <BottomNav />
    </>
  );
}
