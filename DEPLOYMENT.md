# Deployment Guide

## 🚀 Quick Deployment to Cloudflare Workers

### 1. Setup Cloudflare Account

1. **Create Cloudflare account** (if not already done)
2. **Add your domain** to Cloudflare (or register one)
3. **Get API tokens**:
   - Go to: https://dash.cloudflare.com/profile/api-tokens
   - Create token with "Custom token"
   - Permissions: `Zone:Zone:Read`, `Zone:Page Rules:Edit`, `Account:Cloudflare Pages:Edit`

### 2. Setup GitHub Repository

1. **Create new repository** on GitHub
2. **Add secrets** in repository settings:
   - `CLOUDFLARE_API_TOKEN` - Your API token from step 1
   - `CLOUDFLARE_ACCOUNT_ID` - Found in Cloudflare dashboard sidebar

### 3. Deploy Commands

```bash
# Local development
npm install
npm run dev

# Build and deploy
npm run build
npm run deploy
```

## 🛠 Manual Deployment Steps

### Prerequisites

```bash
# Install Wrangler CLI
npm install -g wrangler

# Login to Cloudflare
wrangler login
```

### Deployment Process

1. **Initialize project**
   ```bash
   git add .
   git commit -m "Initial website setup"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Deploy to Cloudflare**
   ```bash
   npm run deploy
   ```

3. **Set custom domain** (optional)
   - Update `wrangler.toml` with your domain
   - Configure DNS in Cloudflare dashboard

### Domain Configuration

If you have a custom domain:

1. **Update wrangler.toml**:
   ```toml
   routes = [
     { pattern = "yourdomain.com", zone_name = "yourdomain.com" },
     { pattern = "yourdomain.com/*", zone_name = "yourdomain.com" }
   ]
   ```

2. **DNS Setup**:
   - Add CNAME record pointing to your Workers domain
   - Or use Cloudflare proxied DNS

## 🔄 Automatic Deployment

Once GitHub Actions is set up:

1. **Push to main branch** → Automatic deployment
2. **Create pull request** → Preview deployment
3. **Merge PR** → Production deployment

## 🎯 Alternative Deployment Options

### Netlify (Alternative)
1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`

### Vercel (Alternative)
1. Import GitHub repository
2. Framework: Other
3. Build command: `npm run build`
4. Output directory: `dist`

### GitHub Pages (Alternative)
1. Enable GitHub Pages in repository settings
2. Source: GitHub Actions
3. Create workflow to build and deploy

## 🔧 Troubleshooting

### Common Issues

**Build fails:**
- Check Node.js version (requires 18+)
- Run `npm install` to ensure dependencies

**Deployment fails:**
- Verify API tokens are correct
- Check Cloudflare account permissions
- Ensure domain is added to Cloudflare

**Domain not working:**
- Verify DNS settings
- Check SSL/TLS encryption mode (Full)
- Wait for DNS propagation (up to 24 hours)

### Useful Commands

```bash
# Check Wrangler status
wrangler whoami

# Test local build
npm run build && cd dist && python3 -m http.server 3000

# View deployment logs
wrangler pages deployment list

# Delete deployment
wrangler pages project delete adam-evers-website
```

## 📊 Performance Tips

1. **Enable caching** in Cloudflare dashboard
2. **Minify assets** (CSS/JS/HTML)
3. **Optimize images** before uploading
4. **Use Cloudflare's CDN** features

---

**Need help?** Check the main README.md or create an issue in the repository.