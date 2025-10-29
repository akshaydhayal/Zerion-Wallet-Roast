"use client";

import { motion } from "framer-motion";
import { 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  BarChart3,
  Target,
  Zap
} from "lucide-react";
import { WalletData } from "@/types";
import { useTheme } from "@/contexts/ThemeContext";

interface TransactionInsightsProps {
  walletData: WalletData;
}

export default function TransactionInsights({ walletData }: TransactionInsightsProps) {
  const { themeConfig } = useTheme();
  const { transactionInsights } = walletData;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'high': return themeConfig.colors.accent;
      case 'medium': return '#f97316';
      case 'low': return themeConfig.colors.primary;
      default: return themeConfig.colors.textSecondary;
    }
  };

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case 'high': return <AlertTriangle className="w-4 h-4" />;
      case 'medium': return <Target className="w-4 h-4" />;
      case 'low': return <CheckCircle className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const successRate = transactionInsights.totalTransactions > 0 
    ? (transactionInsights.successfulTransactions / transactionInsights.totalTransactions) * 100 
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h3 className="text-2xl font-bold mb-2" style={{ color: themeConfig.colors.text }}>
          Transaction Insights
        </h3>
        <p className="text-sm" style={{ color: themeConfig.colors.textSecondary }}>
          Analysis of your wallet's transaction patterns and behavior
        </p>
      </motion.div>

      {/* Transaction Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {/* Total Transactions */}
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
              <Activity className="w-5 h-5" style={{ color: themeConfig.colors.primary }} />
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: themeConfig.colors.textSecondary }}>
                Total Transactions
              </p>
              <p className="text-2xl font-bold" style={{ color: themeConfig.colors.text }}>
                {transactionInsights.totalTransactions.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Success Rate */}
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
              <CheckCircle className="w-5 h-5" style={{ color: themeConfig.colors.primary }} />
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: themeConfig.colors.textSecondary }}>
                Success Rate
              </p>
              <p className="text-2xl font-bold" style={{ color: themeConfig.colors.text }}>
                {successRate.toFixed(1)}%
              </p>
            </div>
          </div>
        </div>

        {/* Total Fees */}
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
              <DollarSign className="w-5 h-5" style={{ color: themeConfig.colors.secondary }} />
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: themeConfig.colors.textSecondary }}>
                Total Fees Paid
              </p>
              <p className="text-2xl font-bold" style={{ color: themeConfig.colors.text }}>
                {formatCurrency(transactionInsights.totalFeesPaid)}
              </p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
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
              <Zap className="w-5 h-5" style={{ color: themeConfig.colors.accent }} />
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: themeConfig.colors.textSecondary }}>
                Last 7 Days
              </p>
              <p className="text-2xl font-bold" style={{ color: themeConfig.colors.text }}>
                {transactionInsights.recentActivity}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Trading Patterns */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid md:grid-cols-2 gap-6"
      >
        {/* Risk Level */}
        <div
          className="rounded-2xl p-6 border backdrop-blur-sm"
          style={{
            backgroundColor: `${themeConfig.colors.surface}80`,
            borderColor: themeConfig.colors.border,
          }}
        >
          <h4 className="text-lg font-semibold mb-4" style={{ color: themeConfig.colors.text }}>
            Risk Assessment
          </h4>
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${getRiskColor(transactionInsights.tradingPatterns.riskLevel)}20` }}
            >
              {getRiskIcon(transactionInsights.tradingPatterns.riskLevel)}
            </div>
            <div>
              <p className="text-sm" style={{ color: themeConfig.colors.textSecondary }}>
                Risk Level
              </p>
              <p 
                className="text-xl font-bold capitalize"
                style={{ color: getRiskColor(transactionInsights.tradingPatterns.riskLevel) }}
              >
                {transactionInsights.tradingPatterns.riskLevel}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm" style={{ color: themeConfig.colors.textSecondary }}>
              Failed transactions: {transactionInsights.failedTransactions} / {transactionInsights.totalTransactions}
            </p>
          </div>
        </div>

        {/* Trading Activity */}
        <div
          className="rounded-2xl p-6 border backdrop-blur-sm"
          style={{
            backgroundColor: `${themeConfig.colors.surface}80`,
            borderColor: themeConfig.colors.border,
          }}
        >
          <h4 className="text-lg font-semibold mb-4" style={{ color: themeConfig.colors.text }}>
            Trading Activity
          </h4>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${themeConfig.colors.primary}20` }}
              >
                {transactionInsights.tradingPatterns.isActiveTrader ? 
                  <TrendingUp className="w-4 h-4" style={{ color: themeConfig.colors.primary }} /> :
                  <TrendingDown className="w-4 h-4" style={{ color: themeConfig.colors.textSecondary }} />
                }
              </div>
              <div>
                <p className="text-sm font-medium" style={{ color: themeConfig.colors.text }}>
                  {transactionInsights.tradingPatterns.isActiveTrader ? 'Active Trader' : 'Casual User'}
                </p>
                <p className="text-xs" style={{ color: themeConfig.colors.textSecondary }}>
                  {transactionInsights.recentActivity} transactions in last 7 days
                </p>
              </div>
            </div>
            <div className="mt-3">
              <p className="text-sm" style={{ color: themeConfig.colors.textSecondary }}>
                Most used operation: <span className="font-semibold" style={{ color: themeConfig.colors.text }}>
                  {transactionInsights.mostUsedOperationType}
                </span>
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Top Tokens Traded */}
      {transactionInsights.topTokensTraded.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-4"
        >
          <h4 className="text-lg font-semibold" style={{ color: themeConfig.colors.text }}>
            Most Traded Tokens
          </h4>
          <div
            className="rounded-2xl border backdrop-blur-sm overflow-hidden"
            style={{
              backgroundColor: `${themeConfig.colors.surface}80`,
              borderColor: themeConfig.colors.border,
            }}
          >
            <div className="divide-y" style={{ borderColor: themeConfig.colors.border }}>
              {transactionInsights.topTokensTraded.map((token, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="p-4 flex items-center justify-between hover:bg-opacity-50 transition-colors"
                  style={{ backgroundColor: `${themeConfig.colors.surface}20` }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                      style={{ backgroundColor: `${themeConfig.colors.primary}20` }}
                    >
                      {token.symbol.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold" style={{ color: themeConfig.colors.text }}>
                        {token.name}
                      </p>
                      <p className="text-sm" style={{ color: themeConfig.colors.textSecondary }}>
                        ({token.symbol})
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-semibold" style={{ color: themeConfig.colors.text }}>
                      {token.count} trades
                    </p>
                    <p className="text-sm" style={{ color: themeConfig.colors.textSecondary }}>
                      {formatCurrency(token.totalValue)} total
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Operation Types Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="space-y-4"
      >
        <h4 className="text-lg font-semibold" style={{ color: themeConfig.colors.text }}>
          Operation Types
        </h4>
        <div className="flex flex-wrap gap-2">
          {transactionInsights.tradingPatterns.preferredOperationTypes.map((type, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 + index * 0.1 }}
              className="px-3 py-2 rounded-full text-sm font-medium"
              style={{
                backgroundColor: `${themeConfig.colors.primary}20`,
                color: themeConfig.colors.primary,
                border: `1px solid ${themeConfig.colors.primary}40`,
              }}
            >
              {type}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
