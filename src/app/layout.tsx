import type { Metadata, Viewport } from "next";
import { AppHeader } from "@/components/layout/AppHeader";
import { AppFooter } from "@/components/layout/AppFooter";
import "./globals.css";

export const metadata: Metadata = {
  title: "PostManager · AI Post Suite",
  description: "Turn event moments into LinkedIn posts with PostManager AI.",
  icons: { icon: "/brand/logo.svg" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Same font sources as the Stitch export. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-background font-body-md text-on-surface min-h-screen">
        <AppHeader />
        <main className="w-full pt-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">{children}</div>
        </main>
        <AppFooter />
      </body>
    </html>
  );
}
