import AppHeader from "@/components/AppHeader";
import HeroBanner from "@/components/HeroBanner";
import ServiceCard from "@/components/ServiceCard";
import BottomNav from "@/components/BottomNav";
import PullToRefresh from "@/components/PullToRefresh";

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
            <div className="grid grid-cols-2 gap-3">
              <ServiceCard
                href="/free-courses"
                icon="school"
                accent="#FC5A5A"
                title="ট্রায়াল / ফ্রি কোর্স"
                subtitle="বিনামূল্যে ক্লাস দেখে শেখা শুরু করুন"
                cta="শুরু করুন"
              />
              <ServiceCard
                href="/programs"
                icon="menu_book"
                accent="#00BA00"
                title="প্রোগ্রামসমূহ"
                subtitle="আপনার প্রয়োজন অনুযায়ী সঠিক প্রোগ্রাম খুঁজুন"
                cta="দেখুন"
              />
            </div>
          </section>
        </PullToRefresh>
      </main>
      <BottomNav />
    </>
  );
}
