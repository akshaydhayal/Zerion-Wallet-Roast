import { WalletData, RoastResult } from '@/types';
import { GoogleGenAI } from '@google/genai';

export async function generateAIRoast(walletData: WalletData): Promise<RoastResult> {
  try {
    // Check if Gemini API key is available
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    console.log('🔑 API Key Debug:', {
      hasKey: !!apiKey,
      keyLength: apiKey?.length || 0,
      keyStart: apiKey?.substring(0, 10) + '...' || 'none',
      env: process.env.NODE_ENV
    });
    
    if (!apiKey || apiKey === 'your_gemini_key_here') {
      console.warn('⚠️ NEXT_PUBLIC_GEMINI_API_KEY not found or not configured, using fallback');
      return generateFallbackRoast(walletData);
    }
    
    // Initialize Gemini client directly in the browser
    const ai = new GoogleGenAI({ apiKey });
    
    // Create a detailed prompt for AI roast generation
    const prompt = createRoastPrompt(walletData);
    
    console.log('🤖 Calling Gemini directly from frontend...');
    console.log('📝 Prompt:', prompt);
    
    // Call Gemini directly
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are a witty, sarcastic crypto analyst who roasts wallets with humor and insight. Keep it light-hearted, clever, and a bit savage. Use emojis sparingly.\n\n${prompt}`,
    });

    const aiResponse = response.text;
    
    if (!aiResponse) {
      throw new Error('No response from AI');
    }

    console.log('🤖 AI Response:', aiResponse);
    
    // Parse the AI response and create roast result
    const roastResult = parseAIResponse(aiResponse, walletData);
    console.log('🎯 Final roast result:', JSON.stringify(roastResult, null, 2));
    
    return roastResult;
    
  } catch (error) {
    console.error('AI Roast generation failed:', error);
    console.log('🔄 Falling back to static roasts...');
    // Fallback to static roasts if AI fails
    return generateFallbackRoast(walletData);
  }
}

function createRoastPrompt(walletData: WalletData): string {
  const { portfolioValue, distribution, topHoldings, positions, transactionInsights } = walletData;
  
  // Add some randomness to make each roast different
  const randomSeed = Math.random();
  const roastStyles = [
    "savage and brutal",
    "witty and clever", 
    "sarcastic and dry",
    "playfully mean",
    "hilariously harsh",
    "roast master level"
  ];
  
  const selectedStyle = roastStyles[Math.floor(randomSeed * roastStyles.length)];
  
  let prompt = `Generate a ${selectedStyle} roast for this Solana wallet portfolio. 
  Keep it light-hearted and entertaining. Use emojis sparingly but effectively. 
  Focus on the wallet's actual data and make specific, contextual jokes.
  Be creative and original - avoid generic responses.
  The response should be a JSON object with the following structure:
  {
    "mainRoast": "Your main roast message (be creative and specific)",
    "subRoasts": ["Sub roast 1", "Sub roast 2", "Sub roast 3"],
    "personality": "AI Generated Personality Type (be creative)",
    "personalityEmoji": "Appropriate Emoji",
    "badge": "AI Generated Badge (be creative)",
    "score": "A number between 0 and 100 representing how good/bad the wallet is"
  }
  
  Here's the wallet data:
  - Portfolio Value: $${portfolioValue.toFixed(2)}
  - Distribution:
    - Wallet: ${distribution.wallet.toFixed(2)}%
    - Staked: ${distribution.staked.toFixed(2)}%
    - Deposited: ${distribution.deposited.toFixed(2)}%
  
  ${topHoldings && topHoldings.length > 0 ? `
  - Top Holdings (${topHoldings.length} tokens):
    ${topHoldings.slice(0, 5).map((holding, i) => 
      `${i + 1}. ${holding.name} (${holding.symbol}): $${holding.value.toFixed(2)} (${holding.change24h >= 0 ? '+' : ''}${holding.change24h.toFixed(2)}% 24h)`
    ).join('\n    ')}
  ` : ''}
  
  ${positions && positions.length > 0 ? `
  - Total Positions: ${positions.length}
    - Verified Tokens: ${positions.filter(p => p.verified).length}
    - Unverified Tokens: ${positions.filter(p => !p.verified).length}
    - Zero Value Positions: ${positions.filter(p => p.value === 0 || p.value === null).length}
  ` : ''}
  
  ${transactionInsights ? `
  - Transaction Insights:
    - Total Transactions: ${transactionInsights.totalTransactions}
    - Successful: ${transactionInsights.successfulTransactions} (${transactionInsights.totalTransactions > 0 ? ((transactionInsights.successfulTransactions / transactionInsights.totalTransactions) * 100).toFixed(1) : 0}%)
    - Failed: ${transactionInsights.failedTransactions}
    - Total Fees Paid: $${transactionInsights.totalFeesPaid.toFixed(2)}
    - Average Fee: $${transactionInsights.averageFeePerTransaction.toFixed(4)}
    - Recent Activity (7 days): ${transactionInsights.recentActivity} transactions
    - Most Used Operation: ${transactionInsights.mostUsedOperationType}
    - Risk Level: ${transactionInsights.tradingPatterns.riskLevel}
    - Active Trader: ${transactionInsights.tradingPatterns.isActiveTrader ? 'Yes' : 'No'}
    ${transactionInsights.topTokensTraded && transactionInsights.topTokensTraded.length > 0 ? `
    - Top Traded Tokens:
      ${transactionInsights.topTokensTraded.slice(0, 3).map((token, i) => 
        `${i + 1}. ${token.symbol}: ${token.count} trades, $${token.totalValue.toFixed(2)} total`
      ).join('\n      ')}
    ` : ''}
  ` : ''}
  
  Use ALL this data to create a comprehensive, specific roast. Reference specific tokens, transaction patterns, fees, and holdings.
  Make sure the JSON is valid and complete. Be creative and make each roast unique!`;
  
  return prompt;
}

function parseAIResponse(aiResponse: string, walletData: WalletData): RoastResult {
  try {
    // Extract JSON from markdown code blocks if present
    const jsonMatch = aiResponse.match(/```json\n([\s\S]*?)\n```/) || aiResponse.match(/```\n([\s\S]*?)\n```/);
    const jsonString = jsonMatch ? jsonMatch[1] : aiResponse;
    
    const parsed = JSON.parse(jsonString);
    
    // Ensure all fields are present and have correct types
    const mainRoast = typeof parsed.mainRoast === 'string' ? parsed.mainRoast : `AI couldn't roast you properly. Maybe your wallet is too boring.`;
    const subRoasts = Array.isArray(parsed.subRoasts) ? parsed.subRoasts.filter((s: any) => typeof s === 'string') : [];
    const personality = typeof parsed.personality === 'string' ? parsed.personality : "Mysterious Trader";
    const personalityEmoji = typeof parsed.personalityEmoji === 'string' ? parsed.personalityEmoji : "🤔";
    const badge = typeof parsed.badge === 'string' ? parsed.badge : "Crypto Enigma";
    const score = typeof parsed.score === 'number' ? Math.max(0, Math.min(100, parsed.score)) : 50;

    return { mainRoast, subRoasts, personality, personalityEmoji, badge, score };
  } catch (error) {
    console.error("Error parsing AI response, using fallback:", error);
    return generateFallbackRoast(walletData);
  }
}

