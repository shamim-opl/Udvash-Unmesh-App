import { notFound } from "next/navigation";
import Link from "next/link";
import AppHeader from "@/components/AppHeader";
import BackButton from "@/components/BackButton";
import BottomNav from "@/components/BottomNav";
import { CLASS_CHIPS, PROGRAMS, type ClassLevelSlug } from "@/data/programs";

export function generateStaticParams() {
  return CLASS_CHIPS.map((c) => ({ classSlug: c.slug }));
}

const MODE_OPTIONS = [
  { slug: "offline", label: "Offline Program", icon: "location_on", match: (modes: string[]) => modes.some((m) => m.toLowerCase().includes("offline")) },
  { slug: "online", label: "Online Program", icon: "laptop_mac", match: (modes: string[]) => modes.some((m) => m.toLowerCase().includes("online")) },
] as const;

export default async function ProgramsClassModePage({ params }: { params: Promise<{ classSlug: string }> }) {
  const { classSlug } = await params;
  const chip = CLASS_CHIPS.find((c) => c.slug === classSlug);
  if (!chip) notFound();

  const classPrograms = PROGRAMS.filter((p) => p.classLevels.includes(classSlug as ClassLevelSlug));

  return (
    <>
      <AppHeader />
      <header className="relative mb-2 flex items-center justify-center gap-3 px-4 py-3">
        <span className="absolute left-4 lg:left-8"><BackButton href="/programs" /></span>
        <h1 className="font-heading text-[18px] font-semibold leading-none text-[#616161]">
          {chip.slug === "model-test" || chip.slug === "admission" ? chip.label : `Class ${chip.slug}`}
        </h1>
      </header>

      <main className="flex-1 px-4 pb-6">
        <p className="mt-2 text-sm text-[var(--color-text-secondary)]">How would you like to study?</p>

        <div className="mt-4 flex flex-col gap-3">
          {MODE_OPTIONS.map((mode) => {
            const count = classPrograms.filter((p) => mode.match(p.modes)).length;
            return (
              <Link
                key={mode.slug}
                href={`/programs/${classSlug}/${mode.slug}`}
                className="tap flex items-center gap-4 rounded-[var(--radius-lg)] border bg-[var(--color-surface)] px-5 py-6 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)]"
                style={{ borderColor: "color-mix(in srgb, var(--color-border) 50%, transparent)", boxShadow: "var(--shadow-subtle)" }}
              >
                <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full">
                  <span className="absolute inset-0 rounded-full" style={{ background: "var(--color-brand-primary)", opacity: "var(--icon-bg-opacity)" }} />
                  <span className="material-symbols-rounded relative" style={{ fontSize: 26, color: "var(--color-brand-primary)" }}>
                    {mode.icon}
                  </span>
                </span>
                <span className="flex-1">
                  <span className="block text-lg font-semibold text-[var(--color-text-primary)]">{mode.label}</span>
                  <span className="mt-0.5 block text-xs text-[var(--color-text-secondary)]">{count} টি প্রোগ্রাম</span>
                </span>
                <span className="material-symbols-rounded" style={{ fontSize: 16, color: "var(--color-text-secondary)" }}>
                  arrow_forward_ios
                </span>
              </Link>
            );
          })}
        </div>

        {classPrograms.length === 0 && (
          <p className="mt-8 text-center text-sm text-[var(--color-text-secondary)]">এই ক্লাসের জন্য এখনো কোনো প্রোগ্রাম নেই।</p>
        )}
      </main>
      <BottomNav />
    </>
  );
}
