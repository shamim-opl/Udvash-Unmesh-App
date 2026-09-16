"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { useAuth } from "@/components/AuthProvider";

const NOTIFICATIONS = [
  {
    icon: "auto_stories",
    title: "নতুন কোর্স যোগ হয়েছে",
    body: "HSC ২০২৭ ব্যাচের জন্য নতুন একটি প্রোগ্রেসিভ ব্যাচ চালু হয়েছে।",
    time: "২ ঘণ্টা আগে",
    unread: true,
  },
  {
    icon: "check_circle",
    title: "ভর্তি সম্পন্ন হয়েছে",
    body: "আপনি সফলভাবে “৯ম শ্রেণি একাডেমিক প্রোগ্রাম ২০২৬” কোর্সে ভর্তি হয়েছেন।",
    time: "গতকাল",
    unread: true,
  },
  {
    icon: "campaign",
    title: "ক্লাস রুটিন প্রকাশিত হয়েছে",
    body: "আপনার শাখার এই সপ্তাহের ক্লাস রুটিন আপডেট হয়েছে।",
    time: "২ দিন আগে",
    unread: false,
  },
];

export default function AppHeader() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<(typeof NOTIFICATIONS)[number] | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme } = useTheme();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!open) return;
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  const unreadCount = NOTIFICATIONS.filter((n) => n.unread).length;

  return (
    <header className="relative flex items-center justify-between px-4 py-3" ref={containerRef}>
      <div className="flex items-center gap-2.5">
        <Image
          src={theme === "dark" ? "/logo-dark.png" : "/logo.png"}
          alt="উদ্ভাস-উন্মেষ Online Care"
          width={theme === "dark" ? 145 : 140}
          height={theme === "dark" ? 30 : 39}
          className="h-8 w-auto"
        />
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label={theme === "dark" ? "লাইট মোড" : "ডার্ক মোড"}
          onClick={toggleTheme}
          className="tap flex h-9 w-9 items-center justify-center rounded-full text-[var(--color-text-primary)]"
          style={{ background: "var(--color-border)" }}
        >
          <span className="material-symbols-rounded" style={{ fontSize: 20 }}>
            {theme === "dark" ? "light_mode" : "brightness_2"}
          </span>
        </button>

        {isLoggedIn && (
          <button
            type="button"
            aria-label="বিজ্ঞপ্তি"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="tap relative flex h-9 w-9 items-center justify-center rounded-full text-[var(--color-text-primary)]"
            style={{ background: "var(--color-border)" }}
          >
            <span
              className="material-symbols-rounded"
              style={{
                fontSize: 22,
                color: unreadCount > 0 ? "var(--color-brand-primary)" : "var(--color-text-primary)",
                fontVariationSettings: `'FILL' ${unreadCount > 0 ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' 24`,
              }}
            >
              notifications_unread
            </span>
          </button>
        )}
      </div>

      {open && (
        <div
          aria-hidden
          className="animate-backdrop-in fixed inset-0 z-10 bg-black/45"
          onClick={() => setOpen(false)}
        />
      )}

      {open && (
        <div
          className="animate-dropdown-in absolute right-4 top-14 z-20 w-[300px] overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-surface)]"
          style={{ boxShadow: "var(--shadow-high)" }}
        >
          <div className="border-b border-[var(--color-border)] px-4 py-3">
            <p className="text-sm font-bold text-[var(--color-text-primary)]">বিজ্ঞপ্তি</p>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {NOTIFICATIONS.map((n) => (
              <button
                key={n.title + n.time}
                type="button"
                onClick={() => {
                  setSelected(n);
                  setOpen(false);
                }}
                className="flex w-full gap-3 border-b border-[var(--color-border)] px-4 py-3 text-left transition-colors last:border-b-0 hover:bg-black/[0.04]"
                style={{ background: n.unread ? "color-mix(in srgb, var(--color-brand-primary) 8%, var(--color-surface))" : "transparent" }}
              >
                <span
                  className="material-symbols-rounded mt-0.5 shrink-0"
                  style={{ fontSize: 20, color: "var(--color-brand-primary)" }}
                >
                  {n.icon}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[var(--color-text-primary)]">{n.title}</p>
                  <p className="mt-0.5 text-xs leading-snug text-[var(--color-text-secondary)]">{n.body}</p>
                  <p className="mt-1 text-[11px] text-[var(--color-text-secondary)]">{n.time}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {selected && (
        <div
          className="animate-backdrop-in fixed inset-0 z-30 flex items-end justify-center bg-black/40 px-4 pb-6 sm:items-center"
          onClick={() => setSelected(null)}
        >
          <div
            className="animate-modal-in w-full max-w-md rounded-[var(--radius-lg)] bg-[var(--color-surface)] p-5"
            style={{ boxShadow: "var(--shadow-high)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-3">
              <span
                className="material-symbols-rounded shrink-0"
                style={{ fontSize: 24, color: "var(--color-brand-primary)" }}
              >
                {selected.icon}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-base font-bold text-[var(--color-text-primary)]">{selected.title}</p>
                <p className="mt-1 text-[11px] text-[var(--color-text-secondary)]">{selected.time}</p>
              </div>
              <button
                type="button"
                aria-label="বন্ধ করুন"
                onClick={() => setSelected(null)}
                className="material-symbols-rounded shrink-0 text-[var(--color-text-secondary)]"
                style={{ fontSize: 22 }}
              >
                close
              </button>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-primary)]">{selected.body}</p>
          </div>
        </div>
      )}
    </header>
  );
}
