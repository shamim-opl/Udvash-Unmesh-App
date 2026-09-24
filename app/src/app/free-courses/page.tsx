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
        <p className="mt-2 text-sm text-[var(--color-text-secondary)]">নিজের ক্লাস বেছে নাও, সেখান থেকেই শুরু হবে তোমার ফ্রি কোর্স</p>

        <div className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(96px,1fr))] gap-3 lg:grid-cols-5">
          {CLASS_LEVELS.map((c) => (
            <Link
              key={c.slug}
              href={`/free-courses/${c.slug}`}
              className="tap flex flex-col items-center gap-2 rounded-[var(--radius-lg)] border bg-[var(--color-surface)] px-2 py-5 text-center transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)]"
              style={{ borderColor: "color-mix(in srgb, var(--color-border) 50%, transparent)", boxShadow: "var(--shadow-subtle)" }}
            >
              <span className="relative flex h-[82px] w-[82px] items-center justify-center rounded-full text-center font-bold" style={{ color: c.color }}>
                <span className="absolute inset-0 rounded-full" style={{ background: c.color, opacity: "var(--icon-bg-opacity)" }} />
                <span className="relative text-xs leading-tight">{c.enLabel}</span>
              </span>
            </Link>
          ))}
        </div>
      </main>
      <BottomNav />
    </>
  );
}
