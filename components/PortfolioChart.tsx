"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, BarChart3, Activity } from "lucide-react";
import { WalletData } from "@/types";
import { useTheme } from "@/contexts/ThemeContext";
import { useState } from "react";

interface PortfolioChartProps {
  walletData: WalletData;
}

export default function PortfolioChart({ walletData }: PortfolioChartProps) {
  const { themeConfig } = useTheme();
  const { chartData } = walletData;
  const [hoveredPoint, setHoveredPoint] = useState<{ x: number; y: number; point: any } | null>(null);

  if (!chartData || chartData.points.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 text-center border"
        style={{
          backgroundColor: `${themeConfig.colors.surface}80`,
          borderColor: themeConfig.colors.border,
          color: themeConfig.colors.textSecondary,
        }}
      >
        <BarChart3 className="w-10 h-10 mx-auto mb-3" style={{ color: themeConfig.colors.accent }} />
        <h3 className="text-xl font-bold mb-2" style={{ color: themeConfig.colors.text }}>No Chart Data Available</h3>
        <p>Chart data is not available for this wallet.</p>
      </motion.div>
    );
  }

  const { points, totalChange, totalChangePercent, highestValue, lowestValue, volatility } = chartData;
  
  // Find the highest and lowest points for visualization
  const maxValue = Math.max(...points.map(p => p.value));
  const minValue = Math.min(...points.map(p => p.value));
  
  // Add padding to ensure all values are visible and round to nice numbers
  const paddingPercent = 0.05; // 5% padding on top and bottom
  const valueRange = maxValue - minValue;
  const paddedMin = Math.max(0, minValue - (valueRange * paddingPercent));
  const paddedMax = maxValue + (valueRange * paddingPercent);
  
  // Round to nice numbers for Y-axis
  const niceRange = paddedMax - paddedMin;
  const niceStep = niceRange / 5; // We want 6 labels (0-5)
  
  // Round the step to a nice number
  const magnitude = Math.pow(10, Math.floor(Math.log10(niceStep)));
  const normalizedStep = niceStep / magnitude;
  let niceNormalizedStep;
  
  if (normalizedStep <= 1) niceNormalizedStep = 1;
  else if (normalizedStep <= 2) niceNormalizedStep = 2;
  else if (normalizedStep <= 5) niceNormalizedStep = 5;
  else niceNormalizedStep = 10;
  
  const roundedStep = niceNormalizedStep * magnitude;
  const roundedMin = Math.floor(paddedMin / roundedStep) * roundedStep;
  const roundedMax = Math.ceil(paddedMax / roundedStep) * roundedStep;
  const finalRange = roundedMax - roundedMin;
  
  // Create SVG path for the chart with proper spacing for axis labels
  const width = 1200; // Increased base width for monthly labels
  const height = 500; // Increased height for better proportions
  const padding = { top: 30, right: 80, bottom: 80, left: 100 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  
  const pathData = points.map((point, index) => {
    const x = padding.left + (index / (points.length - 1)) * chartWidth;
    const y = padding.top + ((roundedMax - point.value) / finalRange) * chartHeight;
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  // Create area path (for gradient fill)
  const areaPath = `${pathData} L ${padding.left + chartWidth} ${padding.top + chartHeight} L ${padding.left} ${padding.top + chartHeight} Z`;

  // Generate Y-axis labels (6 labels with better formatting using rounded values)
  const yAxisLabels = [];
  for (let i = 0; i <= 5; i++) {
    const value = roundedMin + (roundedStep * i);
    const y = padding.top + ((roundedMax - value) / finalRange) * chartHeight;
    yAxisLabels.push({ value, y });
  }

  // Generate X-axis labels (every month for yearly data)
  const xAxisLabels = [];
  
  if (points.length > 0) {
    const firstPoint = points[0];
    const lastPoint = points[points.length - 1];
    const firstDate = new Date(firstPoint.timestamp * 1000);
    const lastDate = new Date(lastPoint.timestamp * 1000);
    
    // Start from the first of the month of the first point
    let currentDate = new Date(firstDate.getFullYear(), firstDate.getMonth(), 1);
    
    // Add labels for each month
    while (currentDate <= lastDate) {
      const currentTimestamp = Math.floor(currentDate.getTime() / 1000);
      
      // Find the closest point to this timestamp
      let closestIndex = 0;
      let minDiff = Math.abs(points[0].timestamp - currentTimestamp);
      
      for (let i = 1; i < points.length; i++) {
        const diff = Math.abs(points[i].timestamp - currentTimestamp);
        if (diff < minDiff) {
          minDiff = diff;
          closestIndex = i;
        }
      }
      
      const point = points[closestIndex];
      const x = padding.left + (closestIndex / (points.length - 1)) * chartWidth;
      
      // Always add every month, but use shorter labels to prevent overlap
      const isFirstLabel: boolean = xAxisLabels.length === 0;
      const isJanuary: boolean = currentDate.getMonth() === 0;
      
      xAxisLabels.push({ 
        value: point, 
        x,
        label: currentDate.toLocaleDateString('en-US', { 
          month: 'short', 
          year: isFirstLabel || isJanuary ? '2-digit' : undefined
        }).replace(',', ''),
        isJanuary: isJanuary
      });
      
      // Move to next month
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
  }

  // Get color based on performance
  const isPositive = totalChange >= 0;
  const lineColor = isPositive ? themeConfig.colors.primary : themeConfig.colors.accent;
  const areaColor = isPositive ? `${themeConfig.colors.primary}20` : `${themeConfig.colors.accent}20`;

  // Handle mouse events for tooltip
  const handleMouseMove = (event: React.MouseEvent<SVGSVGElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Check if mouse is over the chart area
    if (x >= padding.left && x <= padding.left + chartWidth && 
        y >= padding.top && y <= padding.top + chartHeight) {
      
      // Find the closest data point
      const relativeX = x - padding.left;
      const pointIndex = Math.round((relativeX / chartWidth) * (points.length - 1));
      const point = points[Math.min(Math.max(pointIndex, 0), points.length - 1)];
      
      const pointX = padding.left + (pointIndex / (points.length - 1)) * chartWidth;
      const pointY = padding.top + ((roundedMax - point.value) / finalRange) * chartHeight;
      
      setHoveredPoint({
        x: pointX,
        y: pointY,
        point: point
      });
    } else {
      setHoveredPoint(null);
    }
  };

  const handleMouseLeave = () => {
    setHoveredPoint(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 w-full"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2" style={{ color: themeConfig.colors.text }}>Portfolio Performance</h2>
        <p className="text-sm" style={{ color: themeConfig.colors.textSecondary }}>Yearly balance chart</p>
      </div>

      {/* Chart Container */}
      <div className="relative w-full">
        <div
          className="rounded-2xl p-6 border w-full"
          style={{
            backgroundColor: `${themeConfig.colors.surface}80`,
            borderColor: themeConfig.colors.border,
          }}
        >
          {/* Chart Header */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5" style={{ color: themeConfig.colors.primary }} />
              <span className="font-semibold" style={{ color: themeConfig.colors.text }}>Balance Chart</span>
            </div>
            <div className="flex items-center gap-2">
              {isPositive ? (
                <TrendingUp className="w-4 h-4" style={{ color: themeConfig.colors.primary }} />
              ) : (
                <TrendingDown className="w-4 h-4" style={{ color: themeConfig.colors.accent }} />
              )}
              <span
                className={`font-bold ${isPositive ? 'text-green-500' : 'text-red-500'}`}
              >
                {isPositive ? '+' : ''}{totalChangePercent.toFixed(2)}%
              </span>
            </div>
          </div>

          {/* SVG Chart */}
          <div className="relative w-full overflow-x-auto">
            <svg 
              width={width} 
              height={height} 
              className="w-full h-auto min-w-full cursor-crosshair"
              viewBox={`0 0 ${width} ${height}`}
              preserveAspectRatio="xMidYMid meet"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <defs>
                <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={isPositive ? themeConfig.colors.primary : themeConfig.colors.accent} stopOpacity="0.3" />
                  <stop offset="100%" stopColor={isPositive ? themeConfig.colors.primary : themeConfig.colors.accent} stopOpacity="0.05" />
                </linearGradient>
              </defs>
              
              {/* Grid lines */}
              {yAxisLabels.map((label, index) => (
                <g key={`grid-${index}`}>
                  <line
                    x1={padding.left}
                    y1={label.y}
                    x2={padding.left + chartWidth}
                    y2={label.y}
                    stroke={themeConfig.colors.border}
                    strokeWidth="1"
                    opacity="0.3"
                  />
                </g>
              ))}
              
              {/* Y-axis line */}
              <line
                x1={padding.left}
                y1={padding.top}
                x2={padding.left}
                y2={padding.top + chartHeight}
                stroke={themeConfig.colors.border}
                strokeWidth="2"
              />
              
              {/* X-axis line */}
              <line
                x1={padding.left}
                y1={padding.top + chartHeight}
                x2={padding.left + chartWidth}
                y2={padding.top + chartHeight}
                stroke={themeConfig.colors.border}
                strokeWidth="2"
              />
              
              {/* Area fill */}
              <path
                d={areaPath}
                fill="url(#areaGradient)"
              />
              
              {/* Line */}
              <path
                d={pathData}
                fill="none"
                stroke={lineColor}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              
              {/* Data points */}
              {points.map((point, index) => {
                const x = padding.left + (index / (points.length - 1)) * chartWidth;
                const y = padding.top + ((roundedMax - point.value) / finalRange) * chartHeight;
                return (
                  <circle
                    key={index}
                    cx={x}
                    cy={y}
                    r="4"
                    fill={lineColor}
                    stroke={themeConfig.colors.surface}
                    strokeWidth="2"
                    className="hover:r-6 transition-all cursor-pointer"
                    style={{ 
                      opacity: hoveredPoint && Math.abs(hoveredPoint.x - x) < 20 ? 1 : 0.7 
                    }}
                  />
                );
              })}

              {/* Hover indicator line */}
              {hoveredPoint && (
                <g>
                  <line
                    x1={hoveredPoint.x}
                    y1={padding.top}
                    x2={hoveredPoint.x}
                    y2={padding.top + chartHeight}
                    stroke={themeConfig.colors.textSecondary}
                    strokeWidth="1"
                    strokeDasharray="3,3"
                    opacity="0.5"
                  />
                  <circle
                    cx={hoveredPoint.x}
                    cy={hoveredPoint.y}
                    r="6"
                    fill={lineColor}
                    stroke={themeConfig.colors.surface}
                    strokeWidth="3"
                    className="animate-pulse"
                  />
                </g>
              )}
              
              {/* Y-axis labels */}
              {yAxisLabels.map((label, index) => (
                <g key={`y-label-${index}`}>
                  <text
                    x={padding.left - 15}
                    y={label.y + 5}
                    textAnchor="end"
                    fontSize="13"
                    fill={themeConfig.colors.textSecondary}
                    className="font-medium"
                  >
                    {label.value >= 1000 
                      ? `$${(label.value / 1000).toFixed((label.value / 1000) % 1 === 0 ? 0 : 1)}k` 
                      : label.value < 1 
                        ? `$${label.value.toFixed(2)}` 
                        : `$${Math.round(label.value)}`}
                  </text>
                </g>
              ))}
              
              {/* X-axis labels */}
              {xAxisLabels.map((label, index) => (
                <g key={`x-label-${index}`}>
                  <text
                    x={label.x}
                    y={padding.top + chartHeight + 25}
                    textAnchor="middle"
                    fontSize="12"
                    fill={themeConfig.colors.textSecondary}
                    className="font-medium"
                  >
                    {label.label}
                  </text>
                </g>
              ))}
              
              {/* Axis titles */}
              <text
                x={padding.left + chartWidth / 2}
                y={height - 10}
                textAnchor="middle"
                fontSize="14"
                fill={themeConfig.colors.text}
                className="font-semibold"
              >
                Date
              </text>
              
              <text
                x={15}
                y={padding.top + chartHeight / 2}
                textAnchor="middle"
                fontSize="14"
                fill={themeConfig.colors.text}
                className="font-semibold"
                transform={`rotate(-90, 15, ${padding.top + chartHeight / 2})`}
              >
                Portfolio Value ($)
              </text>
            </svg>
          </div>

          {/* Tooltip */}
          {hoveredPoint && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute pointer-events-none z-10"
              style={{
                left: `${Math.min(Math.max(hoveredPoint.x - 60, 10), width - 120)}px`,
                top: `${Math.max(hoveredPoint.y - 80, 10)}px`,
              }}
            >
              <div
                className="rounded-lg px-3 py-2 shadow-lg border backdrop-blur-sm"
                style={{
                  backgroundColor: `${themeConfig.colors.surface}95`,
                  borderColor: themeConfig.colors.border,
                }}
              >
                <div className="text-sm font-semibold" style={{ color: themeConfig.colors.text }}>
                  {new Date(hoveredPoint.point.timestamp * 1000).toLocaleDateString('en-US', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </div>
                <div className="text-lg font-bold" style={{ color: lineColor }}>
                  ${hoveredPoint.point.value.toFixed(2)}
                </div>
                <div className="text-xs" style={{ color: themeConfig.colors.textSecondary }}>
                  {hoveredPoint.point.time}
                </div>
              </div>
            </motion.div>
          )}

          {/* Chart Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="text-center">
              <p className="text-sm font-medium" style={{ color: themeConfig.colors.textSecondary }}>Current Value</p>
              <p className="text-lg font-bold" style={{ color: themeConfig.colors.text }}>
                ${points[points.length - 1]?.value.toFixed(2) || '0.00'}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium" style={{ color: themeConfig.colors.textSecondary }}>Yearly Change</p>
              <p className={`text-lg font-bold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {isPositive ? '+' : ''}${totalChange.toFixed(2)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium" style={{ color: themeConfig.colors.textSecondary }}>Highest</p>
              <p className="text-lg font-bold" style={{ color: themeConfig.colors.text }}>
                ${highestValue.toFixed(2)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium" style={{ color: themeConfig.colors.textSecondary }}>Lowest</p>
              <p className="text-lg font-bold" style={{ color: themeConfig.colors.text }}>
                ${lowestValue.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <BarChart3 className="w-8 h-8 mx-auto mb-2" style={{ color: themeConfig.colors.secondary }} />
          <p className="text-sm font-medium" style={{ color: themeConfig.colors.textSecondary }}>Volatility</p>
          <p className="text-2xl font-bold" style={{ color: themeConfig.colors.text }}>
            {volatility.toFixed(2)}
          </p>
          <p className="text-xs mt-1" style={{ color: themeConfig.colors.textSecondary }}>
            Standard deviation
          </p>
        </motion.div>

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
          <Activity className="w-8 h-8 mx-auto mb-2" style={{ color: themeConfig.colors.primary }} />
          <p className="text-sm font-medium" style={{ color: themeConfig.colors.textSecondary }}>Data Points</p>
          <p className="text-2xl font-bold" style={{ color: themeConfig.colors.text }}>
            {points.length}
          </p>
          <p className="text-xs mt-1" style={{ color: themeConfig.colors.textSecondary }}>
            Yearly data points
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
