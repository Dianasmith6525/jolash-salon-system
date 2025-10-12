const { Pool } = require('pg');
const fs = require('fs');
require('dotenv').config();

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.PGPASSWORD,
  port: process.env.DB_PORT,
});

async function setupDatabase() {
  try {
    console.log('🔧 Setting up database...');
    
    // Read the SQL file
    const sql = fs.readFileSync('./init-db.sql', 'utf8');
    
    // Remove comments and split by semicolons
    const cleanedSql = sql
      .split('\n')
      .filter(line => !line.trim().startsWith('--'))
      .join('\n');
    
    const statements = cleanedSql
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.includes('CREATE DATABASE'));
    
    console.log(`📝 Found ${statements.length} SQL statements to execute`);
    
    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (statement.trim()) {
        try {
          console.log(`Executing statement ${i + 1}/${statements.length}...`);
          await pool.query(statement);
        } catch (err) {
          // Ignore "already exists" errors
          if (err.code !== '42P07' && err.code !== '23505') {
            console.error(`⚠️  Error in statement ${i + 1}:`, err.message);
          }
        }
      }
    }
    
    console.log('✅ Database setup completed successfully!');
    
    // Verify tables exist
    const result = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `);
    
    console.log('\n📊 Tables in database:');
    result.rows.forEach(row => {
      console.log(`   - ${row.table_name}`);
    });
    
  } catch (err) {
    console.error('❌ Error setting up database:', err);
  } finally {
    await pool.end();
  }
}

setupDatabase();
