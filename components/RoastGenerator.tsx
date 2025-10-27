"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Loader2 } from "lucide-react";
import { fetchWalletData } from "@/lib/zerionApi";
import { generateRoast } from "@/lib/roastGenerator";
import { RoastResult } from "@/types";
import RoastCard from "./RoastCard";
import LoadingAnimation from "./LoadingAnimation";

interface RoastGeneratorProps {
  walletAddress: string;
  onBack: () => void;
}

export default function RoastGenerator({ walletAddress, onBack }: RoastGeneratorProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [roast, setRoast] = useState<RoastResult | null>(null);

  useEffect(() => {
    async function loadRoast() {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch wallet data from Zerion API
        const walletData = await fetchWalletData(walletAddress);
        
        // Generate roast based on wallet data
        const roastResult = generateRoast(walletData);
        
        // Simulate loading for better UX (minimum 2 seconds)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        setRoast(roastResult);
      } catch (err) {
        console.error("Error generating roast:", err);
        setError("Failed to fetch wallet data. Please check your Zerion API key or try again later.");
      } finally {
        setLoading(false);
      }
    }

    loadRoast();
  }, [walletAddress]);

  return (
    <div className="min-h-screen py-8">
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onBack}
        className="flex items-center gap-2 text-white hover:text-purple-400 transition-colors mb-8 glass px-4 py-2 rounded-full"
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
            <LoadingAnimation />
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
            <div className="glass rounded-3xl p-8 text-center">
              <div className="text-6xl mb-4">😢</div>
              <h2 className="text-2xl font-bold text-white mb-4">Oops! Something went wrong</h2>
              <p className="text-gray-300 mb-6">{error}</p>
              <button
                onClick={onBack}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full transition-colors"
              >
                Go Back
              </button>
            </div>
          </motion.div>
        )}

        {!loading && !error && roast && (
          <motion.div
            key="roast"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <RoastCard roast={roast} walletAddress={walletAddress} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

