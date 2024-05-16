import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Mining } from "@/components/mining";
import { cn } from "@/lib/utils";
import { Providers } from "./providers";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "BLOM",
  description: "Memeable $BLOM mined on Ethereum EIP-4844 Blobs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          "min-h-screen flex flex-col bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers>
          <Header />
          <main className="flex-grow flex flex-col">{children}</main>
          <Footer />
          <Mining />
        </Providers>
      </body>
    </html>
  );
}
