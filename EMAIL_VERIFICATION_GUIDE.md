# Email Verification Setup Guide

This guide will help you configure email verification for Jolash Salon.

## 🎯 What Was Added

Email verification strengthens security by:
- ✅ Confirming user email addresses are valid
- ✅ Preventing spam/fake accounts
- ✅ Ensuring users can receive important notifications
- ✅ Meeting security best practices

## 📦 New Features

1. **User Registration with Email Verification**
   - Users receive a verification email upon registration
   - 24-hour token expiration for security
   - Automatic welcome email after verification

2. **Login Protection**
   - Users must verify email before logging in (admins bypass)
   - Clear error messages for unverified accounts
   - Resend verification option

3. **Email Templates**
   - Professional HTML email design
   - Verification email with secure link
   - Welcome email after successful verification
   - Password reset email (bonus feature)

## 🔧 Setup Instructions

### Option 1: Gmail (Development - Easiest)

1. **Enable 2-Step Verification** (if not already enabled)
   - Go to https://myaccount.google.com/security
   - Enable 2-Step Verification

2. **Create App Password**
   - Visit https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)"
   - Name it "Jolash Salon"
   - Copy the 16-character password

3. **Update your `.env` file**:
   ```bash
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-16-char-app-password
   FRONTEND_URL=http://localhost:3000
   ```

### Option 2: SendGrid (Production - Recommended)

1. **Create SendGrid Account**
   - Sign up at https://sendgrid.com (free tier: 100 emails/day)

2. **Get API Key**
   - Go to Settings → API Keys
   - Create API Key with "Mail Send" permissions
   - Copy the API key

3. **Update your `.env` file**:
   ```bash
   NODE_ENV=production
   EMAIL_HOST=smtp.sendgrid.net
   EMAIL_PORT=587
   EMAIL_USER=apikey
   EMAIL_PASSWORD=your-sendgrid-api-key
   FRONTEND_URL=https://your-domain.vercel.app
   ```

### Option 3: AWS SES (Production - Scalable)

1. **Setup AWS SES**
   - Go to AWS Console → Simple Email Service
   - Verify your domain or email
   - Create SMTP credentials

2. **Update your `.env` file**:
   ```bash
   NODE_ENV=production
   EMAIL_HOST=email-smtp.us-east-1.amazonaws.com
   EMAIL_PORT=587
   EMAIL_USER=your-ses-smtp-username
   EMAIL_PASSWORD=your-ses-smtp-password
   FRONTEND_URL=https://your-domain.vercel.app
   ```

## 🧪 Testing Email Verification

### 1. Test Registration

```bash
# Register a new user
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

**Expected Response**:
```json
{
  "message": "Registration successful! Please check your email to verify your account.",
  "user": {
    "id": 2,
    "name": "Test User",
    "email": "test@example.com",
    "email_verified": false
  }
}
```

### 2. Check Email

- Open your email inbox
- Look for "Verify Your Email - Jolash Salon"
- Click the verification button

### 3. Test Unverified Login (Should Fail)

```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

**Expected Response**:
```json
{
  "error": "Please verify your email before logging in. Check your inbox for the verification link.",
  "emailNotVerified": true
}
```

### 4. Verify Email

Click the link in your email or visit:
```
http://localhost:3000/verify-email?token=<your-verification-token>
```

### 5. Test Verified Login (Should Succeed)

After verification, login should work:
```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

**Expected Response**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 2,
    "name": "Test User",
    "email": "test@example.com",
    "is_admin": false,
    "email_verified": true
  }
}
```

## 📧 Email Templates

The system sends three types of emails:

### 1. Verification Email
- **Subject**: "Verify Your Email - Jolash Salon"
- **Purpose**: Confirm email ownership
- **Expires**: 24 hours
- **Action**: Click verification button

### 2. Welcome Email
- **Subject**: "Welcome to Jolash Salon! ✨"
- **Purpose**: Greet verified users
- **Features**: Booking and product browsing links

### 3. Password Reset (Bonus)
- **Subject**: "Reset Your Password - Jolash Salon"
- **Purpose**: Secure password reset
- **Expires**: 1 hour

