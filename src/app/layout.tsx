import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import AOSInit from "@/app/components/AOSInit";
import CustomCursor from "@/app/components/CustomCursor";
import BackgroundDecorations from "@/app/components/BackgroundDecorations";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portofolio Yoni Tribber | AI & Web Developer",
  description: "Portofolio profesional Yoni Tribber - Data Scientist & AI Developer. Membangun model pembelajaran mendalam, LLM, RAG, dan aplikasi web modern.",
  keywords: ["Data Scientist", "AI Developer", "Machine Learning", "RAG", "LLM", "Informatics Engineering", "React", "Next.js"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`dark scroll-smooth ${plusJakartaSans.variable} ${spaceGrotesk.variable}`}>
      <head>
        <meta charSet="UTF-8" />
      </head>
      <body
        className="overflow-x-hidden bg-background text-foreground transition-colors duration-300 antialiased font-sans"
      >
        <AOSInit />
        <CustomCursor />
        <BackgroundDecorations />
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
