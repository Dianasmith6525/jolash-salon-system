const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.PGPASSWORD,
  port: process.env.DB_PORT,
});

async function createAdminUser() {
  try {
    console.log('🔧 Creating admin user...');
    
    const email = 'admin@jolashsalon.com';
    const password = 'admin123';
    const name = 'Admin User';
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Check if admin already exists
    const checkResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    
    if (checkResult.rows.length > 0) {
      console.log('⚠️  Admin user already exists. Updating...');
      await pool.query(
        'UPDATE users SET password = $1, is_admin = TRUE WHERE email = $2',
        [hashedPassword, email]
      );
      console.log('✅ Admin user updated successfully!');
    } else {
      // Create new admin user
      const result = await pool.query(
        'INSERT INTO users (name, email, password, is_admin) VALUES ($1, $2, $3, TRUE) RETURNING *',
        [name, email, hashedPassword]
      );
      console.log('✅ Admin user created successfully!');
      console.log('User details:', {
        id: result.rows[0].id,
        name: result.rows[0].name,
        email: result.rows[0].email,
        is_admin: result.rows[0].is_admin
      });
    }
    
    console.log('\n📝 Admin credentials:');
    console.log('   Email: admin@jolashsalon.com');
    console.log('   Password: admin123');
    console.log('\n⚠️  Remember to change these credentials in production!');
    
  } catch (err) {
    console.error('❌ Error creating admin user:', err);
  } finally {
    await pool.end();
  }
}

createAdminUser();
