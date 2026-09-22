"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import AppHeader from "@/components/AppHeader";
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
        <AppHeader />
        <header className="relative mb-2 flex items-center justify-center gap-3 px-4 py-3">
          <span className="absolute left-4 lg:left-8"><BackButton href="/free-courses" /></span>
          <h1 className="font-heading text-[18px] font-semibold leading-none text-[#616161]">ট্রায়াল / ফ্রি কোর্স</h1>
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
      <AppHeader />
      <header className="relative mb-2 flex items-center justify-center gap-3 px-4 py-3">
        <span className="absolute left-4 lg:left-8"><BackButton href="/free-courses" /></span>
        <h1 className="font-heading text-[18px] font-semibold leading-none text-[#616161]">{classLevel.label}</h1>
      </header>

      <main className="flex-1 px-4 pb-6">
        <div
          className="overflow-hidden rounded-[var(--radius-lg)] border bg-[var(--color-surface)]"
          style={{
            borderColor: "color-mix(in srgb, var(--color-border) 50%, transparent)",
            boxShadow: "var(--shadow-subtle)",
          }}
        >
          <div className="relative aspect-[2.2/1] w-full bg-[var(--color-border)]">
            {course.image && (
              <Image
                src={course.image}
                alt={`${course.title} কোর্সের প্রচ্ছদ`}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
                priority
              />
            )}
          </div>

          <div className="p-4">
            <div className="mb-3">
              <h2 className="text-base font-bold text-[var(--color-text-primary)]">{course.title}</h2>
            </div>

            <ul className="mb-3 space-y-1.5 text-sm leading-relaxed text-[var(--color-text-secondary)]">
              {course.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-2">
                  <span className="text-[var(--color-brand-primary)]">•</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>

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
                ক্লাস শুরু করুন
              </button>
            ) : (
              <button
                type="button"
                disabled={!isLoggedIn}
                onClick={handleEnroll}
                className="tap w-full rounded-[5px] py-3 text-sm font-bold text-white transition-[transform,background-color,color] duration-200 ease-out active:scale-[0.98] disabled:text-[var(--color-text-secondary)]"
                style={{
                  background: !isLoggedIn ? "var(--color-border)" : "var(--color-brand-primary)",
                  color: !isLoggedIn ? "var(--color-text-secondary)" : "white",
                }}
              >
                এনরোল করুন
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
        </div>
      </main>
      <BottomNav />
    </>
  );
}
