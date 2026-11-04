const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'bctech_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  dateStrings: true,
});

const db = pool.promise();

async function testConnection() {
  try {
    const [rows] = await db.query('SELECT 1 AS ok');
    console.log('  MySQL connected:', rows[0].ok === 1 ? 'OK' : 'FAILED');
  } catch (err) {
    console.error('  MySQL connection failed:', err.message);
  }
}

module.exports = db;
module.exports.pool = pool;
module.exports.testConnection = testConnection;