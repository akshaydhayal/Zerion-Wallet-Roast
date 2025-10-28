"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Flame, Award, TrendingDown, Download, Sparkles, Zap, Crown, RotateCcw } from "lucide-react";
import { RoastResult } from "@/types";
import { toPng } from "html-to-image";
import { useTheme } from "@/contexts/ThemeContext";

interface RoastCardProps {
  roast: RoastResult;
  walletAddress: string;
  onRoastAgain?: () => void;
  isAIRoast?: boolean;
}

export default function RoastCard({ roast, walletAddress, onRoastAgain, isAIRoast }: RoastCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { themeConfig } = useTheme();

  const handleShare = async () => {
    const text = `🔥 My wallet just roasted me! 

${roast.personality} ${roast.personalityEmoji}
Score: ${roast.score}/100

"${roast.mainRoast}"

Try Wallet Roast and see what your bags say about you! 🚀`;
    
    // Create Twitter share URL
    const twitterText = encodeURIComponent(text);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${twitterText}&hashtags=WalletRoast,Crypto,Blockchain,Solana,DeFi`;
    
    // Open Twitter in a new window
    window.open(twitterUrl, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');
  };

  const handleDownload = async () => {
    if (cardRef.current) {
      try {
        const dataUrl = await toPng(cardRef.current, {
          quality: 0.95,
          backgroundColor: themeConfig.colors.background,
          pixelRatio: 2,
        });
        
        const link = document.createElement("a");
        link.download = "my-wallet-roast.png";
        link.href = dataUrl;
        link.click();
      } catch (err) {
        console.error("Failed to download image:", err);
        alert("Failed to download image. Please try again.");
      }
    }
  };

  const getScoreColor = (score: number) => {
    if (score < 30) return themeConfig.colors.accent;
    if (score < 50) return "#f97316";
    if (score < 70) return "#eab308";
    return "#22c55e";
  };

  const getScoreEmoji = (score: number) => {
    if (score < 30) return "💀";
    if (score < 50) return "😬";
    if (score < 70) return "😐";
    if (score < 90) return "😎";
    return "🚀";
  };

  return (
    <div className="max-w-5xl mx-auto px-4">
      {/* Main Roast Card - This is what gets downloaded */}
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative overflow-hidden rounded-3xl shadow-2xl backdrop-blur-sm border"
        style={{
          backgroundColor: `${themeConfig.colors.surface}80`,
          borderColor: themeConfig.colors.border,
        }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ 
              x: [0, 100, 0],
              y: [0, -50, 0],
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-10 right-10 w-32 h-32 rounded-full opacity-10"
            style={{ backgroundColor: themeConfig.colors.primary }}
          />
          <motion.div
            animate={{ 
              x: [0, -80, 0],
              y: [0, 60, 0],
              rotate: [360, 180, 0]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-10 left-10 w-24 h-24 rounded-full opacity-10"
            style={{ backgroundColor: themeConfig.colors.secondary }}
          />
        </div>

        {/* Header Section */}
        <div className="relative text-center py-6 px-6">
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block mb-4"
          >
            <div className="relative">
              <Flame 
                className="w-16 h-16 mx-auto drop-shadow-lg" 
                style={{ color: themeConfig.colors.accent }}
              />
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0"
              >
                <Sparkles 
                  className="w-16 h-16 mx-auto" 
                  style={{ color: themeConfig.colors.secondary }}
                />
              </motion.div>
            </div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-4xl font-bold mb-3"
            style={{ color: themeConfig.colors.text }}
          >
            Wallet <span 
              className="text-transparent bg-clip-text"
              style={{ 
                backgroundImage: `linear-gradient(to right, ${themeConfig.colors.primary}, ${themeConfig.colors.secondary})` 
              }}
            >
              Roast
            </span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm border"
            style={{
              backgroundColor: `${themeConfig.colors.surface}60`,
              borderColor: themeConfig.colors.border,
            }}
          >
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: themeConfig.colors.accent }} />
            <p className="font-mono text-sm" style={{ color: themeConfig.colors.textSecondary }}>
              {walletAddress.slice(0, 8)}...{walletAddress.slice(-8)}
            </p>
            {isAIRoast !== null && (
              <div 
                className="px-2 py-1 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: isAIRoast ? `${themeConfig.colors.primary}20` : `${themeConfig.colors.accent}20`,
                  color: isAIRoast ? themeConfig.colors.primary : themeConfig.colors.accent,
                }}
              >
                {isAIRoast ? '🤖 AI' : '📝 Static'}
              </div>
            )}
          </motion.div>
        </div>

        {/* Main Roast Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="mx-6 mb-6"
        >
          <div 
            className="relative rounded-2xl p-6 border-2"
            style={{
              background: `linear-gradient(135deg, ${themeConfig.colors.primary}20, ${themeConfig.colors.secondary}20)`,
              borderColor: themeConfig.colors.primary,
            }}
          >
            {/* Decorative elements */}
            <div className="absolute top-3 right-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Zap className="w-5 h-5" style={{ color: themeConfig.colors.accent }} />
              </motion.div>
            </div>
            
            <div className="flex items-start gap-3">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex-shrink-0"
              >
                <Flame className="w-8 h-8" style={{ color: themeConfig.colors.accent }} />
              </motion.div>
              <div className="flex-1">
                <p className="text-lg md:text-xl font-bold leading-relaxed" style={{ color: themeConfig.colors.text }}>
                  {roast.mainRoast}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Sub Roasts */}
        <div className="px-6 mb-6 space-y-3">
          {roast.subRoasts.map((subRoast, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="relative"
            >
              <div 
                className="rounded-xl p-4 border backdrop-blur-sm"
                style={{
                  backgroundColor: `${themeConfig.colors.surface}40`,
                  borderColor: themeConfig.colors.border,
                }}
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="flex-shrink-0"
                  >
                    <div 
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: themeConfig.colors.accent }}
                    />
                  </motion.div>
                  <p className="text-base font-medium" style={{ color: themeConfig.colors.text }}>
                    {subRoast}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="px-6 mb-6">
          <div className="grid md:grid-cols-3 gap-4">
            {/* Personality */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="relative group"
            >
              <div 
                className="rounded-xl p-4 text-center border backdrop-blur-sm hover:scale-105 transition-transform duration-300"
                style={{
                  background: `linear-gradient(135deg, ${themeConfig.colors.primary}20, ${themeConfig.colors.secondary}20)`,
                  borderColor: themeConfig.colors.primary,
                }}
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="mb-3"
                >
                  <Crown className="w-8 h-8 mx-auto" style={{ color: themeConfig.colors.primary }} />
                </motion.div>
                <p className="text-xs font-medium mb-1" style={{ color: themeConfig.colors.textSecondary }}>
                  Personality
                </p>
                <p className="text-lg font-bold mb-1" style={{ color: themeConfig.colors.text }}>
                  {roast.personality}
                </p>
                <p className="text-2xl">{roast.personalityEmoji}</p>
              </div>
            </motion.div>

            {/* Score */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="relative group"
            >
              <div 
                className="rounded-xl p-4 text-center border backdrop-blur-sm hover:scale-105 transition-transform duration-300"
                style={{
                  background: `linear-gradient(135deg, ${getScoreColor(roast.score)}20, ${getScoreColor(roast.score)}10)`,
                  borderColor: getScoreColor(roast.score),
                }}
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mb-3"
                >
                  <TrendingDown className="w-8 h-8 mx-auto" style={{ color: getScoreColor(roast.score) }} />
                </motion.div>
                <p className="text-xs font-medium mb-1" style={{ color: themeConfig.colors.textSecondary }}>
                  Wallet Score
                </p>
                <div className="flex items-center justify-center gap-2 mb-1">
                  <p className="text-3xl font-bold" style={{ color: getScoreColor(roast.score) }}>
                    {roast.score}
                  </p>
                  <span className="text-lg">{getScoreEmoji(roast.score)}</span>
                </div>
                <p className="text-xs" style={{ color: themeConfig.colors.textSecondary }}>/100</p>
              </div>
            </motion.div>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="relative group"
            >
              <div 
                className="rounded-xl p-4 text-center border backdrop-blur-sm hover:scale-105 transition-transform duration-300"
                style={{
                  background: `linear-gradient(135deg, ${themeConfig.colors.secondary}20, ${themeConfig.colors.accent}20)`,
                  borderColor: themeConfig.colors.secondary,
                }}
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="mb-3"
                >
                  <Award className="w-8 h-8 mx-auto" style={{ color: themeConfig.colors.secondary }} />
                </motion.div>
                <p className="text-xs font-medium mb-1" style={{ color: themeConfig.colors.textSecondary }}>
                  Achievement
                </p>
                <p className="text-base font-bold" style={{ color: themeConfig.colors.text }}>
                  {roast.badge}
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <div 
          className="text-center py-4 px-6 border-t"
          style={{ 
            borderColor: themeConfig.colors.border,
            backgroundColor: `${themeConfig.colors.surface}40`
          }}
        >
          <p className="text-xs" style={{ color: themeConfig.colors.textSecondary }}>
            Powered by <span className="font-semibold" style={{ color: themeConfig.colors.primary }}>Zerion API</span> • 
            Built for <span className="font-semibold" style={{ color: themeConfig.colors.secondary }}>Cypherpunk Hackathon</span>
          </p>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className="flex flex-wrap justify-center gap-3 mt-6"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleShare}
          className="flex items-center gap-2 font-bold py-3 px-6 rounded-full transition-all shadow-lg hover:shadow-xl"
          style={{
            background: `linear-gradient(to right, #1DA1F2, #0d8bd9)`,
            color: "white",
          }}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
          </svg>
          Share on Twitter
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDownload}
          className="flex items-center gap-2 font-bold py-3 px-6 rounded-full transition-all border backdrop-blur-sm"
          style={{
            backgroundColor: `${themeConfig.colors.surface}60`,
            borderColor: themeConfig.colors.border,
            color: themeConfig.colors.text,
          }}
        >
          <Download className="w-5 h-5" />
          Download Image
        </motion.button>
        
        {onRoastAgain && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRoastAgain}
            className="flex items-center gap-2 font-bold py-3 px-6 rounded-full transition-all border backdrop-blur-sm"
            style={{
              backgroundColor: `${themeConfig.colors.accent}20`,
              borderColor: themeConfig.colors.accent,
              color: themeConfig.colors.accent,
            }}
          >
            <RotateCcw className="w-5 h-5" />
            Roast Again
          </motion.button>
        )}
      </motion.div>

      {/* Pro Tip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="text-center mt-6"
      >
        <div 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm border"
          style={{
            backgroundColor: `${themeConfig.colors.surface}40`,
            borderColor: themeConfig.colors.border,
          }}
        >
          <span className="text-lg">💡</span>
          <p className="text-sm" style={{ color: themeConfig.colors.textSecondary }}>
            <span className="font-semibold" style={{ color: themeConfig.colors.accent }}>Pro tip:</span> Connect a different wallet to get roasted again!
          </p>
        </div>
      </motion.div>
    </div>
  );
}

