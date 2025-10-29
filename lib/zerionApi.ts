import {
  ZerionPortfolio,
  ZerionPositionsResponse,
  ZerionPnL,
  ZerionTransactionsResponse,
  ZerionChartResponse,
  ChartDataPoint,
  WalletData,
} from "@/types";

const ZERION_API_BASE = "https://api.zerion.io/v1";
const API_KEY = process.env.NEXT_PUBLIC_ZERION_API_KEY;
const PROXY_API_BASE = "/api/zerion"; // Use Next.js API route to avoid CORS

console.log("🔑 API Key Debug:", {
  hasKey: !!API_KEY,
  keyLength: API_KEY?.length,
  keyStart: API_KEY?.substring(0, 10) + "...",
  env: process.env.NODE_ENV
});

if (!API_KEY) {
  console.error("❌ ZERION API KEY is not set. Please add NEXT_PUBLIC_ZERION_API_KEY to your .env.local file");
  console.error("⚠️ Falling back to mock data for development");
}


// Test function to check API connectivity
async function testZerionAPI(): Promise<boolean> {
  try {
    console.log("🧪 Testing Zerion API connectivity through proxy...");
    console.log("🧪 API Key (first 10 chars):", API_KEY?.substring(0, 10));
    
    // Use proxy API route to avoid CORS issues
    const testResponse = await fetch(`${PROXY_API_BASE}?address=test&endpoint=portfolio`);
    
    console.log("🧪 Test response status:", testResponse.status);
    
    if (testResponse.status === 401) {
      console.error("🧪 API key is invalid or expired");
      return false;
    }
    
    if (testResponse.status === 404) {
      console.log("🧪 API is working (404 is expected for test wallet)");
      return true;
    }
    
    return testResponse.status < 500; // Any 2xx or 4xx (except 401) means API is working
  } catch (error) {
    console.error("🧪 API test failed:", error);
    return false;
  }
}

