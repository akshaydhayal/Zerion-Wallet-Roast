"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Loader2 } from "lucide-react";
import { fetchWalletData } from "@/lib/zerionApi";
import { generateRoast } from "@/lib/roastGenerator";
import { RoastResult } from "@/types";
import RoastCard from "./RoastCard";
import WalletAnalysis from "./WalletAnalysis";
import LoadingAnimation from "./LoadingAnimation";
import { useTheme } from "@/contexts/ThemeContext";

interface RoastGeneratorProps {
  walletAddress: string;
  onBack: () => void;
}

export default function RoastGenerator({ walletAddress, onBack }: RoastGeneratorProps) {
  const { themeConfig } = useTheme();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [roast, setRoast] = useState<RoastResult | null>(null);
  const [walletData, setWalletData] = useState<any>(null);
  const [isAIRoast, setIsAIRoast] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<'roast' | 'analysis'>('roast');

  const generateNewRoast = async () => {
    try {
      setLoading(true);
      setError(null);
      setIsAIRoast(null);
      
      // Fetch wallet data from Zerion API
      const fetchedWalletData = await fetchWalletData(walletAddress);
      setWalletData(fetchedWalletData);
      
      // Check if AI is available before generating
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      const hasAI = apiKey && apiKey !== 'your_gemini_key_here';
      
      // Generate roast based on wallet data (now async with AI)
      const roastResult = await generateRoast(fetchedWalletData);
      
      // Simulate loading for better UX (minimum 2 seconds)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setRoast(roastResult);
      setIsAIRoast(hasAI);
    } catch (err: any) {
      console.error("Error generating roast:", err);
      
      // Show specific error messages based on the error type
      if (err.message.includes("API key")) {
        setError("Zerion API key is missing or invalid. Please check your .env.local file.");
      } else if (err.message.includes("authentication failed")) {
        setError("Zerion API authentication failed. Please check your API key.");
      } else if (err.message.includes("Wallet not found")) {
        setError("Wallet not found in Zerion database. Try a different wallet address.");
      } else if (err.message.includes("timeout")) {
        setError("Request timed out. Please try again.");
      } else if (err.message.includes("Network error")) {
        setError("Network error. Please check your internet connection.");
      } else {
        setError(`Failed to fetch wallet data: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateNewRoast();
  }, [walletAddress]);

  return (
    <div className="min-h-screen py-4">
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onBack}
        className="flex items-center gap-2 transition-colors mb-6 px-4 py-2 rounded-full backdrop-blur-sm border"
        style={{
          backgroundColor: `${themeConfig.colors.surface}40`,
          borderColor: themeConfig.colors.border,
          color: themeConfig.colors.text,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = themeConfig.colors.primary;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = themeConfig.colors.text;
        }}
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Home</span>
      </motion.button>

      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="text-center">
              <LoadingAnimation />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-3"
              >
                <p className="text-sm" style={{ color: themeConfig.colors.textSecondary }}>🤖 AI is analyzing your wallet...</p>
                <p className="text-xs mt-1" style={{ color: themeConfig.colors.textSecondary }}>Generating personalized roast...</p>
              </motion.div>
            </div>
          </motion.div>
        )}

        {error && (
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="max-w-2xl mx-auto"
          >
            <div 
              className="rounded-3xl p-8 text-center backdrop-blur-sm border"
              style={{
                backgroundColor: `${themeConfig.colors.surface}60`,
                borderColor: themeConfig.colors.border,
              }}
            >
              <div className="text-6xl mb-4">😢</div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: themeConfig.colors.text }}>Oops! Something went wrong</h2>
              <p className="mb-6" style={{ color: themeConfig.colors.textSecondary }}>{error}</p>
              <button
                onClick={onBack}
                className="font-bold py-3 px-6 rounded-full transition-colors"
                style={{
                  backgroundColor: themeConfig.colors.primary,
                  color: themeConfig.colors.text,
                }}
              >
                Go Back
              </button>
            </div>
          </motion.div>
        )}

        {!loading && !error && roast && walletData && (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Tab Navigation */}
            <div className="flex justify-center">
              <div
                className="inline-flex rounded-2xl p-1 backdrop-blur-sm border"
                style={{
                  backgroundColor: `${themeConfig.colors.surface}60`,
                  borderColor: themeConfig.colors.border,
                }}
              >
                <button
                  onClick={() => setActiveTab('roast')}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === 'roast' ? 'shadow-lg' : ''
                  }`}
                  style={{
                    backgroundColor: activeTab === 'roast' ? themeConfig.colors.primary : 'transparent',
                    color: activeTab === 'roast' ? themeConfig.colors.text : themeConfig.colors.textSecondary,
                  }}
                >
                  🔥 Roast
                </button>
                <button
                  onClick={() => setActiveTab('analysis')}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === 'analysis' ? 'shadow-lg' : ''
                  }`}
                  style={{
                    backgroundColor: activeTab === 'analysis' ? themeConfig.colors.primary : 'transparent',
                    color: activeTab === 'analysis' ? themeConfig.colors.text : themeConfig.colors.textSecondary,
                  }}
                >
                  📊 Analysis
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {activeTab === 'roast' && (
                <motion.div
                  key="roast"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <RoastCard roast={roast} walletAddress={walletAddress} onRoastAgain={generateNewRoast} isAIRoast={isAIRoast} />
                </motion.div>
              )}
              
              {activeTab === 'analysis' && (
                <motion.div
                  key="analysis"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <WalletAnalysis walletData={walletData} walletAddress={walletAddress} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

