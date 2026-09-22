import type { Metadata } from "next";
import { Hind_Siliguri, Inter } from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";
import AuthProvider from "@/components/AuthProvider";
import PageTransition from "@/components/PageTransition";
import Sidebar from "@/components/Sidebar";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind-siliguri",
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Udvash-Unmesh",
  description: "শিক্ষার পথে, আগামীর জন্য",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="bn" data-brand="udvash" className={`${inter.variable} ${hindSiliguri.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col lg:flex-row bg-[var(--color-bg-canvas)]">
        <ThemeProvider>
          <AuthProvider>
            <Sidebar />
            <div className="mx-auto flex w-full max-w-md flex-1 flex-col md:max-w-3xl lg:max-w-none bg-[var(--color-bg-canvas)]">
              <PageTransition>{children}</PageTransition>
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
