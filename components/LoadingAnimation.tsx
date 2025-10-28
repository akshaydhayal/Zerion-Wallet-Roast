"use client";

import { motion } from "framer-motion";
import { Flame } from "lucide-react";

export default function LoadingAnimation() {
  const loadingTexts = [
    "Analyzing your terrible decisions...",
    "Calculating losses...",
    "Reading transaction history...",
    "Preparing savage roasts...",
    "This might hurt...",
  ];

  return (
    <div className="max-w-xl mx-auto text-center py-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass rounded-2xl p-8"
      >
        {/* Animated Fire Icon */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex justify-center mb-6"
        >
          <Flame className="w-16 h-16 text-orange-500" />
        </motion.div>

        {/* Loading Text */}
        <motion.div
          key={Math.random()}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <h2 className="text-2xl font-bold text-white mb-4">
            Generating Your Roast...
          </h2>

          {/* Cycling loading messages */}
          {loadingTexts.map((text, index) => (
            <motion.p
              key={text}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.3 }}
              className="text-gray-300 text-base"
            >
              {text}
            </motion.p>
          ))}
        </motion.div>

        {/* Progress Bar */}
        <div className="mt-6 w-full bg-gray-700 rounded-full h-1.5 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-orange-500 to-pink-600"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </div>

        <p className="text-gray-400 text-xs mt-4">
          This will only take a moment...
        </p>
      </motion.div>
    </div>
  );
}

