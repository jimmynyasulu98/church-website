import type { Metadata } from "next";
import localFont from "next/font/local";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { PageTransition } from "@/components/providers/page-transition";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "CCAP Zomba",
  description: "A Christ-centered church community in Zomba.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <PageTransition>{children}</PageTransition>
          <Footer />
        </div>
      </body>
    </html>
  );
}
