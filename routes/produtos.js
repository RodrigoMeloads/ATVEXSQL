// routes/produtos.js
const express = require('express');
const router = express.Router();
const pool = require('../db/connection'); // Corrigido para importar de 'db/connection.js'

// GET - lista todos os produtos
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM produtos');
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST - adiciona um produto
router.post('/', async (req, res) => {
  const { nome, descricao, preco } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO produtos (nome, descricao, preco) VALUES (?, ?, ?)',
      [nome, descricao, preco]
    );
    res.status(201).json({ success: true, message: 'Produto adicionado', id: result.insertId });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT - atualiza produto
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const { nome, descricao, preco } = req.body;
  try {
    await pool.query(
      'UPDATE produtos SET nome = ?, descricao = ?, preco = ? WHERE id = ?',
      [nome, descricao, preco, id]
    );
    res.json({ success: true, message: 'Produto atualizado' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE - remove produto
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await pool.query('DELETE FROM produtos WHERE id = ?', [id]);
    res.json({ success: true, message: 'Produto removido' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
