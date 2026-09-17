"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import BackButton from "@/components/BackButton";
import BottomNav from "@/components/BottomNav";
import { useAuth } from "@/components/AuthProvider";
import { CLASS_LEVELS, FREE_COURSES } from "@/data/freeCourses";

function readEnrolledSlugs(): string[] {
  try {
    return JSON.parse(localStorage.getItem("enrolledCourses") ?? "[]");
  } catch {
    return [];
  }
}

export default function FreeCoursesClassPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [enrolled, setEnrolled] = useState(false);

  useEffect(() => {
    setEnrolled(readEnrolledSlugs().includes(params.slug));
  }, [params.slug]);

  const classLevel = CLASS_LEVELS.find((c) => c.slug === params.slug);
  const course = FREE_COURSES[params.slug];

  const handleEnroll = () => {
    const slugs = readEnrolledSlugs();
    if (!slugs.includes(params.slug)) {
      slugs.push(params.slug);
      localStorage.setItem("enrolledCourses", JSON.stringify(slugs));
    }
    setEnrolled(true);
  };

  if (!classLevel || !course) {
    return (
      <>
        <header className="flex items-center gap-3 px-4 py-3">
          <BackButton href="/free-courses" />
          <h1 className="text-base font-bold leading-none text-[var(--color-text-primary)]">ট্রায়াল / ফ্রি কোর্স</h1>
        </header>
        <main className="flex flex-1 items-center justify-center px-8 text-center">
          <p className="text-sm text-[var(--color-text-secondary)]">এই শ্রেণির কোনো ফ্রি কোর্স পাওয়া যায়নি।</p>
        </main>
        <BottomNav />
      </>
    );
  }

  return (
    <>
      <header className="flex items-center gap-3 px-4 py-3">
        <BackButton href="/free-courses" />
        <h1 className="text-base font-bold leading-none text-[var(--color-text-primary)]">{classLevel.label}</h1>
      </header>

      <main className="flex-1 px-4 pb-6">
        <div className="rounded-[var(--radius-lg)] bg-[var(--color-surface)] p-4 shadow-[var(--shadow-subtle)]">
          <div className="mb-3 flex items-center gap-3">
            <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
              <span
                className="absolute inset-0 rounded-full"
                style={{ background: classLevel.bg, opacity: "var(--icon-bg-opacity)" }}
              />
              <span className="material-symbols-rounded relative" style={{ fontSize: 24, color: classLevel.color }}>
                play_circle
              </span>
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-[var(--color-text-primary)]">{course.title}</p>
              <p className="text-xs text-[var(--color-text-secondary)]">{course.subject}</p>
            </div>
          </div>

          <p className="mb-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">{course.description}</p>

          <div className="mb-4 flex items-center gap-1 text-xs text-[var(--color-text-secondary)]">
            <span className="material-symbols-rounded" style={{ fontSize: 14, opacity: 0.7 }}>
              smart_display
            </span>
            {course.videoCount}টি ফ্রি ক্লাস ভিডিও
          </div>

          {enrolled ? (
            <button
              type="button"
              onClick={() => router.push(`/free-courses/${params.slug}/watch`)}
              className="tap flex w-full items-center justify-center gap-2 rounded-[5px] py-3 text-sm font-bold text-white transition-[transform,background-color,color] duration-200 ease-out"
              style={{ background: "var(--color-success)" }}
            >
              <span className="material-symbols-rounded" style={{ fontSize: 18 }}>
                play_circle
              </span>
              Start Class
            </button>
          ) : (
            <button
              type="button"
              disabled={!isLoggedIn}
              onClick={handleEnroll}
              className="w-full rounded-[5px] py-3 text-sm font-bold text-white transition-[transform,background-color,color] duration-200 ease-out active:scale-[0.98] disabled:text-[var(--color-text-secondary)]"
              style={{
                background: !isLoggedIn ? "var(--color-border)" : "var(--color-brand-primary)",
                color: !isLoggedIn ? "var(--color-text-secondary)" : "white",
              }}
            >
              Enroll
            </button>
          )}

          {!isLoggedIn && (
            <p className="mt-3 text-center text-xs text-[var(--color-text-secondary)]">
              এনরোল করতে হলে আগে{" "}
              <Link href="/login" className="font-semibold text-[var(--color-brand-primary)]">
                লগ-ইন করুন
              </Link>
            </p>
          )}
        </div>
      </main>
      <BottomNav />
    </>
  );
}
