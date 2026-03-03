import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portfolio | Yoni Tribber",
  description: "AI & Web Developer Portfolio",
  // metadataBase: new URL("localhost:3000"),
  icons: "/logo_yt.jpg",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Portofolio Saya</title>
        {/* <script src="https://cdn.tailwindcss.com"></script> */}
      </head>
      <body className="bg-gray-200 text-white font-sans">
        {children}
      </body>
    </html>
  );
}
