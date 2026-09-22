import Image from "next/image";

export default function HeroBanner() {
  return (
    <div className="mt-4 px-4">
      <div className="relative aspect-[1870/841] w-full overflow-hidden rounded-[12px]">
        <Image src="/hero-banner-v8.webp" alt="সম্পর্ক হোক সহযোগিতার — উদ্ভাস-উন্মেষ শিক্ষা পরিবার" fill className="object-cover" priority />
        <span
          aria-hidden
          className="animate-banner-shine pointer-events-none absolute inset-y-0 left-0 w-1/3"
          style={{
            background: "linear-gradient(115deg, transparent 10%, rgba(255,255,255,0.18) 50%, transparent 90%)",
          }}
        />
      </div>
    </div>
  );
}
