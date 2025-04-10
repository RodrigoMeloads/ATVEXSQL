// routes/clientes.js
const express = require('express');
const router = express.Router();
const pool = require('../db/connection'); // Corrigido para importar de 'db/connection.js'

// GET - lista todos os clientes
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM clientes');
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST - adiciona um cliente
router.post('/', async (req, res) => {
  const { nome, sobrenome, email, idade } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO clientes (nome, sobrenome, email, idade) VALUES (?, ?, ?, ?)',
      [nome, sobrenome, email, idade]
    );
    res.status(201).json({ success: true, message: 'Cliente adicionado', id: result.insertId });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT - atualiza cliente
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const { nome, sobrenome, email, idade } = req.body;
  try {
    await pool.query(
      'UPDATE clientes SET nome = ?, sobrenome = ?, email = ?, idade = ? WHERE id = ?',
      [nome, sobrenome, email, idade, id]
    );
    res.json({ success: true, message: 'Cliente atualizado' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE - remove cliente
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await pool.query('DELETE FROM clientes WHERE id = ?', [id]);
    res.json({ success: true, message: 'Cliente removido' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