export async function fetchWalletData(walletAddress: string): Promise<WalletData> {
  try {
    // Check if API key exists
    if (!API_KEY || API_KEY === 'your_zerion_key_here') {
      console.error("❌ Zerion API key is not configured");
      throw new Error("Zerion API key is required. Please add NEXT_PUBLIC_ZERION_API_KEY to your .env.local file");
    }

    // Test API connectivity first
    const apiWorking = await testZerionAPI();
    if (!apiWorking) {
      console.error("❌ API test failed - check your Zerion API key");
      throw new Error("Zerion API is not accessible. Please check your API key.");
    }

    // Validate wallet address format
    if (!walletAddress || walletAddress.length < 32) {
      console.error("❌ Invalid wallet address format");
      throw new Error("Invalid wallet address");
    }

    const portfolioUrl = `${PROXY_API_BASE}?address=${walletAddress}&endpoint=portfolio`;
    console.log("🌐 Making API request to proxy:", portfolioUrl);
    console.log("📋 API Key present:", !!API_KEY);
    console.log("📋 API Key starts with:", API_KEY?.substring(0, 5));
    
    // Fetch portfolio overview with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
    
    let portfolio: ZerionPortfolio;
    
    try {
      const portfolioResponse = await fetch(portfolioUrl, {
        method: 'GET',
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      console.log("📡 Response status:", portfolioResponse.status);
      console.log("📡 Response OK:", portfolioResponse.ok);

      if (!portfolioResponse.ok) {
        let errorData;
        try {
          errorData = await portfolioResponse.json();
        } catch {
          errorData = await portfolioResponse.text();
        }
        
        console.error("❌ API Error Response:", errorData);
        console.error("❌ Status:", portfolioResponse.status);
        console.error("❌ Status Text:", portfolioResponse.statusText);
        
        if (portfolioResponse.status === 401) {
          console.error("❌ 401 Unauthorized - Check your Zerion API key in .env.local");
          console.error("❌ Make sure the API key is correct and has proper permissions");
          throw new Error("Zerion API authentication failed. Please check your API key.");
        }
        
        if (portfolioResponse.status === 404) {
          console.error("❌ 404 Not Found - Wallet address might not be indexed yet");
          throw new Error("Wallet not found in Zerion database. Try a different wallet address.");
        }
        
        const errorMessage = typeof errorData === 'string' ? errorData : errorData.error || `Portfolio API error: ${portfolioResponse.status}`;
        throw new Error(errorMessage);
      }

      portfolio = await portfolioResponse.json();
      console.log("✅ Portfolio data received:");
      console.log("📊 Full response:", JSON.stringify(portfolio, null, 2));
      console.log("📊 Response type:", typeof portfolio);
      console.log("📊 Has data property:", !!portfolio?.data);
      console.log("📊 Data type:", typeof portfolio?.data);
      console.log("📊 Has attributes:", !!portfolio?.data?.attributes);
      console.log("📊 Attributes keys:", portfolio?.data?.attributes ? Object.keys(portfolio.data.attributes) : "No attributes");

    } catch (fetchError: any) {
      clearTimeout(timeoutId);
      
      if (fetchError.name === 'AbortError') {
        console.error("❌ Request timeout - API took too long to respond");
        throw new Error("Zerion API request timed out. Please try again.");
      }
      
      console.error("❌ Network error:", fetchError);
      throw new Error(`Network error: ${fetchError.message}`);
    }

    // Fetch positions (top holdings)
    console.log("🔍 Fetching positions data...");
    const positionsUrl = `${PROXY_API_BASE}?address=${walletAddress}&endpoint=positions`;
    console.log("🌐 Positions URL:", positionsUrl);
    
    const positionsResponse = await fetch(positionsUrl, {
      method: 'GET',
      signal: controller.signal,
    });

    console.log("📡 Positions response status:", positionsResponse.status);
    
    let positions: ZerionPositionsResponse = { data: [] };
    if (positionsResponse.ok) {
      positions = await positionsResponse.json();
      console.log("✅ Positions data received:", positions);
    } else {
      console.warn("⚠️ Positions API failed:", positionsResponse.status);
    }

    // Fetch transactions
    console.log("🔍 Fetching transactions data...");
    const transactionsUrl = `${PROXY_API_BASE}?address=${walletAddress}&endpoint=transactions`;
    console.log("🌐 Transactions URL:", transactionsUrl);
    
    const transactionsResponse = await fetch(transactionsUrl, {
      method: 'GET',
      signal: controller.signal,
    });

    console.log("📡 Transactions response status:", transactionsResponse.status);
    
    let transactions: ZerionTransactionsResponse = { data: [] };
    if (transactionsResponse.ok) {
      transactions = await transactionsResponse.json();
      console.log("✅ Transactions data received:", transactions);
    } else {
      console.warn("⚠️ Transactions API failed:", transactionsResponse.status);
    }

    // Fetch chart data (yearly data points)
    console.log("🔍 Fetching chart data...");
    const chartUrl = `${PROXY_API_BASE}?address=${walletAddress}&endpoint=chart&period=year`;
    console.log("🌐 Chart URL:", chartUrl);
    
    const chartResponse = await fetch(chartUrl, {
      method: 'GET',
      signal: controller.signal,
    });

    console.log("📡 Chart response status:", chartResponse.status);
    
    let chartData: ZerionChartResponse | null = null;
    if (chartResponse.ok) {
      chartData = await chartResponse.json();
      console.log("✅ Chart data received:", chartData);
    } else {
      console.warn("⚠️ Chart API failed:", chartResponse.status);
    }

    // TODO: Uncomment these when we want to use all routes
    /*
    // Fetch PnL data
    const pnlResponse = await fetch(
      `${ZERION_API_BASE}/wallets/${walletAddress}/pnl?currency=usd`,
      { headers }
    );

    const pnl: ZerionPnL = pnlResponse.ok
      ? await pnlResponse.json()
      : {
          data: {
            attributes: {
              total_profit: 0,
              total_profit_percent: 0,
              absolute_loss: 0,
              absolute_profit: 0,
              total_realized_profit: 0,
              total_unrealized_profit: 0,
            },
          },
        };

    // Fetch transactions
    const transactionsResponse = await fetch(
      `${ZERION_API_BASE}/wallets/${walletAddress}/transactions?page[size]=100&currency=usd`,
      { headers }
    );

    const transactions: ZerionTransactionsResponse = transactionsResponse.ok
      ? await transactionsResponse.json()
      : { data: [] };
    */

    // Process the data (SIMPLIFIED - ONLY PORTFOLIO DATA FOR NOW)
    
    console.log("🔍 Portfolio structure analysis:");
    console.log("📊 Root keys:", Object.keys(portfolio || {}));
    if (portfolio?.data) {
      console.log("📊 Data keys:", Object.keys(portfolio.data));
      if (portfolio.data.attributes) {
        console.log("📊 Attributes keys:", Object.keys(portfolio.data.attributes));
        console.log("📊 Attributes values:", portfolio.data.attributes);
      }
    }
    
    // Get portfolio value from the API response
    let portfolioValue = 0;
    let distribution = {
      wallet: 0,
      staked: 0,
      deposited: 0,
    };
    
    console.log("🔍 Searching for portfolio value...");
    
    // Method 1: Check for total_balance
    if (portfolio?.data?.attributes?.total_balance !== undefined) {
      portfolioValue = parseFloat(String(portfolio.data.attributes.total_balance)) || 0;
      console.log("💰 Found total_balance:", portfolio.data.attributes.total_balance, "→", portfolioValue);
    }
    
    // Method 2: Check for total object
    if (portfolioValue === 0 && portfolio?.data?.attributes?.total) {
      const total = portfolio.data.attributes.total;
      console.log("💰 Found total object:", total);
      
      if (total.quantity !== undefined) {
        portfolioValue = parseFloat(String(total.quantity)) || 0;
        console.log("💰 Using total.quantity:", total.quantity, "→", portfolioValue);
      } else if (total.value !== undefined) {
        portfolioValue = parseFloat(String(total.value)) || 0;
        console.log("💰 Using total.value:", total.value, "→", portfolioValue);
      } else if (total.balance !== undefined) {
        portfolioValue = parseFloat(String(total.balance)) || 0;
        console.log("💰 Using total.balance:", total.balance, "→", portfolioValue);
      }
    }
    
    // Method 3: Check for positions_distribution_by_type
    if (portfolioValue === 0 && portfolio?.data?.attributes?.positions_distribution_by_type) {
      const dist = portfolio.data.attributes.positions_distribution_by_type;
      console.log("💰 Found positions_distribution_by_type:", dist);
      
      distribution = {
        wallet: parseFloat(String(dist.wallet || 0)) || 0,
        staked: parseFloat(String(dist.staked || 0)) || 0,
        deposited: parseFloat(String(dist.deposited || 0)) || 0,
      };
      portfolioValue = distribution.wallet + distribution.staked + distribution.deposited;
      console.log("💰 Calculated from distribution:", distribution, "→", portfolioValue);
    }
    
    // Method 4: Check for other possible fields
    if (portfolioValue === 0) {
      const attrs = portfolio?.data?.attributes;
      if (attrs) {
        console.log("🔍 Checking other possible fields...");
        for (const [key, value] of Object.entries(attrs)) {
          if (typeof value === 'number' && value > 0) {
            console.log(`💰 Found numeric field ${key}:`, value);
            portfolioValue = value;
            break;
          }
        }
      }
    }
    
    // If still no value found, throw error
    if (portfolioValue === 0) {
      console.error("❌ Could not extract portfolio value from API response");
      console.error("❌ Response structure:", JSON.stringify(portfolio, null, 2));
      throw new Error("Unable to parse portfolio value from Zerion API response");
    }
    
    // Get distribution if not already set
    if (distribution.wallet === 0 && distribution.staked === 0 && distribution.deposited === 0) {
      if (portfolio?.data?.attributes?.positions_distribution_by_type) {
        const dist = portfolio.data.attributes.positions_distribution_by_type;
        distribution = {
          wallet: parseFloat(String(dist.wallet || 0)) || 0,
          staked: parseFloat(String(dist.staked || 0)) || 0,
          deposited: parseFloat(String(dist.deposited || 0)) || 0,
        };
      } else {
        // Default distribution if not available
        distribution = {
          wallet: portfolioValue * 0.7, // 70% in wallet
          staked: portfolioValue * 0.2, // 20% staked
          deposited: portfolioValue * 0.1, // 10% deposited
        };
      }
    }
    
    console.log("✅ Final results:");
    console.log("💰 Portfolio value:", portfolioValue);
    console.log("📊 Distribution:", distribution);

    // Process positions data
    console.log("🔍 Processing positions data...");
    const topHoldings = positions.data
      .filter((pos) => pos.attributes.flags.displayable && pos.attributes.value && pos.attributes.value > 0)
      .slice(0, 10)
      .map((pos) => ({
        name: pos.attributes.fungible_info.name,
        symbol: pos.attributes.fungible_info.symbol,
        value: pos.attributes.value || 0,
        quantity: pos.attributes.quantity.float,
        price: pos.attributes.price || 0,
        change24h: pos.attributes.changes?.percent_1d || 0,
        verified: pos.attributes.fungible_info.flags.verified,
        icon: pos.attributes.fungible_info.icon?.url,
      }));

    const allPositions = positions.data
      .filter((pos) => pos.attributes.flags.displayable)
      .map((pos) => ({
        name: pos.attributes.fungible_info.name,
        symbol: pos.attributes.fungible_info.symbol,
        value: pos.attributes.value || 0,
        quantity: pos.attributes.quantity.float,
        price: pos.attributes.price || 0,
        change24h: pos.attributes.changes?.percent_1d || 0,
        verified: pos.attributes.fungible_info.flags.verified,
        icon: pos.attributes.fungible_info.icon?.url,
        positionType: pos.attributes.position_type,
      }));

    console.log("📊 Top holdings:", topHoldings);
    console.log("📊 All positions count:", allPositions.length);

    // Process transaction insights
    console.log("🔍 Processing transaction insights...");
    const totalTransactions = transactions.data.length;
    const successfulTransactions = transactions.data.filter(tx => tx.attributes.status === 'confirmed').length;
    const failedTransactions = transactions.data.filter(tx => tx.attributes.status === 'failed').length;
    const totalFeesPaid = transactions.data.reduce((sum, tx) => sum + (tx.attributes.fee?.value || 0), 0);
    const averageFeePerTransaction = totalTransactions > 0 ? totalFeesPaid / totalTransactions : 0;

    // Most used operation type
    const operationTypes = transactions.data.reduce((acc, tx) => {
      const type = tx.attributes.operation_type;
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    const mostUsedOperationType = Object.entries(operationTypes).reduce((a, b) => a[1] > b[1] ? a : b, ['unknown', 0])[0];

    // Recent activity (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentActivity = transactions.data.filter(tx => {
      const txDate = new Date(tx.attributes.mined_at);
      return txDate >= sevenDaysAgo;
    }).length;

    // Top tokens traded
    const tokenTrades = transactions.data.reduce((acc, tx) => {
      tx.attributes.transfers.forEach(transfer => {
        if (transfer.fungible_info) {
          const symbol = transfer.fungible_info.symbol;
          if (!acc[symbol]) {
            acc[symbol] = {
              symbol,
              name: transfer.fungible_info.name,
              count: 0,
              totalValue: 0
            };
          }
          acc[symbol].count++;
          acc[symbol].totalValue += transfer.value || 0;
        }
      });
      return acc;
    }, {} as Record<string, { symbol: string; name: string; count: number; totalValue: number }>);
    
    const topTokensTraded = Object.values(tokenTrades)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Trading patterns analysis
    const isActiveTrader = recentActivity > 10;
    const riskLevel: 'low' | 'medium' | 'high' = failedTransactions > totalTransactions * 0.3 ? 'high' : 
                     failedTransactions > totalTransactions * 0.1 ? 'medium' : 'low';
    const preferredOperationTypes = Object.entries(operationTypes)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([type]) => type);

    const transactionInsights = {
      totalTransactions,
      successfulTransactions,
      failedTransactions,
      totalFeesPaid,
      averageFeePerTransaction,
      mostUsedOperationType,
      recentActivity,
      topTokensTraded,
      tradingPatterns: {
        isActiveTrader,
        riskLevel,
        preferredOperationTypes
      }
    };

    console.log("📊 Transaction insights:", transactionInsights);

    // Process chart data
    let processedChartData = undefined;
    if (chartData && chartData.data && chartData.data.attributes.points) {
      const points = chartData.data.attributes.points;
      const processedPoints: ChartDataPoint[] = points.map(([timestamp, value]) => {
        const date = new Date(timestamp * 1000);
        return {
          timestamp,
          value,
          date: date.toLocaleDateString(),
          time: date.toLocaleTimeString()
        };
      });

      const firstValue = processedPoints[0]?.value || 0;
      const lastValue = processedPoints[processedPoints.length - 1]?.value || 0;
      const totalChange = lastValue - firstValue;
      const totalChangePercent = firstValue > 0 ? (totalChange / firstValue) * 100 : 0;
      
      const values = processedPoints.map(p => p.value);
      const highestValue = Math.max(...values);
      const lowestValue = Math.min(...values);
      
      // Calculate volatility (standard deviation)
      const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
      const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
      const volatility = Math.sqrt(variance);

      processedChartData = {
        period: 'year',
        points: processedPoints,
        totalChange,
        totalChangePercent,
        highestValue,
        lowestValue,
        volatility
      };

      console.log("📈 Chart data processed:", processedChartData);
    }

    // TODO: Uncomment these when we use all routes
    /*
    const swaps = transactions.data.filter(
      (tx) => tx.attributes.operation_type === "trade"
    ).length;

    const transfers = transactions.data.filter(
      (tx) => tx.attributes.operation_type === "transfer"
    ).length;

    // Recent activity (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentActivity = transactions.data.filter((tx) => {
      const txDate = new Date(tx.attributes.mined_at);
      return txDate >= sevenDaysAgo;
    }).length;

    // Determine trading frequency
    let tradingFrequency: WalletData["tradingFrequency"] = "ghost";
    if (transactions.data.length === 0) {
      tradingFrequency = "ghost";
    } else if (recentActivity > 20) {
      tradingFrequency = "degen";
    } else if (recentActivity > 10) {
      tradingFrequency = "active";
    } else if (recentActivity > 3) {
      tradingFrequency = "moderate";
    } else if (transactions.data.length > 5) {
      tradingFrequency = "hodler";
    }
    */

    // WALLET DATA WITH POSITIONS AND TRANSACTIONS
    const walletData: WalletData = {
      portfolioValue,
      topHoldings,
      pnl: {
        totalProfit: 0, // pnl.data.attributes.total_profit
        totalProfitPercent: 0, // pnl.data.attributes.total_profit_percent
        realizedProfit: 0, // pnl.data.attributes.total_realized_profit
        unrealizedProfit: 0, // pnl.data.attributes.total_unrealized_profit
      },
      transactionStats: {
        totalTransactions: 0, // transactions.data.length
        swaps: 0, // transactions.data.filter(...).length
        transfers: 0, // transactions.data.filter(...).length
        recentActivity: 0, // transactions.data.filter(...).length
      },
      tradingFrequency: "ghost", // calculated from transactions
      distribution,
      positions: allPositions,
      transactionInsights,
      chartData: processedChartData,
    };

    return walletData;
  } catch (error) {
    console.error("Error fetching wallet data:", error);
    throw error; // Re-throw the error instead of using mock data
  }
}


