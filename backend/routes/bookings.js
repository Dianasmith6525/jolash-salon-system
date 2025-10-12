const express = require('express');
const router = express.Router();
const pool = require('../db');
const { sendBookingConfirmation } = require('../emailService');

// Get all bookings
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM bookings ORDER BY booking_date DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create booking
router.post('/', async (req, res) => {
  console.log('Received booking request:', req.body);
  const { customer_name, customer_email, customer_phone, service_id, booking_date, booking_time, notes } = req.body;
  
  // Validate required fields
  if (!customer_name || !customer_email || !service_id || !booking_date || !booking_time) {
    console.log('Validation failed:', { customer_name, customer_email, service_id, booking_date, booking_time });
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    console.log('Attempting to insert booking with values:', {
      customer_name, customer_email, customer_phone, service_id, 
      booking_date, booking_time, notes
    });
    
    const result = await pool.query(
      'INSERT INTO bookings (customer_name, customer_email, customer_phone, service_id, booking_date, booking_time, notes, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [customer_name, customer_email, customer_phone, service_id, booking_date, booking_time, notes, 'pending']
    );
    
    const booking = result.rows[0];
    console.log('✅ Booking created successfully:', booking);
    
    // Get service details for email confirmation
    const serviceResult = await pool.query('SELECT * FROM services WHERE id = $1', [service_id]);
    const service = serviceResult.rows[0];
    
    // Send confirmation email
    if (service) {
      console.log('📧 Sending booking confirmation email...');
      const emailSent = await sendBookingConfirmation(
        customer_email,
        customer_name,
        booking,
        service
      );
      
      if (emailSent) {
        console.log('✅ Booking confirmation email sent successfully');
      } else {
        console.log('⚠️ Warning: Booking created but email failed to send');
      }
    }
    
    res.status(201).json(booking);
  } catch (err) {
    console.error('❌ Database error:', err);
    console.error('Error details:', {
      message: err.message,
      code: err.code,
      detail: err.detail,
      stack: err.stack
    });
    res.status(500).json({ error: err.message });
  }
});

// Update booking status
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const result = await pool.query(
      'UPDATE bookings SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
