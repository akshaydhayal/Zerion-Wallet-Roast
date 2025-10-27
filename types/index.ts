// Zerion API Response Types
export interface ZerionPortfolio {
  data: {
    attributes: {
      total: {
        quantity: string;
      };
      positions_distribution_by_type: {
        wallet: number;
        deposited: number;
        staked: number;
        locked: number;
      };
      positions_distribution_by_chain: Record<string, number>;
    };
  };
}

export interface ZerionPosition {
  type: string;
  id: string;
  attributes: {
    quantity: {
      float: number;
    };
    value: number | null;
    fungible_info: {
      name: string;
      symbol: string;
      icon: {
        url: string;
      } | null;
    };
    flags: {
      displayable: boolean;
    };
  };
}

export interface ZerionPositionsResponse {
  data: ZerionPosition[];
  links?: {
    next?: string;
  };
}

export interface ZerionPnL {
  data: {
    attributes: {
      total_profit: number;
      total_profit_percent: number;
      absolute_loss: number;
      absolute_profit: number;
      total_realized_profit: number;
      total_unrealized_profit: number;
    };
  };
}

export interface ZerionTransaction {
  type: string;
  id: string;
  attributes: {
    operation_type: string;
    hash: string;
    mined_at: string;
    status: string;
    transfers: Array<{
      fungible_info?: {
        name: string;
        symbol: string;
      };
      quantity?: {
        float: number;
      };
      direction: string;
    }>;
  };
}

export interface ZerionTransactionsResponse {
  data: ZerionTransaction[];
  links?: {
    next?: string;
  };
}

// Roast Data Types
export interface WalletData {
  portfolioValue: number;
  topHoldings: Array<{
    name: string;
    symbol: string;
    value: number;
    quantity: number;
  }>;
  pnl: {
    totalProfit: number;
    totalProfitPercent: number;
    realizedProfit: number;
    unrealizedProfit: number;
  };
  transactionStats: {
    totalTransactions: number;
    swaps: number;
    transfers: number;
    recentActivity: number; // last 7 days
  };
  tradingFrequency: "degen" | "active" | "moderate" | "hodler" | "ghost";
  distribution: {
    wallet: number;
    staked: number;
    deposited: number;
  };
}

export interface RoastResult {
  mainRoast: string;
  subRoasts: string[];
  personality: string;
  personalityEmoji: string;
  score: number; // 0-100, lower is worse
  badge: string;
}

