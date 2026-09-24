"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AppHeader from "@/components/AppHeader";
import BackButton from "@/components/BackButton";
import BottomNav from "@/components/BottomNav";
import { CLASS_LEVELS, findFreeCourse, formatDuration } from "@/data/freeCourses";

function readCompleted(key: string): number[] {
  try {
    return JSON.parse(localStorage.getItem(`completedLessons_${key}`) ?? "[]");
  } catch {
    return [];
  }
}

function saveCompleted(key: string, completed: number[]) {
  localStorage.setItem(`completedLessons_${key}`, JSON.stringify(completed));
}

export default function WatchCoursePage() {
  const params = useParams<{ slug: string; courseId: string }>();
  const router = useRouter();
  const slug = params.slug;
  const courseId = params.courseId;
  const enrollKey = `${slug}/${courseId}`;

  const classLevel = CLASS_LEVELS.find((c) => c.slug === slug);
  const course = findFreeCourse(slug, courseId);

  const [activeLesson, setActiveLesson] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [completed, setCompleted] = useState<number[]>([]);
  const [showControls, setShowControls] = useState(true);
  const [seeking, setSeeking] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenSupported, setFullscreenSupported] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (slug) setCompleted(readCompleted(enrollKey));
  }, [enrollKey, slug]);

  const durationSec = course?.lessons[activeLesson]?.durationSec ?? 0;

  useEffect(() => {
    if (!playing || seeking) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setElapsed((prev) => {
        const next = prev + Math.max(1, Math.round(durationSec / 60));
        if (next >= durationSec) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setPlaying(false);
          setCompleted((c) => {
            if (c.includes(activeLesson)) return c;
            const updated = [...c, activeLesson];
            saveCompleted(enrollKey, updated);
            return updated;
          });
          return durationSec;
        }
        return next;
      });
    }, 200);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [playing, seeking, activeLesson, enrollKey, durationSec]);

  // auto-hide the control bar a couple seconds after playback starts
  useEffect(() => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    if (playing) {
      hideTimerRef.current = setTimeout(() => setShowControls(false), 2500);
    } else {
      setShowControls(true);
    }
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, [playing, elapsed === 0]);

  // keep isFullscreen in sync with the browser (handles the OS/back-gesture exit too)
  useEffect(() => {
    setFullscreenSupported(Boolean(document.fullscreenEnabled && playerRef.current?.requestFullscreen));
    const onFullscreenChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", onFullscreenChange);
      const orientation = screen.orientation as ScreenOrientation & { unlock?: () => void };
      orientation.unlock?.();
      if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    };
  }, []);

  const toggleFullscreen = async () => {
    if (!playerRef.current) return;
    try {
      if (!document.fullscreenElement) {
        await playerRef.current.requestFullscreen();
        const orientation = screen.orientation as ScreenOrientation & {
          lock?: (o: string) => Promise<void>;
        };
        await orientation.lock?.("landscape").catch(() => {});
      } else {
        const orientation = screen.orientation as ScreenOrientation & { unlock?: () => void };
        orientation.unlock?.();
        await document.exitFullscreen();
      }
    } catch {
      // Fullscreen/orientation lock isn't available on this device (e.g. iOS Safari) — ignore.
    }
  };

  if (!classLevel || !course) {
    return (
      <>
        <AppHeader />
        <main className="flex flex-1 items-center justify-center px-8 text-center">
          <p className="text-sm text-[var(--color-text-secondary)]">কোর্সটি পাওয়া যায়নি।</p>
        </main>
        <BottomNav />
      </>
    );
  }

  const lesson = course.lessons[activeLesson];
  const allDone = completed.length >= course.lessons.length;
  const progressPct = durationSec ? Math.min((elapsed / durationSec) * 100, 100) : 0;

  const goToLesson = (index: number) => {
    setActiveLesson(index);
    setElapsed(completed.includes(index) ? course.lessons[index].durationSec : 0);
    setPlaying(false);
  };

  const goNext = () => {
    if (activeLesson < course.lessons.length - 1) goToLesson(activeLesson + 1);
  };
  const goPrev = () => {
    if (activeLesson > 0) goToLesson(activeLesson - 1);
  };

  const seekToClientX = (clientX: number) => {
    if (!barRef.current || !durationSec) return;
    const rect = barRef.current.getBoundingClientRect();
    const ratio = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
    setElapsed(Math.round(ratio * durationSec));
  };

  const skip = (deltaSec: number) => {
    setElapsed((prev) => Math.min(Math.max(prev + deltaSec, 0), durationSec));
  };

  return (
    <>
      <AppHeader />
      <header className="relative mb-2 flex items-center justify-center gap-3 px-4 py-3">
        <span className="absolute left-4 lg:left-8"><BackButton href={`/free-courses/${slug}/${courseId}`} /></span>
        <h1 className="font-heading truncate text-[18px] font-semibold leading-none text-[#616161]">{course.title}</h1>
      </header>

      <main className="flex-1 pb-6">
        <div className="lg:grid lg:grid-cols-[2fr_1fr] lg:items-start lg:gap-6">
        <div
          ref={playerRef}
          className={
            isFullscreen
              ? "relative flex h-full w-full items-center justify-center overflow-hidden bg-black"
              : "relative aspect-video w-full overflow-hidden bg-black"
          }
          onClick={() => setShowControls((v) => (playing ? !v : true))}
        >
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ background: `linear-gradient(135deg, ${classLevel.color} 0%, #000 120%)`, opacity: 0.55 }}
          />

          {/* center transport controls */}
          <div
            className="absolute inset-0 flex items-center justify-center gap-8 transition-opacity duration-200 ease-out"
            style={{ opacity: showControls ? 1 : 0, pointerEvents: showControls ? "auto" : "none" }}
          >
            <button
              type="button"
              aria-label="১০ সেকেন্ড পিছনে"
              onClick={(e) => {
                e.stopPropagation();
                skip(-10);
              }}
              className="tap flex h-10 w-10 items-center justify-center rounded-full text-white"
              style={{ background: "rgba(255,255,255,0.15)" }}
            >
              <span className="material-symbols-rounded" style={{ fontSize: 20 }}>
                replay_10
              </span>
            </button>

            <button
              type="button"
              aria-label={playing ? "পজ করুন" : "চালান"}
              onClick={(e) => {
                e.stopPropagation();
                if (elapsed >= durationSec) setElapsed(0);
                setPlaying((p) => !p);
              }}
              className="tap flex h-16 w-16 items-center justify-center rounded-full"
              style={{ background: "rgba(255,255,255,0.18)" }}
            >
              <span className="material-symbols-rounded" style={{ fontSize: 34, color: "white" }}>
                {playing ? "pause" : "play_arrow"}
              </span>
            </button>

            <button
              type="button"
              aria-label="১০ সেকেন্ড সামনে"
              onClick={(e) => {
                e.stopPropagation();
                skip(10);
              }}
              className="tap flex h-10 w-10 items-center justify-center rounded-full text-white"
              style={{ background: "rgba(255,255,255,0.15)" }}
            >
              <span className="material-symbols-rounded" style={{ fontSize: 20 }}>
                forward_10
              </span>
            </button>
          </div>

          {/* bottom control bar: title, seekable progress, elapsed/total time */}
          <div
            className="absolute inset-x-0 bottom-0 px-3 pb-2 transition-opacity duration-200 ease-out"
            style={{ opacity: showControls ? 1 : 0, pointerEvents: showControls ? "auto" : "none" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-1 flex items-center justify-between text-[11px] font-semibold text-white">
              <span className="truncate">{lesson.title}</span>
              <span className="shrink-0">
                {formatDuration(elapsed)} / {formatDuration(durationSec)}
              </span>
            </div>
            <div
              ref={barRef}
              role="slider"
              aria-label="ভিডিও অগ্রগতি"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progressPct)}
              className="relative h-4 w-full cursor-pointer"
              onPointerDown={(e) => {
                setSeeking(true);
                seekToClientX(e.clientX);
                (e.target as HTMLElement).setPointerCapture(e.pointerId);
              }}
              onPointerMove={(e) => {
                if (seeking) seekToClientX(e.clientX);
              }}
              onPointerUp={() => setSeeking(false)}
            >
              <div className="absolute top-1/2 h-1.5 w-full -translate-y-1/2 overflow-hidden rounded-full bg-white/25">
                <div
                  className="h-full rounded-full bg-white"
                  style={{ width: `${progressPct}%`, transition: seeking ? "none" : "width 200ms ease-out" }}
                />
              </div>
              <div
                className="absolute top-1/2 h-3 w-3 -translate-y-1/2 -translate-x-1/2 rounded-full bg-white shadow"
                style={{ left: `${progressPct}%`, transition: seeking ? "none" : "left 200ms ease-out" }}
              />
            </div>
            {fullscreenSupported && (
              <div className="mt-0.5 flex justify-end">
                <button
                  type="button"
                  aria-label={isFullscreen ? "ফুলস্ক্রিন থেকে বের হও" : "ফুলস্ক্রিন করো"}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFullscreen();
                  }}
                  className="tap flex h-8 w-8 items-center justify-center rounded-full text-white"
                >
                  <span className="material-symbols-rounded" style={{ fontSize: 18 }}>
                    {isFullscreen ? "fullscreen_exit" : "fullscreen"}
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="px-4 pt-4">
          <div className="mb-4 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={goPrev}
              disabled={activeLesson === 0}
              className="tap flex shrink-0 items-center gap-1 rounded-full px-3 py-2 text-xs font-semibold disabled:opacity-30"
              style={{ background: "var(--color-border)", color: "var(--color-text-primary)" }}
            >
              <span className="material-symbols-rounded" style={{ fontSize: 14 }}>
                arrow_back_ios
              </span>
              Previous
            </button>
            <div className="min-w-0 flex-1 text-center">
              <p className="truncate text-sm font-bold text-[var(--color-text-primary)]">
                {activeLesson + 1}. {lesson.title}
              </p>
            </div>
            <button
              type="button"
              onClick={goNext}
              disabled={activeLesson === course.lessons.length - 1}
              className="tap flex shrink-0 items-center gap-1 rounded-full px-3 py-2 text-xs font-semibold text-white disabled:opacity-30"
              style={{ background: "var(--color-brand-primary)" }}
            >
              Next
              <span className="material-symbols-rounded" style={{ fontSize: 14 }}>
                arrow_forward_ios
              </span>
            </button>
          </div>

          {allDone && (
            <div
              className="mb-4 flex items-center gap-2 rounded-[var(--radius-lg)] px-4 py-3"
              style={{ background: "color-mix(in srgb, var(--color-success) 12%, var(--color-surface))" }}
            >
              <span className="material-symbols-rounded" style={{ fontSize: 20, color: "var(--color-success)" }}>
                celebration
              </span>
              <p className="text-sm font-semibold" style={{ color: "var(--color-success)" }}>
                অভিনন্দন! পুরো ফ্রি কোর্সটি সম্পন্ন হয়েছে।
              </p>
            </div>
          )}

          <p className="mb-2 text-xs font-semibold text-[var(--color-text-secondary)]">প্লেলিস্ট</p>
          <div className="flex flex-col gap-2">
            {course.lessons.map((l, i) => {
              const isActive = i === activeLesson;
              const isDone = completed.includes(i);
              return (
                <button
                  key={l.title}
                  type="button"
                  onClick={() => goToLesson(i)}
                  className="tap flex items-center gap-3 rounded-[var(--radius-md)] px-3 py-2.5 text-left"
                  style={{
                    background: isActive
                      ? "color-mix(in srgb, var(--color-brand-primary) 10%, var(--color-surface))"
                      : "var(--color-surface)",
                    border: isActive ? "1px solid var(--color-brand-primary)" : "1px solid var(--color-border)",
                  }}
                >
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                    style={{
                      background: isDone ? "var(--color-success)" : "var(--color-border)",
                      color: isDone ? "white" : "var(--color-text-secondary)",
                    }}
                  >
                    {isDone ? (
                      <span className="material-symbols-rounded" style={{ fontSize: 16 }}>
                        check
                      </span>
                    ) : (
                      i + 1
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p
                      className="truncate text-sm font-semibold"
                      style={{ color: isActive ? "var(--color-brand-primary)" : "var(--color-text-primary)" }}
                    >
                      {l.title}
                    </p>
                    <p className="text-xs text-[var(--color-text-secondary)]">{formatDuration(l.durationSec)} মিনিট</p>
                  </div>
                  {isActive && playing && (
                    <span className="material-symbols-rounded" style={{ fontSize: 18, color: "var(--color-brand-primary)" }}>
                      graphic_eq
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
        </div>
      </main>
      <BottomNav />
    </>
  );
}
