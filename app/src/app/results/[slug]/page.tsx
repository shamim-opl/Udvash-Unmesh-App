import { notFound } from "next/navigation";
import AppHeader from "@/components/AppHeader";
import BackButton from "@/components/BackButton";
import BottomNav from "@/components/BottomNav";
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
              <a
                href={doc.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${doc.label}, PDF (নতুন ট্যাবে খুলবে)`}
                className="tap flex items-center gap-3 rounded-[var(--radius-lg)] border bg-[var(--color-surface)] px-4 py-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)]"
                style={{ borderColor: "var(--color-border)", boxShadow: "var(--shadow-subtle)" }}
              >
                <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full">
                  <span className="absolute inset-0 rounded-full" style={{ background: category.color, opacity: "var(--icon-bg-opacity)" }} />
                  <span className="material-symbols-rounded relative" style={{ fontSize: 22, color: category.color }}>
                    picture_as_pdf
                  </span>
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-base font-semibold leading-snug text-[var(--color-text-primary)]">{doc.label}</span>
                  <span className="mt-0.5 block text-xs text-[var(--color-text-secondary)]">{doc.description} · PDF</span>
                </span>
                <span
                  aria-hidden
                  className="material-symbols-rounded shrink-0"
                  style={{ fontSize: 20, color: "var(--color-text-secondary)" }}
                >
                  download
                </span>
              </a>
            </li>
          ))}
        </ul>
      </main>
      <BottomNav />
    </>
  );
}
