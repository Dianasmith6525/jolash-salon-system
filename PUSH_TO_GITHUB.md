# 🚀 PUSH YOUR CODE TO GITHUB

Your project is connected to: https://github.com/Dianasmith6525/Jolashh.git

## METHOD 1: Using GitHub Personal Access Token (Recommended)

### Step 1: Create a Personal Access Token

1. Go to: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a name: "Jolash Salon Deployment"
4. Select scopes:
   - ✅ `repo` (Full control of private repositories)
5. Click "Generate token"
6. **COPY THE TOKEN** (you won't see it again!)

### Step 2: Push Your Code

Run these commands in your terminal:

```bash
cd /home/code/jolash-salon

# Push to GitHub (you'll be prompted for credentials)
git push -u origin main

# When prompted:
# Username: Dianasmith6525
# Password: [paste your Personal Access Token here]
```

---

## METHOD 2: Using GitHub Web Interface (Easiest - No Token Needed!)

### Option A: Upload via Web

1. Go to: https://github.com/Dianasmith6525/Jolashh
2. Click "Add file" → "Upload files"
3. Drag and drop all files from `/home/code/jolash-salon/`
4. Commit message: "Deploy bug-free Jolash Salon website"
5. Click "Commit changes"

### Option B: Use GitHub Desktop

1. Download: https://desktop.github.com
2. Sign in with your GitHub account
3. Clone repository: `Dianasmith6525/Jolashh`
4. Copy all files from `/home/code/jolash-salon/` to the cloned folder
5. Commit and push

---

## METHOD 3: Using SSH (Advanced)

If you have SSH keys set up:

```bash
cd /home/code/jolash-salon
git remote set-url origin git@github.com:Dianasmith6525/Jolashh.git
git push -u origin main
```

---

## ✅ AFTER PUSHING TO GITHUB

Once your code is on GitHub, you can deploy:

1. **Vercel** (Frontend): https://vercel.com
   - Import from GitHub
   - Auto-deploys on every push

2. **Railway** (Backend): https://railway.app
   - Deploy from GitHub repo
   - Add PostgreSQL database

---

## 🆘 TROUBLESHOOTING

**Error: "Authentication failed"**
- Make sure you're using your Personal Access Token as the password, not your GitHub password

**Error: "Repository not found"**
- Check that the repository URL is correct
- Make sure you have access to the repository

**Error: "Permission denied"**
- Verify your token has `repo` scope enabled

---

## 📦 ALTERNATIVE: Download and Upload Manually

If you prefer, you can:

1. Download the deployment package: `/home/code/jolash-salon-deploy.tar.gz`
2. Extract it on your computer
3. Upload to GitHub via web interface

---

**Need help? Check the full deployment guide: DEPLOYMENT_GUIDE.md**

