# 🚀 Jolash Salon - Deployment Instructions

## Quick Deploy Guide

### Option 1: Deploy to Vercel (Frontend) + Railway (Backend) - RECOMMENDED

This is the easiest and fastest deployment method with free tiers available.

---

## 📦 Step 1: Prepare for Deployment

### 1.1 Push to GitHub (Required First)

```bash
# Initialize git repository
cd /home/code/jolash-salon
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Jolash Salon platform with PostgreSQL"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/jolash-salon.git
git branch -M main
git push -u origin main
```

---

## 🌐 Step 2: Deploy Frontend to Vercel

### Method A: Using Vercel Dashboard (Easiest)

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "Add New Project"
3. Import your `jolash-salon` repository
4. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `bun run build` (or leave default)
   - **Output Directory**: `.next` (leave default)
5. Add Environment Variable:
   - Key: `NEXT_PUBLIC_API_URL`
   - Value: `https://your-backend-url.railway.app` (add after backend deployment)
6. Click "Deploy"

### Method B: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
cd /home/code/jolash-salon
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: jolash-salon
# - Directory: ./ (press enter)
# - Override settings? No

# After backend is deployed, add environment variable:
vercel env add NEXT_PUBLIC_API_URL production
# Enter: https://your-backend-url.railway.app
```

**Your frontend will be live at**: `https://jolash-salon.vercel.app`

---

## 🔧 Step 3: Deploy Backend to Railway

### 3.1 Using Railway Dashboard (Recommended)

