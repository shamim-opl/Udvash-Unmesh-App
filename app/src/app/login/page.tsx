"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CLASSES } from "@/data/districts";
import { DIVISIONS } from "@/data/branches";
import { useAuth } from "@/components/AuthProvider";
import { useTheme } from "@/components/ThemeProvider";
import AppHeader from "@/components/AppHeader";
import BottomNav from "@/components/BottomNav";
import BackButton from "@/components/BackButton";
import { MoonIcon, SunIcon } from "@/components/nav-icons";

type Role = "student" | "teacher" | "guardian";
type Step =
  | "role"
  | "auth"
  | "loginId"
  | "loginPassword"
  | "basicInfo"
  | "otp"
  | "alreadyRegistered"
  | "personalDetails"
  | "setPassword"
  | "success";

const ROLES: { key: Role; label: string; sub: string; icon: string }[] = [
  { key: "student", label: "Student", sub: "শিক্ষার্থী", icon: "school" },
  { key: "teacher", label: "Teacher", sub: "শিক্ষক", icon: "person_edit" },
  { key: "guardian", label: "Guardian", sub: "অভিভাবক", icon: "family_restroom" },
];

const RELIGIONS = ["ইসলাম", "হিন্দু", "খ্রিস্টান", "বৌদ্ধ", "অন্যান্য"];

function generateRegNo() {
  return String(Math.floor(1000000 + Math.random() * 8999999));
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-1 flex-col justify-center px-6">{children}</div>;
}

