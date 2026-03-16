import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
const inter = Inter({ display: "swap", subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "The Yoga Path Siliguri | Online Yoga Courses, Meditation & Wellness Training",
  description:
    "Join The Yoga Path Siliguri for expert-led online yoga courses, meditation classes, and wellness programs. Learn yoga from certified instructors and start your journey to a healthier life today.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        {children}
        <ToastContainer position="top-right" autoClose={3000} />
      </body>
    </html>
  );
}
