import {
  ZerionPortfolio,
  ZerionPositionsResponse,
  ZerionPnL,
  ZerionTransactionsResponse,
  WalletData,
} from "@/types";

const ZERION_API_BASE = "https://api.zerion.io/v1";
const API_KEY = process.env.NEXT_PUBLIC_ZERION_API_KEY;

if (!API_KEY) {
  console.warn("⚠️ ZERION API KEY is not set. Please add NEXT_PUBLIC_ZERION_API_KEY to your .env.local file");
}

const headers = {
  "Authorization": `Basic ${API_KEY}`,
  "Content-Type": "application/json",
};

export async function fetchWalletData(walletAddress: string): Promise<WalletData> {
  try {
    // Fetch portfolio overview
    const portfolioResponse = await fetch(
      `${ZERION_API_BASE}/wallets/${walletAddress}/portfolio?currency=usd`,
      { headers }
    );

    if (!portfolioResponse.ok) {
      throw new Error(`Portfolio API error: ${portfolioResponse.status}`);
    }

    const portfolio: ZerionPortfolio = await portfolioResponse.json();

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

    // Process the data
    const portfolioValue = parseFloat(portfolio.data.attributes.total.quantity) || 0;

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

    const walletData: WalletData = {
      portfolioValue,
      topHoldings,
      pnl: {
        totalProfit: pnl.data.attributes.total_profit,
        totalProfitPercent: pnl.data.attributes.total_profit_percent,
        realizedProfit: pnl.data.attributes.total_realized_profit,
        unrealizedProfit: pnl.data.attributes.total_unrealized_profit,
      },
      transactionStats: {
        totalTransactions: transactions.data.length,
        swaps,
        transfers,
        recentActivity,
      },
      tradingFrequency,
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

