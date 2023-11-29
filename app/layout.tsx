import "./globals.css";
import type { Metadata } from "next";
import { Roboto_Condensed } from "next/font/google";

export const metadata: Metadata = {
  title: "Cinema",
  description: "Next.js App For Cinema",
};

const robo = Roboto_Condensed({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className={`${robo.className} min-h-screen`}>{children}</div>
      </body>
    </html>
  );
}