function CardTitle({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="mb-5 text-center">
      <h1 className="font-heading text-[26px] font-medium leading-tight text-[var(--color-text-primary)]">{title}</h1>
      <p className="mt-1 text-sm font-medium text-[var(--color-text-secondary)]">{sub}</p>
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <p className="mb-1.5 text-sm text-[var(--color-text-primary)]">{children}</p>;
}

function TextField({
  value,
  onChange,
  placeholder,
  type = "text",
  inputMode,
  rightIcon,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
  inputMode?: "text" | "numeric" | "email";
  rightIcon?: React.ReactNode;
}) {
  return (
    <div
      className="mb-4 flex items-center gap-2 rounded-[5px] border bg-[var(--color-field-fill)] px-3 py-2.5"
      style={{ borderColor: "var(--color-border)" }}
    >
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        type={type}
        inputMode={inputMode}
        className="flex-1 bg-transparent text-sm text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-secondary)]"
      />
      {rightIcon}
    </div>
  );
}

function SelectField({
  value,
  onChange,
  placeholder,
  children,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  children: React.ReactNode;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="mb-4 w-full rounded-[5px] border bg-[var(--color-field-fill)] px-3 py-2.5 text-sm text-[var(--color-text-primary)] outline-none"
      style={{ borderColor: "var(--color-border)" }}
    >
      <option value="">{placeholder}</option>
      {children}
    </select>
  );
}

function CardButton({
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
      className="tap mx-auto mt-2 flex items-center justify-center rounded-[5px] text-sm font-medium text-white transition-transform active:scale-[0.98]"
      style={{ background: disabled ? "#C5C5C5" : "var(--color-brand-primary)", width: 150, height: 36, fontSize: 14 }}
    >
      {children}
    </button>
  );
}

function EyeToggle({ shown, onClick }: { shown: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="shrink-0 text-[var(--color-text-secondary)]">
      <span className="material-symbols-rounded" style={{ fontSize: 18 }}>
        {shown ? "visibility" : "visibility_off"}
      </span>
    </button>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const { login, findProfileByPhone, findProfileByIdentifier } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [step, setStep] = useState<Step>("role");
  const [role, setRole] = useState<Role | null>(null);

  const [loginId, setLoginId] = useState(() => (typeof window === "undefined" ? "" : localStorage.getItem("rememberedLoginId") ?? ""));
  const [rememberMe, setRememberMe] = useState(() => (typeof window === "undefined" ? false : Boolean(localStorage.getItem("rememberedLoginId"))));
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [foundProfile, setFoundProfile] = useState<ReturnType<typeof findProfileByIdentifier>>(null);

  const [nickName, setNickName] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [seconds, setSeconds] = useState(30);
  const [regNo, setRegNo] = useState("");

  const [studentClass, setStudentClass] = useState("");
  const [gender, setGender] = useState("");
  const [religion, setReligion] = useState("");
  const [branch, setBranch] = useState("");
  const [email, setEmail] = useState("");

  const [pw1, setPw1] = useState("");
  const [pw2, setPw2] = useState("");
  const [showPw1, setShowPw1] = useState(false);
  const [showPw2, setShowPw2] = useState(false);

  const roleInfo = ROLES.find((r) => r.key === role) ?? ROLES[0];

  useEffect(() => {
    if (step !== "otp" || seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [step, seconds]);

  const copyRegNo = () => {
    navigator.clipboard?.writeText(regNo).catch(() => {});
  };

  if (step === "role") {
    return (
      <div className="relative flex w-full flex-1 flex-col lg:max-w-none">
        <div
          className="relative flex flex-col items-center justify-center overflow-hidden px-6 pb-16 pt-16"
          style={{
            background: "linear-gradient(180deg, color-mix(in srgb, var(--color-brand-primary) 72%, white) 0%, var(--color-brand-primary) 100%)",
            minHeight: 320,
          }}
        >
          <BackButton onClick={() => router.back()} variant="overlay" mobileVisible className="absolute left-4 top-4" />
          <button
            type="button"
            aria-label={theme === "dark" ? "লাইট মোড" : "ডার্ক মোড"}
            onClick={toggleTheme}
            className="tap absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full"
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
          <span
            aria-hidden
            className="absolute rounded-full animate-role-glow"
            style={{ width: 220, height: 220, background: "rgba(255,255,255,0.06)" }}
          />
          <Image
            src="/logo-stacked-dark-v3.png"
            alt="উদ্ভাস-উন্মেষ Online Care"
            width={216}
            height={220}
            className="relative h-[84px] w-auto"
          />
        </div>

        <div className="relative -mt-4 flex w-full flex-1 flex-col rounded-t-[16px] bg-[var(--color-bg-canvas)] px-6 pt-6 md:mx-auto md:max-w-2xl">
          <h1 className="mb-4 text-[20px] font-semibold text-[var(--color-text-primary)] md:text-center">
            আপনার ভূমিকা নির্বাচন করুন?
          </h1>
          <div className="flex flex-col gap-3 md:grid md:grid-cols-3">
            {ROLES.map((r) => (
              <button
                key={r.key}
                type="button"
                onClick={() => {
                  setRole(r.key);
                  setStep("auth");
                }}
                className="tap flex items-center gap-3 rounded-[var(--radius-lg)] border bg-[var(--color-surface)] px-4 py-4 text-left transition-colors duration-150 md:flex-col md:justify-center md:gap-3 md:px-3 md:py-7 md:text-center"
                style={{
                  borderColor: "color-mix(in srgb, var(--color-border) 50%, transparent)",
                  boxShadow: "var(--shadow-subtle)",
                }}
              >
                <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full md:h-14 md:w-14">
                  <span
                    className="absolute inset-0 rounded-full"
                    style={{ background: "var(--color-brand-primary)", opacity: "var(--icon-bg-opacity)" }}
                  />
                  <span className="material-symbols-rounded relative" style={{ fontSize: 22, color: "var(--color-brand-primary)" }}>
                    {r.icon}
                  </span>
                </span>
                <span className="flex-1 md:flex-none">
                  <span className="block whitespace-nowrap text-[17px] font-semibold text-[var(--color-text-primary)]">
                    {r.label}
                  </span>
                </span>
                <span className="md:hidden">
                  <span className="material-symbols-rounded" style={{ fontSize: 16, color: "var(--color-text-secondary)" }}>
                    arrow_forward_ios
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div
      className="relative flex w-full flex-1 flex-col"
      style={{
        background:
          theme === "light"
            ? "linear-gradient(160deg, #e2eefd 0%, #e6f3f2 45%, #e9dff2 100%)"
            : undefined,
      } as React.CSSProperties}
    >
      <AppHeader />
      <main className="flex flex-1 flex-col px-2 pb-8 md:mx-auto! md:w-full md:max-w-md">
        {step === "auth" && (
          <Card>
            <CardTitle title={`${roleInfo.label} Login`} sub="How would you like to continue?" />
            <div className="mt-2 flex flex-col items-center gap-3">
              <button
                type="button"
                onClick={() => setStep("loginId")}
                className="tap w-full max-w-[220px] rounded-[5px] py-2.5 text-sm font-medium text-white"
                style={{ background: "var(--color-brand-primary)" }}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setStep("basicInfo")}
                className="tap w-full max-w-[220px] rounded-[5px] border py-2.5 text-sm font-medium"
                style={{ borderColor: "var(--color-brand-primary)", color: "var(--color-brand-primary)" }}
              >
                New Registration
              </button>
            </div>
          </Card>
        )}

        {step === "loginId" && (
          <Card>
            <CardTitle title={`${roleInfo.label} Login`} sub="Enter registration number or mobile" />
            <FieldLabel>Registration No. / Mobile</FieldLabel>
            <TextField value={loginId} onChange={setLoginId} placeholder="e.g. 1234567 or 01XXXXXXXXX" />
            <label className="mb-4 flex items-center gap-2 text-sm text-[var(--color-text-primary)]">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 accent-[var(--color-brand-primary)]"
              />
              Remember me
            </label>
            <CardButton
              disabled={!loginId}
              onClick={() => {
                if (rememberMe) {
                  localStorage.setItem("rememberedLoginId", loginId);
                } else {
                  localStorage.removeItem("rememberedLoginId");
                }
                const existing = findProfileByIdentifier(loginId);
                setFoundProfile(existing);
                setStep("loginPassword");
              }}
            >
              Next
            </CardButton>
            <p className="mt-4 text-center text-xs text-[var(--color-text-secondary)]">
              Don&apos;t have an account?{" "}
              <button type="button" onClick={() => setStep("basicInfo")} className="font-semibold" style={{ color: "var(--color-brand-primary)" }}>
                Register
              </button>
            </p>
          </Card>
        )}

        {step === "loginPassword" && (
          <Card>
            <CardTitle title={`Welcome, ${foundProfile?.name ?? "back"}!`} sub="Enter your password to continue" />
            <FieldLabel>Password</FieldLabel>
            <TextField
              value={password}
              onChange={setPassword}
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
              rightIcon={<EyeToggle shown={showPassword} onClick={() => setShowPassword((v) => !v)} />}
            />
            <p className="-mt-2 mb-2 text-xs font-semibold" style={{ color: "var(--color-error)" }}>
              পাসওয়ার্ড ভুলে গেছেন?
            </p>
            {loginError && (
              <p className="mb-2 text-xs font-semibold" style={{ color: "var(--color-error)" }}>
                {loginError}
              </p>
            )}
            <CardButton
              disabled={!password}
              onClick={() => {
                if (foundProfile && foundProfile.role === role && (!foundProfile.password || foundProfile.password === password)) {
                  login(foundProfile);
                  router.push("/");
                  return;
                }
                setLoginError("That registration number/mobile or password doesn't match.");
              }}
            >
              Login
            </CardButton>
          </Card>
        )}

        {step === "basicInfo" && (
          <Card>
            <CardTitle title="Registration Form" sub="It's Simple & Easy" />
            <FieldLabel>Nick Name</FieldLabel>
            <TextField value={nickName} onChange={setNickName} placeholder="Enter Your Nick Name" />
            <FieldLabel>Mobile Number</FieldLabel>
            <TextField
              value={mobile}
              onChange={(v) => setMobile(v.replace(/\D/g, "").slice(0, 11))}
              placeholder="Enter Your Mobile Number"
              inputMode="numeric"
            />
            <CardButton
              disabled={!nickName.trim() || mobile.length < 10}
              onClick={() => {
                const existing = findProfileByPhone(mobile);
                if (existing) {
                  setFoundProfile(existing);
                  setStep("alreadyRegistered");
                  return;
                }
                setStep("otp");
              }}
            >
              Next
            </CardButton>
            <p className="mt-4 text-center text-xs text-[var(--color-text-secondary)]">
              Already have an account?{" "}
              <button type="button" onClick={() => setStep("loginId")} className="font-semibold" style={{ color: "var(--color-brand-primary)" }}>
                Login
              </button>
            </p>
          </Card>
        )}

        {step === "otp" && (
          <Card>
            <CardTitle title="Registration Form" sub="It's Simple & Easy" />
            <p
              className="mb-4 rounded-[8px] px-3 py-2 text-center text-xs font-semibold"
              style={{ background: "color-mix(in srgb, var(--color-error) 10%, transparent)", color: "var(--color-error)" }}
            >
              We sent a code to {mobile.slice(0, 5)}*****{mobile.slice(-3)}
            </p>
            <FieldLabel>OTP</FieldLabel>
            <TextField value={otp} onChange={(v) => setOtp(v.replace(/\D/g, "").slice(0, 6))} placeholder="Enter the OTP" inputMode="numeric" />
            <p className="mb-4 text-center text-xs text-[var(--color-text-secondary)]">
              {seconds > 0 ? (
                <>
                  Resend OTP in <span className="font-semibold text-[var(--color-text-primary)]">{String(Math.floor(seconds / 60)).padStart(2, "0")}:{String(seconds % 60).padStart(2, "0")}</span>
                </>
              ) : (
                <>
                  Didn&apos;t get OTP yet?{" "}
                  <button type="button" onClick={() => setSeconds(30)} className="font-semibold" style={{ color: "#2196F3" }}>
                    Resend OTP
                  </button>
                </>
              )}
            </p>
            <CardButton
              disabled={otp.length < 4}
              onClick={() => {
                setRegNo(generateRegNo());
                setStep("personalDetails");
              }}
            >
              Next
            </CardButton>
          </Card>
        )}

        {step === "alreadyRegistered" && (
          <Card>
            <CardTitle title="Already Registered!" sub="" />
            <div className="-mt-3 text-center">
              <p className="text-sm text-[var(--color-text-secondary)]">
                Dear <span className="font-semibold text-[var(--color-text-primary)]">{foundProfile?.name}</span>,
              </p>
              <p className="mt-1 text-sm text-[var(--color-text-secondary)]">You are already registered.</p>
              {foundProfile?.registrationNo && (
                <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                  Your registration number is{" "}
                  <span className="font-bold" style={{ color: "var(--color-brand-primary)" }}>
                    {foundProfile.registrationNo}
                  </span>
                </p>
              )}
            </div>
            <CardButton
              onClick={() => {
                setLoginId(foundProfile?.registrationNo || foundProfile?.phone || "");
                setStep("loginId");
              }}
            >
              Login
            </CardButton>
          </Card>
        )}

        {step === "personalDetails" && (
          <Card>
            <CardTitle title="Registration Form" sub="Almost Done!" />
            {role === "student" && (
              <>
                <FieldLabel>Grade/Level</FieldLabel>
                <SelectField value={studentClass} onChange={setStudentClass} placeholder="Select Grade or Level">
                  {CLASSES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </SelectField>
              </>
            )}
            <FieldLabel>Gender</FieldLabel>
            <SelectField value={gender} onChange={setGender} placeholder="Select Gender">
              <option value="male">ছেলে</option>
              <option value="female">মেয়ে</option>
            </SelectField>
            <FieldLabel>Religion</FieldLabel>
            <SelectField value={religion} onChange={setReligion} placeholder="Select Religion">
              {RELIGIONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </SelectField>
            <FieldLabel>Nearest Branch</FieldLabel>
            <SelectField value={branch} onChange={setBranch} placeholder="Select your nearest branch">
              {DIVISIONS.map((d) => (
                <optgroup key={d.slug} label={d.name}>
                  {d.branches.map((b) => (
                    <option key={b.name} value={b.name}>
                      {b.name}
                    </option>
                  ))}
                </optgroup>
              ))}
            </SelectField>
            <FieldLabel>Email Address (Optional)</FieldLabel>
            <TextField value={email} onChange={setEmail} placeholder="you@example.com" type="email" />
            <CardButton
              disabled={!gender || !branch || (role === "student" && !studentClass)}
              onClick={() => setStep("setPassword")}
            >
              Submit
            </CardButton>
          </Card>
        )}

        {step === "setPassword" && (
          <Card>
            <CardTitle title="Set Your Password" sub="" />
            <div className="-mt-3 mb-4 text-center text-sm text-[var(--color-text-secondary)]">
              <p>
                Dear <span className="font-semibold text-[var(--color-text-primary)]">{nickName}</span>,
              </p>
              <p className="mt-1 flex items-center justify-center gap-1.5">
                Your registration number is{" "}
                <span className="font-bold" style={{ color: "var(--color-brand-primary)" }}>
                  {regNo}
                </span>
                <button type="button" onClick={copyRegNo} className="text-[var(--color-text-secondary)]">
                  <span className="material-symbols-rounded" style={{ fontSize: 15 }}>
                    content_copy
                  </span>
                </button>
              </p>
            </div>
            <FieldLabel>Enter Password</FieldLabel>
            <TextField
              value={pw1}
              onChange={setPw1}
              placeholder="Enter Password"
              type={showPw1 ? "text" : "password"}
              rightIcon={<EyeToggle shown={showPw1} onClick={() => setShowPw1((v) => !v)} />}
            />
            <FieldLabel>Confirm Password</FieldLabel>
            <TextField
              value={pw2}
              onChange={setPw2}
              placeholder="Confirm Password"
              type={showPw2 ? "text" : "password"}
              rightIcon={<EyeToggle shown={showPw2} onClick={() => setShowPw2((v) => !v)} />}
            />
            <p className="mb-1.5 text-xs font-semibold text-[var(--color-text-primary)]">
              Make sure your password is strong and secure.
            </p>
            <ul className="mb-4 flex flex-col gap-1 text-xs text-[var(--color-text-secondary)]">
              <li className="flex items-center gap-2">
                <span className="material-symbols-rounded" style={{ fontSize: 15, color: pw1.length >= 8 ? "var(--color-success)" : undefined }}>
                  {pw1.length >= 8 ? "check_circle" : "radio_button_unchecked"}
                </span>
                At least 8 characters long
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-rounded" style={{ fontSize: 15, color: /[a-zA-Z]/.test(pw1) ? "var(--color-success)" : undefined }}>
                  {/[a-zA-Z]/.test(pw1) ? "check_circle" : "radio_button_unchecked"}
                </span>
                Must include a letter
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-rounded" style={{ fontSize: 15, color: /[0-9]/.test(pw1) ? "var(--color-success)" : undefined }}>
                  {/[0-9]/.test(pw1) ? "check_circle" : "radio_button_unchecked"}
                </span>
                Must include a number
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-rounded" style={{ fontSize: 15, color: /[^a-zA-Z0-9]/.test(pw1) ? "var(--color-success)" : undefined }}>
                  {/[^a-zA-Z0-9]/.test(pw1) ? "check_circle" : "radio_button_unchecked"}
                </span>
                Must include a special character
              </li>
            </ul>
            <CardButton disabled={!pw1 || pw1 !== pw2} onClick={() => setStep("success")}>
              Submit
            </CardButton>
          </Card>
        )}

        {step === "success" && (
          <Card>
            <CardTitle title="Congratulations!" sub="" />
            <div className="-mt-3 mb-4 text-center text-sm text-[var(--color-text-secondary)]">
              <p>
                Dear <span className="font-semibold text-[var(--color-text-primary)]">{nickName}</span>,
              </p>
              <p className="mt-1">Your registration is complete.</p>
              <p className="mt-1 flex items-center justify-center gap-1.5">
                Your registration number is{" "}
                <span className="font-bold" style={{ color: "var(--color-brand-primary)" }}>
                  {regNo}
                </span>
                <button type="button" onClick={copyRegNo} className="text-[var(--color-text-secondary)]">
                  <span className="material-symbols-rounded" style={{ fontSize: 15 }}>
                    content_copy
                  </span>
                </button>
              </p>
            </div>
            <CardButton
              onClick={() => {
                login({
                  name: nickName,
                  phone: mobile,
                  role: role ?? "student",
                  gender,
                  religion,
                  email: email || undefined,
                  studentClass: role === "student" ? studentClass : undefined,
                  branch,
                  registrationNo: regNo,
                  password: pw1,
                });
                router.push("/programs");
              }}
            >
              Add Course
            </CardButton>
          </Card>
        )}
      </main>
      <BottomNav />
    </div>
  );
}
