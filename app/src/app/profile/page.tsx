"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AppHeader from "@/components/AppHeader";
import BackButton from "@/components/BackButton";
import BottomNav from "@/components/BottomNav";
import { useAuth } from "@/components/AuthProvider";

function InfoRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="flex items-center justify-between border-b border-[var(--color-border)] py-3 last:border-none">
      <span className="text-sm text-[var(--color-text-secondary)]">{label}</span>
      <span className="text-sm font-semibold text-[var(--color-text-primary)]">{value}</span>
    </div>
  );
}

export default function ProfilePage() {
  const router = useRouter();
  const { isLoggedIn, profile, logout } = useAuth();

  useEffect(() => {
    if (!isLoggedIn || !profile) {
      logout();
      router.replace("/login");
    }
  }, [isLoggedIn, profile, logout, router]);

  if (!isLoggedIn || !profile) return null;

  return (
    <>
      <AppHeader />
      <header className="relative mb-2 flex items-center justify-center gap-3 px-4 py-3">
        <span className="absolute left-4"><BackButton href="/" /></span>
        <h1 className="font-heading text-[18px] font-semibold leading-none text-[#616161]">Profile</h1>
      </header>

      <main className="flex-1 px-4 pb-6">
        <div className="mt-2 flex flex-col items-center gap-3 py-6">
          <span
            className="flex h-20 w-20 items-center justify-center rounded-full text-2xl font-bold text-white"
            style={{ background: "var(--color-brand-primary)" }}
          >
            {profile.name.trim().charAt(0).toUpperCase() || "?"}
          </span>
          <div className="text-center">
            <p className="text-lg font-bold text-[var(--color-text-primary)]">{profile.name}</p>
            <p className="text-sm text-[var(--color-text-secondary)]">+88 {profile.phone}</p>
          </div>
          <span
            className="rounded-full px-3 py-1 text-xs font-semibold text-white"
            style={{ background: "var(--color-brand-primary)" }}
          >
            {profile.role === "teacher" ? "Teacher" : profile.role === "guardian" ? "Guardian" : "Student"}
          </span>
        </div>

        <div className="rounded-[var(--radius-lg)] bg-[var(--color-surface)] px-4 shadow-[var(--shadow-subtle)]">
          <InfoRow label="Registration No" value={profile.registrationNo} />
          <InfoRow label="Gender" value={profile.gender === "male" ? "ছেলে" : profile.gender === "female" ? "মেয়ে" : undefined} />
          <InfoRow label="Class" value={profile.studentClass} />
          <InfoRow label="Nearest Branch" value={profile.branch} />
        </div>

        <button
          type="button"
          onClick={() => {
            logout();
            router.push("/");
          }}
          className="tap mt-6 flex w-full items-center justify-center gap-2 rounded-full border py-3.5 text-sm font-bold"
          style={{ borderColor: "var(--color-error)", color: "var(--color-error)" }}
        >
          <span className="material-symbols-rounded" style={{ fontSize: 18 }}>
            logout
          </span>
          লগ আউট
        </button>
      </main>
      <BottomNav />
    </>
  );
}
