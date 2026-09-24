"use client";

import { use, useState } from "react";
import { notFound } from "next/navigation";
import AppHeader from "@/components/AppHeader";
import BackButton from "@/components/BackButton";
import BottomNav from "@/components/BottomNav";
import { CLASS_CHIPS, PROGRAMS, type ClassLevelSlug, type ProgramCategory } from "@/data/programs";

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

const CATEGORY_HIGHLIGHTS: Record<ProgramCategory, string[]> = {
  Admission: ["বাংলা ও ইংলিশ ভার্সন", "টপিকভিত্তিক ফাউন্ডেশন ক্লাস", "স্ট্যান্ডার্ড এক্সাম ও Q&A সাপোর্ট"],
  HSC: ["বিষয়ভিত্তিক কনসেপ্ট ক্লাস", "লাইভ ও রেকর্ডেড ক্লাস সুবিধা", "MCQ ও CQ এক্সাম সাপোর্ট"],
  SSC: ["বাংলা ও ইংলিশ ভার্সন", "বোর্ড স্ট্যান্ডার্ড প্রস্তুতি", "MCQ ও CQ প্র্যাকটিস"],
  Academic: ["বিষয়ভিত্তিক প্যারালাল টেক্সট", "লাইভ ক্লাস ও রেকর্ডেড ভিডিও", "নিয়মিত পরীক্ষা ও সমাধান"],
  "Model Test": ["বিষয়ভিত্তিক প্রশ্নব্যাংক", "বোর্ড স্ট্যান্ডার্ড মডেল টেস্ট", "পরীক্ষাভিত্তিক সলভ শিট"],
  Scholarship: ["শিক্ষার্থীদের জন্য বিশেষ আয়োজন", "বিষয়ভিত্তিক পরীক্ষা ও প্রশ্নব্যাংক", "মেধাবৃত্তি ও পুরস্কারের সুযোগ"],
  Cadet: ["বাংলা ও ইংলিশ ভার্সন", "অভিজ্ঞ শিক্ষকের প্রস্তুতি ক্লাস", "মডেল টেস্ট ও সলভ সাপোর্ট"],
  Text: ["দৃঢ় বেসিক গঠনে কনসেপ্ট আলোচনা", "বাস্তব উদাহরণ ও চিত্রসহ ব্যাখ্যা", "বোর্ড ও এডমিশন প্রশ্ন-সমাধান"],
};

const PRICE_FILTERS = ["All", "Paid", "Free"] as const;
type PriceFilter = (typeof PRICE_FILTERS)[number];

const MODE_LABEL: Record<string, string> = { offline: "Offline Program", online: "Online Program" };

export default function ProgramsClassModeListPage({
  params,
}: {
  params: Promise<{ classSlug: string; mode: string }>;
}) {
  const { classSlug, mode } = use(params);
  const chip = CLASS_CHIPS.find((c) => c.slug === classSlug);
  const modeLabel = MODE_LABEL[mode];
  if (!chip || !modeLabel) notFound();

  const [price, setPrice] = useState<PriceFilter>("All");

  const modeMatch = (modes: string[]) => modes.some((m) => m.toLowerCase().includes(mode));
  const basePrograms = PROGRAMS.filter((p) => p.classLevels.includes(classSlug as ClassLevelSlug) && modeMatch(p.modes));
  // No program in our data is marked free — everything here is a real paid batch, so the
  // "Free" filter is honest (it simply has nothing to show) rather than showing fake entries.
  const filtered = basePrograms.filter((p) => {
    if (price === "All") return true;
    if (price === "Free") return Boolean(p.free);
    return !p.free;
  });

  return (
    <>
      <AppHeader />
      <header className="relative mb-2 flex flex-col items-center justify-center gap-0.5 px-4 py-3">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 lg:left-8"><BackButton href={`/programs/${classSlug}`} /></span>
        <h1 className="font-heading text-[18px] font-semibold leading-none text-[#616161]">
          {chip.slug === "model-test" || chip.slug === "admission" ? chip.label : `Class ${chip.slug}`}
        </h1>
        <p className="text-xs text-[var(--color-text-secondary)]">{modeLabel}</p>
      </header>

      <main className="flex-1 px-4 pb-6">
        <div className="flex gap-2">
          {PRICE_FILTERS.map((p) => {
            const active = price === p;
            return (
              <button
                key={p}
                type="button"
                onClick={() => setPrice(p)}
                className="tap rounded-full px-4 py-2 text-sm font-semibold transition-colors"
                style={
                  active
                    ? { background: "var(--color-brand-primary)", color: "white" }
                    : { background: "var(--color-surface)", color: "var(--color-text-secondary)", border: "1px solid var(--color-border)" }
                }
              >
                {p}
              </button>
            );
          })}
        </div>

        <p className="mt-3 text-xs text-[var(--color-text-secondary)]">{filtered.length} টি প্রোগ্রাম পাওয়া গেছে</p>

        <div className="mt-4 flex flex-col gap-4 lg:grid lg:grid-cols-2">
          {filtered.map((program) => (
            <div key={program.id} className="overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-surface)] shadow-[var(--shadow-subtle)]">
              <div
                className="relative flex h-[190px] items-end overflow-hidden p-4"
                style={{ background: `linear-gradient(135deg, ${program.gradient[0]} 0%, ${program.gradient[1]} 100%)` }}
              >
                {program.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={program.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
                )}
                <span
                  aria-hidden
                  className="absolute inset-0"
                  style={{ background: program.image ? "linear-gradient(180deg, rgba(0,0,0,0.04), rgba(0,0,0,0.7))" : "transparent" }}
                />
                <span
                  aria-hidden
                  className="absolute -right-4 -top-4 h-20 w-20 rounded-full"
                  style={{ background: program.image ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.12)" }}
                />
                <p className="relative text-base font-bold leading-snug text-white">{program.title}</p>
              </div>
              <div className="flex flex-col gap-3 p-4">
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
                  {program.startsAt && <span className="text-right text-xs text-[var(--color-text-secondary)]">শুরু: {program.startsAt}</span>}
                </div>
                <ul className="space-y-1 text-xs leading-relaxed text-[var(--color-text-secondary)]">
                  {CATEGORY_HIGHLIGHTS[program.category].map((highlight) => (
                    <li key={highlight} className="flex gap-1.5">
                      <span className="text-[var(--color-brand-primary)]">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between gap-2 border-t pt-3" style={{ borderColor: "var(--color-border)" }}>
                  <span className="min-w-0 flex-1 truncate text-xs text-[var(--color-text-secondary)]">{program.modes.join(" · ")}</span>
                  <div className="flex shrink-0 items-center gap-2">
                    <a
                      href={`https://udvash.com/Program/Details/${program.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tap whitespace-nowrap rounded-[5px] border px-3 py-2 text-xs font-semibold text-[var(--color-brand-primary)]"
                      style={{ borderColor: "var(--color-brand-primary)" }}
                    >
                      Details
                    </a>
                    <a
                      href="https://online.udvash-unmesh.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tap whitespace-nowrap rounded-[5px] px-3 py-2 text-xs font-semibold text-white"
                      style={{ background: "var(--color-brand-primary)" }}
                    >
                      Enroll Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="py-8 text-center text-sm text-[var(--color-text-secondary)]">কোনো প্রোগ্রাম পাওয়া যায়নি।</p>
          )}
        </div>
      </main>
      <BottomNav />
    </>
  );
}
