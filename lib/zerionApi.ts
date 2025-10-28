import {
  ZerionPortfolio,
  ZerionPositionsResponse,
  ZerionPnL,
  ZerionTransactionsResponse,
  WalletData,
} from "@/types";

const ZERION_API_BASE = "https://api.zerion.io/v1";
const API_KEY = process.env.NEXT_PUBLIC_ZERION_API_KEY;

console.log("🔑 API Key Debug:", {
  hasKey: !!API_KEY,
  keyLength: API_KEY?.length,
  keyStart: API_KEY?.substring(0, 10) + "...",
  env: process.env.NODE_ENV
});

if (!API_KEY) {
  console.warn("⚠️ ZERION API KEY is not set. Please add NEXT_PUBLIC_ZERION_API_KEY to your .env.local file");
}

const headers = {
  "Authorization": `Basic ${btoa(`${API_KEY}:`)}`,
};

export async function fetchWalletData(walletAddress: string): Promise<WalletData> {
  try {
    console.log("🌐 Making API request to:", `${ZERION_API_BASE}/wallets/${walletAddress}/portfolio?currency=usd`);
    console.log("📋 Headers being sent:", headers);
    
    // Fetch portfolio overview (ONLY THIS FOR NOW)
    const portfolioResponse = await fetch(
      `${ZERION_API_BASE}/wallets/${walletAddress}/portfolio?currency=usd`,
      { headers }
    );

    if (!portfolioResponse.ok) {
      throw new Error(`Portfolio API error: ${portfolioResponse.status}`);
    }

    const portfolio: ZerionPortfolio = await portfolioResponse.json();

    // TODO: Uncomment these later when we want to use all routes
    /*
    // Fetch positions (top holdings)
    const positionsResponse = await fetch(
      `${ZERION_API_BASE}/wallets/${walletAddress}/positions?filter[positions]=only_simple&sort=value&page[size]=10&currency=usd`,
      { headers }
    );

    const positions: ZerionPositionsResponse = positionsResponse.ok
      ? await positionsResponse.json()
      : { data: [] };

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
    
    // Get portfolio value from the API response
    let portfolioValue = 0;
    
    // Try different ways to get portfolio value
    if (portfolio.data?.attributes?.total_balance) {
      portfolioValue = parseFloat(portfolio.data.attributes.total_balance) || 0;
    } else if (portfolio.data?.attributes?.total?.quantity) {
      portfolioValue = parseFloat(portfolio.data.attributes.total.quantity) || 0;
    } else if (portfolio.data?.attributes?.total?.value) {
      portfolioValue = parseFloat(portfolio.data.attributes.total.value) || 0;
    } else if (portfolio.data?.attributes?.positions_distribution_by_type) {
      const distribution = portfolio.data.attributes.positions_distribution_by_type;
      portfolioValue = (distribution.wallet || 0) + (distribution.staked || 0) + (distribution.deposited || 0);
    }

    // TODO: Uncomment these when we use all routes
    /*
    const topHoldings = positions.data
      .filter((pos) => pos.attributes.flags.displayable && pos.attributes.value)
      .slice(0, 5)
      .map((pos) => ({
        name: pos.attributes.fungible_info.name,
        symbol: pos.attributes.fungible_info.symbol,
        value: pos.attributes.value || 0,
        quantity: pos.attributes.quantity.float,
      }));

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

    // SIMPLIFIED WALLET DATA - ONLY PORTFOLIO INFO FOR NOW
    const walletData: WalletData = {
      portfolioValue,
      // TODO: Uncomment these when we use all routes
      topHoldings: [], // positions.data.filter(...).map(...)
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
      distribution: {
        wallet: portfolio.data.attributes.positions_distribution_by_type.wallet || 0,
        staked: portfolio.data.attributes.positions_distribution_by_type.staked || 0,
        deposited: portfolio.data.attributes.positions_distribution_by_type.deposited || 0,
      },
    };

    return walletData;
  } catch (error) {
    console.error("Error fetching wallet data:", error);
    throw error;
  }
}

