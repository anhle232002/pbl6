import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { useEffect } from "react";
import { initFlowbite } from "flowbite";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cinema",
  description: "Next.js App For Cinema",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-slate-800`}>
        {children}
      </body>
    </html>
  );
}
