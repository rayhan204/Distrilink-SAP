import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DISTRILINK",
  description: "Dashboard Analisa Performa Salesman",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}