"use client";

import Link from "next/link";
import AppHeader from "@/components/AppHeader";
import BackButton from "@/components/BackButton";
import BottomNav from "@/components/BottomNav";
import { CLASS_LEVELS } from "@/data/freeCourses";

export default function FreeCoursesPage() {
  return (
    <>
      <AppHeader />
      <header className="relative mb-2 flex items-center justify-center gap-3 px-4 py-3">
        <span className="absolute left-4 lg:left-8"><BackButton href="/" /></span>
        <h1 className="font-heading text-[18px] font-semibold leading-none text-[#616161]">ট্রায়াল / ফ্রি কোর্স</h1>
      </header>

      <main className="flex-1 px-4 pb-6">
        <h2 className="mb-4 text-sm font-normal text-[var(--color-text-secondary)]">শ্রেণি নির্বাচন করুন</h2>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
          {CLASS_LEVELS.map((c) => (
            <Link
              key={c.slug}
              href={`/free-courses/${c.slug}`}
              className="tap flex flex-col items-center gap-2 rounded-[var(--radius-lg)] border bg-[var(--color-surface)] px-2 py-4 text-center transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)]"
              style={{ borderColor: "color-mix(in srgb, var(--color-border) 50%, transparent)", boxShadow: "var(--shadow-subtle)" }}
            >
              <span className="relative flex h-11 w-11 items-center justify-center rounded-full">
                <span className="absolute inset-0 rounded-full" style={{ background: c.bg, opacity: "var(--icon-bg-opacity)" }} />
                <span className="material-symbols-rounded relative" style={{ fontSize: 20, color: c.color }}>
                  menu_book
                </span>
              </span>
              <span className="flex items-center gap-0.5 text-sm font-semibold text-[var(--color-text-primary)]">
                {c.label}
                <span className="material-symbols-rounded" style={{ fontSize: 14, color: "var(--color-text-secondary)" }}>
                  chevron_right
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
