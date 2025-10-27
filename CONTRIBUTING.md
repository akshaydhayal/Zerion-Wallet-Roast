# 🤝 Contributing to Wallet Roast

First off, thanks for taking the time to contribute! 🎉

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Style Guidelines](#style-guidelines)

## 📜 Code of Conduct

This project follows a simple rule: **Be kind and respectful**. We're all here to have fun and build cool stuff.

## 🎯 How Can I Contribute?

### 🐛 Reporting Bugs

Found a bug? Help us fix it!

1. **Check existing issues** to avoid duplicates
2. **Create a new issue** with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Your environment (OS, browser, wallet)

### 💡 Suggesting Features

Have an idea? We'd love to hear it!

1. **Check existing issues** to avoid duplicates
2. **Create a new issue** with:
   - Clear description of the feature
   - Why it would be useful
   - Possible implementation approach
   - Mockups or examples if applicable

### 🔧 Code Contributions

Want to write code? Awesome!

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**
4. **Test thoroughly**
5. **Commit with clear messages**
6. **Push to your fork**
7. **Open a Pull Request**

## 🛠️ Development Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Git
- A code editor (VS Code recommended)

### Setup Steps

```bash
# Fork and clone
git clone https://github.com/YOUR_USERNAME/wallet-roast.git
cd wallet-roast

# Install dependencies
npm install

# Create environment file
cp .env.local.example .env.local
# Add your Zerion API key to .env.local

# Start development server
npm run dev
```

### Project Structure

```
wallet-roast/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── Hero.tsx
│   ├── WalletConnector.tsx
│   ├── RoastGenerator.tsx
│   └── RoastCard.tsx
├── lib/                   # Utility functions
│   ├── zerionApi.ts      # Zerion API integration
│   └── roastGenerator.ts # Roast logic
├── types/                 # TypeScript types
│   └── index.ts
└── public/               # Static assets
```

## 🔄 Pull Request Process

### Before Submitting

1. ✅ Test your changes thoroughly
2. ✅ Update documentation if needed
3. ✅ Add comments to complex code
4. ✅ Follow the style guidelines
5. ✅ Make sure there are no linting errors
6. ✅ Test on different wallets if applicable

### PR Guidelines

- **Title**: Clear and descriptive (e.g., "Add meme coin detection in roasts")
- **Description**: Explain what and why
- **Screenshots**: Add if UI changes
- **Breaking Changes**: Clearly mark if any
- **Link Issues**: Reference related issues

### Example PR Description

```markdown
## Description
Adds detection for meme coins and generates extra-spicy roasts when found.

## Changes
- Added meme coin symbol list to roastGenerator.ts
- Enhanced roast logic for meme coin holders
- Added unit tests for new roast cases

## Screenshots
[Add screenshots here]

## Testing
- [x] Tested with wallet containing BONK
- [x] Tested with wallet containing SHIB
- [x] Tested with wallet containing normal tokens

## Related Issues
Closes #42
```

## 🎨 Style Guidelines

### TypeScript/React

- Use TypeScript for all new files
- Use functional components with hooks
- Prefer `const` over `let`
- Use meaningful variable names
- Add types for all function parameters and returns

```typescript
// ✅ Good
interface RoastProps {
  walletAddress: string;
  onComplete: () => void;
}

const RoastCard: React.FC<RoastProps> = ({ walletAddress, onComplete }) => {
  // Component logic
};

// ❌ Bad
const RoastCard = (props: any) => {
  // Component logic
};
```

### CSS/Styling

- Use Tailwind CSS utility classes
- Keep custom CSS in `globals.css`
- Use the existing color scheme
- Ensure responsive design (mobile-first)

```tsx
// ✅ Good
<div className="glass rounded-3xl p-8 md:p-12">

// ❌ Bad
<div style={{ background: 'rgba(255,255,255,0.1)', padding: '2rem' }}>
```

### Git Commits

Use clear, descriptive commit messages:

```bash
# ✅ Good
git commit -m "Add meme coin detection to roast generator"
git commit -m "Fix wallet connection issue on mobile Safari"
git commit -m "Update README with deployment instructions"

# ❌ Bad
git commit -m "fix stuff"
git commit -m "updates"
git commit -m "wip"
```

### Code Comments

Add comments for complex logic:

```typescript
// ✅ Good
// Calculate trading frequency based on recent activity
// Degen: 20+ txs/week, Active: 10-20, Moderate: 3-10, HODL: <3
const tradingFrequency = calculateFrequency(recentActivity);

// ❌ Bad (unnecessary comment)
// Increment counter
counter++;
```

## 🧪 Testing

Before submitting:

```bash
# Run linter
npm run lint

# Build to check for errors
npm run build

# Test locally
npm run dev
```

Manual testing checklist:

- [ ] Wallet connection works
- [ ] Roast generation completes
- [ ] All animations play smoothly
- [ ] Share button works
- [ ] Download image works
- [ ] Responsive on mobile
- [ ] Works in different browsers
- [ ] No console errors

## 🎯 Areas for Contribution

Looking for something to work on? Check these areas:

### 🔥 High Priority

- [ ] Add more roast variations
- [ ] Improve error handling
- [ ] Add loading states
- [ ] Optimize API calls
- [ ] Add unit tests

### 🌟 Feature Ideas

- [ ] NFT minting of roast cards
- [ ] Leaderboard of roasts
- [ ] Multi-chain support
- [ ] AI/LLM integration
- [ ] Historical roast comparisons
- [ ] Friend challenges

### 🐛 Known Issues

Check the [Issues page](https://github.com/yourusername/wallet-roast/issues) for current bugs.

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Solana Web3.js Guide](https://solana.com/docs/clients/javascript)
- [Zerion API Docs](https://developers.zerion.io)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)

## 💬 Communication

- **GitHub Issues**: For bugs and features
- **Pull Requests**: For code contributions
- **Discussions**: For questions and ideas

## 🏆 Recognition

Contributors will be:

- Added to the README
- Mentioned in release notes
- Given credit in the about page (when we add it)

## ❓ Questions?

Don't hesitate to ask! Create an issue with the "question" label or reach out to the maintainers.

---

**Thank you for contributing to Wallet Roast! 🔥**

Let's make crypto analytics fun for everyone!

