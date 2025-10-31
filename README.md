# 🔥 Wallet Roast - Get Roasted by Your Bags

Live Project Link: [https://zerion-wallet-roast.vercel.app/](https://zerion-wallet-roast.vercel.app/)

A humorous AI-driven dApp that analyzes your Solana wallet and roasts you mercilessly based on your onchain behavior. Built for the **Colosseum Cypherpunk Hackathon** using the **Zerion API**.

![Wallet Roast Banner](https://img.shields.io/badge/Built%20with-Zerion%20API-purple?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![Solana](https://img.shields.io/badge/Solana-Mainnet-9945FF?style=for-the-badge&logo=solana)

## 🎯 Overview

Wallet Roast is a social and entertaining consumer application that leverages the Zerion API to provide users with a unique, humorous take on their crypto trading habits. Connect your Solana wallet and get hilariously roasted based on:

- 💰 **Portfolio Value & Holdings** - What you own and how much it's worth
- 📈 **Profit & Loss (PnL)** - Your gains and losses (mostly losses)
- 🔄 **Trading Frequency** - How often you panic sell
- 💎 **Staking Behavior** - Your commitment to the network
- 🤡 **Transaction Patterns** - All those questionable swaps

## ✨ Features

- **🔌 Wallet Connection**: Seamless integration with Solana wallets (Phantom, Solflare, etc.)
- **📊 Real-time Data**: Fetches live portfolio, PnL, and transaction data via Zerion API
- **🎭 AI-Powered Roasts**: Generates personalized, savage roasts based on your wallet behavior
- **🏆 Personality Meter**: Get labeled as a Degen, Diamond Hands, HODL Master, or Ghost
- **📱 Share & Download**: Share your roast on social media or download as an image
- **🎨 Beautiful UI**: Stunning gradients, smooth animations, and glassmorphism effects
- **⚡ Fast & Responsive**: Built with Next.js 14 and optimized for performance

## Website Demo

![Mission Dashboard](https://github.com/akshaydhayal/Zerion-Wallet-Roast/blob/main/roast%20assets/Screenshot%202025-10-31%20135033.png)

*Figure 1: Home Page.*

![Mission Details](https://github.com/akshaydhayal/Zerion-Wallet-Roast/blob/main/roast%20assets/Wallet-Roast-Get-Roasted-by-Your-Bags.png)

*Figure 2: Wallet Roast Page*

![Mission Details](https://github.com/akshaydhayal/Zerion-Wallet-Roast/blob/main/roast%20assets/Wallet-Roast-Get-Roasted-by-Your-Bags%20(1).png)

*Figure 2: Wallet Analysis Page*

## 🎥 Demo Video

[https://www.loom.com/share/7958effc7ecd4721bbe2eb7c44b3606a](https://www.loom.com/share/7958effc7ecd4721bbe2eb7c44b3606a)

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (React 18), TypeScript
- **Styling**: Tailwind CSS, Framer Motion (animations)
- **Blockchain**: Solana Web3.js, Wallet Adapter
- **API**: Zerion API (Portfolio, PnL, Transactions)
- **Image Export**: html-to-image
- **Icons**: Lucide React

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- npm or yarn package manager
- A Zerion API key (get it [here](https://zerion-io.typeform.com/to/QI3GRa7t?utm_source=cypherpunk))

## 🔧 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/wallet-roast.git
cd wallet-roast
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_ZERION_API_KEY=your_zerion_api_key_here
```

> **Important**: Get your free Zerion API key at: https://zerion-io.typeform.com/to/QI3GRa7t

### 4. Run the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎮 How to Use

1. **Connect Wallet**: Click "Connect Wallet" and choose your Solana wallet
2. **Get Roasted**: Click "Get Roasted Now" to analyze your wallet
3. **View Results**: See your personalized roast, personality type, and wallet score
4. **Share**: Share your roast on social media or download it as an image
5. **Repeat**: Connect a different wallet to get roasted again!

## 🔗 Zerion API Integration

This application uses the following Zerion API endpoints:

### Portfolio Overview
```typescript
GET /v1/wallets/{address}/portfolio?currency=usd
```
Returns total portfolio value and distribution by asset type.

### Wallet Positions
```typescript
GET /v1/wallets/{address}/positions?filter[positions]=only_simple&sort=value
```
Fetches top holdings with token metadata.

### Profit & Loss (PnL)
```typescript
GET /v1/wallets/{address}/pnl?currency=usd
```
Returns realized/unrealized profits, total profit percentage.

### Transaction History
```typescript
GET /v1/wallets/{address}/transactions?page[size]=100
```
Retrieves recent transactions for activity analysis.

## 🎨 Key Components

### Core Components

- **`Hero.tsx`**: Landing page hero section with animations
- **`WalletConnector.tsx`**: Wallet connection UI with multi-wallet support
- **`RoastGenerator.tsx`**: Main roast generation logic and flow
- **`RoastCard.tsx`**: Beautiful roast display with stats and sharing
- **`LoadingAnimation.tsx`**: Engaging loading screen during data fetch


## 🎯 Roast Algorithm

The roast generator analyzes multiple factors:

1. **Trading Frequency**:
   - Degen (20+ txs/week): High activity, maximum roasts
   - Active (10-20 txs/week): Regular trader
   - Moderate (3-10 txs/week): Casual investor
   - HODL (<3 txs/week): Diamond hands
   - Ghost (0 txs): Inactive wallet

2. **Portfolio Value**:
   - $0: Maximum roast intensity
   - $1-$100: Budget trader roasts
   - $100-$1K: Middle-class crypto
   - $1K-$10K: Respectable bags
   - $10K+: Whale status

3. **PnL Performance**:
   - <-50%: Savage destruction
   - -50% to 0%: Gentle mockery
   - 0% to 50%: Moderate praise
   - >50%: Impressed congratulations

4. **Holdings Analysis**:
   - Meme coins: Maximum roasting
   - Concentration risk: Diversification jokes
   - Staking: Commitment recognition

## 📊 Scoring System

The Wallet Score (0-100) is calculated based on:

- Trading behavior (+/- 20 points)
- Portfolio value (+/- 25 points)
- PnL performance (+/- 30 points)
- Holdings quality (+/- 15 points)
- Staking participation (+/- 10 points)

## 🏆 Personality Types

- **🤡 Certified Degen**: Overactive trader, lives on the blockchain
- **📈 Active Trader**: Regular activity, tries to time the market
- **😐 Casual Investor**: Moderate trading, just vibing
- **💎 Diamond Hands**: True HODLer, never sells
- **👻 Crypto Ghost**: Inactive wallet, possibly lost password


## 🚧 Future Improvements

- [ ] AI/LLM integration for more dynamic roasts
- [ ] NFT minting of roast cards
- [ ] Leaderboard of worst/best wallets
- [ ] Multi-chain support (Ethereum, Polygon, etc.)
- [ ] Historical roast comparisons
- [ ] Friend challenges and competitions
- [ ] More roast templates and variations
- [ ] Social feed of roasts

## 📄 License

MIT License - feel free to fork and build upon this!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
