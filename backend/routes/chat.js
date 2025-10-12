const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get chat messages
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM chat_messages ORDER BY created_at ASC LIMIT 100');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Send chat message
router.post('/', async (req, res) => {
  const { user_name, message, is_admin } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO chat_messages (user_name, message, is_admin) VALUES ($1, $2, $3) RETURNING *',
      [user_name, message, is_admin || false]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
