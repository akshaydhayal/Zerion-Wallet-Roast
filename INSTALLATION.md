# 📦 Installation Instructions

Complete installation guide for Wallet Roast.

## 📋 System Requirements

### Minimum Requirements

- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 8.0.0 or higher (comes with Node.js)
- **RAM**: 2GB minimum, 4GB recommended
- **Storage**: 500MB free space
- **OS**: Windows 10+, macOS 10.15+, or Linux

### Recommended Setup

- **Node.js**: Version 20.x LTS
- **npm**: Version 10.x
- **Code Editor**: VS Code with extensions:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - TypeScript and JavaScript Language Features

## 🚀 Installation Methods

### Method 1: Standard Installation (Recommended)

#### Step 1: Install Node.js

**Windows / macOS:**
1. Download from [nodejs.org](https://nodejs.org/)
2. Run the installer
3. Verify installation:
```bash
node --version  # Should show v18.0.0 or higher
npm --version   # Should show 8.0.0 or higher
```

**Linux (Ubuntu/Debian):**
```bash
# Using NodeSource
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify
node --version
npm --version
```

#### Step 2: Clone the Repository

```bash
# Via HTTPS
git clone https://github.com/yourusername/wallet-roast.git

# Or via SSH
git clone git@github.com:yourusername/wallet-roast.git

# Navigate to directory
cd wallet-roast
```

#### Step 3: Install Dependencies

```bash
# Install all npm packages
npm install

# This will install:
# - Next.js 14
# - React 18
# - Solana Web3.js
# - Wallet Adapter packages
# - Framer Motion
# - Tailwind CSS
# - TypeScript
# - And all other dependencies
```

**Expected installation time**: 2-5 minutes depending on internet speed

#### Step 4: Configure Environment

```bash
# Copy the example environment file
cp .env.local.example .env.local

# Edit the file
nano .env.local  # or use your preferred editor
```

Add your Zerion API key:
```env
NEXT_PUBLIC_ZERION_API_KEY=your_api_key_here
```

**Get your API key**: https://zerion-io.typeform.com/to/QI3GRa7t

#### Step 5: Run Development Server

```bash
npm run dev
```

The app will be available at: http://localhost:3000

### Method 2: Quick Install Script

For Unix-based systems (macOS/Linux):

```bash
# Download and run install script
curl -fsSL https://raw.githubusercontent.com/yourusername/wallet-roast/main/scripts/install.sh | bash
```

This will:
1. Check Node.js installation
2. Clone the repository
3. Install dependencies
4. Prompt for API key
5. Start the dev server

### Method 3: Using Docker (Advanced)

```bash
# Clone repository
git clone https://github.com/yourusername/wallet-roast.git
cd wallet-roast

# Create .env.local with your API key
echo "NEXT_PUBLIC_ZERION_API_KEY=your_key" > .env.local

# Build and run with Docker
docker build -t wallet-roast .
docker run -p 3000:3000 wallet-roast
```

## 🔑 Getting Zerion API Key

### Step-by-Step

1. **Go to the form**: https://zerion-io.typeform.com/to/QI3GRa7t
2. **Fill out the form**:
   - Name
   - Email
   - Company/Project: "Wallet Roast - Hackathon Project"
   - Use Case: "Consumer app for Cypherpunk Hackathon"
3. **Submit**: You'll receive your API key instantly via email
4. **Add to .env.local**: Copy the key to your environment file

### API Key Limits (Free Tier)

- **Rate Limit**: 1000 requests/day
- **Requests per second**: 10 RPS
- **Features**: Full API access

For production use, consider upgrading to a paid plan.

## ✅ Verify Installation

Run these checks to ensure everything is working:

### 1. Check Dependencies

```bash
npm list --depth=0
```

Should show all required packages installed.

### 2. Check TypeScript

```bash
npx tsc --noEmit
```

Should show no errors.

### 3. Check Linting

```bash
npm run lint
```

Should pass with no errors.

### 4. Build Test

```bash
npm run build
```

Should complete successfully.

### 5. Run Development Server

```bash
npm run dev
```

Open http://localhost:3000 and you should see the landing page.

## 🐛 Common Installation Issues

### Issue: "Node version too old"

```bash
# Update Node.js
npm install -g n
sudo n latest
```

### Issue: "npm install fails"

```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Issue: "Command not found: npm"

Node.js is not properly installed. Reinstall Node.js from [nodejs.org](https://nodejs.org/).

### Issue: "EACCES: permission denied"

```bash
# Fix npm permissions (Linux/macOS)
sudo chown -R $USER ~/.npm
sudo chown -R $USER /usr/local/lib/node_modules
```

### Issue: "Port 3000 already in use"

```bash
# Find and kill the process
lsof -ti:3000 | xargs kill -9

# Or use a different port
npm run dev -- -p 3001
```

### Issue: "Module not found" errors

```bash
# Reinstall dependencies
rm -rf node_modules .next
npm install
npm run dev
```

### Issue: "API key not working"

1. Check if the key is correctly added to `.env.local`
2. Make sure the file name is exactly `.env.local`
3. Restart the dev server after adding the key
4. Check for extra spaces or quotes around the key

## 📱 Install Solana Wallet (For Testing)

You'll need a Solana wallet to test the app:

### Phantom (Recommended)

1. **Chrome/Brave**: [Chrome Web Store](https://chrome.google.com/webstore/detail/phantom/bfnaelmomeimhlpmgjnjophhpkkoljpa)
2. **Firefox**: [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/phantom-app/)
3. **Mobile**: Download from App Store or Google Play

### Solflare

1. **Browser**: [solflare.com](https://solflare.com/)
2. **Mobile**: Available on iOS and Android

### Setup Wallet

1. Install the extension
2. Create a new wallet or import existing
3. Switch to **Mainnet** (important!)
4. Get some SOL for testing if needed

## 🔄 Updating

To update to the latest version:

```bash
# Pull latest changes
git pull origin main

# Update dependencies
npm install

# Rebuild
npm run build

# Restart dev server
npm run dev
```

## 🧹 Uninstall

To completely remove the project:

```bash
# Remove project directory
cd ..
rm -rf wallet-roast

# Optional: Clear npm cache
npm cache clean --force
```

## 📚 Next Steps

After installation:

1. ✅ Read [QUICKSTART.md](./QUICKSTART.md) for first use
2. ✅ Check [README.md](./README.md) for full documentation
3. ✅ Review [DEPLOYMENT.md](./DEPLOYMENT.md) to deploy
4. ✅ See [CONTRIBUTING.md](./CONTRIBUTING.md) to contribute

## 💡 Development Tips

### Hot Reload

The dev server automatically reloads on file changes. No need to restart!

### Environment Variables

Changes to `.env.local` require a server restart:
```bash
# Stop server (Ctrl+C)
# Restart
npm run dev
```

### Debugging

Add console logs anywhere:
```typescript
console.log('Debug info:', someVariable);
```

View logs in:
- **Browser Console**: F12 → Console tab
- **Terminal**: Where you ran `npm run dev`

### Building for Production

Test the production build locally:
```bash
npm run build
npm start
```

## 🆘 Get Help

If you're stuck:

1. Check [Troubleshooting](#common-installation-issues)
2. Read the [FAQ](./README.md#faq)
3. [Open an issue](https://github.com/yourusername/wallet-roast/issues)
4. Ask in the Hackathon Discord

## 📦 Package Manager Alternatives

### Using Yarn

```bash
# Install Yarn
npm install -g yarn

# Install dependencies
yarn install

# Run dev server
yarn dev
```

### Using pnpm

```bash
# Install pnpm
npm install -g pnpm

# Install dependencies
pnpm install

# Run dev server
pnpm dev
```

---

**Installation complete! 🎉 Ready to roast some wallets! 🔥**

