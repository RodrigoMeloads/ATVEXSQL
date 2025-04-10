// routes/dbtest.js
const express = require('express');
const router = express.Router();
const db = require('../db/connection'); // Importando a conexão

// Testando a conexão com o banco de dados
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT NOW() AS db_time');
    res.json({ success: true, db_time: rows[0].db_time });
  } catch (err) {
    console.error('Erro na rota /dbtest:', err);
    res.status(500).json({ success: false, message: 'Erro ao conectar no banco' });
  }
});

module.exports = router;