## 🔒 Security Features

1. **Token Expiration**
   - Verification tokens expire after 24 hours
   - Old tokens automatically invalidated

2. **One-Time Use**
   - Tokens cleared after verification
   - Cannot reuse verification links

3. **Admin Bypass**
   - Admin accounts can login without email verification
   - Prevents lockout during setup

4. **Secure Token Generation**
   - 32-byte cryptographically secure random tokens
   - URL-safe hex encoding

## 🚀 Deployment Considerations

### Railway/Heroku Backend

Add these environment variables in your hosting dashboard:

```bash
NODE_ENV=production
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASSWORD=SG.xxxxxxxxxxxxx
FRONTEND_URL=https://jolash-salon.vercel.app
```

### Vercel Frontend

Ensure `NEXT_PUBLIC_API_URL` points to your backend:

```bash
NEXT_PUBLIC_API_URL=https://jolash-backend.railway.app
```

## 📝 API Endpoints

### POST `/api/users/register`
Register new user and send verification email
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

### GET `/api/users/verify-email?token=xxx`
Verify email with token

### POST `/api/users/resend-verification`
Resend verification email
```json
{
  "email": "john@example.com"
}
```

### POST `/api/users/login`
Login (requires verified email for non-admins)
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

## 🎨 Customization

### Change Email Sender Name
Edit `backend/emailService.js`:
```javascript
from: `"Your Salon Name" <${process.env.EMAIL_USER}>`,
```

### Modify Email Templates
Edit HTML in `sendVerificationEmail()` function in `backend/emailService.js`

### Adjust Token Expiration
Edit `backend/routes/users.js`:
```javascript
// Change from 24 hours to 48 hours
const tokenExpires = new Date(Date.now() + 48 * 60 * 60 * 1000);
```

## 🐛 Troubleshooting

### "Failed to send verification email"
- ✅ Check `EMAIL_USER` and `EMAIL_PASSWORD` in `.env`
- ✅ Verify Gmail App Password is correct (16 characters, no spaces)
- ✅ Check if 2-Step Verification is enabled for Gmail
- ✅ Check email service logs

### "Invalid or expired verification token"
- ✅ Token may have expired (24 hours)
- ✅ Request new verification email
- ✅ Check database `verification_token_expires` column

### Email not received
- ✅ Check spam/junk folder
- ✅ Verify email service is configured correctly
- ✅ Check backend logs for email sending errors
- ✅ Test with a different email address

### "Email already registered"
- ✅ User already exists in database
- ✅ If unverified, use resend verification endpoint
- ✅ If verified, user can login directly

## 📊 Database Changes

New columns added to `users` table:

```sql
ALTER TABLE users 
ADD COLUMN email_verified BOOLEAN DEFAULT FALSE,
ADD COLUMN verification_token VARCHAR(255),
ADD COLUMN verification_token_expires TIMESTAMP;
```

**Update existing admin user** (if needed):
```sql
UPDATE users 
SET email_verified = true 
WHERE email = 'admin@jolashsalon.com';
```

## ✅ Verification Checklist

Before going to production:

- [ ] Email service configured (SendGrid/SES for production)
- [ ] `FRONTEND_URL` set to production domain
- [ ] Test registration flow end-to-end
- [ ] Test email delivery and verification
- [ ] Verify welcome email sends after verification
- [ ] Admin account has `email_verified = true`
- [ ] Email templates reviewed and customized
- [ ] Spam folder checked during testing
- [ ] Token expiration times appropriate
- [ ] Error messages are user-friendly

## 🎉 Benefits

✨ **Enhanced Security**
- Prevents fake accounts
- Validates email addresses
- Reduces spam registrations

✨ **Better User Experience**
- Professional welcome flow
- Clear verification process
- Helpful error messages

✨ **Production Ready**
- Industry-standard security
- Scalable email infrastructure
- Professional communication

---

**Need Help?** Check the backend logs for detailed error messages:
```bash
cd backend
npm run dev
# Watch for email sending logs
```

**Pro Tip**: During development, use Gmail. For production, use SendGrid (free tier) or AWS SES for reliability and deliverability.
