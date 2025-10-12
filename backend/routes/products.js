const express = require('express');
const router = express.Router();
const pool = require('../db');
const { sendPurchaseConfirmation } = require('../emailService');

// Get all products
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get products by category
router.get('/category/:category', async (req, res) => {
  const { category } = req.params;
  try {
    const result = await pool.query('SELECT * FROM products WHERE category = $1', [category]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create purchase order
router.post('/purchase', async (req, res) => {
  const { customer_name, customer_email, customer_phone, items, shipping_address } = req.body;
  
  // Validate required fields
  if (!customer_name || !customer_email || !items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Missing required fields: customer_name, customer_email, or items' });
  }

  try {
    // Generate order number
    const orderNumber = 'JLS' + Date.now();
    
    // Calculate total
    let total = 0;
    const productDetails = [];
    
    // Verify products exist and calculate total
    for (const item of items) {
      const productResult = await pool.query('SELECT * FROM products WHERE id = $1', [item.product_id]);
      if (productResult.rows.length === 0) {
        return res.status(400).json({ error: `Product with ID ${item.product_id} not found` });
      }
      
      const product = productResult.rows[0];
      const itemTotal = product.price * item.quantity;
      total += itemTotal;
      
      productDetails.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: item.quantity
      });
    }
    
    // Create order record (assuming we have an orders table, or we can log it)
    console.log('📦 Processing purchase order:', {
      orderNumber,
      customer_name,
      customer_email,
      total,
      items: productDetails
    });
    
    // Send confirmation email
    console.log('📧 Sending purchase confirmation email...');
    const emailSent = await sendPurchaseConfirmation(
      customer_email,
      customer_name,
      { orderNumber },
      productDetails
    );
    
    if (emailSent) {
      console.log('✅ Purchase confirmation email sent successfully');
    } else {
      console.log('⚠️ Warning: Order processed but email failed to send');
    }
    
    // Return order confirmation
    res.status(201).json({
      success: true,
      orderNumber,
      total,
      items: productDetails,
      message: 'Order placed successfully! Confirmation email sent.',
      emailSent
    });
    
  } catch (err) {
    console.error('❌ Error processing purchase:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
