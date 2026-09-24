"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AppHeader from "@/components/AppHeader";
import BackButton from "@/components/BackButton";
import BottomNav from "@/components/BottomNav";
import { CLASS_LEVELS, findFreeCourse } from "@/data/freeCourses";

function readEnrolledIds(): string[] {
  try {
    return JSON.parse(localStorage.getItem("enrolledCourses") ?? "[]");
  } catch {
    return [];
  }
}

export default function FreeCourseRegisterPage({ params }: { params: Promise<{ slug: string; courseId: string }> }) {
  const { slug, courseId } = use(params);
  const router = useRouter();
  const enrollKey = `${slug}/${courseId}`;

  const classLevel = CLASS_LEVELS.find((c) => c.slug === slug);
  const course = findFreeCourse(slug, courseId);

  // Start false so server and client render the same thing on first paint (no localStorage
  // on the server) — the real value is applied right after mount instead.
  const [enrolled, setEnrolled] = useState(false);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setEnrolled(readEnrolledIds().includes(enrollKey));
  }, [enrollKey]);

  if (!classLevel || !course) {
    return (
      <>
        <AppHeader />
        <header className="relative mb-2 flex items-center justify-center gap-3 px-4 py-3">
          <span className="absolute back-btn-offset"><BackButton href="/free-courses" /></span>
          <h1 className="font-heading text-[18px] font-semibold leading-none text-[#616161]">ট্রায়াল / ফ্রি কোর্স</h1>
        </header>
        <main className="flex flex-1 items-center justify-center px-8 text-center">
          <p className="text-sm text-[var(--color-text-secondary)]">এই কোর্সটি পাওয়া যায়নি।</p>
        </main>
        <BottomNav />
      </>
    );
  }

  const mobileValid = /^01[3-9]\d{8}$/.test(mobile);
  const canSubmit = name.trim().length >= 2 && mobileValid;

  const handleRegister = () => {
    if (!canSubmit) return;
    setSubmitting(true);
    const ids = readEnrolledIds();
    if (!ids.includes(enrollKey)) {
      ids.push(enrollKey);
      localStorage.setItem("enrolledCourses", JSON.stringify(ids));
    }
    localStorage.setItem(`enrolledName_${enrollKey}`, name.trim());
    setEnrolled(true);
    setSubmitting(false);
  };

  return (
    <>
      <AppHeader />
      <header className="relative mb-2 flex items-center justify-center gap-3 px-4 py-3">
        <span className="absolute back-btn-offset"><BackButton href={`/free-courses/${slug}`} /></span>
        <h1 className="font-heading text-[18px] font-semibold leading-none text-[#616161]">{classLevel.enLabel}</h1>
      </header>

      <main className="flex-1 px-4 pb-6">
        <div
          className="overflow-hidden rounded-[var(--radius-lg)] border bg-[var(--color-surface)] lg:mx-auto lg:max-w-[400px]"
          style={{ borderColor: "color-mix(in srgb, var(--color-border) 50%, transparent)", boxShadow: "var(--shadow-subtle)" }}
        >
          <div
            className="relative flex aspect-[2.2/1] w-full items-end p-4"
            style={{ background: `linear-gradient(135deg, ${classLevel.color} 0%, color-mix(in srgb, ${classLevel.color} 60%, black) 100%)` }}
          >
            <span
              aria-hidden
              className="absolute -right-6 -top-6 h-24 w-24 rounded-full"
              style={{ background: "rgba(255,255,255,0.12)" }}
            />
            <p className="relative text-base font-bold leading-snug text-white">{course.title}</p>
          </div>

          <div className="p-4">
            <ul className="mb-4 space-y-1.5 text-sm leading-relaxed text-[var(--color-text-secondary)]">
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
                onClick={() => router.push(`/free-courses/${slug}/${courseId}/watch`)}
                className="tap flex w-full items-center justify-center gap-2 rounded-[5px] py-3 text-sm font-bold text-white transition-[transform,background-color,color] duration-200 ease-out"
                style={{ background: "var(--color-success)" }}
              >
                <span className="material-symbols-rounded" style={{ fontSize: 18 }}>
                  play_circle
                </span>
                Start Class
              </button>
            ) : (
              <div className="border-t pt-4" style={{ borderColor: "var(--color-border)" }}>
                <p className="mb-3 text-sm font-semibold text-[var(--color-text-primary)]">রেজিস্ট্রেশন করুন</p>

                <label className="mb-1 block text-xs font-medium text-[var(--color-text-secondary)]">নাম</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="আপনার নাম লিখুন"
                  className="mb-3 w-full rounded-[5px] border bg-transparent px-3 py-2.5 text-sm text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-secondary)] focus-visible:border-[var(--color-brand-primary)]"
                  style={{ borderColor: "var(--color-border)" }}
                />

                <label className="mb-1 block text-xs font-medium text-[var(--color-text-secondary)]">মোবাইল নম্বর</label>
                <input
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 11))}
                  placeholder="01XXXXXXXXX"
                  inputMode="numeric"
                  className="mb-4 w-full rounded-[5px] border bg-transparent px-3 py-2.5 text-sm text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-secondary)] focus-visible:border-[var(--color-brand-primary)]"
                  style={{ borderColor: "var(--color-border)" }}
                />

                <button
                  type="button"
                  disabled={!canSubmit || submitting}
                  onClick={handleRegister}
                  className="tap w-full rounded-[5px] py-3 text-sm font-bold text-white transition-[transform,background-color,color] duration-200 ease-out active:scale-[0.98] disabled:text-[var(--color-text-secondary)]"
                  style={{
                    background: canSubmit ? "var(--color-brand-primary)" : "var(--color-border)",
                    color: canSubmit ? "white" : "var(--color-text-secondary)",
                  }}
                >
                  রেজিস্ট্রেশন করে শুরু করুন
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
      <BottomNav />
    </>
  );
}
