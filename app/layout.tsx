import type { Metadata } from "next";
import { Manrope, Outfit } from "next/font/google";
import "./globals.css";
import AuthContextProvider from "@/context/AuthContext";
import { Toaster } from "@/components/ui/sonner"


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
    icon: '/icon.png'
  },

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
          {children}
          <Toaster theme="light" position="top-center"/>
        </AuthContextProvider>
      </body>
    </html>
  );
}
