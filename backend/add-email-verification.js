const { Pool } = require('pg');
const fs = require('fs');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'jolash_salon',
  user: process.env.PGUSER || 'postgres',
  password: process.env.PGPASSWORD
});

async function addEmailVerification() {
  try {
    const sql = fs.readFileSync('./add-email-verification.sql', 'utf8');
    await pool.query(sql);
    console.log('✅ Email verification columns added successfully!');
  } catch (error) {
    console.error('❌ Error adding email verification columns:', error.message);
  } finally {
    await pool.end();
  }
}

addEmailVerification();
