export type ClassLevel = {
  slug: string;
  number: string;
  label: string;
  /** Short English form shown inside the picker circle, e.g. "Class 5" / "Admission". */
  enLabel: string;
  bg: string;
  color: string;
};

export const CLASS_LEVELS: ClassLevel[] = [
  { slug: "class-5", number: "৫", label: "ক্লাস ৫", enLabel: "Class 5", bg: "#DDF4F8", color: "#00ACC1" },
  { slug: "class-6", number: "৬", label: "ক্লাস ৬", enLabel: "Class 6", bg: "#E3F0FD", color: "#1E88E5" },
  { slug: "class-7", number: "৭", label: "ক্লাস ৭", enLabel: "Class 7", bg: "#E3F7EA", color: "#43A047" },
  { slug: "class-8", number: "৮", label: "ক্লাস ৮", enLabel: "Class 8", bg: "#FEEBDD", color: "#FB8C00" },
  { slug: "class-9", number: "৯", label: "ক্লাস ৯", enLabel: "Class 9", bg: "#E0F5F4", color: "#00897B" },
  { slug: "class-10", number: "১০", label: "ক্লাস ১০", enLabel: "Class 10", bg: "#F0E5FB", color: "#8E24AA" },
  { slug: "class-11", number: "১১", label: "ক্লাস ১১", enLabel: "Class 11", bg: "#E8EAFB", color: "#3949AB" },
  { slug: "class-12", number: "১২", label: "ক্লাস ১২", enLabel: "Class 12", bg: "#EFE6E2", color: "#8D6E63" },
  { slug: "admission", number: "", label: "এডমিশন", enLabel: "Admission", bg: "#FBE3E3", color: "#E53935" },
];

export type Lesson = {
  title: string;
  durationSec: number;
};

export type FreeCourse = {
  id: string;
  title: string;
  subject: string;
  image: string | null;
  highlights: string[];
  videoCount: number;
  description: string;
  lessons: Lesson[];
};

const BENGALI_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export function toBengaliDigits(n: number): string {
  return String(Math.max(0, Math.floor(n)))
    .split("")
    .map((d) => BENGALI_DIGITS[Number(d)] ?? d)
    .join("");
}

export function formatDuration(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = Math.floor(totalSeconds % 60);
  return `${toBengaliDigits(m)}:${toBengaliDigits(s).padStart(2, "০")}`;
}

const LESSON_TITLES = [
  "কোর্স পরিচিতি ও শুরুর প্রস্তুতি",
  "মূল ধারণা ও বেসিক আলোচনা",
  "উদাহরণসহ বিস্তারিত ব্যাখ্যা",
  "অনুশীলনী ও সমস্যা সমাধান",
  "রিভিশন ও গুরুত্বপূর্ণ টিপস",
];

const LESSON_DURATIONS_SEC = [12 * 60 + 34, 18 * 60 + 5, 15 * 60 + 20, 20 * 60 + 10, 10 * 60 + 45];

// Placeholder: one free course per class, pending a real per-class catalog from udvash.com
// (checked 2026-09-24 — udvash.com and udvash-unmesh.com currently list zero live "Free
// Program" entries under their own Class/Program/Type filters). Kept as an array per class
// so a real multi-course catalog can drop in later without changing the screens.
export const FREE_COURSES: Record<string, FreeCourse[]> = Object.fromEntries(
  CLASS_LEVELS.map((c) => [
    c.slug,
    // No real Admission free/trial course exists yet (see note above) — don't invent one.
    c.slug === "admission"
      ? []
      : [
      {
        id: "trial",
        title: `${c.label} ফ্রি কোর্স`,
        subject: "সকল বিষয়",
        image: null,
        highlights: [
          "বিষয়ভিত্তিক বেসিক ধারণা তৈরি",
          "অভিজ্ঞ শিক্ষকের সহজ ব্যাখ্যা",
          "ফ্রি ক্লাস ভিডিও ও অনুশীলন",
        ],
        videoCount: 5,
        description: "সম্পূর্ণ বিনামূল্যে! নিজের বিষয়ের ফ্রি কোর্স আজই শুরু করো এবং শিক্ষকের পড়ানোর ধরন নিজে অনুভব করো।",
        lessons: LESSON_TITLES.map((title, i) => ({ title, durationSec: LESSON_DURATIONS_SEC[i] })),
      } satisfies FreeCourse,
    ],
  ])
);

export function findFreeCourse(classSlug: string, courseId: string): FreeCourse | null {
  return FREE_COURSES[classSlug]?.find((c) => c.id === courseId) ?? null;
}
