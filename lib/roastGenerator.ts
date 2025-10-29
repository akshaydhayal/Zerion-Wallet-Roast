import { WalletData, RoastResult } from "@/types";
import { generateAIRoast } from "./aiRoastGenerator";

export async function generateRoast(walletData: WalletData): Promise<RoastResult> {
  // Try AI generation first, fallback to static if it fails
  try {
    return await generateAIRoast(walletData);
  } catch (error) {
    console.warn('AI roast generation failed, using static roasts:', error);
    return generateStaticRoast(walletData);
  }
}

export function generateStaticRoast(walletData: WalletData): RoastResult {
  const roasts: string[] = [];
  let score = 50; // Start neutral
  let personality = "";
  let personalityEmoji = "";
  let badge = "";

  const { portfolioValue, topHoldings, pnl, transactionStats, tradingFrequency, distribution, positions, transactionInsights } = walletData;

  // DYNAMIC MAIN ROAST - MULTIPLE VARIATIONS PER RANGE
  let mainRoast = "";
  
  // Helper function to get random roast from array
  const getRandomRoast = (roastArray: string[]) => {
    return roastArray[Math.floor(Math.random() * roastArray.length)];
  };

  // Main roast based on portfolio value with multiple variations
  if (portfolioValue === 0) {
    const zeroRoasts = [
      "Portfolio value: $0. At least you can't lose any more money! 📉",
      "$0 portfolio. You're either broke or a genius who sold everything at the top. I'm betting on broke.",
      "Zero dollars? Did you forget to add tokens or did you forget to add money? 🤔",
      "$0.00. Congratulations, you've achieved the impossible - negative net worth in crypto!",
      "Portfolio: $0. The only thing emptier than your wallet is your trading strategy.",
      "Zero balance detected. You're either a ghost trader or you're really good at losing money."
    ];
    mainRoast = getRandomRoast(zeroRoasts);
    score -= 30;
    personality = "Crypto Ghost";
    personalityEmoji = "👻";
    badge = "Wallet Collector";
  } else if (portfolioValue < 10) {
    const smallRoasts = [
      `$${portfolioValue.toFixed(2)} portfolio. That's not even a decent lunch. Did you sell at the bottom?`,
      `$${portfolioValue.toFixed(2)}? You could buy more with a McDonald's Happy Meal. 🍔`,
      `$${portfolioValue.toFixed(2)} portfolio. I've seen bigger tips at a coffee shop.`,
      `$${portfolioValue.toFixed(2)}. At this rate, you'll be a millionaire in... never.`,
      `$${portfolioValue.toFixed(2)} portfolio. You're not investing, you're collecting digital pennies.`,
      `$${portfolioValue.toFixed(2)}. Your portfolio is smaller than my last Uber ride.`
    ];
    mainRoast = getRandomRoast(smallRoasts);
    score -= 20;
    personality = "Budget Trader";
    personalityEmoji = "🍜";
    badge = "Ramen Noodle Investor";
  } else if (portfolioValue < 100) {
    const mediumRoasts = [
      `$${portfolioValue.toFixed(2)} portfolio. You're practically living on ramen noodles. Keep grinding, I guess?`,
      `$${portfolioValue.toFixed(2)}. Not quite broke, not quite rich. Just... existing.`,
      `$${portfolioValue.toFixed(2)} portfolio. You're the middle child of crypto - forgotten but still trying.`,
      `$${portfolioValue.toFixed(2)}. At least you can afford instant noodles now! 🍜`,
      `$${portfolioValue.toFixed(2)} portfolio. You're not poor, you're just... economically challenged.`,
      `$${portfolioValue.toFixed(2)}. Your portfolio is as exciting as watching paint dry.`
    ];
    mainRoast = getRandomRoast(mediumRoasts);
    score -= 10;
    personality = "Casual Investor";
    personalityEmoji = "😐";
    badge = "Middle of the Pack";
  } else if (portfolioValue < 1000) {
    const decentRoasts = [
      `$${portfolioValue.toFixed(2)} portfolio. Not bad, but also... not impressive. You're the middle child of crypto.`,
      `$${portfolioValue.toFixed(2)}. You're not broke, but you're not quitting your day job either.`,
      `$${portfolioValue.toFixed(2)} portfolio. Decent, but your mom still asks if you're 'doing that computer money thing'.`,
      `$${portfolioValue.toFixed(2)}. You're doing okay, I guess. Mediocre, but okay.`,
      `$${portfolioValue.toFixed(2)} portfolio. You're the personification of 'meh' in crypto.`,
      `$${portfolioValue.toFixed(2)}. Not terrible, not great. Just... there. Like a background character.`
    ];
    mainRoast = getRandomRoast(decentRoasts);
    score += 10;
    personality = "Moderate Investor";
    personalityEmoji = "📊";
    badge = "Steady Eddie";
  } else if (portfolioValue < 10000) {
    const goodRoasts = [
      `$${portfolioValue.toFixed(2)} portfolio. Okay, okay. You've got some bags. Still not quitting your day job though.`,
      `$${portfolioValue.toFixed(2)}. Now we're talking! You might actually know what you're doing.`,
      `$${portfolioValue.toFixed(2)} portfolio. Respect. You're not just playing with pocket change anymore.`,
      `$${portfolioValue.toFixed(2)}. You've graduated from ramen to... slightly better ramen. 🍜`,
      `$${portfolioValue.toFixed(2)} portfolio. You're doing something right. Or you got really lucky.`,
      `$${portfolioValue.toFixed(2)}. Your portfolio is finally worth bragging about... to your cat.`
    ];
    mainRoast = getRandomRoast(goodRoasts);
    score += 20;
    personality = "Diamond Hands";
    personalityEmoji = "💎";
    badge = "HODL Master";
  } else {
    const whaleRoasts = [
      `$${portfolioValue.toFixed(2)} portfolio. Look at you, whale! Or wait... is this your parents' money?`,
      `$${portfolioValue.toFixed(2)}. Damn, save some gains for the rest of us! 🐋`,
      `$${portfolioValue.toFixed(2)} portfolio. You're either a genius or you inherited this. I'm betting on inheritance.`,
      `$${portfolioValue.toFixed(2)}. Okay, you win. You can stop flexing now.`,
      `$${portfolioValue.toFixed(2)} portfolio. You're the reason why people think crypto is easy money.`,
      `$${portfolioValue.toFixed(2)}. Your portfolio is bigger than my life savings. And my life.`
    ];
    mainRoast = getRandomRoast(whaleRoasts);
    score += 30;
    personality = "Crypto Whale";
    personalityEmoji = "🐋";
    badge = "Whale Alert";
  }

  // TODO: Uncomment this when we use all API routes
  /*
  // Main Roast based on trading frequency
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
  */

  // DYNAMIC SUB-ROASTS - MULTIPLE VARIATIONS FOR EACH SCENARIO
  
  // Staking roasts based on distribution with multiple variations
  if (distribution.staked > 0 && portfolioValue > 0) {
    const stakedPercent = (distribution.staked / portfolioValue * 100);
    if (stakedPercent < 1 && portfolioValue < 10) {
      const smallStakeRoasts = [
        `You staked $${(portfolioValue * stakedPercent / 100).toFixed(2)}. Congrats on securing the network, soldier. 🪖`,
        `$${(portfolioValue * stakedPercent / 100).toFixed(2)} staked? That's not securing the network, that's securing a parking spot.`,
        `You staked $${(portfolioValue * stakedPercent / 100).toFixed(2)}. The network thanks you for your... contribution?`,
        `$${(portfolioValue * stakedPercent / 100).toFixed(2)} staked. You're helping secure the network, one penny at a time.`
      ];
      roasts.push(getRandomRoast(smallStakeRoasts));
      score -= 5;
    } else if (stakedPercent > 50) {
      const heavyStakeRoasts = [
        `${stakedPercent.toFixed(0)}% staked. Look at you, earning that sweet 5% APY. Retire by 2150! 🚀`,
        `${stakedPercent.toFixed(0)}% staked? You're either very confident or very desperate.`,
        `${stakedPercent.toFixed(0)}% staked. At least you're getting some yield while losing money.`,
        `${stakedPercent.toFixed(0)}% staked. You're basically running your own validator at this point.`
      ];
      roasts.push(getRandomRoast(heavyStakeRoasts));
      score += 10;
    } else if (stakedPercent > 20) {
      const moderateStakeRoasts = [
        `${stakedPercent.toFixed(0)}% staked. At least you're helping secure the network while losing money.`,
        `${stakedPercent.toFixed(0)}% staked. You're doing your part for decentralization. Sort of.`,
        `${stakedPercent.toFixed(0)}% staked. Not bad, but you could be earning more in a savings account.`,
        `${stakedPercent.toFixed(0)}% staked. You're getting some yield, which is more than most people.`
      ];
      roasts.push(getRandomRoast(moderateStakeRoasts));
      score += 5;
    }
  }

  // Distribution analysis roasts with variations
  if (distribution.wallet > 0 && portfolioValue > 0) {
    const walletPercent = (distribution.wallet / portfolioValue * 100);
    if (walletPercent > 90) {
      const hodlRoasts = [
        `${walletPercent.toFixed(0)}% sitting in wallet. Not staking, not DeFi, just... holding. Bold strategy.`,
        `${walletPercent.toFixed(0)}% in wallet. You're the definition of 'diamond hands' - or just lazy.`,
        `${walletPercent.toFixed(0)}% sitting idle. Your money is more boring than you are.`,
        `${walletPercent.toFixed(0)}% in wallet. You're not investing, you're just... storing. Like a digital piggy bank.`
      ];
      roasts.push(getRandomRoast(hodlRoasts));
      score -= 5;
    }
  }

    // Top Holdings-based roasts (using fungible positions API data)
    if (topHoldings && topHoldings.length > 0) {
      const topHolding = topHoldings[0];
      const topHoldingPercent = portfolioValue > 0 ? (topHolding.value / portfolioValue * 100) : 0;
      
      // Meme coin roasts
      const memeKeywords = ['bonk', 'shib', 'doge', 'pepe', 'wojak', 'chad', 'moonshot', 'moon', 'lambo'];
      const isMemeCoin = memeKeywords.some(keyword => 
        topHolding.symbol.toLowerCase().includes(keyword) || 
        topHolding.name.toLowerCase().includes(keyword)
      );
      
      if (isMemeCoin) {
        const memeRoasts = [
          `${topHolding.symbol} is your top holding? You're not investing, you're memeing.`,
          `Your biggest bag is ${topHolding.symbol}? I respect the degenerate energy.`,
          `${topHolding.symbol} as your top holding. You're either ahead of the curve or way behind it.`,
          `Top holding: ${topHolding.symbol}. You're the reason why people think crypto is a joke.`
        ];
        roasts.push(getRandomRoast(memeRoasts));
        score -= 10;
      }
      
      // Overconcentration roasts
      if (topHoldingPercent > 80) {
        const concentrationRoasts = [
          `${topHoldingPercent.toFixed(0)}% in ${topHolding.symbol}? That's not diversification, that's a death wish.`,
          `You've got ${topHoldingPercent.toFixed(0)}% in one token. One pump and dump away from rekt city.`,
          `${topHoldingPercent.toFixed(0)}% in ${topHolding.symbol}. You're not a trader, you're a gambler.`,
          `Putting ${topHoldingPercent.toFixed(0)}% in ${topHolding.symbol}? Even casinos have better odds.`
        ];
        roasts.push(getRandomRoast(concentrationRoasts));
        score -= 15;
      }
      
      // Price change roasts
      if (topHolding.change24h < -10) {
        const lossRoasts = [
          `Your top holding ${topHolding.symbol} is down ${Math.abs(topHolding.change24h).toFixed(1)}% today. Ouch.`,
          `${topHolding.symbol} dropped ${Math.abs(topHolding.change24h).toFixed(1)}%? Your biggest bag is bleeding.`,
          `Your ${topHolding.symbol} position is down ${Math.abs(topHolding.change24h).toFixed(1)}%. Maybe try not buying tops?`,
          `${topHolding.symbol} is down ${Math.abs(topHolding.change24h).toFixed(1)}% today. Your portfolio is crying.`
        ];
        roasts.push(getRandomRoast(lossRoasts));
        score -= 10;
      } else if (topHolding.change24h > 20) {
        const pumpRoasts = [
          `${topHolding.symbol} is up ${topHolding.change24h.toFixed(1)}%? Did you finally buy the right thing?`,
          `Your ${topHolding.symbol} is pumping ${topHolding.change24h.toFixed(1)}%! Time to sell or diamond hands?`,
          `${topHolding.symbol} up ${topHolding.change24h.toFixed(1)}%? You're either lucky or actually know what you're doing.`
        ];
        roasts.push(getRandomRoast(pumpRoasts));
        score += 5;
      }
      
      // Large top holding value roasts
      if (topHolding.value > 10000) {
        const whaleRoasts = [
          `$${topHolding.value.toFixed(0)} in ${topHolding.symbol}? Someone's been holding.`,
          `Your ${topHolding.symbol} position is worth ${topHolding.value.toFixed(0)}. Whale alert!`,
          `$${topHolding.value.toFixed(0)} in ${topHolding.symbol}? That's either impressive or you're about to get rekt.`
        ];
        roasts.push(getRandomRoast(whaleRoasts));
        score += 10;
      }
    }

    // Positions-based roasts (using fungible positions API data)
    if (positions && positions.length > 0) {
      const verifiedTokens = positions.filter(pos => pos.verified).length;
      const unverifiedTokens = positions.filter(pos => !pos.verified).length;
      const totalPositions = positions.length;
      
      if (unverifiedTokens > verifiedTokens) {
        const unverifiedRoasts = [
          `${unverifiedTokens} unverified tokens? You're either a genius or you have a death wish.`,
          `You're holding ${unverifiedTokens} unverified tokens. That's not investing, that's gambling with extra steps.`,
          `${unverifiedTokens} unverified tokens. Your risk tolerance is either legendary or you're just reckless.`,
          `You've got ${unverifiedTokens} unverified tokens. I respect the audacity, but maybe check what you're buying?`
        ];
        roasts.push(getRandomRoast(unverifiedRoasts));
        score -= 10;
      }
      
      if (totalPositions > 20) {
        const manyPositionsRoasts = [
          `${totalPositions} different tokens? You're not diversifying, you're collecting digital Pokemon.`,
          `You're holding ${totalPositions} tokens. At this point, you're just hoarding digital assets.`,
          `${totalPositions} positions? You're either a genius or you have commitment issues.`,
          `You've got ${totalPositions} different tokens. That's not a portfolio, that's a digital garage sale.`
        ];
        roasts.push(getRandomRoast(manyPositionsRoasts));
        score -= 5;
      }
      
      if (totalPositions === 1) {
        const singleTokenRoasts = [
          "Only one token? You're either a maxi or you're just getting started. I'm betting on maxi.",
          "One token. One. Either you're a genius or you're playing it way too safe.",
          "Single token holder. You're either a true believer or you forgot to diversify.",
          "One token? That's not a portfolio, that's a single bet with extra steps."
        ];
        roasts.push(getRandomRoast(singleTokenRoasts));
        score += 5;
      }
      
      // Zero-value positions roast
      const zeroValuePositions = positions.filter(pos => pos.value === 0 || pos.value === null).length;
      if (zeroValuePositions > 0) {
        const zeroValueRoasts = [
          `You've got ${zeroValuePositions} tokens worth $0. That's not a portfolio, that's a graveyard.`,
          `${zeroValuePositions} positions worth nothing? You're collecting digital dust.`,
          `You're holding ${zeroValuePositions} worthless tokens. At least they're not taking up physical space.`,
          `${zeroValuePositions} $0 positions. Your portfolio is like a museum of bad decisions.`
        ];
        roasts.push(getRandomRoast(zeroValueRoasts));
        score -= 10;
      }
    }

    // Transaction-based roasts (using transactions API data)
    if (transactionInsights) {
      const { totalTransactions, failedTransactions, totalFeesPaid, recentActivity, tradingPatterns, topTokensTraded, mostUsedOperationType, averageFeePerTransaction } = transactionInsights;
      const successRate = totalTransactions > 0 ? (transactionInsights.successfulTransactions / totalTransactions) * 100 : 0;
      
      // High failure rate roasts
      if (successRate < 70 && totalTransactions > 5) {
        const failureRoasts = [
          `${Math.round(100 - successRate)}% failure rate? You're not trading, you're just burning money.`,
          `You've failed ${failedTransactions} transactions. At this point, you're just paying for expensive lessons.`,
          `${Math.round(100 - successRate)}% of your transactions fail. Maybe try reading the instructions first?`,
          `You're so bad at this that even failed transactions are learning from your mistakes.`
        ];
        roasts.push(getRandomRoast(failureRoasts));
        score -= 15;
      }
      
      // High fees roasts
      if (totalFeesPaid > 10) {
        const feeRoasts = [
          `You've paid ${totalFeesPaid.toFixed(2)} in fees. That's more than most people spend on groceries.`,
          `${totalFeesPaid.toFixed(2)} in fees? You're single-handedly keeping the network alive.`,
          `Your fee payments could fund a small country. At least you're contributing to the ecosystem.`,
          `You've paid more in fees than most people's portfolios. That's... impressive?`
        ];
        roasts.push(getRandomRoast(feeRoasts));
        score -= 5;
      }
      
      // Average fee per transaction roasts
      if (averageFeePerTransaction > 0.01 && totalTransactions > 10) {
        const avgFeeRoasts = [
          `$${averageFeePerTransaction.toFixed(4)} average fee per transaction? You're paying premium prices for basic moves.`,
          `Your average fee is ${averageFeePerTransaction.toFixed(4)}. You're not optimizing, you're just throwing money away.`,
          `$${averageFeePerTransaction.toFixed(4)} per transaction? That's more than some people make per hour.`
        ];
        roasts.push(getRandomRoast(avgFeeRoasts));
        score -= 5;
      }
      
      // Operation type roasts
      if (mostUsedOperationType) {
        if (mostUsedOperationType === 'execute') {
          const executeRoasts = [
            "Your favorite operation is 'execute'? You're executing alright... executing your profits.",
            "Most used operation: execute. You're executing transactions faster than your brain can process.",
            "Execute operations? More like executing your portfolio value."
          ];
          roasts.push(getRandomRoast(executeRoasts));
          score -= 5;
        } else if (mostUsedOperationType === 'receive') {
          const receiveRoasts = [
            "Most operations are 'receive'? You're not a trader, you're a charity case.",
            "Favorite operation: receive. You're collecting handouts, not making moves.",
            "Receiving is your main activity? You're not trading, you're just accepting donations."
          ];
          roasts.push(getRandomRoast(receiveRoasts));
          score -= 10;
        } else if (mostUsedOperationType === 'send') {
          const sendRoasts = [
            "Most operations are 'send'? You're sending money away faster than you make it.",
            "Favorite operation: send. You're not investing, you're donating.",
            "Sending is your main activity? You're giving away your money more than trading it."
          ];
          roasts.push(getRandomRoast(sendRoasts));
          score -= 5;
        }
      }
      
      // Top tokens traded roasts
      if (topTokensTraded && topTokensTraded.length > 0) {
        const topTradedToken = topTokensTraded[0];
        if (topTradedToken.count > 20) {
          const frequentTradingRoasts = [
            `You've traded ${topTradedToken.symbol} ${topTradedToken.count} times. You're either a day trader or obsessed.`,
            `${topTradedToken.count} trades of ${topTradedToken.symbol}? You're not trading, you're stalking a token.`,
            `You've traded ${topTradedToken.symbol} ${topTradedToken.count} times. That's commitment... or addiction.`
          ];
          roasts.push(getRandomRoast(frequentTradingRoasts));
          score -= 5;
        }
      }
      
      // Inactive trader roasts
      if (recentActivity === 0 && totalTransactions > 0) {
        const inactiveRoasts = [
          "Zero activity in the last week. Did you forget you have a wallet?",
          "No recent transactions. Are you hibernating or just gave up?",
          "Your wallet is gathering dust faster than a museum exhibit.",
          "Last activity: never. Your wallet is more inactive than a sloth on sedatives."
        ];
        roasts.push(getRandomRoast(inactiveRoasts));
        score -= 10;
      }
      
      // Overactive trader roasts
      if (recentActivity > 50) {
        const overactiveRoasts = [
          `${recentActivity} transactions in a week? You need help, not more tokens.`,
          "You're trading so much, even day traders think you need to chill.",
          `${recentActivity} transactions? Your finger must be permanently stuck on the buy button.`,
          "You're not trading, you're having a digital seizure."
        ];
        roasts.push(getRandomRoast(overactiveRoasts));
        score -= 5;
      }
      
      // Risk level roasts
      if (tradingPatterns.riskLevel === 'high') {
        const riskRoasts = [
          "High risk trader? More like high risk of losing everything.",
          "Your risk tolerance is higher than a skydiver without a parachute.",
          "You're not a risk taker, you're a risk collector.",
          "Your risk level is so high, even casinos are concerned."
        ];
        roasts.push(getRandomRoast(riskRoasts));
        score -= 10;
      }
      
      // Low activity roasts
      if (totalTransactions === 0) {
        const noActivityRoasts = [
          "Zero transactions. Your wallet is more empty than a politician's promises.",
          "No transactions? Even a rock has more activity than your wallet.",
          "Your wallet is so inactive, it's practically in a coma.",
          "Zero activity. Your wallet is the digital equivalent of a ghost town."
        ];
        roasts.push(getRandomRoast(noActivityRoasts));
        score -= 20;
      }
    }

    // Add some random general roasts based on portfolio value for extra spice
    const randomGeneralRoasts = [
      "Your portfolio is like a participation trophy - you showed up, but that's about it.",
      "I've seen more action in a library than in your trading history.",
      "Your wallet is so empty, even dust doesn't want to settle in it.",
      "You're not a trader, you're a collector of bad decisions.",
      "Your portfolio is proof that 'HODL' is just an excuse for not knowing what you're doing.",
      "You're the reason why people think crypto is gambling.",
      "Your trading strategy is about as sophisticated as a coin flip.",
      "You're not investing, you're just throwing money at random tokens and hoping for the best."
    ];

    // Add 1-2 random roasts for extra variety (but not too many)
    if (Math.random() < 0.3) { // 30% chance
      roasts.push(getRandomRoast(randomGeneralRoasts));
    }

  // TODO: Uncomment these when we use all API routes
  /*
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
  */

  // DYNAMIC PERSONALITY VARIATIONS - Add some randomness to personalities too
  const personalityVariations: { [key: string]: { personalities: string[], emojis: string[], badges: string[] } } = {
    "Crypto Ghost": {
      personalities: ["Crypto Ghost", "Digital Phantom", "Wallet Specter", "Blockchain Ghost", "Crypto Casper"],
      emojis: ["👻", "👻", "👻", "👻", "👻"],
      badges: ["Wallet Collector", "Ghost Trader", "Empty Wallet Master", "Zero Balance Champion", "Digital Ghost"]
    },
    "Budget Trader": {
      personalities: ["Budget Trader", "Penny Pincher", "Micro Investor", "Small Change Specialist", "Budget Crypto"],
      emojis: ["🍜", "🍜", "🍜", "🍜", "🍜"],
      badges: ["Ramen Noodle Investor", "Budget Baller", "Small Change Champion", "Penny Trader", "Micro Portfolio Master"]
    },
    "Casual Investor": {
      personalities: ["Casual Investor", "Weekend Warrior", "Part-Time Trader", "Casual Crypto", "Side Hustle Investor"],
      emojis: ["😐", "😐", "😐", "😐", "😐"],
      badges: ["Middle of the Pack", "Casual Trader", "Weekend Warrior", "Part-Time Investor", "Side Hustle Master"]
    },
    "Moderate Investor": {
      personalities: ["Moderate Investor", "Steady Eddie", "Balanced Trader", "Moderate Crypto", "Steady Investor"],
      emojis: ["📊", "📊", "📊", "📊", "📊"],
      badges: ["Steady Eddie", "Moderate Master", "Balanced Trader", "Steady Investor", "Moderate Champion"]
    },
    "Diamond Hands": {
      personalities: ["Diamond Hands", "HODL Master", "Long-term Holder", "Diamond Investor", "HODL Champion"],
      emojis: ["💎", "💎", "💎", "💎", "💎"],
      badges: ["HODL Master", "Diamond Hands", "Long-term Holder", "HODL Champion", "Diamond Investor"]
    },
    "Crypto Whale": {
      personalities: ["Crypto Whale", "Big Fish", "Whale Investor", "Crypto Titan", "Blockchain Whale"],
      emojis: ["🐋", "🐋", "🐋", "🐋", "🐋"],
      badges: ["Whale Alert", "Big Fish", "Whale Investor", "Crypto Titan", "Blockchain Whale"]
    }
  };

  // Apply personality variations if available
  if (personalityVariations[personality]) {
    const variations = personalityVariations[personality];
    const randomIndex = Math.floor(Math.random() * variations.personalities.length);
    personality = variations.personalities[randomIndex];
    personalityEmoji = variations.emojis[randomIndex];
    badge = variations.badges[randomIndex];
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

