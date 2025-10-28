"use client";

import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import Hero from "@/components/Hero";
import WalletConnector from "@/components/WalletConnector";
import RoastGenerator from "@/components/RoastGenerator";
import Footer from "@/components/Footer";
import { useTheme } from "@/contexts/ThemeContext";

export default function Home() {
  const { publicKey, connected } = useWallet();
  const { themeConfig } = useTheme();
  const [showRoast, setShowRoast] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>("");

  const handleGetRoasted = (address?: string) => {
    // Use manual address if provided, otherwise use connected wallet
    const addressToUse = address || (connected && publicKey ? publicKey.toString() : "");
    
    if (addressToUse) {
      setWalletAddress(addressToUse);
      setShowRoast(true);
    }
  };

  const handleBackToHome = () => {
    setShowRoast(false);
    setWalletAddress("");
  };

  return (
    <main 
      className="min-h-screen relative overflow-hidden transition-all duration-500"
      style={{
        background: `linear-gradient(135deg, ${themeConfig.colors.background} 0%, ${themeConfig.colors.surface} 100%)`,
      }}
    >

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-20 left-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"
          style={{ backgroundColor: themeConfig.colors.primary }}
        ></div>
        <div 
          className="absolute top-40 right-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" 
          style={{ 
            backgroundColor: themeConfig.colors.secondary,
            animationDelay: "1s" 
          }}
        ></div>
        <div 
          className="absolute -bottom-8 left-1/2 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" 
          style={{ 
            backgroundColor: themeConfig.colors.accent,
            animationDelay: "2s" 
          }}
        ></div>
      </div>

      <div className="relative z-10">
        {!showRoast ? (
          <div className="container mx-auto px-4 py-4">
            <Hero />
            <WalletConnector onGetRoasted={handleGetRoasted} />
          </div>
        ) : (
          <div className="container mx-auto px-4 py-4">
            <RoastGenerator walletAddress={walletAddress} onBack={handleBackToHome} />
          </div>
        )}
        <Footer />
      </div>
    </main>
  );
}

