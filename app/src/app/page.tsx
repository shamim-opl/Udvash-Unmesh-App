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
            <div className="flex flex-col gap-3">
              <ServiceCard
                href="/free-courses"
                icon={
                  <span className="material-symbols-rounded" style={{ fontSize: 26, color: "var(--color-brand-primary)" }}>
                    school
                  </span>
                }
                iconBg="#FFE4E4"
                title="ট্রায়াল / ফ্রি কোর্স"
                subtitle="বিনামূল্যে কোর্স ও ট্রায়াল ক্লাস"
              />
              <ServiceCard
                href="/programs"
                icon={
                  <span className="material-symbols-rounded" style={{ fontSize: 26, color: "var(--color-info)" }}>
                    menu_book
                  </span>
                }
                iconBg="#E1F0FF"
                title="প্রোগ্রামসমূহ"
                subtitle="সকল প্রোগ্রাম ও কোর্স"
              />
            </div>
          </section>
        </PullToRefresh>
      </main>
      <BottomNav />
    </>
  );
}
