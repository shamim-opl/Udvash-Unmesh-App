// Bangladesh's 8 divisions and 64 districts (public administrative data), grouped to match
// the division slugs used in `branches.ts` so Location step selections line up with real data.
export const DIVISION_DISTRICTS: { slug: string; name: string; districts: string[] }[] = [
  {
    slug: "dhaka",
    name: "ঢাকা",
    districts: [
      "ঢাকা",
      "ফরিদপুর",
      "গাজীপুর",
      "গোপালগঞ্জ",
      "কিশোরগঞ্জ",
      "মাদারীপুর",
      "মানিকগঞ্জ",
      "মুন্সিগঞ্জ",
      "নারায়ণগঞ্জ",
      "নরসিংদী",
      "রাজবাড়ী",
      "শরীয়তপুর",
      "টাঙ্গাইল",
    ],
  },
  {
    slug: "mymensingh",
    name: "ময়মনসিংহ",
    districts: ["ময়মনসিংহ", "জামালপুর", "নেত্রকোণা", "শেরপুর"],
  },
  {
    slug: "chattogram",
    name: "চট্টগ্রাম",
    districts: [
      "বান্দরবান",
      "ব্রাহ্মণবাড়িয়া",
      "চাঁদপুর",
      "চট্টগ্রাম",
      "কুমিল্লা",
      "কক্সবাজার",
      "ফেনী",
      "খাগড়াছড়ি",
      "লক্ষ্মীপুর",
      "নোয়াখালী",
      "রাঙ্গামাটি",
    ],
  },
  {
    slug: "barishal",
    name: "বরিশাল",
    districts: ["বরগুনা", "বরিশাল", "ভোলা", "ঝালকাঠি", "পটুয়াখালী", "পিরোজপুর"],
  },
  {
    slug: "khulna",
    name: "খুলনা",
    districts: [
      "বাগেরহাট",
      "চুয়াডাঙ্গা",
      "যশোর",
      "ঝিনাইদহ",
      "খুলনা",
      "কুষ্টিয়া",
      "মাগুরা",
      "মেহেরপুর",
      "নড়াইল",
      "সাতক্ষীরা",
    ],
  },
  {
    slug: "rajshahi",
    name: "রাজশাহী",
    districts: ["বগুড়া", "চাঁপাইনবাবগঞ্জ", "জয়পুরহাট", "নওগাঁ", "নাটোর", "পাবনা", "রাজশাহী", "সিরাজগঞ্জ"],
  },
  {
    slug: "rangpur",
    name: "রংপুর",
    districts: ["দিনাজপুর", "গাইবান্ধা", "কুড়িগ্রাম", "লালমনিরহাট", "নীলফামারী", "পঞ্চগড়", "রংপুর", "ঠাকুরগাঁও"],
  },
  {
    slug: "sylhet",
    name: "সিলেট",
    districts: ["হবিগঞ্জ", "মৌলভীবাজার", "সুনামগঞ্জ", "সিলেট"],
  },
];

// Class taxonomy reused from the website's homepage class selector (five..twelve).
export const CLASSES = [
  "পঞ্চম শ্রেণি",
  "ষষ্ঠ শ্রেণি",
  "সপ্তম শ্রেণি",
  "অষ্টম শ্রেণি",
  "নবম শ্রেণি",
  "দশম শ্রেণি",
  "একাদশ শ্রেণি",
  "দ্বাদশ শ্রেণি",
];
