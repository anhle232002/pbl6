import "./globals.css";
import type { Metadata } from "next";
import { Roboto_Condensed } from "next/font/google";
import { useEffect } from "react";
import { initFlowbite } from "flowbite";

const robo = Roboto_Condensed({ weight: ["300", "400", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cinema",
  description: "Next.js App For Cinema",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${robo.className} min-h-screen bg-background text-accent`}>{children}</body>
    </html>
  );
}
