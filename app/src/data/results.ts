export type ResultDocument = {
  label: string;
  description: string;
  href: string;
};

export type ResultCategory = {
  slug: string;
  title: string;
  note: string;
  icon: string;
  color: string;
  sourceUrl: string;
  documents: ResultDocument[];
};

// Source: https://udvash.com/success25 (each category page links to static PDF result files).
// The PDFs are hosted by Udvash-Unmesh; update the year and paths here when new results are published.
const PDF_BASE = "https://udvash-unmesh.com/media/Files/Result/25";

const MERIT = "মেধাক্রমভিত্তিক";
const COLLEGE = "কলেজভিত্তিক";

export const RESULT_CATEGORIES: ResultCategory[] = [
  {
    slug: "buet",
    title: "BUET",
    note: "BUET ভর্তি পরীক্ষার ফলাফল",
    icon: "engineering",
    color: "#1E88E5",
    sourceUrl: "https://udvash.com/buet2526",
    documents: [
      { label: `${MERIT} রেজাল্ট`, description: "মেধাক্রম অনুযায়ী তালিকা", href: `${PDF_BASE}/BUET/BUETMeritWise.pdf` },
      { label: `${COLLEGE} রেজাল্ট`, description: "HSC কলেজ অনুযায়ী তালিকা", href: `${PDF_BASE}/BUET/BUETCollegeWise.pdf` },
    ],
  },
  {
    slug: "medical",
    title: "মেডিকেল",
    note: "মেডিকেল ভর্তি পরীক্ষার ফলাফল",
    icon: "stethoscope",
    color: "#00897B",
    sourceUrl: "https://unmesh.com/Medical-Result-2025",
    documents: [
      { label: `${MERIT} রেজাল্ট`, description: "মেধাক্রম অনুযায়ী তালিকা", href: `${PDF_BASE}/Medical/MedicalMeritWise.pdf` },
      { label: `${COLLEGE} রেজাল্ট`, description: "কলেজ অনুযায়ী তালিকা", href: `${PDF_BASE}/Medical/MedicalCollegeWise.pdf` },
    ],
  },
  {
    slug: "du-a",
    title: "ঢাবি 'A' ইউনিট",
    note: "ঢাকা বিশ্ববিদ্যালয় 'A' ইউনিটের ফলাফল",
    icon: "science",
    color: "#8E24AA",
    sourceUrl: "https://udvash.com/duka2526",
    documents: [
      { label: `${MERIT} রেজাল্ট`, description: "মেধাক্রম অনুযায়ী তালিকা", href: `${PDF_BASE}/Ka/DUKaMeritWise.pdf` },
      { label: `${COLLEGE} রেজাল্ট`, description: "কলেজ অনুযায়ী তালিকা", href: `${PDF_BASE}/Ka/DUKaCollegeWise.pdf` },
    ],
  },
  {
    slug: "du-b",
    title: "ঢাবি 'B' ইউনিট",
    note: "ঢাকা বিশ্ববিদ্যালয় 'B' ইউনিটের ফলাফল",
    icon: "history_edu",
    color: "#FB8C00",
    sourceUrl: "https://udvash.com/dukha2526",
    documents: [
      { label: `${MERIT} রেজাল্ট`, description: "মেধাক্রম অনুযায়ী তালিকা", href: `${PDF_BASE}/Kha/DUKhaMeritWise1.pdf` },
      { label: `${COLLEGE} রেজাল্ট`, description: "কলেজ অনুযায়ী তালিকা", href: `${PDF_BASE}/Kha/DUKhaCollegeWise1.pdf` },
    ],
  },
  {
    slug: "college-admission",
    title: "কলেজ ভর্তি",
    note: "NDC, HCC ও St. Joseph কলেজ ভর্তির ফলাফল",
    icon: "school",
    color: "#3949AB",
    sourceUrl: "https://udvash.com/cap25",
    documents: [
      { label: "জেলাভিত্তিক রেজাল্ট", description: "জেলা অনুযায়ী তালিকা", href: `${PDF_BASE}/CAP/CAPResult25Districtwise1.pdf` },
    ],
  },
];
