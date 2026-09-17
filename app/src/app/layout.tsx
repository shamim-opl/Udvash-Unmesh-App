import type { Metadata } from "next";
import { Inter } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Udvash-Unmesh",
  description: "শিক্ষার পথে, আগামীর জন্য",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="bn" data-brand="udvash" className={`${inter.variable} h-full antialiased`}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col lg:flex-row bg-[var(--color-bg-canvas)]">
        <ThemeProvider>
          <AuthProvider>
            <Sidebar />
            <div className="mx-auto flex w-full max-w-md flex-1 flex-col lg:max-w-3xl bg-[var(--color-bg-canvas)]">
              <PageTransition>{children}</PageTransition>
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
