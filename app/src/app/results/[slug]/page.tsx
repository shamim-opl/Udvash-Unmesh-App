import { notFound } from "next/navigation";
import AppHeader from "@/components/AppHeader";
import BackButton from "@/components/BackButton";
import BottomNav from "@/components/BottomNav";
import ResultCard from "@/components/ResultCard";
import { RESULT_CATEGORIES } from "@/data/results";

export function generateStaticParams() {
  return RESULT_CATEGORIES.map((c) => ({ slug: c.slug }));
}

export default async function ResultCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = RESULT_CATEGORIES.find((c) => c.slug === slug);
  if (!category) notFound();

  return (
    <>
      <AppHeader />
      <header className="relative mb-2 mt-5 flex items-center justify-center gap-3 px-4 py-3">
        <span className="absolute left-4 lg:left-8">
          <BackButton href="/" />
        </span>
        <h1 className="font-heading text-[18px] font-semibold leading-none text-[#616161]">{category.title} রেজাল্ট ২০২৫</h1>
      </header>

      <main className="flex-1 px-4 pb-6">
        <ul className="flex flex-col gap-3">
          {category.documents.map((doc) => (
            <li key={doc.href}>
              <ResultCard label={doc.label} href={doc.href} color={category.color} />
            </li>
          ))}
        </ul>
      </main>
      <BottomNav />
    </>
  );
}
