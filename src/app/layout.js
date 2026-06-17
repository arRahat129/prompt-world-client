import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Prompt World",
  description: "A Place where you can find out many helpful AI prompts.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme='dark'
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
          <Navbar />
          <main>
            {children}
          </main>
          <Footer />
      </body>
    </html>
  );
}
