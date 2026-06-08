import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { AdminAuthProvider } from "@/context/AdminAuthContext";
import { BeachesProvider } from "@/context/BeachesContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Batam Pantai",
  description: "Website rekomendasi wisata pantai di Kota Batam",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AdminAuthProvider>
          <BeachesProvider>
            {children}
          </BeachesProvider>
        </AdminAuthProvider>
      </body>
    </html>
  );
}