"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, BarChart3, Activity, Target, Zap, Shield, Clock, Calendar, DollarSign } from "lucide-react";
import { WalletData } from "@/types";
import { useTheme } from "@/contexts/ThemeContext";

interface PortfolioInsightsProps {
  walletData: WalletData;
}

export default function PortfolioInsights({ walletData }: PortfolioInsightsProps) {
  const { themeConfig } = useTheme();
  const { chartData } = walletData;

  if (!chartData || chartData.points.length === 0) {
    return null;
  }

  const { points, totalChange, totalChangePercent, highestValue, lowestValue, volatility } = chartData;

  // Calculate additional insights
  const insights = calculatePortfolioInsights(points);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2" style={{ color: themeConfig.colors.text }}>Portfolio Insights</h2>
        <p className="text-sm" style={{ color: themeConfig.colors.textSecondary }}>Advanced analytics from your yearly performance</p>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Best Day */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl p-4 border text-center"
          style={{
            backgroundColor: `${themeConfig.colors.surface}60`,
            borderColor: themeConfig.colors.border,
          }}
        >
          <TrendingUp className="w-8 h-8 mx-auto mb-2" style={{ color: themeConfig.colors.primary }} />
          <p className="text-sm font-medium" style={{ color: themeConfig.colors.textSecondary }}>Best Day</p>
          <p className="text-xl font-bold" style={{ color: themeConfig.colors.primary }}>
            +{insights.bestDayGain.toFixed(1)}%
          </p>
          <p className="text-xs mt-1" style={{ color: themeConfig.colors.textSecondary }}>
            {insights.bestDayDate}
          </p>
        </motion.div>

        {/* Worst Day */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl p-4 border text-center"
          style={{
            backgroundColor: `${themeConfig.colors.surface}60`,
            borderColor: themeConfig.colors.border,
          }}
        >
          <TrendingDown className="w-8 h-8 mx-auto mb-2" style={{ color: themeConfig.colors.accent }} />
          <p className="text-sm font-medium" style={{ color: themeConfig.colors.textSecondary }}>Worst Day</p>
          <p className="text-xl font-bold" style={{ color: themeConfig.colors.accent }}>
            {insights.worstDayLoss.toFixed(1)}%
          </p>
          <p className="text-xs mt-1" style={{ color: themeConfig.colors.textSecondary }}>
            {insights.worstDayDate}
          </p>
        </motion.div>

        {/* Volatility Score */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl p-4 border text-center"
          style={{
            backgroundColor: `${themeConfig.colors.surface}60`,
            borderColor: themeConfig.colors.border,
          }}
        >
          <Zap className="w-8 h-8 mx-auto mb-2" style={{ color: themeConfig.colors.secondary }} />
          <p className="text-sm font-medium" style={{ color: themeConfig.colors.textSecondary }}>Volatility</p>
          <p className="text-xl font-bold" style={{ color: themeConfig.colors.text }}>
            {insights.volatilityScore}
          </p>
          <p className="text-xs mt-1" style={{ color: themeConfig.colors.textSecondary }}>
            {insights.volatilityDescription}
          </p>
        </motion.div>

        {/* Max Drawdown */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="rounded-xl p-4 border text-center"
          style={{
            backgroundColor: `${themeConfig.colors.surface}60`,
            borderColor: themeConfig.colors.border,
          }}
        >
          <Shield className="w-8 h-8 mx-auto mb-2" style={{ color: themeConfig.colors.accent }} />
          <p className="text-sm font-medium" style={{ color: themeConfig.colors.textSecondary }}>Max Drawdown</p>
          <p className="text-xl font-bold" style={{ color: themeConfig.colors.accent }}>
            {insights.maxDrawdown.toFixed(1)}%
          </p>
          <p className="text-xs mt-1" style={{ color: themeConfig.colors.textSecondary }}>
            Worst decline
          </p>
        </motion.div>
      </div>

      {/* Trend Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Growth Rate */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-2xl p-6 border"
          style={{
            backgroundColor: `${themeConfig.colors.surface}80`,
            borderColor: themeConfig.colors.border,
          }}
        >
          <div className="flex items-center gap-4 mb-4">
            <Target className="w-10 h-10" style={{ color: themeConfig.colors.primary }} />
            <div>
              <h3 className="text-xl font-bold" style={{ color: themeConfig.colors.text }}>Growth Rate</h3>
              <p className="text-sm" style={{ color: themeConfig.colors.textSecondary }}>Monthly average</p>
            </div>
          </div>
          <p className="text-3xl font-bold mb-2" style={{ color: insights.monthlyGrowthRate >= 0 ? themeConfig.colors.primary : themeConfig.colors.accent }}>
            {insights.monthlyGrowthRate >= 0 ? '+' : ''}{insights.monthlyGrowthRate.toFixed(2)}%
          </p>
          <p className="text-sm" style={{ color: themeConfig.colors.textSecondary }}>
            {insights.growthDescription}
          </p>
        </motion.div>

        {/* Consistency Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="rounded-2xl p-6 border"
          style={{
            backgroundColor: `${themeConfig.colors.surface}80`,
            borderColor: themeConfig.colors.border,
          }}
        >
          <div className="flex items-center gap-4 mb-4">
            <BarChart3 className="w-10 h-10" style={{ color: themeConfig.colors.secondary }} />
            <div>
              <h3 className="text-xl font-bold" style={{ color: themeConfig.colors.text }}>Consistency</h3>
              <p className="text-sm" style={{ color: themeConfig.colors.textSecondary }}>Stability score</p>
            </div>
          </div>
          <p className="text-3xl font-bold mb-2" style={{ color: themeConfig.colors.text }}>
            {insights.consistencyScore}/10
          </p>
          <p className="text-sm" style={{ color: themeConfig.colors.textSecondary }}>
            {insights.consistencyDescription}
          </p>
        </motion.div>
      </div>

      {/* Streak Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="rounded-2xl p-6 border"
        style={{
          backgroundColor: `${themeConfig.colors.surface}80`,
          borderColor: themeConfig.colors.border,
        }}
      >
        <h3 className="text-xl font-bold mb-4" style={{ color: themeConfig.colors.text }}>Streak Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <Clock className="w-8 h-8 mx-auto mb-2" style={{ color: themeConfig.colors.primary }} />
            <p className="text-sm font-medium" style={{ color: themeConfig.colors.textSecondary }}>Longest Win Streak</p>
            <p className="text-2xl font-bold" style={{ color: themeConfig.colors.primary }}>
              {insights.longestWinStreak} days
            </p>
          </div>
          <div className="text-center">
            <TrendingDown className="w-8 h-8 mx-auto mb-2" style={{ color: themeConfig.colors.accent }} />
            <p className="text-sm font-medium" style={{ color: themeConfig.colors.textSecondary }}>Longest Loss Streak</p>
            <p className="text-2xl font-bold" style={{ color: themeConfig.colors.accent }}>
              {insights.longestLossStreak} days
            </p>
          </div>
          <div className="text-center">
            <Calendar className="w-8 h-8 mx-auto mb-2" style={{ color: themeConfig.colors.secondary }} />
            <p className="text-sm font-medium" style={{ color: themeConfig.colors.textSecondary }}>Best Month</p>
            <p className="text-2xl font-bold" style={{ color: themeConfig.colors.text }}>
              {insights.bestMonth}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function calculatePortfolioInsights(points: any[]) {
  if (points.length < 2) {
    return {
      bestDayGain: 0,
      bestDayDate: 'N/A',
      worstDayLoss: 0,
      worstDayDate: 'N/A',
      volatilityScore: 'Low',
      volatilityDescription: 'Not enough data',
      maxDrawdown: 0,
      monthlyGrowthRate: 0,
      growthDescription: 'Not enough data',
      consistencyScore: 0,
      consistencyDescription: 'Not enough data',
      longestWinStreak: 0,
      longestLossStreak: 0,
      bestMonth: 'N/A'
    };
  }

  // Calculate daily changes
  const dailyChanges = [];
  for (let i = 1; i < points.length; i++) {
    const prevValue = points[i - 1].value;
    const currentValue = points[i].value;
    const change = ((currentValue - prevValue) / prevValue) * 100;
    dailyChanges.push({
      change,
      date: new Date(points[i].timestamp * 1000),
      value: currentValue
    });
  }

  // Best and worst days
  const bestDay = dailyChanges.reduce((max, day) => day.change > max.change ? day : max);
  const worstDay = dailyChanges.reduce((min, day) => day.change < min.change ? day : min);

  // Volatility analysis
  const changes = dailyChanges.map(d => d.change);
  const avgChange = changes.reduce((sum, change) => sum + change, 0) / changes.length;
  const variance = changes.reduce((sum, change) => sum + Math.pow(change - avgChange, 2), 0) / changes.length;
  const stdDev = Math.sqrt(variance);
  
  let volatilityScore = 'Low';
  let volatilityDescription = 'Stable portfolio';
  if (stdDev > 5) {
    volatilityScore = 'High';
    volatilityDescription = 'Very volatile';
  } else if (stdDev > 2) {
    volatilityScore = 'Medium';
    volatilityDescription = 'Moderately volatile';
  }

  // Max drawdown calculation
  let maxDrawdown = 0;
  let peak = points[0].value;
  for (let i = 1; i < points.length; i++) {
    if (points[i].value > peak) {
      peak = points[i].value;
    }
    const drawdown = ((peak - points[i].value) / peak) * 100;
    if (drawdown > maxDrawdown) {
      maxDrawdown = drawdown;
    }
  }

  // Monthly growth rate
  const firstValue = points[0].value;
  const lastValue = points[points.length - 1].value;
  const totalGrowth = ((lastValue - firstValue) / firstValue) * 100;
  const months = (points[points.length - 1].timestamp - points[0].timestamp) / (30 * 24 * 60 * 60); // Approximate months
  const monthlyGrowthRate = months > 0 ? totalGrowth / months : 0;

  let growthDescription = 'Steady growth';
  if (monthlyGrowthRate > 5) {
    growthDescription = 'Explosive growth!';
  } else if (monthlyGrowthRate > 1) {
    growthDescription = 'Strong growth';
  } else if (monthlyGrowthRate < -1) {
    growthDescription = 'Declining portfolio';
  }

  // Consistency score (based on how often positive vs negative days)
  const positiveDays = dailyChanges.filter(d => d.change > 0).length;
  const consistencyScore = Math.round((positiveDays / dailyChanges.length) * 10);
  
  let consistencyDescription = 'Very consistent';
  if (consistencyScore < 4) {
    consistencyDescription = 'Very inconsistent';
  } else if (consistencyScore < 6) {
    consistencyDescription = 'Somewhat inconsistent';
  } else if (consistencyScore < 8) {
    consistencyDescription = 'Fairly consistent';
  }

  // Streak analysis
  let currentStreak = 0;
  let longestWinStreak = 0;
  let longestLossStreak = 0;
  let isWinning = dailyChanges[0].change > 0;

  for (const day of dailyChanges) {
    if ((day.change > 0) === isWinning) {
      currentStreak++;
    } else {
      if (isWinning) {
        longestWinStreak = Math.max(longestWinStreak, currentStreak);
      } else {
        longestLossStreak = Math.max(longestLossStreak, currentStreak);
      }
      currentStreak = 1;
      isWinning = day.change > 0;
    }
  }
  
  // Update final streaks
  if (isWinning) {
    longestWinStreak = Math.max(longestWinStreak, currentStreak);
  } else {
    longestLossStreak = Math.max(longestLossStreak, currentStreak);
  }

  // Best month analysis
  const monthlyData: { [key: string]: number[] } = {};
  dailyChanges.forEach(day => {
    const monthKey = `${day.date.getFullYear()}-${day.date.getMonth()}`;
    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = [];
    }
    monthlyData[monthKey].push(day.change);
  });

  let bestMonth = 'N/A';
  let bestMonthGain = -Infinity;
  Object.entries(monthlyData).forEach(([month, changes]) => {
    const monthGain = changes.reduce((sum, change) => sum + change, 0);
    if (monthGain > bestMonthGain) {
      bestMonthGain = monthGain;
      const [year, monthNum] = month.split('-');
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      bestMonth = `${monthNames[parseInt(monthNum)]} ${year}`;
    }
  });

  return {
    bestDayGain: bestDay.change,
    bestDayDate: bestDay.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    worstDayLoss: worstDay.change,
    worstDayDate: worstDay.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    volatilityScore,
    volatilityDescription,
    maxDrawdown,
    monthlyGrowthRate,
    growthDescription,
    consistencyScore,
    consistencyDescription,
    longestWinStreak,
    longestLossStreak,
    bestMonth
  };
}
