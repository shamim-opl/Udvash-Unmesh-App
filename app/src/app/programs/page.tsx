import Link from "next/link";
import AppHeader from "@/components/AppHeader";
import BackButton from "@/components/BackButton";
import BottomNav from "@/components/BottomNav";
import { CLASS_CHIPS } from "@/data/programs";

const CHIP_COLORS: Record<string, string> = {
  "5": "#00ACC1",
  "6": "#1E88E5",
  "7": "#43A047",
  "8": "#FB8C00",
  "9": "#00897B",
  "10": "#8E24AA",
  "11": "#3949AB",
  "12": "#8D6E63",
  "model-test": "#6D4C41",
  admission: "#E53935",
};

export default function ProgramsPickClassPage() {
  return (
    <>
      <AppHeader />
      <header className="relative mb-2 flex items-center justify-center gap-3 px-4 py-3">
        <span className="absolute left-4 lg:left-8"><BackButton href="/" /></span>
        <h1 className="font-heading text-[18px] font-semibold leading-none text-[#616161]">আমাদের প্রোগ্রামসমূহ</h1>
      </header>

      <main className="flex-1 px-4 pb-6">
        <p className="mt-2 text-sm text-[var(--color-text-secondary)]">নিজের ক্লাস বেছে নাও, পছন্দের প্রোগ্রাম যুক্ত করো তোমার পোর্টালে</p>

        <div className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(96px,1fr))] gap-3 lg:grid-cols-5">
          {CLASS_CHIPS.map((c) => (
            <Link
              key={c.slug}
              href={`/programs/${c.slug}`}
              className="tap flex flex-col items-center gap-2 rounded-[var(--radius-lg)] border bg-[var(--color-surface)] px-2 py-5 text-center transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)]"
              style={{ borderColor: "color-mix(in srgb, var(--color-border) 50%, transparent)", boxShadow: "var(--shadow-subtle)" }}
            >
              <span className="relative flex h-[82px] w-[82px] items-center justify-center">
                <span className="relative flex h-[82px] w-[82px] items-center justify-center rounded-full text-center font-bold" style={{ color: CHIP_COLORS[c.slug] }}>
                  <span className="absolute inset-0 rounded-full" style={{ background: CHIP_COLORS[c.slug], opacity: "var(--icon-bg-opacity)" }} />
                  <span className="relative text-xs leading-tight">
                    {c.slug === "model-test" ? "Model Test" : c.slug === "admission" ? "Admission" : `Class ${c.slug}`}
                  </span>
                </span>
              </span>
            </Link>
          ))}
        </div>
      </main>
      <BottomNav />
    </>
  );
}
