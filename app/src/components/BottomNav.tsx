"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";

function BranchesIcon({ active }: { active: boolean }) {
  return (
    <span
      className="material-symbols-rounded"
      style={{ fontSize: 22, color: active ? "var(--color-brand-primary)" : "var(--color-text-secondary)" }}
    >
      apartment
    </span>
  );
}

function LoginIcon({ active }: { active: boolean }) {
  return (
    <span
      className="material-symbols-rounded"
      style={{ fontSize: 22, color: active ? "var(--color-brand-primary)" : "var(--color-text-secondary)" }}
    >
      person
    </span>
  );
}

export default function BottomNav() {
  const pathname = usePathname();
  const { isLoggedIn } = useAuth();
  const onHome = pathname === "/";
  const accountHref = isLoggedIn ? "/profile" : "/login";
  const accountActive = pathname === accountHref;

  return (
    <nav className="sticky bottom-0 px-4 pb-4 pt-6">
      <div className="relative">
        {/* page-background "notch" the raised Home button sits inside */}
        <div
          aria-hidden
          className="absolute left-1/2 -top-6 h-16 w-16 -translate-x-1/2 rounded-full"
          style={{ background: "var(--color-bg-canvas)" }}
        />

        <div
          className="grid grid-cols-3 items-center rounded-full bg-[var(--color-surface)] px-3 py-3.5"
          style={{ boxShadow: "var(--shadow-medium)" }}
        >
          <Link href="/branches" className="tap flex flex-col items-center gap-1 text-[11px]">
            <BranchesIcon active={pathname === "/branches"} />
            <span className={pathname === "/branches" ? "font-semibold text-[var(--color-brand-primary)]" : "text-[var(--color-text-secondary)]"}>
              Branches
            </span>
          </Link>

          <Link href="/" className="flex flex-col items-center gap-1 text-[11px]">
            <span className="h-[22px]" aria-hidden />
            <span className={onHome ? "font-semibold text-[var(--color-brand-primary)]" : "text-[var(--color-text-secondary)]"}>
              Home
            </span>
          </Link>

          <Link href={accountHref} className="tap flex flex-col items-center gap-1 text-[11px]">
            <LoginIcon active={accountActive} />
            <span className={accountActive ? "font-semibold text-[var(--color-brand-primary)]" : "text-[var(--color-text-secondary)]"}>
              {isLoggedIn ? "Profile" : "Login"}
            </span>
          </Link>
        </div>

        <Link
          href="/"
          aria-label="Home"
          className="absolute left-1/2 -top-5 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full transition-transform active:scale-95"
          style={{
            background: onHome ? "var(--color-brand-primary)" : "var(--color-text-secondary)",
            boxShadow: "var(--shadow-high)",
          }}
        >
          <span className="material-symbols-rounded" style={{ fontSize: 24, color: "white" }}>
            home
          </span>
        </Link>
      </div>
    </nav>
  );
}
