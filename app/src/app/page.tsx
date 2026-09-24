import AppHeader from "@/components/AppHeader";
import HeroBanner from "@/components/HeroBanner";
import ServiceCard from "@/components/ServiceCard";
import BottomNav from "@/components/BottomNav";
import PullToRefresh from "@/components/PullToRefresh";
import { BookIcon, FreeCourseIcon } from "@/components/nav-icons";

export default function Home() {
  return (
    <>
      <AppHeader />
      <main className="flex-1 pb-6">
        <PullToRefresh>
          <HeroBanner />

          <section className="mt-6 px-4">
            <h2 className="mb-3 text-sm font-medium text-[var(--color-text-secondary)] opacity-70">
              তোমার জন্য
            </h2>
            <div className="flex flex-col gap-3 md:grid md:grid-cols-2">
              <ServiceCard
                href="/free-courses"
                icon={<FreeCourseIcon color="#FC5A5A" size={36} />}
                iconBg="#FC5A5A"
                title="ট্রায়াল / ফ্রি কোর্স"
                subtitle="শেখা শুরু হোক একদম বিনামূল্যে"
              />
              <ServiceCard
                href="/programs"
                icon={<BookIcon color="#00BA00" size={35} />}
                iconBg="#00BA00"
                title="প্রোগ্রামসমূহ"
                subtitle="আপনার প্রয়োজন অনুযায়ী বেছে নিন"
              />
            </div>
          </section>
        </PullToRefresh>
      </main>
      <BottomNav />
    </>
  );
}
