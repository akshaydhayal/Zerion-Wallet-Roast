# 🚀 Getting Started with Wallet Roast

## ✅ Project is Ready!

Your **Wallet Roast** dApp has been successfully created! Here's everything you need to know to get it running.

## 📋 What's Been Built

A complete Next.js application with:
- ✅ Wallet connection (Solana)
- ✅ Zerion API integration
- ✅ Roast generation algorithm
- ✅ Beautiful UI with animations
- ✅ Share & download functionality
- ✅ Complete documentation

## 🏃 Quick Start (3 Steps)

### Step 1: Install Dependencies

```bash
npm install
```

This will install all required packages (~2-5 minutes).

### Step 2: Set Up API Key

You need a Zerion API key. Get it here: https://zerion-io.typeform.com/to/QI3GRa7t

**Option A: Use the setup script**
```bash
node setup.js
```

**Option B: Create .env.local manually**
```bash
# Create the file
echo NEXT_PUBLIC_ZERION_API_KEY=your_key_here > .env.local
```

Replace `your_key_here` with your actual API key.

### Step 3: Run the App

```bash
npm run dev
```

Open http://localhost:3000 🎉

## 📁 Project Structure

```
wallet-roast/
├── 📱 app/                     # Next.js app
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Home page
│   └── globals.css            # Styles
│
├── 🧩 components/             # React components
│   ├── WalletProvider.tsx     # Solana wallet setup
│   ├── Hero.tsx               # Landing page hero
│   ├── WalletConnector.tsx    # Connect wallet UI
│   ├── RoastGenerator.tsx     # Main roast logic
│   ├── RoastCard.tsx          # Display roast
│   ├── LoadingAnimation.tsx   # Loading state
│   └── Footer.tsx             # Footer
│
├── 🔧 lib/                    # Core logic
│   ├── zerionApi.ts           # Zerion API calls
│   └── roastGenerator.ts      # Roast algorithm
│
├── 📝 types/                  # TypeScript types
│   └── index.ts               # Type definitions
│
└── 📚 Documentation
    ├── README.md              # Main documentation
    ├── QUICKSTART.md          # Quick start guide
    ├── INSTALLATION.md        # Detailed setup
    ├── DEPLOYMENT.md          # Deploy guide
    ├── DEMO_SCRIPT.md         # Video script
    ├── CONTRIBUTING.md        # How to contribute
    └── PROJECT_SUMMARY.md     # Complete overview
```

## 🎮 How to Use the App

1. **Open the app** at http://localhost:3000
2. **Click "Connect Wallet"**
3. **Select your Solana wallet** (Phantom, Solflare, etc.)
4. **Approve the connection** in your wallet
5. **Click "Get Roasted Now"**
6. **Wait 5-10 seconds** for data fetching
7. **View your roast!** 🔥
8. **Share or download** your roast card

## 🔑 Getting Your API Key

1. Go to: https://zerion-io.typeform.com/to/QI3GRa7t
2. Fill out the form (30 seconds)
3. Receive API key instantly via email
4. Add to `.env.local` file

**Free tier limits:**
- 1000 requests/day
- 10 requests/second
- Full API access

## 🎯 Key Features

### For Users
- 🔌 One-click wallet connection
- 📊 Real-time portfolio analysis
- 😂 Hilarious personalized roasts
- 🏆 Personality type assignment
- 📱 Share on social media
- 💾 Download as image

### Technical Features
- ⚡ Next.js 14 (App Router)
- 🔷 TypeScript
- 🎨 Tailwind CSS
- 🎬 Framer Motion animations
- 🔗 Zerion API (4 endpoints)
- 💼 Solana Web3.js
- 🌐 Wallet Adapter

## 📊 Zerion API Usage

This app uses 4 Zerion API endpoints:

1. **Portfolio**: `/wallets/{address}/portfolio`
   - Total portfolio value
   - Asset distribution

2. **Positions**: `/wallets/{address}/positions`
   - Top holdings
   - Token metadata

3. **PnL**: `/wallets/{address}/pnl`
   - Profit/loss calculations
   - Performance metrics

4. **Transactions**: `/wallets/{address}/transactions`
   - Trading history
   - Activity patterns

## 🎨 Customization

