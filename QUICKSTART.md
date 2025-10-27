# ⚡ Quick Start Guide

Get Wallet Roast running in 5 minutes!

## 🎯 Prerequisites

- Node.js 18+ ([Download](https://nodejs.org/))
- A code editor (VS Code recommended)
- A Solana wallet (Phantom, Solflare, etc.)

## 🚀 Setup (5 minutes)

### 1. Clone & Install (2 minutes)

```bash
# Clone the repo
git clone https://github.com/yourusername/wallet-roast.git
cd wallet-roast

# Install dependencies
npm install
```

### 2. Get Zerion API Key (2 minutes)

1. Go to: https://zerion-io.typeform.com/to/QI3GRa7t
2. Fill out the form (takes 30 seconds)
3. Receive your API key via email instantly

### 3. Configure Environment (30 seconds)

```bash
# Copy the example env file
cp .env.local.example .env.local

# Edit .env.local and add your key
# NEXT_PUBLIC_ZERION_API_KEY=your_key_here
```

Or manually create `.env.local`:

```env
NEXT_PUBLIC_ZERION_API_KEY=your_zerion_api_key_here
```

### 4. Run the App (30 seconds)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

## 🎮 First Use

1. **Connect Wallet**: Click "Connect Wallet" button
2. **Approve Connection**: Approve in your wallet popup
3. **Get Roasted**: Click "Get Roasted Now"
4. **Wait**: The app fetches your wallet data (~5 seconds)
5. **Enjoy**: Read your roast and share it!

## 🐛 Troubleshooting

### "API Key not found" error

✅ **Fix**: Make sure `.env.local` exists with your API key  
✅ **Fix**: Restart the dev server after adding the key

### Wallet won't connect

✅ **Fix**: Make sure you have a Solana wallet extension installed  
✅ **Fix**: Try refreshing the page  
✅ **Fix**: Check if the wallet extension is unlocked

### "Failed to fetch wallet data"

✅ **Fix**: Verify your API key is correct  
✅ **Fix**: Check if you have an active internet connection  
✅ **Fix**: Try with a different wallet address

### Build errors

```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run dev
```

## 📚 Next Steps

- Read the full [README.md](./README.md) for detailed documentation
- Check [DEPLOYMENT.md](./DEPLOYMENT.md) to deploy your app
- Review [DEMO_SCRIPT.md](./DEMO_SCRIPT.md) for demo video ideas

## 💡 Quick Tips

- **Development**: Changes auto-reload, no need to restart
- **Testing**: Try with multiple wallets to see different roasts
- **Sharing**: Use the share button to share on social media
- **Customizing**: Edit `lib/roastGenerator.ts` to add your own roasts

## 🎨 Customization Ideas

Want to make it your own?

1. **Add more roasts**: Edit `lib/roastGenerator.ts`
2. **Change colors**: Modify `tailwind.config.ts`
3. **Update branding**: Change logo in `public/logo.svg`
4. **Add features**: Check the "Future Improvements" in README

## 🎬 Demo Video Tips

1. Test with a wallet that has interesting data
2. Record in 1080p or higher
3. Show the full user flow
4. Keep it under 5 minutes
5. Add background music and overlays

## 🚀 Ready to Deploy?

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## 🆘 Need Help?

- [Open an issue](https://github.com/yourusername/wallet-roast/issues)
- Check [Zerion API Docs](https://developers.zerion.io)
- Join the Solana Discord
- Ask in the Cypherpunk Hackathon Discord

---

**Happy Roasting! 🔥**

