# 🚀 JOLASH SALON - HOSTING & DEPLOYMENT GUIDE

## 📋 **QUICK DEPLOYMENT CHECKLIST**

Your Jolash Salon system is **production-ready**! Here's how to host it online:

---

## 🎯 **RECOMMENDED HOSTING SETUP**

### **Frontend:** Vercel (Free tier available)
### **Backend:** Railway (Free tier available)  
### **Database:** Railway PostgreSQL (Included with backend)

---

## 🌐 **OPTION 1: RAILWAY (Recommended - Full Stack)**

Railway can host both your backend and database together, making it the easiest option.

### **Step 1: Prepare Your Backend**

1. **Create `railway.json` in backend folder** (already exists):
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "nixpacks"
  },
  "deploy": {
    "startCommand": "npm start"
  }
}
```

2. **Create `Procfile` in backend folder** (already exists):
```
web: node server.js
```

3. **Update `package.json` in backend** to include start script:
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

### **Step 2: Deploy Backend to Railway**

1. **Go to [railway.app](https://railway.app)**
2. **Sign up/Login** with GitHub
3. **Click "New Project"**
4. **Select "Deploy from GitHub repo"**
5. **Connect your GitHub account**
6. **Select your JolashSalonm repository**
7. **Set root directory to `/backend`**
8. **Railway will auto-detect and deploy**

### **Step 3: Configure Environment Variables on Railway**

In Railway dashboard, go to **Variables** tab and add:

```bash
# Database (Railway provides automatically)
DATABASE_URL=postgresql://username:password@host:port/database

# JWT Secret (generate a strong secret)
JWT_SECRET=your-super-secret-jwt-key-here

# Email Configuration
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-app-password

# Server Configuration
NODE_ENV=production
PORT=5000
```

### **Step 4: Get Your Backend URL**

Railway will provide a URL like: `https://jolash-salon-backend-production.up.railway.app`

---

## 📱 **DEPLOY FRONTEND TO VERCEL**

### **Step 1: Prepare Frontend**

1. **Update environment variables**
Create `.env.local` in root directory:
```bash
NEXT_PUBLIC_API_URL=https://your-railway-backend-url.up.railway.app
```

2. **Build test locally:**
```bash
npm run build
```

### **Step 2: Deploy to Vercel**

