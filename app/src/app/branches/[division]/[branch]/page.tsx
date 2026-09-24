import { notFound } from "next/navigation";
import Link from "next/link";
import AppHeader from "@/components/AppHeader";
import BackButton from "@/components/BackButton";
import BottomNav from "@/components/BottomNav";
import { DIVISIONS, findBranch, getBranchDistrict, mapsHref, mapsEmbedHref, telHref, slugify } from "@/data/branches";

export function generateStaticParams() {
  return DIVISIONS.flatMap((division) =>
    division.branches.map((branch) => ({ division: division.slug, branch: slugify(branch.en) }))
  );
}

export default async function BranchDetailsPage({
  params,
}: {
  params: Promise<{ division: string; branch: string }>;
}) {
  const { division: divisionSlug, branch: branchSlug } = await params;
  const found = findBranch(divisionSlug, branchSlug);
  if (!found) notFound();
  const { branch, division } = found;
  const phoneSlots = [branch.phones[0] ?? null, branch.phones[1] ?? null];

  return (
    <>
      <AppHeader />
      <header className="relative mb-2 flex items-center justify-center gap-3 px-4 py-3">
        <span className="absolute left-4 lg:left-8">
          <BackButton href="/branches" mobileVisible />
        </span>
        <h1 className="font-heading text-[18px] font-semibold leading-none text-[#616161]">শাখার বিবরণ</h1>
      </header>

      <main className="flex-1 px-4 pb-6">
        <div
          className="relative overflow-hidden rounded-[var(--radius-lg)] p-5"
          style={{ background: "linear-gradient(135deg, color-mix(in srgb, var(--color-brand-primary) 78%, black) 0%, var(--color-brand-primary) 100%)" }}
        >
          <span
            aria-hidden
            className="absolute -right-8 -top-8 h-32 w-32 rounded-full"
            style={{ background: "rgba(255,255,255,0.08)" }}
          />
          <div className="relative flex items-center gap-3">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full" style={{ background: "rgba(255,255,255,0.15)" }}>
              <span className="material-symbols-rounded" aria-hidden style={{ fontSize: 24, color: "white" }}>
                pin_drop
              </span>
            </span>
            <div className="min-w-0">
              <h2 className="text-2xl font-bold text-white">{branch.name}</h2>
              <p className="mt-0.5 text-sm text-white/80">
                {getBranchDistrict(branch) ? `${getBranchDistrict(branch)}, ${division.name}` : division.name}
              </p>
            </div>
          </div>

          <div className="relative mt-4 grid grid-cols-2 border-t border-white/20">
            {phoneSlots.map((phone, index) => {
              const className = "tap relative flex min-w-0 items-center justify-center gap-2 px-2 pb-1.5 pt-3 text-sm font-medium text-white transition-colors md:hover:text-white/80";
              if (!phone) {
                return (
                  <span key={`empty-phone-${index}`} className={className} style={{ color: "rgba(255,255,255,0.65)" }}>
                    --
                    {index === 0 && <span className="pointer-events-none absolute right-0 top-1.5 h-[calc(100%-10px)] w-px bg-white/20" aria-hidden />}
                  </span>
                );
              }

              return (
                <a
                  key={phone}
                  href={telHref(phone)}
                  aria-label={`${branch.name} শাখায় কল করুন ${phone}`}
                  className={className}
                >
                  <span className="material-symbols-rounded" aria-hidden style={{ fontSize: 18 }}>
                    call
                  </span>
                  {phone}
                  {index === 0 && <span className="pointer-events-none absolute right-0 top-1.5 h-[calc(100%-10px)] w-px bg-white/20" aria-hidden />}
                </a>
              );
            })}
          </div>
        </div>

        <div className="mt-4 lg:grid lg:grid-cols-2 lg:items-stretch lg:gap-4">
          <section
            className="flex flex-col rounded-[var(--radius-lg)] border bg-[var(--color-surface)] p-4"
            style={{ borderColor: "color-mix(in srgb, var(--color-border) 50%, transparent)", boxShadow: "var(--shadow-subtle)" }}
          >
            <p className="mb-[14px] text-sm font-medium text-[var(--color-text-secondary)] opacity-70">ঠিকানাঃ</p>
            <div className="flex items-start gap-3">
              <p className="text-base leading-relaxed text-[var(--color-text-primary)]">
                {branch.address ?? `${branch.name} (${branch.en}), ${division.name}`}
              </p>
            </div>
            <a
              href={mapsHref(branch, division)}
              target="_blank"
              rel="noopener noreferrer"
              className="tap mt-[18px] flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold text-white lg:mt-auto"
              style={{ background: "var(--color-brand-primary)" }}
            >
              <span className="material-symbols-rounded" aria-hidden style={{ fontSize: 18 }}>
                near_me
              </span>
              Open in Google Maps
            </a>
          </section>

          <div className="relative mt-4 aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-lg)] border lg:mt-0" style={{ borderColor: "color-mix(in srgb, var(--color-border) 50%, transparent)" }}>
            <iframe
              title={`${branch.name} — Google Maps`}
              src={mapsEmbedHref(branch, division)}
              className="absolute inset-0 h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div className="mt-5 flex justify-center">
          <Link
            href="/branches"
            className="tap flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold"
            style={{ borderColor: "var(--color-brand-primary)", color: "var(--color-brand-primary)" }}
          >
            <span className="material-symbols-rounded" aria-hidden style={{ fontSize: 18 }}>
              format_list_bulleted
            </span>
            সব শাখা
          </Link>
        </div>
      </main>
      <BottomNav />
    </>
  );
}
