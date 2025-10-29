import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";

export const metadata: Metadata = {
  title: "Wallet Roast - Get Roasted by Your Bags",
  description: "A humorous AI-driven app that analyzes your Solana wallet and roasts you based on your onchain behavior. Built with Zerion API.",
  keywords: ["solana", "wallet", "crypto", "roast", "zerion", "blockchain"],
  openGraph: {
    title: "Wallet Roast - Get Roasted by Your Bags",
    description: "Enter your wallet address and get hilariously roasted based on your crypto trading habits!",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

