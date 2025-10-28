"use client";

import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { motion } from "framer-motion";
import { Wallet, Zap, Shield, Search } from "lucide-react";
import { PublicKey } from "@solana/web3.js";

interface WalletConnectorProps {
  onGetRoasted: (address?: string) => void;
}

export default function WalletConnector({ onGetRoasted }: WalletConnectorProps) {
  const { connected, publicKey } = useWallet();
  const [manualAddress, setManualAddress] = useState("");
  const [addressError, setAddressError] = useState("");

  const validateAndRoast = () => {
    setAddressError("");
    
    if (!manualAddress.trim()) {
      setAddressError("Please enter a wallet address");
      return;
    }

    try {
      // Validate Solana address
      new PublicKey(manualAddress.trim());
      onGetRoasted(manualAddress.trim());
    } catch (error) {
      setAddressError("Invalid Solana wallet address");
    }
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setManualAddress(e.target.value);
    setAddressError("");
  };

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
                Connect your Solana wallet or enter any wallet address to get roasted!
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

              {/* OR Divider */}
              <div className="relative py-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-600"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-transparent px-4 text-gray-400 text-sm font-medium">
                    OR
                  </span>
                </div>
              </div>

              {/* Manual Address Input */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">
                  Enter Any Wallet Address
                </h3>
                <p className="text-gray-400 text-sm">
                  Roast your friend's wallet or check out a celebrity's bag 👀
                </p>
                
                <div className="space-y-3">
                  <input
                    type="text"
                    value={manualAddress}
                    onChange={handleAddressChange}
                    placeholder="Enter Solana wallet address..."
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                  
                  {addressError && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-sm"
                    >
                      {addressError}
                    </motion.p>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={validateAndRoast}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2"
                  >
                    <Search className="w-5 h-5" />
                    Roast This Wallet
                  </motion.button>
                </div>
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
                onClick={() => onGetRoasted()}
                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-4 px-8 rounded-full text-xl shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-3"
              >
                <span>🔥</span>
                Get Roasted Now
                <span>🔥</span>
              </motion.button>

              <p className="text-sm text-gray-400">
                (No transactions will be made - just reading your wallet data)
              </p>

              {/* OR Divider for connected state */}
              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-600"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-transparent px-4 text-gray-400 text-sm font-medium">
                    OR
                  </span>
                </div>
              </div>

              {/* Manual Address Input - Even when connected */}
              <div className="space-y-3">
                <p className="text-gray-400 text-sm">
                  Want to roast a different wallet?
                </p>
                
                <input
                  type="text"
                  value={manualAddress}
                  onChange={handleAddressChange}
                  placeholder="Enter any Solana wallet address..."
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm"
                />
                
                {addressError && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm"
                  >
                    {addressError}
                  </motion.p>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={validateAndRoast}
                  className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-300 inline-flex items-center justify-center gap-2 text-sm"
                >
                  <Search className="w-4 h-4" />
                  Roast This Wallet Instead
                </motion.button>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}

