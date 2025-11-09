import type { Metadata, Viewport } from "next";
import { Manrope, Outfit } from "next/font/google";
import "./globals.css";
import AuthContextProvider from "@/context/AuthContext";
import { Toaster } from "@/components/ui/sonner"
import RegisterSW from "./register-sw";
import Footer from "@/components/server/Footer";
import InstallPrompt from "@/components/client/InstallPrompt";


const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Flowkeep",
  description: "Track your tasks, build better habits with Flowkeep — your minimal productivity dashboard.",
  keywords: [
    "task tracker",
    "productivity app",
    "habit tracker",
    "Next.js Firebase app",
    "Flowkeep",
    "Flowkeep tasks"
  ],
  authors: [{ name: "Flowkeep" }],
  icons: {
    icon: [
      {
        url: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
      },
      {
        url: "/icons/icon-512x512.png",
        sizes: "512x512",
      },
    ],
  },
  manifest: "/manifest-v2.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {

  themeColor: "#000000",

  colorScheme: "dark",

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} ${outfit.variable}`}
      >
        <AuthContextProvider>
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <Toaster theme="light" position="top-center" />
          <RegisterSW />
          <InstallPrompt />
        </AuthContextProvider>
      </body>
    </html>
  );
}
