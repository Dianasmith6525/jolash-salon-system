# 🚀 Production Deployment Guide - Jolash Salon

Complete step-by-step guide to deploy your application to production.

---

## 📋 Pre-Deployment Checklist

Before deploying, ensure:
- [x] Backend runs locally without errors
- [x] Frontend runs locally without errors
- [x] Database is set up with all tables
- [x] Admin user created
- [x] Booking system tested
- [x] Admin dashboard tested

---

## 🎯 Deployment Overview

- **Frontend:** Vercel (Free tier)
- **Backend:** Railway (Free tier with $5 credit)
- **Database:** Railway PostgreSQL

---

# PART 1: Deploy Backend to Railway

## Step 1: Create Railway Account

1. Go to https://railway.app
2. Click "Start a New Project"
3. Sign up with GitHub (recommended)
4. Authorize Railway to access your GitHub

## Step 2: Push Code to GitHub

First, let's commit and push your code:

```powershell
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Jolash Salon complete app"

# Create repository on GitHub
# Go to https://github.com/new
# Create a new repository named "JolashSalonm"
# Do NOT initialize with README

# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/Phillipjr9/JolashSalonm.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 3: Create New Railway Project

1. On Railway dashboard, click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose your **JolashSalonm** repository
4. Railway will detect it's a Node.js project

## Step 4: Add PostgreSQL Database

1. In your Railway project, click **"+ New"**
2. Select **"Database"**
3. Choose **"PostgreSQL"**
4. Railway will provision a database

## Step 5: Configure Backend Service

1. Click on your backend service (not the database)
2. Go to **"Settings"**
3. Find **"Root Directory"**
4. Set it to: `backend`
5. Click **"Save"**

## Step 6: Set Environment Variables

1. In backend service, go to **"Variables"**
2. Add the following variables:

**Click "New Variable" for each:**

```
NODE_ENV=production
PORT=5000
JWT_SECRET=your_very_secure_jwt_secret_key_change_this_in_production_12345

AUTHORIZENET_API_LOGIN_ID=48VRqhq22sMG
AUTHORIZENET_TRANSACTION_KEY=76m5v6nuE33B3V96
AUTHORIZENET_ENVIRONMENT=sandbox
```

3. **Important:** Railway will automatically add database variables:
   - `DATABASE_URL` (from PostgreSQL service)
   
   OR manually add if needed:
   - `PGHOST` 
   - `PGPORT` 
   - `PGDATABASE` 
   - `PGUSER` 
   - `PGPASSWORD`

## Step 7: Update Database Connection for Production

The backend `db.js` needs to support both local and production:

File: `backend/db.js`
```javascript
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool(
  process.env.DATABASE_URL 
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false
        }
      }
    : {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        database: process.env.DB_NAME || 'jolash_salon',
        user: process.env.PGUSER || 'postgres',
        password: process.env.PGPASSWORD || 'Olami6525$',
      }
);

// Test database connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Database connected successfully');
  }
});

module.exports = pool;
```

## Step 8: Initialize Production Database

1. In Railway, go to your PostgreSQL database
2. Click **"Connect"**
3. Copy the **"PSQL Command"**
4. Open your local terminal and paste the command (you'll need psql installed)

OR use Railway's built-in console:
1. Click on PostgreSQL service
2. Go to **"Data"** tab
3. Click **"Query"**
4. Run the SQL from `backend/init-db.sql`

OR use the setup script:
1. After backend deploys, find the deployment URL
2. The backend should auto-run, but you may need to manually run init

## Step 9: Create Admin User in Production

1. Go to backend service in Railway
2. Find **"Deployments"** tab
3. Click on latest deployment
4. Click **"View Logs"**
5. You'll need to run the create-admin script

**Option A:** Add to your deployment (recommended)
Add this to `backend/package.json`:
```json
"scripts": {
  "start": "node server.js",
  "postinstall": "node setup-db.js && node create-admin.js"
}
```

**Option B:** Manual via Railway CLI
Install Railway CLI and run:
```bash
railway run node create-admin.js
```

## Step 10: Get Backend URL

1. In Railway backend service, go to **"Settings"**
2. Click **"Generate Domain"** under "Networking"
3. Copy the domain (e.g., `https://your-app.railway.app`)
4. **SAVE THIS URL** - you'll need it for frontend!

Example: `https://jolashh-production.up.railway.app`

---

# PART 2: Deploy Frontend to Vercel

## Step 1: Create Vercel Account

1. Go to https://vercel.com
2. Click **"Sign Up"**
3. Sign up with GitHub (recommended)
4. Authorize Vercel

## Step 2: Import Project

1. On Vercel dashboard, click **"Add New..."**
2. Select **"Project"**
3. Import your **JolashSalonm** repository
4. Vercel will auto-detect Next.js

## Step 3: Configure Build Settings

Vercel should auto-detect:
- **Framework Preset:** Next.js
- **Root Directory:** `./` (leave as root)
- **Build Command:** `npm run build`
- **Output Directory:** `.next`

