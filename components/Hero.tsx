"use client";

import { motion } from "framer-motion";
import { Flame, TrendingDown, Laugh } from "lucide-react";

export default function Hero() {
  return (
    <div className="text-center py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-6"
      >
        {/* Animated Icon */}
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex justify-center"
        >
          <div className="relative">
            <Flame className="w-20 h-20 md:w-28 md:h-28 text-orange-500" />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute inset-0"
            >
              <Flame className="w-20 h-20 md:w-28 md:h-28 text-yellow-400 opacity-50" />
            </motion.div>
          </div>
        </motion.div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-2xl">
          Wallet <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-600">Roast</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-200 font-medium max-w-2xl mx-auto px-4">
          Get <span className="text-orange-400 font-bold">hilariously roasted</span> based on your onchain behavior
        </p>

        {/* Feature badges */}
        <div className="flex flex-wrap justify-center gap-4 pt-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-2 glass px-4 py-2 rounded-full"
          >
            <TrendingDown className="w-5 h-5 text-red-400" />
            <span className="text-sm text-white">PnL Analysis</span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-2 glass px-4 py-2 rounded-full"
          >
            <Laugh className="w-5 h-5 text-yellow-400" />
            <span className="text-sm text-white">Trading Behavior</span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-2 glass px-4 py-2 rounded-full"
          >
            <Flame className="w-5 h-5 text-orange-400" />
            <span className="text-sm text-white">Savage Roasts</span>
          </motion.div>
        </div>

        {/* Call to action hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-gray-300 text-sm md:text-base pt-4"
        >
          Connect your Solana wallet below and prepare to be <span className="text-orange-400 font-semibold">destroyed</span> 🔥
        </motion.p>
      </motion.div>
    </div>
  );
}

