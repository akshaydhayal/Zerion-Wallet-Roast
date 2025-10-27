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
    <div className="max-w-2xl mx-auto text-center py-16">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass rounded-3xl p-12"
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
          className="flex justify-center mb-8"
        >
          <Flame className="w-24 h-24 text-orange-500" />
        </motion.div>

        {/* Loading Text */}
        <motion.div
          key={Math.random()}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h2 className="text-3xl font-bold text-white mb-6">
            Generating Your Roast...
          </h2>

          {/* Cycling loading messages */}
          {loadingTexts.map((text, index) => (
            <motion.p
              key={text}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.3 }}
              className="text-gray-300 text-lg"
            >
              {text}
            </motion.p>
          ))}
        </motion.div>

        {/* Progress Bar */}
        <div className="mt-8 w-full bg-gray-700 rounded-full h-2 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-orange-500 to-pink-600"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </div>

        <p className="text-gray-400 text-sm mt-6">
          This will only take a moment...
        </p>
      </motion.div>
    </div>
  );
}