## Step 4: Set Environment Variables

**CRITICAL:** Add this environment variable:

Click **"Environment Variables"**

**Variable:**
```
NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app
```

Replace `your-backend-url.railway.app` with your actual Railway backend URL from Part 1, Step 10.

Example:
```
NEXT_PUBLIC_API_URL=https://jolashh-production.up.railway.app
```

## Step 5: Deploy

1. Click **"Deploy"**
2. Wait 2-3 minutes for build
3. Vercel will show deployment progress
4. Once complete, you'll get a URL like: `https://jolash-salonm.vercel.app`

## Step 6: Update CORS on Backend

**IMPORTANT:** Add your Vercel URL to backend CORS

1. Go back to Railway
2. Edit `backend/server.js` on GitHub or locally:

```javascript
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001', 
    'http://localhost:3002',
    'https://jolash-salonm.vercel.app',  // Add your Vercel URL
    'https://your-custom-domain.com'      // If you add custom domain
  ],
  optionsSuccessStatus: 200
};
```

3. Commit and push:
```bash
git add .
git commit -m "Add production CORS origin"
git push
```

4. Railway will auto-deploy the update

---

# PART 3: Post-Deployment Setup

## Step 1: Test the Live Site

1. Open your Vercel URL: `https://jolash-salonm.vercel.app`
2. Test booking page: `/booking`
3. Test admin login: `/admin/login`
4. Create a test booking
5. Login to admin and verify booking appears

## Step 2: Verify Backend

1. Test backend API: `https://your-backend.railway.app/api/health`
2. Should return: `{"status":"OK","message":"Jolash Salon API is running"}`

## Step 3: Create Production Admin User

If admin user doesn't exist in production:
1. Use Railway CLI or web console
2. Run: `node backend/create-admin.js`
3. Or manually insert via Railway SQL console

## Step 4: Add Custom Domain (Optional)

### For Vercel (Frontend):
1. Go to project settings
2. Click **"Domains"**
3. Add your custom domain
4. Follow DNS instructions

### For Railway (Backend):
1. Go to backend service settings
2. Under "Networking", add custom domain
3. Update DNS

---

# 🔧 Troubleshooting

## Backend Issues

### "Database connection error"
- Check DATABASE_URL in Railway variables
- Verify PostgreSQL service is running
- Check connection limits

### "CORS error"
- Ensure Vercel URL is in CORS origins
- Redeploy backend after CORS update

### "Module not found"
- Check `backend/package.json` includes all dependencies
- Redeploy

## Frontend Issues

### "Failed to fetch"
- Verify NEXT_PUBLIC_API_URL is set correctly
- Check Railway backend is running
- Test backend URL directly

### "Booking failed"
- Check database tables exist
- Verify backend logs in Railway
- Test API endpoints

### "Admin login failed"
- Verify admin user exists in production database
- Check JWT_SECRET is set
- Verify bcrypt and jsonwebtoken are installed

---

# 📊 Environment Variables Summary

## Railway (Backend)

```env
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://... (auto-added by Railway)
JWT_SECRET=your_very_secure_jwt_secret_key_change_this_in_production_12345
AUTHORIZENET_API_LOGIN_ID=48VRqhq22sMG
AUTHORIZENET_TRANSACTION_KEY=76m5v6nuE33B3V96
AUTHORIZENET_ENVIRONMENT=sandbox
```

## Vercel (Frontend)

```env
NEXT_PUBLIC_API_URL=https://your-backend.railway.app
```

---

# ✅ Final Checklist

After deployment:

- [ ] Frontend loads at Vercel URL
- [ ] Backend health check works
- [ ] Booking page loads services
- [ ] Can create a test booking
- [ ] Booking appears in database
- [ ] Admin login works
- [ ] Admin dashboard shows bookings
- [ ] Can update booking status
- [ ] All pages load correctly
- [ ] Mobile responsive
- [ ] Dark mode works

---

# 🎉 You're Live!

Your Jolash Salon is now in production!

**Frontend:** https://jolash-salonm.vercel.app  
**Backend:** https://your-backend.railway.app  
**Admin:** https://jolash-salonm.vercel.app/admin/login

Share your booking page with customers and start accepting appointments! 🚀

---

# 📈 Next Steps

1. **Monitor Usage:**
   - Check Railway dashboard for API usage
   - Monitor Vercel analytics

2. **Optimize:**
   - Add caching
   - Optimize images
   - Add CDN for assets

3. **Marketing:**
   - Share booking link
   - Add to social media
   - Send to existing customers

4. **Enhance:**
   - Add email notifications
   - Implement payments
   - Add more features

---

# 🆘 Need Help?

- **Railway Docs:** https://docs.railway.app
- **Vercel Docs:** https://vercel.com/docs
- **Check logs in Railway/Vercel dashboards**
- **GitHub Issues:** Create issue in your repo

Good luck with your launch! 🎊