1. **Go to [vercel.com](https://vercel.com)**
2. **Sign up/Login** with GitHub
3. **Click "New Project"**
4. **Import your GitHub repository**
5. **Configure:**
   - **Framework Preset:** Next.js
   - **Root Directory:** `/` (leave blank)
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`

### **Step 3: Add Environment Variables on Vercel**

In Vercel dashboard, go to **Settings > Environment Variables**:

```bash
NEXT_PUBLIC_API_URL=https://your-railway-backend-url.up.railway.app
```

---

## 🗄️ **OPTION 2: SEPARATE HOSTING PROVIDERS**

### **Frontend Options:**
- **Vercel** (Recommended for Next.js) - Free tier
- **Netlify** - Free tier with form handling
- **GitHub Pages** - Free static hosting

### **Backend Options:**
- **Railway** - $5/month, includes database
- **Render** - Free tier available
- **Heroku** - $7/month (no free tier)
- **DigitalOcean App Platform** - $12/month

### **Database Options:**
- **Railway PostgreSQL** - Included with backend hosting
- **Supabase** - Free PostgreSQL with 2GB storage
- **PlanetScale** - Free MySQL alternative
- **Neon** - Free PostgreSQL with 3GB storage

---

## 🔐 **ENVIRONMENT VARIABLES GUIDE**

### **Backend Environment Variables (.env)**

```bash
# Database Connection
DATABASE_URL=postgresql://user:password@host:port/database
# OR individual components:
DB_HOST=localhost
DB_PORT=5432
DB_NAME=jolash_salon
PGUSER=your_username
PGPASSWORD=your_password

# JWT Authentication
JWT_SECRET=super-secret-jwt-key-min-32-characters

# Email Configuration (Gmail SMTP)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-character-app-password

# Authorize.Net Payment (when ready)
AUTHORIZENET_API_LOGIN_ID=your_api_login
AUTHORIZENET_TRANSACTION_KEY=your_transaction_key
AUTHORIZENET_ENVIRONMENT=sandbox  # or 'production'

# Server Configuration
NODE_ENV=production
PORT=5000
```

### **Frontend Environment Variables (.env.local)**

```bash
# API Connection
NEXT_PUBLIC_API_URL=https://your-backend-url.com

# Optional: Analytics, etc.
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

---

## 📧 **EMAIL SETUP (Gmail SMTP)**

### **Step 1: Enable 2-Factor Authentication**
1. Go to Google Account settings
2. Enable 2-Factor Authentication

### **Step 2: Generate App Password**
1. Go to Google Account > Security
2. Select "App passwords"
3. Choose "Mail" and "Other"
4. Name it "Jolash Salon"
5. Use the 16-character password in EMAIL_PASS

### **Step 3: Configure Environment Variables**
```bash
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=sixteen-character-app-password
```

---

## 🚀 **STEP-BY-STEP DEPLOYMENT**

### **Complete Railway + Vercel Deployment:**

#### **1. Deploy Backend (Railway):**
```bash
# 1. Push your code to GitHub (if not already)
git add .
git commit -m "Deploy ready"
git push origin main

# 2. Go to railway.app
# 3. Create new project from GitHub
# 4. Select JolashSalonm repo
# 5. Set root directory to "backend"
# 6. Add environment variables
# 7. Deploy automatically
```

#### **2. Deploy Frontend (Vercel):**
```bash
# 1. Update .env.local with Railway backend URL
echo "NEXT_PUBLIC_API_URL=https://your-railway-url.up.railway.app" > .env.local

# 2. Test build locally
npm run build

# 3. Go to vercel.com
# 4. Import GitHub repository
# 5. Add environment variables
# 6. Deploy
```

#### **3. Test Your Live Site:**
```bash
# Your live URLs will be:
Frontend: https://jolash-salon.vercel.app
Backend: https://jolash-salon-backend.up.railway.app
```

---

## 💰 **HOSTING COSTS**

### **Free Tier (Perfect for testing):**
- **Vercel Frontend:** FREE
- **Railway Backend:** FREE (500 hours/month)
- **Total:** $0/month

### **Production Tier:**
- **Vercel Pro:** $20/month (optional)
- **Railway:** $5/month
- **Total:** $5-25/month

---

## 🔧 **DEPLOYMENT COMMANDS**

### **Quick Deploy Script:**

Create `deploy.sh` in your project root:

```bash
#!/bin/bash
echo "🚀 Deploying Jolash Salon..."

# Build frontend
echo "📦 Building frontend..."
npm run build

# Test backend
echo "🔧 Testing backend..."
cd backend
npm test  # if you have tests

# Deploy instructions
echo "✅ Ready to deploy!"
echo "1. Push to GitHub: git push origin main"
echo "2. Deploy backend: railway.app"
echo "3. Deploy frontend: vercel.com"
echo "4. Update environment variables"
```

---

## 🌟 **POST-DEPLOYMENT CHECKLIST**

### **✅ Test These Features:**
- [ ] Homepage loads with 3D animations
- [ ] User registration and login
- [ ] Service browsing (all 85 services)
- [ ] Booking creation
- [ ] Product purchasing
- [ ] Email confirmations
- [ ] Password reset
- [ ] Mobile responsiveness

### **✅ Configure:**
- [ ] Custom domain (optional)
- [ ] SSL certificate (automatic on Vercel/Railway)
- [ ] Email delivery testing
- [ ] Payment processing (when ready)
- [ ] Analytics tracking
- [ ] Error monitoring

---

## 🆘 **TROUBLESHOOTING**

### **Common Issues:**

#### **CORS Errors:**
Add to backend `server.js`:
```javascript
app.use(cors({
  origin: ['https://your-frontend-domain.vercel.app'],
  credentials: true
}));
```

#### **Database Connection Issues:**
- Verify `DATABASE_URL` format
- Check firewall settings
- Ensure PostgreSQL version compatibility

#### **Email Not Sending:**
- Verify Gmail app password (16 characters)
- Check 2FA is enabled
- Test with simple email first

---

## 🎉 **SUCCESS!**

Once deployed, your Jolash Salon system will be:
- ✅ **Globally accessible**
- ✅ **SSL secured**
- ✅ **Auto-scaling**
- ✅ **Production ready**

### **Example Live URLs:**
- **Frontend:** `https://jolash-salon.vercel.app`
- **Backend API:** `https://jolash-salon-backend.up.railway.app/api/services`

**Your professional salon booking system is now live! 🚀**

---

*Need help? Check the deployment logs in Railway/Vercel dashboards for detailed error messages.*