1. Go to [railway.app](https://railway.app) and sign in with GitHub
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your `jolash-salon` repository
5. Railway will detect the backend automatically

### 3.2 Configure Backend Service

1. Click on your deployed service
2. Go to "Settings" → "Service"
3. Set **Root Directory**: `backend`
4. Set **Start Command**: `npm start`

### 3.3 Add PostgreSQL Database

1. In your Railway project, click "New"
2. Select "Database" → "PostgreSQL"
3. Railway will create a database and provide connection details

### 3.4 Set Environment Variables

In Railway dashboard, go to your backend service → "Variables" tab:

```env
PORT=5000
DB_HOST=${{Postgres.PGHOST}}
DB_PORT=${{Postgres.PGPORT}}
DB_NAME=${{Postgres.PGDATABASE}}
PGUSER=${{Postgres.PGUSER}}
PGPASSWORD=${{Postgres.PGPASSWORD}}
JWT_SECRET=your_secure_random_jwt_secret_here_change_this
AUTHORIZENET_API_LOGIN_ID=your_authorize_net_api_login
AUTHORIZENET_TRANSACTION_KEY=your_authorize_net_transaction_key
AUTHORIZENET_ENVIRONMENT=production
```

**Note**: Railway automatically provides database variables. Use the `${{Postgres.VARIABLE}}` syntax.

### 3.5 Initialize Database

After deployment, connect to your Railway PostgreSQL and run the schema:

```bash
# Get database connection string from Railway dashboard
# Then run:
psql "postgresql://user:pass@host:port/database" < backend/init-db.sql
```

Or use Railway's built-in PostgreSQL client:
1. Go to PostgreSQL service in Railway
2. Click "Data" tab
3. Copy and paste contents of `backend/init-db.sql`
4. Execute

**Your backend will be live at**: `https://jolash-salon-backend.railway.app`

---

## 🔗 Step 4: Connect Frontend to Backend

### Update Frontend Environment Variable

1. Go to Vercel dashboard → Your project → Settings → Environment Variables
2. Add or update:
   - Key: `NEXT_PUBLIC_API_URL`
   - Value: `https://your-backend-url.railway.app` (your Railway backend URL)
3. Redeploy frontend (Vercel → Deployments → Redeploy)

---

## ✅ Step 5: Verify Deployment

### Test Backend API
```bash
# Health check
curl https://your-backend-url.railway.app/api/health

# Get services
curl https://your-backend-url.railway.app/api/services

# Get products
curl https://your-backend-url.railway.app/api/products
```

### Test Frontend
1. Visit your Vercel URL: `https://jolash-salon.vercel.app`
2. Navigate through all pages
3. Test booking form
4. Test dark mode toggle
5. Verify data loads from backend

---

## 🎯 Alternative: Deploy to Heroku

### Frontend (Vercel) + Backend (Heroku)

#### Deploy Backend to Heroku:

```bash
# Install Heroku CLI
# Download from: https://devcenter.heroku.com/articles/heroku-cli

# Login
heroku login

# Create app
heroku create jolash-salon-api

# Add PostgreSQL
heroku addons:create heroku-postgresql:mini

# Set environment variables
heroku config:set JWT_SECRET=your_secure_jwt_secret
heroku config:set AUTHORIZENET_API_LOGIN_ID=your_api_login
heroku config:set AUTHORIZENET_TRANSACTION_KEY=your_transaction_key
heroku config:set AUTHORIZENET_ENVIRONMENT=production

# Deploy backend only
git subtree push --prefix backend heroku main

# Initialize database
heroku pg:psql < backend/init-db.sql
```

**Backend URL**: `https://jolash-salon-api.herokuapp.com`

---

## 🔐 Security Checklist

Before going live:

- [ ] Change JWT_SECRET to a strong random string
- [ ] Use production Authorize.net credentials
- [ ] Enable HTTPS only (automatic on Vercel/Railway)
- [ ] Update CORS settings in backend if needed
- [ ] Set strong database password
- [ ] Review and update Terms & Privacy pages
- [ ] Test all payment flows
- [ ] Set up error monitoring (Sentry)
- [ ] Configure backup strategy for database

---

## 📊 Post-Deployment Setup

### 1. Configure Custom Domain (Optional)

**Vercel:**
```bash
vercel domains add yourdomain.com
```

**Railway:**
- Go to Settings → Domains
- Add custom domain
- Update DNS records

### 2. Set Up Email Notifications

Add email service (SendGrid/Mailgun):
```bash
# In Railway, add environment variables:
SENDGRID_API_KEY=your_sendgrid_key
EMAIL_FROM=noreply@yourdomain.com
```

### 3. Add Analytics

Add to `app/layout.tsx`:
```typescript
// Google Analytics
<Script src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID" />
```

### 4. Monitor Your Application

- **Vercel**: Built-in analytics and monitoring
- **Railway**: Built-in metrics and logs
- **Sentry**: For error tracking
- **Uptime Robot**: For uptime monitoring

---

## 🆘 Troubleshooting

### Frontend Issues

**Build fails:**
- Check Node.js version (use 18+)
- Verify all dependencies installed
- Check environment variables

**API calls fail:**
- Verify NEXT_PUBLIC_API_URL is set correctly
- Check CORS settings in backend
- Verify backend is running

### Backend Issues

**Database connection fails:**
- Verify database credentials
- Check if database is running
- Verify network connectivity

**API returns errors:**
- Check backend logs in Railway/Heroku
- Verify environment variables
- Check database schema is initialized

### Database Issues

**Tables not found:**
- Run init-db.sql script
- Verify database connection
- Check table names match code

---

## 📝 Environment Variables Summary

### Frontend (.env.local or Vercel)
```env
NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app
```

### Backend (Railway/Heroku)
```env
PORT=5000
DB_HOST=<from_railway>
DB_PORT=<from_railway>
DB_NAME=<from_railway>
PGUSER=<from_railway>
PGPASSWORD=<from_railway>
JWT_SECRET=<generate_secure_random_string>
AUTHORIZENET_API_LOGIN_ID=<your_authorize_net_id>
AUTHORIZENET_TRANSACTION_KEY=<your_authorize_net_key>
AUTHORIZENET_ENVIRONMENT=production
```

---

## 🎉 Success!

Your Jolash Salon platform is now live!

**Frontend**: https://jolash-salon.vercel.app
**Backend**: https://your-backend.railway.app
**Database**: PostgreSQL on Railway

### Next Steps:
1. ✅ Test all functionality
2. ✅ Customize branding and content
3. ✅ Add Authorize.net credentials
4. ✅ Set up email notifications
5. ✅ Configure custom domain
6. ✅ Add analytics
7. ✅ Launch! 🚀

---

**Need Help?**
- Vercel Docs: https://vercel.com/docs
- Railway Docs: https://docs.railway.app
- Heroku Docs: https://devcenter.heroku.com

**Support**: Check logs in your deployment platform dashboard
