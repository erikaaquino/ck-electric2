import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MuiProvider from "@/components/MuiProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CK Electric - Puget Sound",
  description: "Professional electrical services in Tacoma to Skagit Valley",
  icons: {
    icon: [
      { url: '/favicon.ico?v=20240306', sizes: 'any' },
      { url: '/favicon-16x16.png?v=20240306', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png?v=20240306', sizes: '32x32', type: 'image/png' },
    ],
    apple: { url: '/apple-touch-icon.png?v=20240306', sizes: '180x180', type: 'image/png' },
  },
  manifest: '/site.webmanifest?v=20240306',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased`}
      >
        <Header />
        <MuiProvider>
          <main>
            {children}
          </main>
          <Footer />
        </MuiProvider>
      </body>
    </html>
  );
}