function generateFallbackRoast(walletData: WalletData): RoastResult {
  const { portfolioValue } = walletData;
  
  // Simple fallback roasts
  if (portfolioValue === 0) {
    return {
      mainRoast: "Portfolio value: $0. At least you can't lose any more money! 📉",
      subRoasts: ["Your wallet is emptier than my social life.", "Zero balance detected. You're either a genius or broke."],
      personality: "Crypto Ghost",
      personalityEmoji: "👻",
      badge: "Wallet Collector",
      score: 20
    };
  } else if (portfolioValue < 100) {
    return {
      mainRoast: `$${portfolioValue.toFixed(2)} portfolio. You're practically living on ramen noodles.`,
      subRoasts: ["At least you can afford instant noodles now!", "Your portfolio is smaller than my last Uber ride."],
      personality: "Budget Trader",
      personalityEmoji: "🍜",
      badge: "Ramen Noodle Investor",
      score: 30
    };
  } else if (portfolioValue < 1000) {
    return {
      mainRoast: `$${portfolioValue.toFixed(2)} portfolio. Not bad, but also... not impressive.`,
      subRoasts: ["You're the middle child of crypto.", "Decent, but your mom still asks if you're 'doing that computer money thing'."],
      personality: "Moderate Investor",
      personalityEmoji: "📊",
      badge: "Steady Eddie",
      score: 60
    };
  } else {
    return {
      mainRoast: `$${portfolioValue.toFixed(2)} portfolio. Look at you, whale! Or wait... is this your parents' money?`,
      subRoasts: ["Damn, save some gains for the rest of us!", "You're either a genius or you inherited this."],
      personality: "Crypto Whale",
      personalityEmoji: "🐋",
      badge: "Whale Alert",
      score: 85
    };
  }
}
