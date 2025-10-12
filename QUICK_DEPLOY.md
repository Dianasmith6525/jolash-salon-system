# 🚀 Quick Deployment Commands

## Before You Start

Make sure you have:
- Git installed
- GitHub account
- Railway account (sign up at railway.app)
- Vercel account (sign up at vercel.com)

---

## Step 1: Push to GitHub

```powershell
# Check git status
git status

# Add all files
git add .

# Commit with message
git commit -m "Ready for production deployment - Jolash Salon complete"

# If you haven't set up remote yet:
# Go to https://github.com/new
# Create repository named "JolashSalonm"
# Then run:

git remote add origin https://github.com/Phillipjr9/JolashSalonm.git
git branch -M main
git push -u origin main

# If remote already exists:
git push
```

---

## Step 2: Deploy Backend to Railway

1. **Go to Railway:** https://railway.app
2. **Click:** "New Project"
3. **Select:** "Deploy from GitHub repo"
4. **Choose:** JolashSalonm repository
5. **Add Database:**
   - Click "+ New"
   - Select "Database" → "PostgreSQL"
6. **Configure Backend Service:**
   - Click on backend service
   - Settings → Root Directory: `backend`
7. **Add Environment Variables:**
   ```
   NODE_ENV=production
   PORT=5000
   JWT_SECRET=your_very_secure_jwt_secret_key_change_this_in_production_12345
   AUTHORIZENET_API_LOGIN_ID=48VRqhq22sMG
   AUTHORIZENET_TRANSACTION_KEY=76m5v6nuE33B3V96
   AUTHORIZENET_ENVIRONMENT=sandbox
   ```
8. **Generate Domain:**
   - Settings → Networking → "Generate Domain"
   - **COPY THIS URL** (e.g., https://jolashh-production.up.railway.app)

---

## Step 3: Initialize Production Database

### Option A: Via Railway Console
1. Click PostgreSQL service
2. Go to "Query" tab
3. Copy content from `backend/init-db.sql`
4. Paste and run each CREATE TABLE and INSERT statement

### Option B: Via psql (if installed)
1. Click PostgreSQL → "Connect"
2. Copy PSQL command
3. Run in your terminal:
   ```powershell
   # Replace with your actual connection string
   psql postgresql://postgres:password@region.railway.app:port/railway
   ```
4. Then run:
   ```sql
   \i backend/init-db.sql
   ```

---

## Step 4: Create Admin User in Production

After database is initialized:

1. In Railway, click backend service
2. Go to "Deployments" tab
3. Click latest deployment → "View Logs"
4. Check if admin user exists

To manually create admin:
1. Click PostgreSQL service
2. Go to "Query" tab
3. Run:
   ```sql
   INSERT INTO users (name, email, password, is_admin) 
   VALUES (
     'Admin User', 
     'admin@jolashsalon.com', 
     '$2a$10$8nJ3nOXQH5xvO4BqOXJY7.CqF5gPjF4PqF5gPjF4PqF5gPjF4PqF5g',  -- hashed 'admin123'
     TRUE
   );
   ```

OR use bcrypt to hash a new password and insert it.

---

## Step 5: Update CORS for Production

1. Edit `backend/server.js` locally or on GitHub
2. Add your Railway backend URL to CORS:

```javascript
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001', 
    'http://localhost:3002',
    'https://jolash-salonm.vercel.app',  // Add Vercel URL (Step 7)
    'https://jolashh-production.up.railway.app'  // Your Railway URL
  ],
  optionsSuccessStatus: 200
};
```

3. Commit and push:
```powershell
git add backend/server.js
git commit -m "Add production CORS origins"
git push
```

Railway will auto-redeploy.

---

## Step 6: Test Backend

Open in browser:
```
https://your-backend-url.railway.app/api/health
```

Should see:
```json
{"status":"OK","message":"Jolash Salon API is running"}
```

Test services endpoint:
```
https://your-backend-url.railway.app/api/services
```

Should return array of 10 services.

---

## Step 7: Deploy Frontend to Vercel

1. **Go to Vercel:** https://vercel.com
2. **Click:** "Add New..." → "Project"
3. **Import:** JolashSalonm repository
4. **Configure:**
   - Framework: Next.js (auto-detected)
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. **Add Environment Variable:**
   - Key: `NEXT_PUBLIC_API_URL`
   - Value: `https://your-backend-url.railway.app` (from Step 2)
6. **Click:** "Deploy"
7. **Wait:** 2-3 minutes
8. **Copy:** Your Vercel URL (e.g., https://jolash-salonm.vercel.app)

---

## Step 8: Update Backend CORS with Vercel URL

Now that you have Vercel URL, update CORS again:

1. Edit `backend/server.js`
2. Add Vercel URL to origins array (if not done in Step 5)
3. Commit and push

```powershell
git add backend/server.js
git commit -m "Add Vercel URL to CORS"
git push
```

---

## Step 9: Test Production Site

### Test Frontend:
```
https://jolash-salonm.vercel.app
```

### Test Booking:
```
https://jolash-salonm.vercel.app/booking
```

### Test Admin:
```
https://jolash-salonm.vercel.app/admin/login
```

Login with:
- Email: admin@jolashsalon.com
- Password: admin123

### Create Test Booking:
1. Go to `/booking`
2. Fill form
3. Submit
4. Check admin dashboard

---

## ✅ Final Verification Checklist

- [ ] GitHub repository updated
- [ ] Railway backend deployed
- [ ] Railway PostgreSQL created
- [ ] Database tables created
- [ ] Admin user created
- [ ] Backend /api/health returns OK
- [ ] Backend /api/services returns data
- [ ] Vercel frontend deployed
- [ ] Frontend loads correctly
- [ ] Booking page loads services
- [ ] Can create test booking
- [ ] Admin login works
- [ ] Admin dashboard shows bookings
- [ ] Can update booking status

---

## 🎉 Success!

Your Jolash Salon is now LIVE!

**Production URLs:**
- Frontend: https://jolash-salonm.vercel.app
- Backend: https://your-backend-url.railway.app
- Admin: https://jolash-salonm.vercel.app/admin/login

---

## 🔧 Troubleshooting

### Backend won't deploy
- Check Railway logs: Click service → "Deployments" → "View Logs"
- Verify package.json in backend folder
- Check root directory is set to `backend`

### Database connection failed
- Verify DATABASE_URL variable exists
- Check PostgreSQL service is running
- Review backend/db.js supports DATABASE_URL

### Frontend can't reach backend
- Verify NEXT_PUBLIC_API_URL is set in Vercel
- Check it matches Railway backend URL exactly
- No trailing slash in URL

### CORS errors
- Ensure Vercel URL is in backend corsOptions
- Redeploy backend after updating CORS
- Check browser console for exact origin

### Bookings not saving
- Check database tables exist
- Verify backend logs in Railway
- Test POST /api/bookings with curl

---

## 📞 Need Help?

1. Check deployment logs in Railway/Vercel
2. Review environment variables
3. Test each API endpoint individually
4. Check browser console for errors

---

## 🚀 You're Live!

Share your booking page with customers and start accepting appointments!
