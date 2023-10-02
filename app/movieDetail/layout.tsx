import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Movie Detail",
  description: "Movie Detail",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
