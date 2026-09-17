"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DIVISION_DISTRICTS, CLASSES } from "@/data/districts";
import { useAuth } from "@/components/AuthProvider";
import { useTheme } from "@/components/ThemeProvider";
import LoginBackground from "@/components/LoginBackground";
import BackButton from "@/components/BackButton";

type Step = "role" | "phone" | "otp" | "name" | "gender" | "class" | "location" | "success";

const STUDENT_STEP_ORDER: Step[] = ["role", "phone", "otp", "name", "gender", "class", "location", "success"];
const TEACHER_STEP_ORDER: Step[] = ["role", "phone", "otp", "name", "gender", "location", "success"];

const ROLES = [
  { key: "student", label: "Student", icon: "school", bg: "#E9DFEE", color: "var(--color-brand-primary)" },
  { key: "teacher", label: "Teacher", icon: "person_edit", bg: "#F0E5FB", color: "#8E24AA" },
] as const;

function PrimaryButton({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="w-full rounded-[5px] py-3.5 text-sm font-bold transition-[transform,background-color,color,border-color] duration-200 ease-out active:scale-[0.98]"
      style={
        disabled
          ? {
              background: "color-mix(in srgb, var(--color-brand-primary) 18%, var(--color-surface))",
              color: "var(--color-brand-primary)",
              border: "1px solid color-mix(in srgb, var(--color-brand-primary) 25%, transparent)",
            }
          : { background: "var(--color-brand-primary)", color: "white", border: "1px solid transparent" }
      }
    >
      {children}
    </button>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const { login, findProfileByPhone } = useAuth();
  const { theme } = useTheme();
  const [step, setStep] = useState<Step>("role");
  const [role, setRole] = useState<(typeof ROLES)[number]["key"] | null>(null);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [seconds, setSeconds] = useState(30);
  const [name, setName] = useState("");
  const [gender, setGender] = useState<"male" | "female" | null>(null);
  const [studentClass, setStudentClass] = useState("");
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (step !== "otp" || seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [step, seconds]);

  const stepOrder = role === "teacher" ? TEACHER_STEP_ORDER : STUDENT_STEP_ORDER;
  const stepIndex = stepOrder.indexOf(step);
  const goBack = () => {
    if (stepIndex <= 0) return;
    setStep(stepOrder[stepIndex - 1]);
  };

  const districtOptions = DIVISION_DISTRICTS.find((d) => d.name === division)?.districts ?? [];

  if (step === "role") {
    return (
      <div className="relative flex flex-1 flex-col">
        <div
          className="relative flex flex-col items-center justify-center overflow-hidden px-6 pb-16 pt-16"
          style={{ background: "linear-gradient(180deg, #9061C8 0%, #55347B 100%)", minHeight: 360 }}
        >
          <BackButton href="/" variant="overlay" className="absolute left-4 top-4" />
          <span
            aria-hidden
            className="absolute rounded-full animate-role-glow"
            style={{ width: 270, height: 270, background: "rgba(255,255,255,0.06)" }}
          />
          <Image
            src="/logo-stacked-dark-v3.png"
            alt="উদ্ভাস-উন্মেষ Online Care"
            width={216}
            height={220}
            className="relative h-[104px] w-auto"
          />
        </div>

        <div className="relative -mt-6 flex flex-1 flex-col rounded-t-[28px] bg-[var(--color-bg-canvas)] px-6 pt-6">
          <h1 className="mb-4 text-[20px] font-semibold text-[var(--color-text-primary)]">
            আপনার ভূমিকা নির্বাচন করুন?
          </h1>
          <div className="flex flex-col gap-3">
            {ROLES.map((r) => (
              <button
                key={r.key}
                type="button"
                onClick={() => {
                  setRole(r.key);
                  setStep("phone");
                }}
                className="tap flex items-center gap-3 rounded-[var(--radius-lg)] bg-[var(--color-surface)] px-4 py-4 text-left"
                style={{ boxShadow: "0 8px 24px rgba(26, 26, 26, 0.06)" }}
              >
                <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full">
                  <span className="absolute inset-0 rounded-full" style={{ background: r.bg, opacity: "var(--icon-bg-opacity)" }} />
                  <span className="material-symbols-rounded relative" style={{ fontSize: 22, color: r.color }}>
                    {r.icon}
                  </span>
                </span>
                <span className="flex-1 text-[15px] font-semibold text-[var(--color-text-primary)]">{r.label}</span>
                <span className="material-symbols-rounded" style={{ fontSize: 16, color: "var(--color-text-secondary)" }}>
                  arrow_forward_ios
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const roleAccentGlow = role === "teacher" ? "rgba(142, 36, 170, 0.45)" : "rgba(159, 28, 46, 0.45)";

  return (
    <div
      className="relative flex flex-1 flex-col"
      style={role === "teacher" ? ({ "--color-brand-primary": "#8E24AA" } as React.CSSProperties) : undefined}
    >
      {theme === "light" && <LoginBackground />}
      <header className="flex items-center gap-3 px-4 py-3">
        {step !== "success" ? (
          <BackButton onClick={goBack} />
        ) : (
          <span className="h-9 w-9" aria-hidden />
        )}
      </header>

      <main className="flex flex-1 flex-col px-6 pb-8">
        {step === "phone" && (
          <div className="flex flex-1 flex-col justify-center">
            <div className="mb-5 flex flex-col items-center gap-1 text-center -translate-y-2">
              <Image
                src={theme === "dark" ? "/logo-stacked-dark-v3.png" : "/logo-stacked.png"}
                alt="উদ্ভাস-উন্মেষ Online Care"
                width={216}
                height={theme === "dark" ? 220 : 220}
                className="h-[94px] w-auto"
              />
            </div>
            <p className="mb-2 mt-8 text-sm font-semibold text-[var(--color-text-primary)]">
              {role === "teacher" ? "শিক্ষকের মোবাইল নম্বর" : "শিক্ষার্থীর মোবাইল নম্বর"}
            </p>
            <div
              className="mb-4 flex items-center gap-2 rounded-[5px] border-2 border-transparent px-4 py-3.5 transition-colors duration-150 ease-out has-[:focus-visible]:border-[var(--color-brand-primary)]"
              style={{ background: "color-mix(in srgb, var(--color-border) 55%, var(--color-surface))" }}
            >
              <span className="text-sm font-semibold text-[var(--color-text-primary)]">+88</span>
              <span className="h-4 w-px bg-[var(--color-border)]" />
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                placeholder="01XXXXXXXXXX"
                inputMode="numeric"
                className="flex-1 bg-transparent text-sm text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-secondary)]"
              />
            </div>
            <button
              type="button"
              disabled={phone.length !== 10}
              onClick={() => setStep("otp")}
              className="w-full rounded-[5px] py-3.5 text-sm font-bold transition-[transform,background-color,color,border-color] duration-200 ease-out active:scale-[0.98]"
              style={
                phone.length === 10
                  ? { background: "var(--color-brand-primary)", color: "white", boxShadow: `0 8px 20px ${roleAccentGlow}`, border: "1px solid transparent" }
                  : {
                      background: "color-mix(in srgb, var(--color-brand-primary) 18%, var(--color-surface))",
                      color: "var(--color-brand-primary)",
                      border: "1px solid color-mix(in srgb, var(--color-brand-primary) 25%, transparent)",
                    }
              }
            >
              Next
            </button>
            <p className="text-center text-xs text-[var(--color-text-secondary)]" style={{ marginTop: 18 }}>
              Don&apos;t have an account? <span className="font-semibold text-[var(--color-brand-primary)]">Register</span>
            </p>
          </div>
        )}

        {step === "otp" && (
          <div className="flex flex-1 flex-col justify-center">
            <h1 className="mb-1 text-lg font-bold text-[var(--color-text-primary)]">ভেরিফিকেশন কোড</h1>
            <p className="mb-5 text-sm text-[var(--color-text-secondary)]">
              আমরা +৮৮ {phone || "01XXXXXXXX"} নম্বরে একটি কোড পাঠিয়েছি
            </p>
            <div className="mb-4 grid grid-cols-6 gap-2">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => {
                    otpRefs.current[i] = el;
                  }}
                  value={digit}
                  onChange={(e) => {
                    const digits = e.target.value.replace(/\D/g, "");
                    if (!digits) {
                      setOtp((prev) => {
                        const next = [...prev];
                        next[i] = "";
                        return next;
                      });
                      return;
                    }
                    setOtp((prev) => {
                      const next = [...prev];
                      let idx = i;
                      for (const d of digits) {
                        if (idx > 5) break;
                        next[idx] = d;
                        idx++;
                      }
                      return next;
                    });
                    const lastFilled = Math.min(i + digits.length, 6) - 1;
                    if (lastFilled < 5) otpRefs.current[lastFilled + 1]?.focus();
                    else otpRefs.current[5]?.blur();
                  }}
                  onPaste={(e) => {
                    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
                    if (!pasted) return;
                    e.preventDefault();
                    setOtp((prev) => {
                      const next = [...prev];
                      for (let k = 0; k < pasted.length; k++) next[k] = pasted[k];
                      return next;
                    });
                    otpRefs.current[Math.min(pasted.length, 6) - 1]?.focus();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && !otp[i] && i > 0) otpRefs.current[i - 1]?.focus();
                  }}
                  inputMode="numeric"
                  maxLength={6}
                  className="aspect-square w-full min-w-0 rounded-[5px] border border-[var(--color-border)] text-center text-base font-bold text-[var(--color-text-primary)] outline-none transition-colors duration-150 ease-out focus:border-[var(--color-brand-primary)]"
                />
              ))}
            </div>
            <p className="mb-6 text-xs text-[var(--color-text-secondary)]">
              {seconds > 0 ? (
                <>Resend code ({String(Math.floor(seconds / 60)).padStart(2, "0")}:{String(seconds % 60).padStart(2, "0")})</>
              ) : (
                <button type="button" onClick={() => setSeconds(30)} className="font-semibold text-[var(--color-brand-primary)]">
                  Resend code
                </button>
              )}
              {" · "}
              <button type="button" onClick={() => setStep("phone")} className="font-semibold text-[var(--color-brand-primary)]">
                Wrong number?
              </button>
            </p>
            <PrimaryButton
              disabled={otp.some((d) => !d)}
              onClick={() => {
                const existing = findProfileByPhone(phone);
                if (existing) {
                  login(existing);
                  router.push("/");
                  return;
                }
                setStep("name");
              }}
            >
              Next
            </PrimaryButton>
          </div>
        )}

        {step === "name" && (
          <div className="flex flex-1 flex-col justify-center">
            <h1 className="mb-4 text-center text-lg font-bold text-[var(--color-text-primary)]">
              {role === "teacher" ? "আপনার নাম কী?" : "তোমার নাম কী?"}
            </h1>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={role === "teacher" ? "আপনার পূর্ণ নাম লিখুন" : "তোমার পূর্ণ নাম লিখো"}
              className="mb-6 w-full rounded-[10px] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2.5 text-sm text-[var(--color-text-primary)] outline-none transition-colors duration-150 ease-out placeholder:text-[var(--color-text-secondary)] focus:border-[var(--color-brand-primary)]"
            />
            <PrimaryButton disabled={name.trim().length === 0} onClick={() => setStep("gender")}>
              পরবর্তী
            </PrimaryButton>
          </div>
        )}

        {step === "gender" && (
          <div className="flex flex-1 flex-col justify-center">
            <h1 className="mb-5 text-center text-lg font-bold text-[var(--color-text-primary)]">
              {role === "teacher" ? "আপনার Gender নির্বাচন করুন" : "তোমার Gender বেছে নাও"}
            </h1>
            <div className="mb-6 flex gap-3">
              {(
                [
                  { key: "male", label: "ছেলে", bg: "#E3F0FD", color: "var(--color-info)", icon: "man" },
                  { key: "female", label: "মেয়ে", bg: "#FDE8E4", color: "var(--color-brand-primary)", icon: "woman" },
                ] as const
              ).map((g) => {
                const active = gender === g.key;
                return (
                  <button
                    key={g.key}
                    type="button"
                    onClick={() => setGender(g.key)}
                    className="relative flex flex-1 flex-col items-center gap-2.5 rounded-[var(--radius-lg)] border-2 py-6 transition-all"
                    style={{
                      borderColor: active ? "var(--color-brand-primary)" : "var(--color-border)",
                      background: "var(--color-surface)",
                      boxShadow: active ? "var(--shadow-medium)" : "none",
                    }}
                  >
                    {active && (
                      <span
                        className="absolute right-2.5 top-2.5 flex h-5 w-5 items-center justify-center rounded-full text-white"
                        style={{ background: "var(--color-brand-primary)" }}
                      >
                        <span className="material-symbols-rounded" style={{ fontSize: 13 }}>
                          check
                        </span>
                      </span>
                    )}
                    <span className="relative flex h-14 w-14 items-center justify-center rounded-full">
                      <span className="absolute inset-0 rounded-full" style={{ background: g.bg, opacity: "var(--icon-bg-opacity)" }} />
                      <span className="material-symbols-rounded relative" style={{ fontSize: 30, color: g.color }}>
                        {g.icon}
                      </span>
                    </span>
                    <span className="text-sm font-semibold text-[var(--color-text-primary)]">{g.label}</span>
                  </button>
                );
              })}
            </div>
            <PrimaryButton disabled={!gender} onClick={() => setStep(role === "teacher" ? "location" : "class")}>
              পরবর্তী
            </PrimaryButton>
          </div>
        )}

        {step === "class" && (
          <div className="flex flex-1 flex-col justify-center">
            <h1 className="mb-4 text-center text-lg font-bold text-[var(--color-text-primary)]">তোমার ক্লাস নির্বাচন করো</h1>
            <select
              value={studentClass}
              onChange={(e) => setStudentClass(e.target.value)}
              className="mb-6 w-full rounded-[10px] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2.5 text-sm text-[var(--color-text-primary)] outline-none transition-colors duration-150 ease-out focus:border-[var(--color-brand-primary)]"
            >
              <option value="">শ্রেণি নির্বাচন করুন</option>
              {CLASSES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <PrimaryButton disabled={!studentClass} onClick={() => setStep("location")}>
              পরবর্তী
            </PrimaryButton>
          </div>
        )}

        {step === "location" && (
          <div className="flex flex-1 flex-col justify-center">
            <h1 className="mb-4 text-center text-lg font-bold text-[var(--color-text-primary)]">
              {role === "teacher" ? "আপনার বর্তমান অবস্থান নির্বাচন করুন" : "তোমার বর্তমান অবস্থান নির্বাচন করো"}
            </h1>
            <select
              value={division}
              onChange={(e) => {
                setDivision(e.target.value);
                setDistrict("");
              }}
              className="mb-3 w-full rounded-[10px] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2.5 text-sm text-[var(--color-text-primary)] outline-none transition-colors duration-150 ease-out focus:border-[var(--color-brand-primary)]"
            >
              <option value="">বিভাগ নির্বাচন করুন</option>
              {DIVISION_DISTRICTS.map((d) => (
                <option key={d.slug} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              disabled={!division}
              className="mb-6 w-full rounded-[10px] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2.5 text-sm text-[var(--color-text-primary)] outline-none transition-colors duration-150 ease-out focus:border-[var(--color-brand-primary)] disabled:opacity-50"
            >
              <option value="">জেলা নির্বাচন করুন</option>
              {districtOptions.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <PrimaryButton disabled={!district} onClick={() => setStep("success")}>
              Next
            </PrimaryButton>
          </div>
        )}

        {step === "success" && (
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <span
              className="mb-5 flex h-16 w-16 items-center justify-center rounded-full"
              style={{ background: "var(--color-success)" }}
            >
              <span className="material-symbols-rounded" style={{ fontSize: 34, color: "white" }}>
                check
              </span>
            </span>
            <h1 className="mb-2 text-xl font-bold text-[var(--color-text-primary)]">All done!</h1>
            <p className="mb-8 max-w-[28ch] text-sm text-[var(--color-text-secondary)]">
              You can now start using Udvash-Unmesh's services.
            </p>
            <div className="w-full">
              <PrimaryButton
                onClick={() => {
                  login({
                    name,
                    phone,
                    role: role ?? "student",
                    gender: gender ?? undefined,
                    studentClass,
                    division,
                    district,
                  });
                  router.push("/");
                }}
              >
                Let's get started
              </PrimaryButton>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
