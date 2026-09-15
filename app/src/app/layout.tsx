import type { Metadata } from "next";
import { Noto_Sans_Bengali } from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";
import AuthProvider from "@/components/AuthProvider";
import PageTransition from "@/components/PageTransition";
import "./globals.css";

const notoSansBengali = Noto_Sans_Bengali({
  variable: "--font-noto-sans-bengali",
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Udvash-Unmesh",
  description: "শিক্ষার পথে, আগামীর জন্য",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="bn" data-brand="udvash" className={`${notoSansBengali.variable} h-full antialiased`}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--color-bg-canvas)]">
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col bg-[var(--color-bg-canvas)]">
          <ThemeProvider>
            <AuthProvider>
              <PageTransition>{children}</PageTransition>
            </AuthProvider>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
