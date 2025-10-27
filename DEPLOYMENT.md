# 🚀 Deployment Guide

This guide covers deploying Wallet Roast to Vercel, the recommended platform for Next.js applications.

## 📋 Prerequisites

- A Vercel account (free tier works fine)
- GitHub repository with your code
- Zerion API key

## 🔧 Deploy to Vercel (Recommended)

### Option 1: Deploy via Vercel Dashboard

1. **Push your code to GitHub**

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Go to [Vercel](https://vercel.com)**

3. **Click "New Project"**

4. **Import your GitHub repository**

5. **Configure your project**:
   - Framework Preset: **Next.js**
   - Root Directory: `./`
   - Build Command: `next build`
   - Output Directory: `.next`

6. **Add Environment Variables**:
   - Click "Environment Variables"
   - Add: `NEXT_PUBLIC_ZERION_API_KEY` = `your_api_key_here`

7. **Click "Deploy"**

That's it! Vercel will build and deploy your app in ~2 minutes.

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**

```bash
npm i -g vercel
```

2. **Login to Vercel**

```bash
vercel login
```

3. **Deploy**

```bash
vercel
```

Follow the prompts and add your environment variables when asked.

4. **Deploy to production**

```bash
vercel --prod
```

## 🌐 Custom Domain (Optional)

1. Go to your project settings in Vercel
2. Click "Domains"
3. Add your custom domain
4. Update DNS records as instructed

## 🔒 Environment Variables

Make sure to add these in Vercel:

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_ZERION_API_KEY` | Your Zerion API key | ✅ Yes |

## ✅ Post-Deployment Checklist

- [ ] Test wallet connection on production
- [ ] Verify Zerion API calls work
- [ ] Test on mobile devices
- [ ] Check share functionality
- [ ] Test download image feature
- [ ] Verify all animations work
- [ ] Check console for errors
- [ ] Test with multiple wallet types

## 🐛 Troubleshooting

### Issue: "API Key not found"

**Solution**: Make sure you've added `NEXT_PUBLIC_ZERION_API_KEY` to Vercel environment variables and redeployed.

### Issue: Wallet won't connect

**Solution**: Check that your build includes all Solana wallet adapter packages. Redeploy with:

```bash
vercel --prod --force
```

### Issue: Images won't download

**Solution**: This is usually a CORS issue. The `html-to-image` library should work in production, but if not, check browser console for errors.

### Issue: API rate limits

**Solution**: Zerion's free tier has rate limits. Consider upgrading or implementing caching for frequent requests.

## 📊 Analytics (Optional)

Add Vercel Analytics for insights:

1. Go to your project dashboard
2. Click "Analytics"
3. Enable analytics
4. Add to your app (if not auto-included)

## 🔄 Continuous Deployment

Vercel automatically deploys on every push to `main`:

```bash
git add .
git commit -m "Update feature"
git push origin main
```

Vercel will detect the push and deploy automatically.

## 🌍 Alternative Deployment Platforms

### Netlify

1. Connect GitHub repo
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Add environment variables

### Railway

1. Connect GitHub repo
2. Select Next.js template
3. Add environment variables
4. Deploy

### Self-Hosted (VPS)

```bash
# Build the app
npm run build

# Start production server
npm start

# Or use PM2 for process management
pm2 start npm --name "wallet-roast" -- start
```

## 📱 Testing Production Build Locally

```bash
# Build production version
npm run build

# Start production server
npm start
```

Open http://localhost:3000 to test.

## 🔐 Security Best Practices

- ✅ Never commit `.env.local` to Git
- ✅ Use environment variables for API keys
- ✅ Enable HTTPS (Vercel does this automatically)
- ✅ Keep dependencies updated
- ✅ Monitor for security vulnerabilities

## 📈 Performance Optimization

The app is already optimized, but for extra performance:

1. **Enable Vercel Edge Network** (automatic)
2. **Enable ISR** (Incremental Static Regeneration) if needed
3. **Add caching headers** for static assets
4. **Compress images** if you add any

## 🎉 You're Live!

Once deployed, share your app:

- Update README with live URL
- Tweet about it
- Submit to hackathon
- Share with crypto communities

---

**Need Help?** Check [Vercel Documentation](https://vercel.com/docs) or [Next.js Deployment](https://nextjs.org/docs/deployment)

