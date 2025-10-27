import { WalletData, RoastResult } from "@/types";

export function generateRoast(walletData: WalletData): RoastResult {
  const roasts: string[] = [];
  let score = 50; // Start neutral
  let personality = "";
  let personalityEmoji = "";
  let badge = "";

  const { portfolioValue, topHoldings, pnl, transactionStats, tradingFrequency, distribution } = walletData;

  // Main Roast based on trading frequency
  let mainRoast = "";
  
  switch (tradingFrequency) {
    case "degen":
      mainRoast = "Holy shit, you've made " + transactionStats.recentActivity + " transactions in the last week. Even professional traders take a break. Your fingers must be tired from panic selling.";
      score -= 20;
      personality = "Certified Degen";
      personalityEmoji = "🤡";
      badge = "Overactive Trader Alert";
      break;
    case "active":
      mainRoast = transactionStats.recentActivity + " transactions in a week? Someone's been busy trying to time the market. Spoiler alert: You can't.";
      score -= 10;
      personality = "Active Trader";
      personalityEmoji = "📈";
      badge = "Busy Bee";
      break;
    case "moderate":
      mainRoast = "You trade " + transactionStats.recentActivity + " times a week. Not a degen, not a holder. Just... existing. How thrilling.";
      score += 10;
      personality = "Casual Investor";
      personalityEmoji = "😐";
      badge = "Middle of the Pack";
      break;
    case "hodler":
      mainRoast = "Look at you, Mr. Diamond Hands with " + transactionStats.totalTransactions + " total transactions. Either you're a genius or you forgot your password.";
      score += 20;
      personality = "Diamond Hands";
      personalityEmoji = "💎";
      badge = "HODL Master";
      break;
    case "ghost":
      mainRoast = "Zero transactions? Did you create this wallet just to get roasted? Mission accomplished, ghost.";
      score -= 30;
      personality = "Crypto Ghost";
      personalityEmoji = "👻";
      badge = "Wallet Collector";
      break;
  }

  // Portfolio value roasts
  if (portfolioValue === 0) {
    roasts.push("Portfolio value: $0. At least you can't lose any more money! 📉");
    score -= 25;
  } else if (portfolioValue < 10) {
    roasts.push(`$${portfolioValue.toFixed(2)} portfolio. That's not even a decent lunch. Did you sell at the bottom?`);
    score -= 20;
  } else if (portfolioValue < 100) {
    roasts.push(`$${portfolioValue.toFixed(2)} portfolio. You're practically living on ramen noodles. Keep grinding, I guess?`);
    score -= 10;
  } else if (portfolioValue < 1000) {
    roasts.push(`$${portfolioValue.toFixed(2)} portfolio. Not bad, but also... not impressive. You're the middle child of crypto.`);
    score += 5;
  } else if (portfolioValue < 10000) {
    roasts.push(`$${portfolioValue.toFixed(2)} portfolio. Okay, okay. You've got some bags. Still not quitting your day job though.`);
    score += 15;
  } else {
    roasts.push(`$${portfolioValue.toFixed(2)} portfolio. Look at you, whale! Or wait... is this your parents' money?`);
    score += 25;
  }

  // PnL roasts (the savage ones)
  if (pnl.totalProfitPercent < -50) {
    roasts.push(`You're down ${Math.abs(pnl.totalProfitPercent).toFixed(1)}%. The market didn't crash. You did. 🔥`);
    score -= 30;
  } else if (pnl.totalProfitPercent < -20) {
    roasts.push(`${Math.abs(pnl.totalProfitPercent).toFixed(1)}% loss? Ouch. Have you considered just buying Bitcoin and deleting your wallet?`);
    score -= 20;
  } else if (pnl.totalProfitPercent < 0) {
    roasts.push(`You're down ${Math.abs(pnl.totalProfitPercent).toFixed(1)}%. Not terrible, but you'd be better off with a savings account.`);
    score -= 10;
  } else if (pnl.totalProfitPercent < 10) {
    roasts.push(`${pnl.totalProfitPercent.toFixed(1)}% profit. Congrats on barely beating inflation! 👏`);
    score += 5;
  } else if (pnl.totalProfitPercent < 50) {
    roasts.push(`${pnl.totalProfitPercent.toFixed(1)}% profit. Not bad! You might actually know what you're doing... or you got lucky.`);
    score += 15;
  } else {
    roasts.push(`${pnl.totalProfitPercent.toFixed(1)}% profit?! Damn, save some gains for the rest of us! 🚀`);
    score += 30;
  }

  // Top holdings roasts
  if (topHoldings.length === 0) {
    roasts.push("No holdings? You literally have nothing. This is awkward.");
    score -= 20;
  } else {
    const topHolding = topHoldings[0];
    const topHoldingPercent = (topHolding.value / portfolioValue * 100);
    
    if (topHolding.symbol.toLowerCase().includes('bonk') || 
        topHolding.symbol.toLowerCase().includes('shib') ||
        topHolding.symbol.toLowerCase().includes('doge')) {
      roasts.push(`Your top holding is ${topHolding.symbol}. Respectfully... seek help. This is a Wendy's. 🤦`);
      score -= 15;
    } else if (topHoldingPercent > 80) {
      roasts.push(`${topHoldingPercent.toFixed(0)}% of your portfolio is ${topHolding.symbol}. Ever heard of diversification? Or are you just that committed to poor decisions?`);
      score -= 10;
    } else {
      roasts.push(`Top holding: ${topHolding.symbol}. ${topHolding.symbol === 'SOL' ? 'Ah, a Solana maxi. Bold choice.' : 'Interesting choice. Could be worse.'}`);
      score += 5;
    }
  }

  // Staking roasts
  if (distribution.staked > 0 && portfolioValue > 0) {
    const stakedPercent = (distribution.staked / portfolioValue * 100);
    if (stakedPercent < 1 && portfolioValue < 10) {
      roasts.push(`You staked $${(portfolioValue * stakedPercent / 100).toFixed(2)}. Congrats on securing the network, soldier. 🪖`);
      score -= 5;
    } else if (stakedPercent > 50) {
      roasts.push(`${stakedPercent.toFixed(0)}% staked. Look at you, earning that sweet 5% APY. Retire by 2150! 🚀`);
      score += 10;
    }
  }

  // Swap frequency roasts
  if (transactionStats.swaps > 50) {
    roasts.push(`${transactionStats.swaps} swaps? You're not trading, you're feeding liquidity to whales. Thank you for your service. 🐋`);
    score -= 15;
  } else if (transactionStats.swaps > 20) {
    roasts.push(`${transactionStats.swaps} swaps. The DEX thanks you for the fees. Your wallet doesn't. 💸`);
    score -= 5;
  }

  // Ensure score is between 0-100
  score = Math.max(0, Math.min(100, score));

  return {
    mainRoast,
    subRoasts: roasts,
    personality,
    personalityEmoji,
    score,
    badge,
  };
}

