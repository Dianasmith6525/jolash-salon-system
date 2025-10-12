# 🚀 Quick Upload & Deploy Guide

Your GitHub repo is ready: https://github.com/Dianasmith6525/Jolashh

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## STEP 1: Upload Code to GitHub (2 WAYS)

### METHOD A: Web Upload (Easiest - No Command Line)

1. Click this link: https://github.com/Dianasmith6525/Jolashh
2. Click "uploading an existing file" (in the blue box)
3. You'll need to download the project first:
   - Download: /home/code/jolash-salon-deploy.tar.gz
   - Extract it on your computer
4. Drag ALL files from the jolash-salon folder into GitHub
5. Click "Commit changes"

### METHOD B: Command Line (If you have Git installed)

Open terminal on your computer and run:

```bash
# Download and extract the project first, then:
cd path/to/jolash-salon
git init
git add .
git commit -m "Initial commit - Jolash Salon platform"
git remote add origin https://github.com/Dianasmith6525/Jolashh.git
git branch -M main
git push -u origin main
```

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## STEP 2: Deploy Frontend to Vercel (3 minutes)

1. Go to: https://vercel.com
2. Sign in with GitHub
3. Click "Add New Project"
4. Select "Jolashh" repository
5. Vercel auto-detects Next.js
6. Click "Deploy"
7. Wait 2-3 minutes

✅ Your frontend will be live at: https://jolashh.vercel.app

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## STEP 3: Deploy Backend to Railway (7 minutes)

1. Go to: https://railway.app
2. Sign in with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose "Jolashh" repository

### Configure Backend Service:
6. Click on the deployed service
7. Go to Settings
8. Set "Root Directory": backend
9. Set "Start Command": npm start

### Add PostgreSQL Database:
10. Click "New" → "Database" → "PostgreSQL"
11. Railway creates it automatically

### Add Environment Variables:
12. Go to Variables tab, click "New Variable"
13. Add these one by one:

```
PORT=5000
DB_HOST=${{Postgres.PGHOST}}
DB_PORT=${{Postgres.PGPORT}}
DB_NAME=${{Postgres.PGDATABASE}}
PGUSER=${{Postgres.PGUSER}}
PGPASSWORD=${{Postgres.PGPASSWORD}}
JWT_SECRET=jolash_secure_jwt_secret_2025_change_in_production
AUTHORIZENET_API_LOGIN_ID=your_api_login_id
AUTHORIZENET_TRANSACTION_KEY=your_transaction_key
AUTHORIZENET_ENVIRONMENT=sandbox
```

### Initialize Database:
14. Go to PostgreSQL service → Data tab
15. Click "Query"
16. Copy ALL contents from backend/init-db.sql
17. Paste and click "Run Query"

✅ Your backend will be live at: https://jolashh-production.up.railway.app

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## STEP 4: Connect Frontend to Backend (2 minutes)

1. Copy your Railway backend URL (from Railway dashboard)
2. Go to Vercel dashboard
3. Click on your "jolashh" project
4. Go to Settings → Environment Variables
5. Click "Add New"
6. Key: NEXT_PUBLIC_API_URL
7. Value: https://your-backend-url.railway.app
8. Click "Save"
9. Go to Deployments tab
10. Click "..." on latest deployment → "Redeploy"

✅ Everything is now connected!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 🎉 YOUR SITE IS LIVE!

Frontend: https://jolashh.vercel.app
Backend: https://jolashh-production.up.railway.app
Database: PostgreSQL on Railway

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## ✅ Test Your Deployment

1. Visit your Vercel URL
2. Navigate through all pages
3. Test the booking form
4. Toggle dark mode
5. Check that services and products load

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 📦 Files Location

Project: /home/code/jolash-salon/
Package: /home/code/jolash-salon-deploy.tar.gz (417KB)
GitHub: https://github.com/Dianasmith6525/Jolashh.git

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Need help? Check the other documentation files:
- DEPLOY_INSTRUCTIONS.md - Detailed deployment guide
- README.md - Project overview
- QUICKSTART.md - Quick start guide

