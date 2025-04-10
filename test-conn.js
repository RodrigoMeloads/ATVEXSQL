const mysql = require('mysql2/promise');
require('dotenv').config();

async function testConnection() {
  try {
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    const [rows] = await conn.execute('SELECT NOW() AS now');
    console.log('✅ Conectado! Horário do DB:', rows[0].now);
    conn.end();
  } catch (err) {
    console.error('❌ Erro ao conectar:', err.message);
  }
}

testConnection();
