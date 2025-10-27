"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { motion } from "framer-motion";
import { Wallet, Zap, Shield } from "lucide-react";

interface WalletConnectorProps {
  onGetRoasted: () => void;
}

export default function WalletConnector({ onGetRoasted }: WalletConnectorProps) {
  const { connected, publicKey } = useWallet();

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass rounded-3xl p-8 md:p-12 shadow-2xl"
      >
        <div className="text-center space-y-6">
          {/* Icon */}
          <motion.div
            animate={{ rotateY: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="inline-block"
          >
            <Wallet className="w-16 h-16 text-purple-400 mx-auto" />
          </motion.div>

          {/* Content */}
          {!connected ? (
            <>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Ready to Face the Truth?
              </h2>
              <p className="text-gray-300 text-lg">
                Connect your Solana wallet to get your personalized roast based on your trading history, portfolio, and PnL.
              </p>

              {/* Features */}
              <div className="grid md:grid-cols-3 gap-4 pt-4">
                <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5">
                  <Shield className="w-8 h-8 text-green-400" />
                  <p className="text-sm text-gray-300">100% Safe</p>
                </div>
                <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5">
                  <Zap className="w-8 h-8 text-yellow-400" />
                  <p className="text-sm text-gray-300">Instant Results</p>
                </div>
                <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5">
                  <Wallet className="w-8 h-8 text-purple-400" />
                  <p className="text-sm text-gray-300">All Wallets</p>
                </div>
              </div>

              {/* Connect Button */}
              <div className="pt-6">
                <WalletMultiButton className="!bg-gradient-to-r !from-purple-600 !to-pink-600 hover:!from-purple-700 hover:!to-pink-700 !rounded-full !px-8 !py-4 !text-lg !font-bold !transition-all !duration-300 !shadow-lg hover:!shadow-xl !mx-auto" />
              </div>
            </>
          ) : (
            <>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Wallet Connected! 🎉
              </h2>
              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-sm text-gray-400 mb-2">Your Wallet</p>
                <p className="text-white font-mono text-sm break-all">
                  {publicKey?.toString()}
                </p>
              </div>
              <p className="text-gray-300 text-lg">
                Time to see what your wallet says about you...
              </p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onGetRoasted}
                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-4 px-8 rounded-full text-xl shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-3"
              >
                <span>🔥</span>
                Get Roasted Now
                <span>🔥</span>
              </motion.button>

              <p className="text-sm text-gray-400">
                (No transactions will be made - just reading your wallet data)
              </p>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}

