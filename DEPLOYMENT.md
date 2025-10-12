# Jolash Salon - Deployment Guide

## 🚀 Complete Deployment Instructions

### Prerequisites
- Git account
- Node.js 18+ or Bun installed
- PostgreSQL 14+ database
- Vercel account (for frontend) or any hosting provider
- Heroku/Railway/DigitalOcean account (for backend)

---

## 📦 Database Setup (PostgreSQL)

### Option 1: Local PostgreSQL
```bash
# Create database
createdb -h localhost jolash_salon

# Initialize with schema and sample data
cd backend
psql -h localhost -d jolash_salon -f init-db.sql
```

### Option 2: Hosted PostgreSQL (Recommended for Production)

**Using Heroku Postgres:**
```bash
heroku addons:create heroku-postgresql:mini
heroku pg:psql < backend/init-db.sql
```

**Using Railway:**
1. Create new PostgreSQL database in Railway dashboard
2. Copy connection string
3. Run: `psql <connection-string> < backend/init-db.sql`

**Using Supabase:**
1. Create new project at supabase.com
2. Go to SQL Editor
3. Copy and paste contents of `backend/init-db.sql`
4. Execute

---

## 🖥️ Backend Deployment

### Option 1: Heroku

```bash
# Login to Heroku
heroku login

# Create new app
heroku create jolash-salon-api

# Add PostgreSQL addon
heroku addons:create heroku-postgresql:mini

# Set environment variables
heroku config:set JWT_SECRET=your_secure_jwt_secret_here
heroku config:set AUTHORIZENET_API_LOGIN_ID=your_api_login_id
heroku config:set AUTHORIZENET_TRANSACTION_KEY=your_transaction_key
heroku config:set AUTHORIZENET_ENVIRONMENT=production

# Deploy backend only
git subtree push --prefix backend heroku main

# Initialize database
heroku pg:psql < backend/init-db.sql
```

### Option 2: Railway

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialize project
cd backend
railway init

# Add PostgreSQL
railway add postgresql

# Deploy
railway up

# Set environment variables in Railway dashboard
```

### Option 3: DigitalOcean App Platform

1. Create new app from GitHub repo
2. Select `backend` directory as source
3. Add PostgreSQL database
4. Set environment variables in dashboard
5. Deploy

---

## 🌐 Frontend Deployment

### Option 1: Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from root directory
vercel

# Follow prompts:
# - Set root directory to: ./
# - Build command: bun run build
# - Output directory: .next

# Set environment variable for API URL
vercel env add NEXT_PUBLIC_API_URL
# Enter your backend URL: https://jolash-salon-api.herokuapp.com
```

### Option 2: Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build the project
bun run build

# Deploy
netlify deploy --prod

# Set environment variables in Netlify dashboard
```

### Option 3: GitHub Pages (Static Export)

```bash
# Add to next.config.js:
# output: 'export'

# Build
bun run build

# Deploy to GitHub Pages
# (Follow GitHub Pages documentation)
```

---

## 🔐 Environment Variables

### Backend (.env)
```env
PORT=5000
DB_HOST=your_postgres_host
DB_PORT=5432
DB_NAME=jolash_salon
PGUSER=your_postgres_user
PGPASSWORD=your_postgres_password
JWT_SECRET=your_very_secure_jwt_secret_key_here
AUTHORIZENET_API_LOGIN_ID=your_authorize_net_api_login
AUTHORIZENET_TRANSACTION_KEY=your_authorize_net_transaction_key
AUTHORIZENET_ENVIRONMENT=production
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=https://your-backend-api-url.com
```

---

## 🧪 Testing Deployment

### Test Backend API
```bash
# Health check
curl https://your-backend-url.com/api/health

# Get services
curl https://your-backend-url.com/api/services

# Get products
curl https://your-backend-url.com/api/products
```

### Test Frontend
1. Visit your deployed URL
2. Navigate through all pages
3. Test booking form
4. Test dark mode toggle
5. Test chat widget
6. Verify cookie consent

---

## 📊 Database Schema

The database includes the following tables:
- **users** - Customer accounts with authentication
- **services** - Salon services (10 pre-loaded)
- **products** - E-commerce products (15 pre-loaded)
- **bookings** - Appointment bookings
- **chat_messages** - Live chat history
- **cookie_consents** - GDPR compliance tracking

---

## 🔄 Continuous Deployment

### GitHub Actions (Automatic Deployment)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Heroku
        uses: akhileshns/heroku-deploy@v3.12.12
        with:
          heroku_api_key: ${{secrets.HEROKU_API_KEY}}
          heroku_app_name: "jolash-salon-api"
          heroku_email: "your-email@example.com"
          appdir: "backend"

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID}}
          vercel-project-id: ${{ secrets.PROJECT_ID}}
```

---

## 🛠️ Post-Deployment Configuration

### 1. Configure Authorize.net
- Sign up at authorize.net
- Get API credentials
- Update backend environment variables
- Test payment processing

### 2. Setup Email Notifications
- Configure SMTP settings for booking confirmations
- Add email service (SendGrid, Mailgun, etc.)

### 3. Add Analytics
- Google Analytics
- Hotjar for user behavior
- Sentry for error tracking

### 4. SSL Certificate
- Ensure HTTPS is enabled (automatic on Vercel/Heroku)
- Update CORS settings if needed

### 5. Custom Domain
```bash
# Vercel
vercel domains add yourdomain.com

# Heroku
heroku domains:add www.yourdomain.com
```

---

## 📈 Monitoring & Maintenance

### Backend Monitoring
```bash
# Heroku logs
heroku logs --tail

# Railway logs
railway logs

# Database status
heroku pg:info
```

### Performance Optimization
- Enable caching for API responses
- Optimize images with Next.js Image component
- Use CDN for static assets
- Enable database connection pooling

---

## 🔒 Security Checklist

- [ ] Change default JWT_SECRET
- [ ] Use strong database passwords
- [ ] Enable HTTPS only
- [ ] Configure CORS properly
- [ ] Sanitize user inputs
- [ ] Rate limit API endpoints
- [ ] Regular security updates
- [ ] Backup database regularly

---

## 📞 Support

For deployment issues:
- Check logs first
- Verify environment variables
- Test database connection
- Review CORS settings

---

## 🎉 Success!

Your Jolash Salon platform is now live! 

**Frontend URL:** https://your-domain.vercel.app
**Backend API:** https://your-api.herokuapp.com
**Database:** PostgreSQL with full data persistence

Next steps:
1. Customize content and images
2. Add your logo
3. Configure payment gateway
4. Set up email notifications
5. Add custom domain
6. Monitor analytics

Happy launching! 🚀
