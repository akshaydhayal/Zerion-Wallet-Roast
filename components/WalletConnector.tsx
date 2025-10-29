"use client";

import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { motion } from "framer-motion";
import { Wallet, Zap, Shield, Search, LogOut } from "lucide-react";
import { PublicKey } from "@solana/web3.js";
import { useTheme } from "@/contexts/ThemeContext";

interface WalletConnectorProps {
  onGetRoasted: (address?: string) => void;
}

export default function WalletConnector({ onGetRoasted }: WalletConnectorProps) {
  const { connected, publicKey, disconnect } = useWallet();
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
    <div className="max-w-2xl mx-auto px-4 py-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-2xl shadow-xl backdrop-blur-sm border"
        style={{
          backgroundColor: `${themeConfig.colors.surface}80`,
          borderColor: themeConfig.colors.border,
        }}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ 
              x: [0, 50, 0],
              y: [0, -30, 0],
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute top-4 right-4 w-16 h-16 rounded-full opacity-20"
            style={{ backgroundColor: themeConfig.colors.primary }}
          />
          <motion.div
            animate={{ 
              x: [0, -40, 0],
              y: [0, 40, 0],
              rotate: [360, 180, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-4 left-4 w-12 h-12 rounded-full opacity-20"
            style={{ backgroundColor: themeConfig.colors.secondary }}
          />
        </div>

        <div className="relative p-8">
          {!connected ? (
            <div className="text-center space-y-4">
              {/* Icon */}
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="inline-block"
              >
                <Wallet className="w-12 h-12 mx-auto" style={{ color: themeConfig.colors.primary }} />
              </motion.div>

              {/* Connect Button */}
              <div>
                <WalletMultiButton 
                  className="!rounded-full !px-8 !py-4 !text-lg !font-bold !transition-all !duration-300 !shadow-lg hover:!shadow-xl !mx-auto"
                  style={{
                    background: `linear-gradient(to right, ${themeConfig.colors.primary}, ${themeConfig.colors.secondary})`,
                  }}
                />
              </div>

              {/* OR Divider */}
              <div className="relative py-3">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t" style={{ borderColor: themeConfig.colors.border }}></div>
                </div>
                <div className="relative flex justify-center">
                  <span 
                    className="bg-transparent px-4 text-sm font-medium"
                    style={{ 
                      backgroundColor: themeConfig.colors.surface,
                      color: themeConfig.colors.textSecondary 
                    }}
                  >
                    OR
                  </span>
                </div>
              </div>

              {/* Manual Address Input */}
              <div className="space-y-4">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={manualAddress}
                    onChange={handleAddressChange}
                    placeholder="Enter wallet address..."
                    className="flex-1 px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:border-transparent transition-all text-base"
                    style={{
                      backgroundColor: `${themeConfig.colors.surface}60`,
                      borderColor: themeConfig.colors.border,
                      color: themeConfig.colors.text,
                    }}
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={validateAndRoast}
                    className="px-6 py-3 rounded-lg font-semibold transition-all duration-300 inline-flex items-center gap-2 text-base"
                    style={{
                      background: `linear-gradient(to right, ${themeConfig.colors.primary}, ${themeConfig.colors.secondary})`,
                      color: themeConfig.colors.text,
                    }}
                  >
                    <Search className="w-5 h-5" />
                    Roast
                  </motion.button>
                </div>
                
                {addressError && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-center"
                    style={{ color: themeConfig.colors.accent }}
                  >
                    {addressError}
                  </motion.p>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center space-y-4">
              {/* Success Icon + Message in one line */}
              <div className="flex items-center justify-center gap-3">
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="flex-shrink-0"
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${themeConfig.colors.primary}20` }}>
                    <Wallet className="w-5 h-5" style={{ color: themeConfig.colors.primary }} />
                  </div>
                </motion.div>
                <h2 className="text-xl font-bold" style={{ color: themeConfig.colors.text }}>
                  Wallet Connected! 🎉
                </h2>
              </div>

              {/* Connected State */}
              <div className="space-y-4">
                
                {/* Compact wallet address with disconnect button */}
                <div 
                  className="rounded-lg p-4 text-left"
                  style={{ backgroundColor: `${themeConfig.colors.surface}40` }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm flex-1" style={{ color: themeConfig.colors.text }}>
                      <span style={{ color: themeConfig.colors.textSecondary }}>Your Wallet: </span>
                      <span className="font-mono break-all">{publicKey?.toString()}</span>
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => disconnect()}
                      className="flex-shrink-0 p-2 rounded-lg transition-all duration-300 hover:shadow-md"
                      style={{
                        backgroundColor: `${themeConfig.colors.accent}20`,
                        color: themeConfig.colors.accent,
                      }}
                      title="Disconnect Wallet"
                    >
                      <LogOut className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
                
                {/* Action Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onGetRoasted()}
                  className="w-full font-bold py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center justify-center gap-3"
                  style={{
                    background: `linear-gradient(to right, ${themeConfig.colors.primary}, ${themeConfig.colors.secondary})`,
                    color: themeConfig.colors.text,
                  }}
                >
                  <span>🔥</span>
                  Get Roasted Now
                  <span>🔥</span>
                </motion.button>

                {/* Alternative wallet input */}
                <div className="pt-3">
                  <p className="text-sm mb-3" style={{ color: themeConfig.colors.textSecondary }}>
                    Want to roast a different wallet?
                  </p>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={manualAddress}
                      onChange={handleAddressChange}
                      placeholder="Enter any wallet address..."
                      className="flex-1 px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:border-transparent transition-all text-sm"
                      style={{
                        backgroundColor: `${themeConfig.colors.surface}60`,
                        borderColor: themeConfig.colors.border,
                        color: themeConfig.colors.text,
                      }}
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={validateAndRoast}
                      className="px-5 py-3 rounded-lg font-semibold transition-all duration-300 inline-flex items-center gap-2 text-sm"
                      style={{
                        backgroundColor: `${themeConfig.colors.surface}80`,
                        borderColor: themeConfig.colors.border,
                        color: themeConfig.colors.text,
                      }}
                    >
                      <Search className="w-4 h-4" />
                      Roast
                    </motion.button>
                  </div>
                  
                  {addressError && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-center mt-2"
                      style={{ color: themeConfig.colors.accent }}
                    >
                      {addressError}
                    </motion.p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

