export type ClassLevel = {
  slug: string;
  number: string;
  label: string;
  bg: string;
  color: string;
};

export const CLASS_LEVELS: ClassLevel[] = [
  { slug: "class-5", number: "৫", label: "ক্লাস ৫", bg: "#FDE1E4", color: "#E53935" },
  { slug: "class-6", number: "৬", label: "ক্লাস ৬", bg: "#E3F0FD", color: "#1E88E5" },
  { slug: "class-7", number: "৭", label: "ক্লাস ৭", bg: "#E3F7EA", color: "#43A047" },
  { slug: "class-8", number: "৮", label: "ক্লাস ৮", bg: "#FEEBDD", color: "#FB8C00" },
  { slug: "class-9", number: "৯", label: "ক্লাস ৯", bg: "#E0F5F4", color: "#00897B" },
  { slug: "class-10", number: "১০", label: "ক্লাস ১০", bg: "#F0E5FB", color: "#8E24AA" },
  { slug: "class-11", number: "১১", label: "ক্লাস ১১", bg: "#E8EAFB", color: "#3949AB" },
  { slug: "class-12", number: "১২", label: "ক্লাস ১২", bg: "#FCE4EC", color: "#D81B60" },
];

export type FreeCourse = {
  title: string;
  subject: string;
  videoCount: number;
  description: string;
};

// Placeholder: one free course per class, pending a real per-class catalog from udvash.com.
export const FREE_COURSES: Record<string, FreeCourse> = Object.fromEntries(
  CLASS_LEVELS.map((c) => [
    c.slug,
    {
      title: `${c.label} ফ্রি কোর্স`,
      subject: "সকল বিষয়",
      videoCount: 5,
      description: "সম্পূর্ণ বিনামূল্যে! নিজের বিষয়ের ফ্রি কোর্স আজই শুরু করো এবং শিক্ষকের পড়ানোর ধরন নিজে অনুভব করো।",
    } satisfies FreeCourse,
  ])
);
