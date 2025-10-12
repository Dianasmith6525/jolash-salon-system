const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'jolash_salon',
  user: process.env.PGUSER || 'postgres',
  password: process.env.PGPASSWORD
});

async function verifyAdminUsers() {
  try {
    const result = await pool.query(
      `UPDATE users SET email_verified = true WHERE is_admin = true RETURNING email`
    );
    console.log('✅ Admin users verified:', result.rows.map(r => r.email).join(', '));
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await pool.end();
  }
}

verifyAdminUsers();
