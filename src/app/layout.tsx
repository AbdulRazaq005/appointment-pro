import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import SessionWrapper from "@/components/SessionWrapper";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Appointment Pro",
  description: "Book appointments with top professionals",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body
          className={`${inter.className} flex flex-col min-h-screen bg-gradient-to-br from-gray-100 to-gray-300`}
        >
          <Header />
          <main className="flex-grow">{children}</main>
          <Toaster />
          <Footer />
        </body>
      </html>
    </SessionWrapper>
  );
}
