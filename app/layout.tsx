import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CrispyCrustBoule — Sourdough done right",
  description: "A home showcase of seven years' worth of sourdough.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
