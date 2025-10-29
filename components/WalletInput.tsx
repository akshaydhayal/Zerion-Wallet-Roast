"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Wallet, AlertCircle } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

interface WalletInputProps {
  onGetRoasted: (address: string) => void;
}

export default function WalletInput({ onGetRoasted }: WalletInputProps) {
  const { themeConfig } = useTheme();
  const [address, setAddress] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState("");

  const validateSolanaAddress = (addr: string): boolean => {
    // Basic Solana address validation (44 characters, base58)
    const base58Regex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
    return base58Regex.test(addr) && addr.length >= 32 && addr.length <= 44;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!address.trim()) {
      setError("Please enter a wallet address");
      return;
    }

    if (!validateSolanaAddress(address.trim())) {
      setError("Please enter a valid Solana wallet address");
      return;
    }

    setIsValidating(true);
    setError("");

    // Simulate validation delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setIsValidating(false);
    onGetRoasted(address.trim());
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
    if (error) setError("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="max-w-2xl mx-auto"
    >
      <div
        className="rounded-3xl p-8 backdrop-blur-sm border-2"
        style={{
          backgroundColor: `${themeConfig.colors.surface}80`,
          borderColor: themeConfig.colors.border,
        }}
      >
        {/* Header */}
        <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-5">
          <motion.div
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="inline-block mb-4"
          >
            <Wallet 
              className="w-16 h-16 mx-auto drop-shadow-lg" 
              style={{ color: themeConfig.colors.primary }}
            />
          </motion.div>
          
          <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: themeConfig.colors.text }}>
            Enter Your Wallet Address
          </h2>

          </div>
          <p className="text-sm md:text-base" style={{ color: themeConfig.colors.textSecondary }}>
            Paste your Solana wallet address to get roasted based on your on-chain activity
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <div className="relative">
              <Search 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" 
                style={{ color: themeConfig.colors.textSecondary }}
              />
              <input
                type="text"
                value={address}
                onChange={handleAddressChange}
                placeholder="Enter Solana wallet address (e.g., 7pQHLg...HsSXtK)"
                className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 text-lg font-mono transition-all duration-300 focus:outline-none focus:ring-4"
                style={{
                  backgroundColor: `${themeConfig.colors.background}60`,
                  borderColor: error ? themeConfig.colors.accent : themeConfig.colors.border,
                  color: themeConfig.colors.text,
                }}
                disabled={isValidating}
              />
            </div>
            
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 mt-2 text-sm"
                style={{ color: themeConfig.colors.accent }}
              >
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </motion.div>
            )}
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isValidating || !address.trim()}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 px-6 rounded-2xl font-bold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor: isValidating || !address.trim() ? themeConfig.colors.textSecondary : themeConfig.colors.primary,
              color: themeConfig.colors.text,
            }}
          >
            {isValidating ? (
              <div className="flex items-center justify-center gap-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
                />
                <span>Validating Address...</span>
              </div>
            ) : (
              "🔥 Get Roasted!"
            )}
          </motion.button>
        </form>

        {/* Info */}
        {/* <div className="mt-6 text-center">
          <p className="text-xs" style={{ color: themeConfig.colors.textSecondary }}>
            Your wallet address is only used to fetch public on-chain data. We don't store or track your information.
          </p>
        </div> */}
      </div>
    </motion.div>
  );
}
