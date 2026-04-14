import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/contexts/AuthContext";

export const metadata: Metadata = {
  title: "plus7hälsa – Healthcare & Wellness by Dr. Alexandra Alexandru",
  description:
    "Family medicine, burnout management training, and public speaking coaching in Gothenburg, Sweden.",
  keywords: ["family doctor", "burnout", "stress management", "healthcare", "Gothenburg", "Sweden"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-gray-900">
        <AuthProvider>
          <Navbar />
          <main className="pt-16">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
