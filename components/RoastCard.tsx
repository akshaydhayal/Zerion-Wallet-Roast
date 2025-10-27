"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Flame, Award, TrendingDown, Share2, Download } from "lucide-react";
import { RoastResult } from "@/types";
import { toPng } from "html-to-image";

interface RoastCardProps {
  roast: RoastResult;
  walletAddress: string;
}

export default function RoastCard({ roast, walletAddress }: RoastCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleShare = async () => {
    const text = `I just got roasted by my wallet! 🔥\n\n${roast.personality} ${roast.personalityEmoji}\nScore: ${roast.score}/100\n\nTry Wallet Roast and see what your bags say about you!`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Wallet Roast",
          text: text,
        });
      } catch (err) {
        console.log("Share cancelled or failed", err);
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(text);
      alert("Roast copied to clipboard!");
    }
  };

  const handleDownload = async () => {
    if (cardRef.current) {
      try {
        const dataUrl = await toPng(cardRef.current, {
          quality: 0.95,
          backgroundColor: "#1a1a1a",
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
    if (score < 30) return "text-red-500";
    if (score < 50) return "text-orange-500";
    if (score < 70) return "text-yellow-500";
    return "text-green-500";
  };

  const getScoreBackground = (score: number) => {
    if (score < 30) return "from-red-500/20 to-red-600/20";
    if (score < 50) return "from-orange-500/20 to-orange-600/20";
    if (score < 70) return "from-yellow-500/20 to-yellow-600/20";
    return "from-green-500/20 to-green-600/20";
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Main Roast Card - This is what gets downloaded */}
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-3xl p-8 md:p-12 mb-6"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block mb-4"
          >
            <Flame className="w-16 h-16 text-orange-500" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Your Wallet Roast
          </h1>
          <p className="text-gray-400 font-mono text-sm break-all">
            {walletAddress.slice(0, 8)}...{walletAddress.slice(-8)}
          </p>
        </div>

        {/* Main Roast */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-2 border-orange-500/30 rounded-2xl p-6 md:p-8 mb-6"
        >
          <div className="flex items-start gap-4">
            <Flame className="w-8 h-8 text-orange-500 flex-shrink-0 mt-1" />
            <p className="text-xl md:text-2xl text-white font-medium leading-relaxed">
              {roast.mainRoast}
            </p>
          </div>
        </motion.div>

        {/* Sub Roasts */}
        <div className="space-y-4 mb-8">
          {roast.subRoasts.map((subRoast, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-white/5 rounded-xl p-4 border border-white/10"
            >
              <p className="text-gray-200 text-lg">{subRoast}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {/* Personality */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-6 text-center border border-purple-500/30"
          >
            <Award className="w-8 h-8 text-purple-400 mx-auto mb-3" />
            <p className="text-gray-400 text-sm mb-2">Personality</p>
            <p className="text-2xl font-bold text-white">
              {roast.personality}
            </p>
            <p className="text-4xl mt-2">{roast.personalityEmoji}</p>
          </motion.div>

          {/* Score */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className={`bg-gradient-to-br ${getScoreBackground(roast.score)} rounded-xl p-6 text-center border ${getScoreColor(roast.score).replace('text-', 'border-')}/30`}
          >
            <TrendingDown className={`w-8 h-8 ${getScoreColor(roast.score)} mx-auto mb-3`} />
            <p className="text-gray-400 text-sm mb-2">Wallet Score</p>
            <p className={`text-5xl font-bold ${getScoreColor(roast.score)}`}>
              {roast.score}
            </p>
            <p className="text-gray-400 text-sm mt-1">/100</p>
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl p-6 text-center border border-blue-500/30"
          >
            <Award className="w-8 h-8 text-blue-400 mx-auto mb-3" />
            <p className="text-gray-400 text-sm mb-2">Achievement</p>
            <p className="text-xl font-bold text-white">
              {roast.badge}
            </p>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-400 text-sm pt-4 border-t border-white/10">
          <p>Powered by Zerion API • Built for Cypherpunk Hackathon</p>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex flex-wrap justify-center gap-4"
      >
        <button
          onClick={handleShare}
          className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-full transition-all shadow-lg hover:shadow-xl"
        >
          <Share2 className="w-5 h-5" />
          Share Roast
        </button>
        
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-full transition-all border border-white/20"
        >
          <Download className="w-5 h-5" />
          Download Image
        </button>
      </motion.div>

      {/* Pro Tip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center mt-8"
      >
        <p className="text-gray-400 text-sm">
          💡 <span className="text-purple-400 font-semibold">Pro tip:</span> Connect a different wallet to get roasted again!
        </p>
      </motion.div>
    </div>
  );
}

