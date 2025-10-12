const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { sendVerificationEmail, sendWelcomeEmail } = require('../emailService');

// Register user
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Check if user already exists
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const tokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    
    const result = await pool.query(
      `INSERT INTO users (name, email, password, email_verified, verification_token, verification_token_expires) 
       VALUES ($1, $2, $3, false, $4, $5) 
       RETURNING id, name, email, email_verified`,
      [name, email, hashedPassword, verificationToken, tokenExpires]
    );
    
    const user = result.rows[0];
    
    // Send verification email
    const emailResult = await sendVerificationEmail(email, verificationToken, name);
    
    if (!emailResult.success) {
      console.error('Failed to send verification email:', emailResult.error);
      // Still return success since user is created, but log the issue
    }
    
    res.status(201).json({ 
      message: 'Registration successful! Please check your email to verify your account.',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        email_verified: user.email_verified
      }
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Login user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  console.log('Login attempt for:', email);
  
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      console.log('User not found:', email);
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const user = result.rows[0];
    const validPassword = await bcrypt.compare(password, user.password);
    
    if (!validPassword) {
      console.log('Invalid password for:', email);
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Check if email is verified (allow admin bypass)
    if (!user.email_verified && !user.is_admin) {
      console.log('Email not verified for:', email);
      return res.status(403).json({ 
        error: 'Please verify your email before logging in. Check your inbox for the verification link.',
        emailNotVerified: true 
      });
    }
    
    const token = jwt.sign(
      { id: user.id, email: user.email, is_admin: user.is_admin }, 
      process.env.JWT_SECRET || 'your-secret-key', 
      { expiresIn: '24h' }
    );
    
    console.log('Login successful for:', email, 'Admin:', user.is_admin);
    
    res.json({ 
      token, 
      user: { 
        id: user.id, 
        name: user.name, 
        email: user.email,
        is_admin: user.is_admin,
        email_verified: user.email_verified
      } 
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Verify email
router.get('/verify-email', async (req, res) => {
  const { token } = req.query;
  
  if (!token) {
    return res.status(400).json({ error: 'Verification token is required' });
  }
  
  try {
    const result = await pool.query(
      `SELECT * FROM users 
       WHERE verification_token = $1 
       AND verification_token_expires > NOW()`,
      [token]
    );
    
    if (result.rows.length === 0) {
      return res.status(400).json({ 
        error: 'Invalid or expired verification token. Please request a new verification email.' 
      });
    }
    
    const user = result.rows[0];
    
    // Update user as verified
    await pool.query(
      `UPDATE users 
       SET email_verified = true, 
           verification_token = NULL, 
           verification_token_expires = NULL 
       WHERE id = $1`,
      [user.id]
    );
    
    // Send welcome email
    await sendWelcomeEmail(user.email, user.name);
    
    console.log('Email verified successfully for:', user.email);
    
    res.json({ 
      message: 'Email verified successfully! You can now log in.',
      success: true 
    });
  } catch (err) {
    console.error('Email verification error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Resend verification email
router.post('/resend-verification', async (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }
  
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const user = result.rows[0];
    
    if (user.email_verified) {
      return res.status(400).json({ error: 'Email is already verified' });
    }
    
    // Generate new verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const tokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    
    await pool.query(
      `UPDATE users 
       SET verification_token = $1, verification_token_expires = $2 
       WHERE id = $3`,
      [verificationToken, tokenExpires, user.id]
    );
    
    // Send verification email
    const emailResult = await sendVerificationEmail(email, verificationToken, user.name);
    
    if (!emailResult.success) {
      return res.status(500).json({ error: 'Failed to send verification email' });
    }
    
    res.json({ message: 'Verification email sent! Please check your inbox.' });
  } catch (err) {
    console.error('Resend verification error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Request password reset
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }
  
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    
    if (result.rows.length === 0) {
      // Don't reveal if email exists for security
      return res.json({ message: 'If that email exists, a password reset link has been sent.' });
    }
    
    const user = result.rows[0];
    
    // Generate password reset token (1 hour expiration)
    const resetToken = crypto.randomBytes(32).toString('hex');
    const tokenExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    
    await pool.query(
      `UPDATE users 
       SET verification_token = $1, verification_token_expires = $2 
       WHERE id = $3`,
      [resetToken, tokenExpires, user.id]
    );
    
    // Send password reset email
    const { sendPasswordResetEmail } = require('../emailService');
    const emailResult = await sendPasswordResetEmail(email, resetToken, user.name);
    
    if (!emailResult.success) {
      console.error('Failed to send password reset email:', emailResult.error);
    }
    
    res.json({ message: 'If that email exists, a password reset link has been sent.' });
  } catch (err) {
    console.error('Password reset request error:', err);
    res.status(500).json({ error: 'Failed to process password reset request' });
  }
});

// Reset password with token
router.post('/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;
  
  if (!token || !newPassword) {
    return res.status(400).json({ error: 'Token and new password are required' });
  }
  
  if (newPassword.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  }
  
  try {
    const result = await pool.query(
      `SELECT * FROM users 
       WHERE verification_token = $1 
       AND verification_token_expires > NOW()`,
      [token]
    );
    
    if (result.rows.length === 0) {
      return res.status(400).json({ 
        error: 'Invalid or expired reset token. Please request a new password reset.' 
      });
    }
    
    const user = result.rows[0];
    
    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Update password and clear reset token
    await pool.query(
      `UPDATE users 
       SET password = $1, 
           verification_token = NULL, 
           verification_token_expires = NULL 
       WHERE id = $2`,
      [hashedPassword, user.id]
    );
    
    console.log('Password reset successfully for:', user.email);
    
    res.json({ 
      message: 'Password reset successful! You can now log in with your new password.',
      success: true 
    });
  } catch (err) {
    console.error('Password reset error:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
