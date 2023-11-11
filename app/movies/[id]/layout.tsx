import type { Metadata } from "next";
import { Roboto_Condensed } from "next/font/google";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import BottomBar from "@/components/BottomBar";
const robo = Roboto_Condensed({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${robo.className} min-h-screen`}>
        <NavBar />
        <div className="bg-background pb-40">{children}</div>

        <BottomBar />
        {/* <Footer /> */}
      </body>
    </html>
  );
}
