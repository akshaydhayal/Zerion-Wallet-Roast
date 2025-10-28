import type { Metadata } from "next";
import "./globals.css";
import "@solana/wallet-adapter-react-ui/styles.css";
import { WalletProvider } from "@/components/WalletProvider";
import { ThemeProvider } from "@/contexts/ThemeContext";

export const metadata: Metadata = {
  title: "Wallet Roast - Get Roasted by Your Bags",
  description: "A humorous AI-driven app that analyzes your Solana wallet and roasts you based on your onchain behavior. Built with Zerion API.",
  keywords: ["solana", "wallet", "crypto", "roast", "zerion", "blockchain"],
  openGraph: {
    title: "Wallet Roast - Get Roasted by Your Bags",
    description: "Connect your wallet and get hilariously roasted based on your crypto trading habits!",
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
          <WalletProvider>{children}</WalletProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

