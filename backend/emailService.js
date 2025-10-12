const nodemailer = require('nodemailer');
require('dotenv').config();

// Create email transporter
const createTransporter = () => {
  // For development: Use Gmail or a test service like Ethereal
  // For production: Use a professional service like SendGrid, AWS SES, or Mailgun
  
  if (process.env.NODE_ENV === 'production') {
    // Production email service (e.g., SendGrid, AWS SES)
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT || 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  } else {
    // Development: Use Gmail or create test account
    // For Gmail: Enable "Less secure app access" or use App Password
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com',
        pass: process.env.EMAIL_PASSWORD || 'your-app-password'
      }
    });
  }
};

// Send verification email
const sendVerificationEmail = async (email, token, name) => {
  const transporter = createTransporter();
  
  const verificationUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/verify-email?token=${token}`;
  
  const mailOptions = {
    from: `"Jolash Salon" <${process.env.EMAIL_USER || 'noreply@jolashsalon.com'}>`,
    to: email,
    subject: 'Verify Your Email - Jolash Salon',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: #667eea; color: white; padding: 14px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; font-weight: bold; }
          .button:hover { background: #764ba2; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✨ Welcome to Jolash Salon!</h1>
          </div>
          <div class="content">
            <h2>Hi ${name || 'there'}! 👋</h2>
            <p>Thank you for registering with Jolash Salon. We're excited to have you!</p>
            <p>To complete your registration and secure your account, please verify your email address by clicking the button below:</p>
            <div style="text-align: center;">
              <a href="${verificationUrl}" class="button">Verify Email Address</a>
            </div>
            <p>Or copy and paste this link into your browser:</p>
            <p style="background: #fff; padding: 10px; border: 1px solid #ddd; border-radius: 5px; word-break: break-all;">
              ${verificationUrl}
            </p>
            <p><strong>This link will expire in 24 hours.</strong></p>
            <p>If you didn't create an account with Jolash Salon, please ignore this email.</p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Jolash Salon. All rights reserved.</p>
            <p>Professional Beauty & Wellness Services</p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Verification email sent to:', email);
    return { success: true };
  } catch (error) {
    console.error('❌ Error sending verification email:', error);
    return { success: false, error: error.message };
  }
};

// Send password reset email
const sendPasswordResetEmail = async (email, token, name) => {
  const transporter = createTransporter();
  
  const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${token}`;
  
  const mailOptions = {
    from: `"Jolash Salon" <${process.env.EMAIL_USER || 'noreply@jolashsalon.com'}>`,
    to: email,
    subject: 'Reset Your Password - Jolash Salon',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: #dc2626; color: white; padding: 14px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; font-weight: bold; }
          .button:hover { background: #b91c1c; }
          .warning { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔐 Password Reset Request</h1>
          </div>
          <div class="content">
            <h2>Hi ${name || 'there'},</h2>
            <p>We received a request to reset your password for your Jolash Salon account.</p>
            <p>Click the button below to create a new password:</p>
            <div style="text-align: center;">
              <a href="${resetUrl}" class="button">Reset Password</a>
            </div>
            <p>Or copy and paste this link into your browser:</p>
            <p style="background: #fff; padding: 10px; border: 1px solid #ddd; border-radius: 5px; word-break: break-all;">
              ${resetUrl}
            </p>
            <div class="warning">
              <strong>⚠️ Security Notice:</strong>
              <ul style="margin: 10px 0;">
                <li>This link will expire in 1 hour</li>
                <li>If you didn't request a password reset, please ignore this email</li>
                <li>Your password won't change until you create a new one</li>
              </ul>
            </div>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Jolash Salon. All rights reserved.</p>
            <p>Professional Beauty & Wellness Services</p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Password reset email sent to:', email);
    return { success: true };
  } catch (error) {
    console.error('❌ Error sending password reset email:', error);
    return { success: false, error: error.message };
  }
};

// Send welcome email after verification
const sendWelcomeEmail = async (email, name) => {
  const transporter = createTransporter();
  
  const mailOptions = {
    from: `"Jolash Salon" <${process.env.EMAIL_USER || 'noreply@jolashsalon.com'}>`,
    to: email,
    subject: 'Welcome to Jolash Salon! ✨',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: #667eea; color: white; padding: 14px 30px; text-decoration: none; border-radius: 5px; margin: 10px 5px; font-weight: bold; }
          .features { background: white; padding: 20px; margin: 20px 0; border-radius: 5px; }
          .feature-item { margin: 15px 0; padding-left: 25px; position: relative; }
          .feature-item:before { content: "✓"; position: absolute; left: 0; color: #667eea; font-weight: bold; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Welcome to Jolash Salon!</h1>
          </div>
          <div class="content">
            <h2>Congratulations, ${name}! 🌟</h2>
            <p>Your email has been verified and your account is now active!</p>
            
            <div class="features">
              <h3>What you can do now:</h3>
              <div class="feature-item">Book appointments 24/7 online</div>
              <div class="feature-item">Browse our exclusive services and products</div>
              <div class="feature-item">Manage your bookings</div>
              <div class="feature-item">Receive special offers and updates</div>
              <div class="feature-item">View your booking history</div>
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/booking" class="button">Book Appointment</a>
              <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/shop-by-concern" class="button">Browse Products</a>
            </div>

            <p>Need help? Our team is here for you! Contact us anytime.</p>
            <p>We can't wait to help you look and feel your best! ✨</p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Jolash Salon. All rights reserved.</p>
            <p>Professional Beauty & Wellness Services</p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Welcome email sent to:', email);
    return { success: true };
  } catch (error) {
    console.error('❌ Error sending welcome email:', error);
    return { success: false, error: error.message };
  }
};

// Send booking confirmation email
const sendBookingConfirmation = async (customerEmail, customerName, bookingDetails, serviceDetails) => {
  const transporter = createTransporter();
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const mailOptions = {
    from: `"Jolash Salon" <${process.env.EMAIL_USER || 'noreply@jolashsalon.com'}>`,
    to: customerEmail,
    subject: `Booking Confirmation - ${serviceDetails.name} at Jolash Salon`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f9f9f9; }
          .container { max-width: 600px; margin: 0 auto; background-color: white; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 20px; text-align: center; }
          .header h1 { margin: 0; font-size: 28px; font-weight: bold; }
          .header p { margin: 10px 0 0 0; font-size: 16px; opacity: 0.9; }
          .content { padding: 40px 30px; }
          .booking-card { background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); border-radius: 12px; padding: 25px; margin: 20px 0; border-left: 5px solid #667eea; }
          .booking-details { display: grid; gap: 15px; }
          .detail-row { display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #eee; }
          .detail-label { font-weight: bold; color: #555; }
          .detail-value { color: #333; text-align: right; }
          .service-info { background: #fff; border-radius: 8px; padding: 20px; margin: 20px 0; border: 2px solid #f0f0f0; }
          .price-highlight { font-size: 24px; font-weight: bold; color: #667eea; }
          .cta-section { text-align: center; margin: 30px 0; }
          .btn { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; transition: transform 0.3s ease; }
          .btn:hover { transform: translateY(-2px); }
          .footer { background: #f8f9fa; padding: 30px; text-align: center; color: #666; border-top: 1px solid #eee; }
          .contact-info { margin: 20px 0; }
          .social-links { margin: 20px 0; }
          .important-note { background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 15px; margin: 20px 0; color: #856404; }
          .checkmark { width: 60px; height: 60px; border-radius: 50%; background: #28a745; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; }
          .checkmark::after { content: '✓'; color: white; font-size: 30px; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="checkmark"></div>
            <h1>Booking Confirmed!</h1>
            <p>Your appointment has been successfully scheduled</p>
          </div>
          
          <div class="content">
            <h2>Hello ${customerName},</h2>
            <p>Thank you for choosing Jolash Salon! We're excited to provide you with an exceptional beauty experience.</p>
            
            <div class="booking-card">
              <h3 style="margin-top: 0; color: #667eea;">Your Appointment Details</h3>
              <div class="booking-details">
                <div class="detail-row">
                  <span class="detail-label">Service:</span>
                  <span class="detail-value">${serviceDetails.name}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Date:</span>
                  <span class="detail-value">${formatDate(bookingDetails.booking_date)}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Time:</span>
                  <span class="detail-value">${formatTime(bookingDetails.booking_time)}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Duration:</span>
                  <span class="detail-value">${serviceDetails.duration} minutes</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Price:</span>
                  <span class="detail-value price-highlight">$${serviceDetails.price}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Booking ID:</span>
                  <span class="detail-value">#${bookingDetails.id}</span>
                </div>
              </div>
            </div>

            <div class="service-info">
              <h4 style="margin-top: 0; color: #333;">Service Description</h4>
              <p>${serviceDetails.description}</p>
            </div>

            ${bookingDetails.notes ? `
            <div class="important-note">
              <strong>Special Notes:</strong> ${bookingDetails.notes}
            </div>
            ` : ''}

            <div class="important-note">
              <strong>Important:</strong> Please arrive 15 minutes early for your appointment. If you need to reschedule or cancel, please contact us at least 24 hours in advance.
            </div>

            <div class="cta-section">
              <p><strong>Need to make changes?</strong></p>
              <a href="tel:+1234567890" class="btn">Call Us: (123) 456-7890</a>
            </div>

            <p>We look forward to seeing you soon!</p>
            <p>Best regards,<br><strong>The Jolash Salon Team</strong></p>
          </div>

          <div class="footer">
            <div class="contact-info">
              <p><strong>Jolash Salon</strong></p>
              <p>📍 123 Beauty Street, Salon City, SC 12345</p>
              <p>📞 (123) 456-7890 | ✉️ info@jolashsalon.com</p>
              <p>🌐 www.jolashsalon.com</p>
            </div>
            <div class="social-links">
              <p>Follow us: Instagram | Facebook | Twitter</p>
            </div>
            <p style="font-size: 12px; margin-top: 20px;">
              This is an automated confirmation email. Please do not reply to this address.
            </p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Booking confirmation email sent successfully to:', customerEmail);
    return true;
  } catch (error) {
    console.error('❌ Error sending booking confirmation email:', error);
    return false;
  }
};

// Send purchase confirmation email
const sendPurchaseConfirmation = async (customerEmail, customerName, orderDetails, items) => {
  const transporter = createTransporter();
  
  const calculateTotal = (items) => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const subtotal = calculateTotal(items);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  const mailOptions = {
    from: `"Jolash Salon" <${process.env.EMAIL_USER || 'noreply@jolashsalon.com'}>`,
    to: customerEmail,
    subject: `Order Confirmation - Thank you for your purchase!`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f9f9f9; }
          .container { max-width: 600px; margin: 0 auto; background-color: white; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #ff6b6b 0%, #ffa500 100%); color: white; padding: 40px 20px; text-align: center; }
          .header h1 { margin: 0; font-size: 28px; font-weight: bold; }
          .header p { margin: 10px 0 0 0; font-size: 16px; opacity: 0.9; }
          .content { padding: 40px 30px; }
          .order-summary { background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); border-radius: 12px; padding: 25px; margin: 20px 0; border-left: 5px solid #ff6b6b; }
          .item-list { margin: 20px 0; }
          .item { display: flex; justify-content: space-between; align-items: center; padding: 15px; margin: 10px 0; background: white; border-radius: 8px; border: 1px solid #eee; }
          .item-details { flex: 1; }
          .item-name { font-weight: bold; color: #333; margin-bottom: 5px; }
          .item-desc { color: #666; font-size: 14px; }
          .item-price { text-align: right; }
          .quantity { background: #ff6b6b; color: white; padding: 4px 8px; border-radius: 12px; font-size: 12px; font-weight: bold; margin-left: 10px; }
          .price { font-weight: bold; color: #ff6b6b; font-size: 18px; }
          .totals { background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0; }
          .total-row { display: flex; justify-content: space-between; padding: 8px 0; }
          .total-final { border-top: 2px solid #ff6b6b; margin-top: 10px; padding-top: 10px; font-weight: bold; font-size: 20px; color: #ff6b6b; }
          .shipping-info { background: #e8f5e8; border-radius: 8px; padding: 20px; margin: 20px 0; border-left: 4px solid #28a745; }
          .cta-section { text-align: center; margin: 30px 0; }
          .btn { display: inline-block; background: linear-gradient(135deg, #ff6b6b 0%, #ffa500 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 5px; transition: transform 0.3s ease; }
          .btn:hover { transform: translateY(-2px); }
          .footer { background: #f8f9fa; padding: 30px; text-align: center; color: #666; border-top: 1px solid #eee; }
          .checkmark { width: 60px; height: 60px; border-radius: 50%; background: #28a745; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; }
          .checkmark::after { content: '🛍️'; font-size: 30px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="checkmark"></div>
            <h1>Order Confirmed!</h1>
            <p>Thank you for your purchase at Jolash Salon</p>
          </div>
          
          <div class="content">
            <h2>Hello ${customerName},</h2>
            <p>Thank you for shopping with Jolash Salon! Your order has been confirmed and is being prepared for shipment.</p>
            
            <div class="order-summary">
              <h3 style="margin-top: 0; color: #ff6b6b;">Order Details</h3>
              <div class="total-row">
                <span><strong>Order Number:</strong></span>
                <span><strong>#${orderDetails.orderNumber || 'JLS' + Date.now()}</strong></span>
              </div>
              <div class="total-row">
                <span><strong>Order Date:</strong></span>
                <span>${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
            </div>

            <div class="item-list">
              <h3>Your Items:</h3>
              ${items.map(item => `
                <div class="item">
                  <div class="item-details">
                    <div class="item-name">${item.name}</div>
                    <div class="item-desc">Premium salon product</div>
                  </div>
                  <div class="item-price">
                    <span class="quantity">×${item.quantity}</span>
                    <div class="price">$${(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                </div>
              `).join('')}
            </div>

            <div class="totals">
              <div class="total-row">
                <span>Subtotal:</span>
                <span>$${subtotal.toFixed(2)}</span>
              </div>
              <div class="total-row">
                <span>Tax (8%):</span>
                <span>$${tax.toFixed(2)}</span>
              </div>
              <div class="total-row">
                <span>Shipping:</span>
                <span>FREE</span>
              </div>
              <div class="total-row total-final">
                <span>Total:</span>
                <span>$${total.toFixed(2)}</span>
              </div>
            </div>

            <div class="shipping-info">
              <h4 style="margin-top: 0; color: #28a745;">📦 Shipping Information</h4>
              <p><strong>Estimated Delivery:</strong> 3-5 business days</p>
              <p><strong>Shipping Method:</strong> Standard FREE Shipping</p>
              <p>You will receive a tracking number via email once your order ships.</p>
            </div>

            <div class="cta-section">
              <p><strong>Questions about your order?</strong></p>
              <a href="tel:+1234567890" class="btn">Call Support</a>
              <a href="mailto:orders@jolashsalon.com" class="btn">Email Us</a>
            </div>

            <p>Thank you for choosing Jolash Salon for your beauty needs!</p>
            <p>Best regards,<br><strong>The Jolash Salon Team</strong></p>
          </div>

          <div class="footer">
            <div class="contact-info">
              <p><strong>Jolash Salon</strong></p>
              <p>📍 123 Beauty Street, Salon City, SC 12345</p>
              <p>📞 (123) 456-7890 | ✉️ orders@jolashsalon.com</p>
              <p>🌐 www.jolashsalon.com</p>
            </div>
            <p style="font-size: 12px; margin-top: 20px;">
              This is an automated confirmation email. Please keep this for your records.
            </p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Purchase confirmation email sent successfully to:', customerEmail);
    return true;
  } catch (error) {
    console.error('❌ Error sending purchase confirmation email:', error);
    return false;
  }
};

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendWelcomeEmail,
  sendBookingConfirmation,
  sendPurchaseConfirmation
};
