import { notFound } from "next/navigation";
import Link from "next/link";
import AppHeader from "@/components/AppHeader";
import BackButton from "@/components/BackButton";
import BottomNav from "@/components/BottomNav";
import { CLASS_LEVELS, FREE_COURSES } from "@/data/freeCourses";

export function generateStaticParams() {
  return CLASS_LEVELS.map((c) => ({ slug: c.slug }));
}

export default async function FreeCoursesPickPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const classLevel = CLASS_LEVELS.find((c) => c.slug === slug);
  if (!classLevel) notFound();
  const courses = FREE_COURSES[slug] ?? [];

  return (
    <>
      <AppHeader />
      <header className="relative mb-2 flex items-center justify-center gap-3 px-4 py-3">
        <span className="absolute back-btn-offset"><BackButton href="/free-courses" /></span>
        <h1 className="font-heading text-[18px] font-semibold leading-none text-[#616161]">{classLevel.enLabel}</h1>
      </header>

      <main className="flex-1 px-4 pb-6">
        <p className="mt-2 text-sm text-[var(--color-text-secondary)]">Pick a course to start</p>

        <div className="mt-4 flex flex-col gap-3">
          {courses.map((course) => (
            <Link
              key={course.id}
              href={`/free-courses/${slug}/${course.id}`}
              className="tap flex items-center gap-4 rounded-[var(--radius-lg)] border bg-[var(--color-surface)] px-5 py-6 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)]"
              style={{ borderColor: "color-mix(in srgb, var(--color-border) 50%, transparent)", boxShadow: "var(--shadow-subtle)" }}
            >
              <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full">
                <span className="absolute inset-0 rounded-full" style={{ background: classLevel.color, opacity: "var(--icon-bg-opacity)" }} />
                <span className="material-symbols-rounded relative" style={{ fontSize: 26, color: classLevel.color }}>
                  play_circle
                </span>
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-base font-semibold text-[var(--color-text-primary)]">{course.title}</span>
                <span className="mt-0.5 block text-xs text-[var(--color-text-secondary)]">{course.subject} · {course.videoCount}টি ভিডিও</span>
              </span>
              <span className="material-symbols-rounded" style={{ fontSize: 16, color: "var(--color-text-secondary)" }}>
                arrow_forward_ios
              </span>
            </Link>
          ))}
        </div>

        {courses.length === 0 && (
          <p className="mt-8 text-center text-sm text-[var(--color-text-secondary)]">এই ক্লাসের কোনো ফ্রি কোর্স এখনো নেই।</p>
        )}
      </main>
      <BottomNav />
    </>
  );
}
