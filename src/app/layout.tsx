import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";

// ✅ Rename variable (important)
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], 
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "Online Yoga Courses in North Bengal | The Yoga Path",
  description:
    "Join the best online yoga courses in North Bengal with The Yoga Path. Learn from expert trainers, flexible classes, and start your wellness journey from anywhere.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {children}
        <ToastContainer position="top-right" autoClose={3000} />
      </body>
    </html>
  );
}