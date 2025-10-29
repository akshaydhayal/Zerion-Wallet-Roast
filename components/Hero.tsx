"use client";

import { motion } from "framer-motion";
import { Flame, TrendingDown, Laugh } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export default function Hero() {
  const { themeConfig } = useTheme();

  return (
    <div className="text-center py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-4"
      >
        {/* Animated Icon */}
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex justify-center"
        >
          <div className="relative">
            <Flame 
              className="w-20 h-20 md:w-28 md:h-28" 
              style={{ color: themeConfig.colors.accent }}
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute inset-0"
            >
              <Flame 
                className="w-20 h-20 md:w-28 md:h-28 opacity-50" 
                style={{ color: themeConfig.colors.secondary }}
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold drop-shadow-2xl" style={{ color: themeConfig.colors.text }}>
          Wallet <span 
            className="text-transparent bg-clip-text"
            style={{ 
              backgroundImage: `linear-gradient(to right, ${themeConfig.colors.primary}, ${themeConfig.colors.secondary})` 
            }}
          >
            Roast
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl font-medium max-w-2xl mx-auto px-4" style={{ color: themeConfig.colors.textSecondary }}>
          Get <span className="font-bold" style={{ color: themeConfig.colors.accent }}>hilariously roasted</span> based on your onchain behavior
        </p>

        {/* Feature badges */}
        <div className="flex flex-wrap justify-center gap-3 pt-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm border"
            style={{
              backgroundColor: `${themeConfig.colors.surface}40`,
              borderColor: themeConfig.colors.border,
            }}
          >
            <TrendingDown className="w-5 h-5" style={{ color: themeConfig.colors.accent }} />
            <span className="text-sm" style={{ color: themeConfig.colors.text }}>PnL Analysis</span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm border"
            style={{
              backgroundColor: `${themeConfig.colors.surface}40`,
              borderColor: themeConfig.colors.border,
            }}
          >
            <Laugh className="w-5 h-5" style={{ color: themeConfig.colors.secondary }} />
            <span className="text-sm" style={{ color: themeConfig.colors.text }}>Trading Behavior</span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm border"
            style={{
              backgroundColor: `${themeConfig.colors.surface}40`,
              borderColor: themeConfig.colors.border,
            }}
          >
            <Flame className="w-5 h-5" style={{ color: themeConfig.colors.primary }} />
            <span className="text-sm" style={{ color: themeConfig.colors.text }}>Savage Roasts</span>
          </motion.div>
        </div>

        {/* Call to action hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-sm md:text-base pt-2"
          style={{ color: themeConfig.colors.textSecondary }}
        >
          Enter your Solana wallet address below and prepare to be <span className="font-semibold" style={{ color: themeConfig.colors.accent }}>destroyed</span> 🔥
        </motion.p>
      </motion.div>
    </div>
  );
}

