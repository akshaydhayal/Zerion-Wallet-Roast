"use client";

import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { motion } from "framer-motion";
import { Wallet, Zap, Shield, Search } from "lucide-react";
import { PublicKey } from "@solana/web3.js";
import { useTheme } from "@/contexts/ThemeContext";

interface WalletConnectorProps {
  onGetRoasted: (address?: string) => void;
}

export default function WalletConnector({ onGetRoasted }: WalletConnectorProps) {
  const { connected, publicKey } = useWallet();
  const { themeConfig } = useTheme();
  const [manualAddress, setManualAddress] = useState("");
  const [addressError, setAddressError] = useState("");

  const validateAndRoast = () => {
    setAddressError("");
    
    if (!manualAddress.trim()) {
      setAddressError("Please enter a wallet address");
      return;
    }

    try {
      // Validate Solana address
      new PublicKey(manualAddress.trim());
      onGetRoasted(manualAddress.trim());
    } catch (error) {
      setAddressError("Invalid Solana wallet address");
    }
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setManualAddress(e.target.value);
    setAddressError("");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-sm border"
        style={{
          backgroundColor: `${themeConfig.colors.surface}60`,
          borderColor: themeConfig.colors.border,
        }}
      >
        <div className="text-center space-y-4">
          {/* Icon */}
          <motion.div
            animate={{ rotateY: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="inline-block"
          >
            <Wallet className="w-12 h-12 mx-auto" style={{ color: themeConfig.colors.primary }} />
          </motion.div>

          {/* Content */}
          {!connected ? (
            <>
              {/* <h2 className="text-2xl md:text-3xl font-bold" style={{ color: themeConfig.colors.text }}>
                Ready to Face the Truth?
              </h2>
              <p className="text-base" style={{ color: themeConfig.colors.textSecondary }}>
                Connect your Solana wallet or enter any wallet address to get roasted!
              </p> */}

              {/* Features */}
              <div className="grid md:grid-cols-3 gap-3 pt-2">
  
                
                
              </div>

              {/* Connect Button */}
              <div className="pt-4">
                <WalletMultiButton 
                  className="!rounded-full !px-8 !py-4 !text-lg !font-bold !transition-all !duration-300 !shadow-lg hover:!shadow-xl !mx-auto"
                  style={{
                    background: `linear-gradient(to right, ${themeConfig.colors.primary}, ${themeConfig.colors.secondary})`,
                  }}
                />
              </div>

              {/* OR Divider */}
              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t" style={{ borderColor: themeConfig.colors.border }}></div>
                </div>
                <div className="relative flex justify-center">
                  <span 
                    className="bg-transparent px-4 text-sm font-medium"
                    style={{ 
                      backgroundColor: themeConfig.colors.background,
                      color: themeConfig.colors.textSecondary 
                    }}
                  >
                    OR
                  </span>
                </div>
              </div>

              {/* Manual Address Input */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold" style={{ color: themeConfig.colors.text }}>
                  Enter Any Wallet Address
                </h3>
            
                
                <div className="space-y-3">
                  <input
                    type="text"
                    value={manualAddress}
                    onChange={handleAddressChange}
                    placeholder="Enter Solana wallet address..."
                    className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                    style={{
                      backgroundColor: `${themeConfig.colors.surface}40`,
                      borderColor: themeConfig.colors.border,
                      color: themeConfig.colors.text,
                    }}
                  />
                  
                  {addressError && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm"
                      style={{ color: themeConfig.colors.accent }}
                    >
                      {addressError}
                    </motion.p>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={validateAndRoast}
                    className="w-full font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2"
                    style={{
                      background: `linear-gradient(to right, ${themeConfig.colors.primary}, ${themeConfig.colors.secondary})`,
                      color: themeConfig.colors.text,
                    }}
                  >
                    <Search className="w-5 h-5" />
                    Roast This Wallet
                  </motion.button>
                </div>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-2xl md:text-3xl font-bold" style={{ color: themeConfig.colors.text }}>
                Wallet Connected! 🎉
              </h2>
              <div 
                className="rounded-xl p-4"
                style={{ backgroundColor: `${themeConfig.colors.surface}40` }}
              >
                <p className="text-sm mb-2" style={{ color: themeConfig.colors.textSecondary }}>Your Wallet</p>
                <p className="font-mono text-sm break-all" style={{ color: themeConfig.colors.text }}>
                  {publicKey?.toString()}
                </p>
              </div>
              <p className="text-base" style={{ color: themeConfig.colors.textSecondary }}>
                Time to see what your wallet says about you...
              </p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onGetRoasted()}
                className="font-bold py-3 px-6 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-3"
                style={{
                  background: `linear-gradient(to right, ${themeConfig.colors.primary}, ${themeConfig.colors.secondary})`,
                  color: themeConfig.colors.text,
                }}
              >
                <span>🔥</span>
                Get Roasted Now
                <span>🔥</span>
              </motion.button>

              <p className="text-sm" style={{ color: themeConfig.colors.textSecondary }}>
                (No transactions will be made - just reading your wallet data)
              </p>

              {/* OR Divider for connected state */}
              <div className="relative py-3">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t" style={{ borderColor: themeConfig.colors.border }}></div>
                </div>
                <div className="relative flex justify-center">
                  <span 
                    className="bg-transparent px-4 text-sm font-medium"
                    style={{ 
                      backgroundColor: themeConfig.colors.background,
                      color: themeConfig.colors.textSecondary 
                    }}
                  >
                    OR
                  </span>
                </div>
              </div>

              {/* Manual Address Input - Even when connected */}
              <div className="space-y-3">
                <p className="text-sm" style={{ color: themeConfig.colors.textSecondary }}>
                  Want to roast a different wallet?
                </p>
                
                <input
                  type="text"
                  value={manualAddress}
                  onChange={handleAddressChange}
                  placeholder="Enter any Solana wallet address..."
                  className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:border-transparent transition-all text-sm"
                  style={{
                    backgroundColor: `${themeConfig.colors.surface}40`,
                    borderColor: themeConfig.colors.border,
                    color: themeConfig.colors.text,
                  }}
                />
                
                {addressError && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm"
                    style={{ color: themeConfig.colors.accent }}
                  >
                    {addressError}
                  </motion.p>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={validateAndRoast}
                  className="w-full font-semibold py-2 px-4 rounded-xl transition-all duration-300 inline-flex items-center justify-center gap-2 text-sm"
                  style={{
                    backgroundColor: `${themeConfig.colors.surface}60`,
                    borderColor: themeConfig.colors.border,
                    color: themeConfig.colors.text,
                  }}
                >
                  <Search className="w-4 h-4" />
                  Roast This Wallet Instead
                </motion.button>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}

