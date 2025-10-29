"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, DollarSign, Coins, Shield, AlertCircle } from "lucide-react";
import { WalletData } from "@/types";
import { useTheme } from "@/contexts/ThemeContext";

interface WalletAnalysisProps {
  walletData: WalletData;
  walletAddress: string;
}

export default function WalletAnalysis({ walletData, walletAddress }: WalletAnalysisProps) {
  const { themeConfig } = useTheme();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatPercent = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  const getChangeColor = (value: number) => {
    if (value > 0) return themeConfig.colors.primary;
    if (value < 0) return themeConfig.colors.accent;
    return themeConfig.colors.textSecondary;
  };

  const getChangeIcon = (value: number) => {
    if (value > 0) return <TrendingUp className="w-4 h-4" />;
    if (value < 0) return <TrendingDown className="w-4 h-4" />;
    return <DollarSign className="w-4 h-4" />;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold mb-2"
            style={{ color: themeConfig.colors.text }}
          >
            Wallet Analysis
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-sm font-mono"
            style={{ color: themeConfig.colors.textSecondary }}
          >
            {walletAddress.slice(0, 8)}...{walletAddress.slice(-8)}
          </motion.p>
        </div>

        {/* Portfolio Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-3 gap-4"
        >
          {/* Total Value */}
          <div
            className="rounded-2xl p-6 border backdrop-blur-sm"
            style={{
              backgroundColor: `${themeConfig.colors.surface}80`,
              borderColor: themeConfig.colors.border,
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${themeConfig.colors.primary}20` }}
              >
                <DollarSign className="w-5 h-5" style={{ color: themeConfig.colors.primary }} />
              </div>
              <div>
                <p className="text-sm font-medium" style={{ color: themeConfig.colors.textSecondary }}>
                  Total Portfolio Value
                </p>
                <p className="text-2xl font-bold" style={{ color: themeConfig.colors.text }}>
                  {formatCurrency(walletData.portfolioValue)}
                </p>
              </div>
            </div>
          </div>

          {/* Distribution */}
          <div
            className="rounded-2xl p-6 border backdrop-blur-sm"
            style={{
              backgroundColor: `${themeConfig.colors.surface}80`,
              borderColor: themeConfig.colors.border,
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${themeConfig.colors.secondary}20` }}
              >
                <Shield className="w-5 h-5" style={{ color: themeConfig.colors.secondary }} />
              </div>
              <div>
                <p className="text-sm font-medium" style={{ color: themeConfig.colors.textSecondary }}>
                  Distribution
                </p>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span style={{ color: themeConfig.colors.text }}>Wallet</span>
                    <span style={{ color: themeConfig.colors.text }}>{formatCurrency(walletData.distribution.wallet)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: themeConfig.colors.text }}>Staked</span>
                    <span style={{ color: themeConfig.colors.text }}>{formatCurrency(walletData.distribution.staked)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: themeConfig.colors.text }}>Deposited</span>
                    <span style={{ color: themeConfig.colors.text }}>{formatCurrency(walletData.distribution.deposited)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trading Frequency */}
          <div
            className="rounded-2xl p-6 border backdrop-blur-sm"
            style={{
              backgroundColor: `${themeConfig.colors.surface}80`,
              borderColor: themeConfig.colors.border,
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${themeConfig.colors.accent}20` }}
              >
                <Coins className="w-5 h-5" style={{ color: themeConfig.colors.accent }} />
              </div>
              <div>
                <p className="text-sm font-medium" style={{ color: themeConfig.colors.textSecondary }}>
                  Trading Style
                </p>
                <p className="text-lg font-bold capitalize" style={{ color: themeConfig.colors.text }}>
                  {walletData.tradingFrequency}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Top Holdings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          <h3 className="text-xl font-bold" style={{ color: themeConfig.colors.text }}>
            Top Holdings
          </h3>
          
          <div
            className="rounded-2xl border backdrop-blur-sm overflow-hidden"
            style={{
              backgroundColor: `${themeConfig.colors.surface}80`,
              borderColor: themeConfig.colors.border,
            }}
          >
            {walletData.topHoldings.length > 0 ? (
              <div className="divide-y" style={{ borderColor: themeConfig.colors.border }}>
                {walletData.topHoldings.map((holding, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="p-4 flex items-center justify-between hover:bg-opacity-50 transition-colors"
                    style={{ backgroundColor: `${themeConfig.colors.surface}20` }}
                  >
                    <div className="flex items-center gap-3">
                      {holding.icon ? (
                        <img
                          src={holding.icon}
                          alt={holding.symbol}
                          className="w-8 h-8 rounded-full"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      ) : (
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                          style={{ backgroundColor: `${themeConfig.colors.primary}20` }}
                        >
                          {holding.symbol.charAt(0)}
                        </div>
                      )}
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold" style={{ color: themeConfig.colors.text }}>
                            {holding.name}
                          </p>
                          <p className="text-sm" style={{ color: themeConfig.colors.textSecondary }}>
                            ({holding.symbol})
                          </p>
                          {holding.verified && (
                            <div
                              className="w-4 h-4 rounded-full flex items-center justify-center"
                              style={{ backgroundColor: `${themeConfig.colors.primary}20` }}
                            >
                              <Shield className="w-3 h-3" style={{ color: themeConfig.colors.primary }} />
                            </div>
                          )}
                        </div>
                        <p className="text-sm" style={{ color: themeConfig.colors.textSecondary }}>
                          {holding.quantity.toFixed(4)} tokens
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-semibold" style={{ color: themeConfig.colors.text }}>
                        {formatCurrency(holding.value)}
                      </p>
                      <div className="flex items-center gap-1">
                        {getChangeIcon(holding.change24h)}
                        <span
                          className="text-sm font-medium"
                          style={{ color: getChangeColor(holding.change24h) }}
                        >
                          {formatPercent(holding.change24h)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <AlertCircle className="w-12 h-12 mx-auto mb-4" style={{ color: themeConfig.colors.textSecondary }} />
                <p style={{ color: themeConfig.colors.textSecondary }}>
                  No holdings found for this wallet
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* All Positions Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="space-y-4"
        >
          <h3 className="text-xl font-bold" style={{ color: themeConfig.colors.text }}>
            All Positions ({walletData.positions.length})
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {walletData.positions.slice(0, 6).map((position, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="rounded-xl p-4 border backdrop-blur-sm"
                style={{
                  backgroundColor: `${themeConfig.colors.surface}60`,
                  borderColor: themeConfig.colors.border,
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  {position.icon ? (
                    <img
                      src={position.icon}
                      alt={position.symbol}
                      className="w-6 h-6 rounded-full"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{ backgroundColor: `${themeConfig.colors.primary}20` }}
                    >
                      {position.symbol.charAt(0)}
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="font-semibold text-sm" style={{ color: themeConfig.colors.text }}>
                      {position.symbol}
                    </p>
                    <p className="text-xs" style={{ color: themeConfig.colors.textSecondary }}>
                      {position.name}
                    </p>
                  </div>
                  {position.verified && (
                    <Shield className="w-4 h-4" style={{ color: themeConfig.colors.primary }} />
                  )}
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span style={{ color: themeConfig.colors.textSecondary }}>Value:</span>
                    <span className="font-semibold" style={{ color: themeConfig.colors.text }}>
                      {formatCurrency(position.value)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: themeConfig.colors.textSecondary }}>24h:</span>
                    <span
                      className="font-medium"
                      style={{ color: getChangeColor(position.change24h) }}
                    >
                      {formatPercent(position.change24h)}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {walletData.positions.length > 6 && (
            <p className="text-center text-sm" style={{ color: themeConfig.colors.textSecondary }}>
              And {walletData.positions.length - 6} more positions...
            </p>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
