const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  // Replaces the single "connectionString"
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false // Required for Neon
  }
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};