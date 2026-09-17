import BottomNav from "@/components/BottomNav";
import BackButton from "@/components/BackButton";

export default function ComingSoon({ title, note }: { title: string; note: string }) {
  return (
    <>
      <header className="flex items-center gap-3 px-4 py-3">
        <BackButton href="/" />
        <h1 className="text-base font-bold leading-none text-[var(--color-text-primary)]">{title}</h1>
      </header>
      <main className="flex flex-1 flex-col items-center justify-center gap-2 px-8 text-center">
        <p className="text-sm text-[var(--color-text-secondary)]">{note}</p>
      </main>
      <BottomNav />
    </>
  );
}
