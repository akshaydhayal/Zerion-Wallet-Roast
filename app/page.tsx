"use client";

import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import Hero from "@/components/Hero";
import WalletConnector from "@/components/WalletConnector";
import RoastGenerator from "@/components/RoastGenerator";
import Footer from "@/components/Footer";

export default function Home() {
  const { publicKey, connected } = useWallet();
  const [showRoast, setShowRoast] = useState(false);

  const handleGetRoasted = () => {
    if (connected && publicKey) {
      setShowRoast(true);
    }
  };

  const handleBackToHome = () => {
    setShowRoast(false);
  };

  return (
    <main className="min-h-screen gradient-bg-animated relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: "1s" }}></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="relative z-10">
        {!showRoast ? (
          <div className="container mx-auto px-4 py-8">
            <Hero />
            <WalletConnector onGetRoasted={handleGetRoasted} />
          </div>
        ) : (
          <div className="container mx-auto px-4 py-8">
            <RoastGenerator walletAddress={publicKey!.toString()} onBack={handleBackToHome} />
          </div>
        )}
        <Footer />
      </div>
    </main>
  );
}