### Change Roast Logic
Edit `lib/roastGenerator.ts`:
```typescript
// Add your own roast conditions
if (portfolioValue < 5) {
  roasts.push("Your custom roast here!");
}
```

### Change Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  'brand': '#YOUR_COLOR',
}
```

### Add More Features
- Check `CONTRIBUTING.md` for guidelines
- All code is documented
- TypeScript helps with types

## 🚀 Deploy to Production

### Quick Deploy (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add your API key when prompted
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

### Other Platforms
- Netlify
- Railway
- AWS Amplify
- Self-hosted

## 🎬 Create Demo Video

For the hackathon submission, you need a demo video:

1. **Script**: Use [DEMO_SCRIPT.md](./DEMO_SCRIPT.md)
2. **Duration**: 4-5 minutes max
3. **Content**:
   - Show app features
   - Explain Zerion API usage
   - Demo wallet connection
   - Show roast generation
   - Highlight sharing

**Recording tips:**
- Use OBS or Loom
- Record in 1080p
- Add background music
- Include text overlays
- Show real wallet connection

## 📝 Hackathon Submission

### Checklist

- ✅ Application built
- ✅ Zerion API integrated
- ✅ GitHub repository ready
- ✅ Documentation complete
- ⏳ Deploy to production
- ⏳ Record demo video
- ⏳ Submit to hackathon

### What to Submit

1. **Live URL**: Deploy to Vercel (free)
2. **GitHub Repo**: Public repository
3. **Demo Video**: YouTube (unlisted)
4. **Description**: Use README summary

### Submission Text Template

```
Project: Wallet Roast
Tagline: Get Roasted by Your Bags

Wallet Roast is a humorous consumer dApp that analyzes Solana 
wallets and generates personalized roasts based on onchain behavior. 

Built with Next.js and powered by Zerion API, it fetches portfolio 
data, PnL, and transaction history to create entertaining, shareable 
roast cards.

Live Demo: [Your Vercel URL]
GitHub: [Your GitHub URL]
Video: [Your YouTube URL]

Tech Stack: Next.js 14, TypeScript, Solana Web3.js, Zerion API, 
Tailwind CSS, Framer Motion
```

## 🐛 Troubleshooting

### "Module not found" errors
```bash
rm -rf node_modules .next
npm install
npm run dev
```

### "API key not found"
- Check `.env.local` exists
- Verify key is correct
- Restart dev server

### Wallet won't connect
- Install wallet extension (Phantom recommended)
- Switch to Mainnet in wallet
- Refresh the page
- Clear browser cache

### Port 3000 in use
```bash
npm run dev -- -p 3001
```

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Solana Documentation](https://solana.com/docs)
- [Zerion API Docs](https://developers.zerion.io)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 🎯 Next Steps

1. ✅ **Test the app locally**
   - Run `npm run dev`
   - Connect a wallet
   - Generate a roast

2. ✅ **Customize if desired**
   - Add more roasts
   - Change styling
   - Add features

3. ✅ **Deploy to production**
   - Use Vercel (recommended)
   - Add API key in settings
   - Test live deployment

4. ✅ **Record demo video**
   - Follow script in DEMO_SCRIPT.md
   - Keep under 5 minutes
   - Upload to YouTube

5. ✅ **Submit to hackathon**
   - Fill submission form
   - Include all links
   - Submit before deadline

## 💡 Pro Tips

- **Test with real wallets**: Use wallets with actual history for better roasts
- **Check mobile**: Test on phone for responsive design
- **Share early**: Get feedback from community
- **Monitor API usage**: Stay within free tier limits
- **Document everything**: Good docs help adoption

## 🆘 Need Help?

- **Issues**: [GitHub Issues](https://github.com/yourusername/wallet-roast/issues)
- **Questions**: Read the docs in this repo
- **Bugs**: Open an issue with reproduction steps

## 🎉 You're Ready!

Everything is set up and ready to go. Just:

1. Get your Zerion API key
2. Run `npm install`
3. Run `npm run dev`
4. Start roasting wallets! 🔥

**Good luck with the hackathon! 🚀**

---

**Built with ❤️ for Cypherpunk Hackathon**  
**Powered by Zerion API 💜**

