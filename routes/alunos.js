// routes/alunos.js
const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// Listar todos os alunos
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM alunos');
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error('Erro ao listar alunos:', err);
    res.status(500).json({ success: false, message: 'Erro ao buscar alunos' });
  }
});

// Buscar aluno por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query('SELECT * FROM alunos WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Aluno não encontrado' });
    }

    res.json({ success: true, data: rows[0] });
  } catch (err) {
    console.error('Erro ao buscar aluno por ID:', err);
    res.status(500).json({ success: false, message: 'Erro ao buscar aluno' });
  }
});

// Cadastrar novo aluno
router.post('/', async (req, res) => {
  const { nome, curso, idade } = req.body;

  try {
    const [result] = await db.query(
      'INSERT INTO alunos (nome, curso, idade) VALUES (?, ?, ?)',
      [nome, curso, idade]
    );

    res.status(201).json({ success: true, message: 'Aluno cadastrado com sucesso', id: result.insertId });
  } catch (err) {
    console.error('Erro ao cadastrar aluno:', err);
    res.status(500).json({ success: false, message: 'Erro ao cadastrar aluno' });
  }
});

// Atualizar aluno
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, curso, idade } = req.body;

  try {
    const [result] = await db.query(
      'UPDATE alunos SET nome = ?, curso = ?, idade = ? WHERE id = ?',
      [nome, curso, idade, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Aluno não encontrado' });
    }

    res.json({ success: true, message: 'Aluno atualizado com sucesso' });
  } catch (err) {
    console.error('Erro ao atualizar aluno:', err);
    res.status(500).json({ success: false, message: 'Erro ao atualizar aluno' });
  }
});

// Excluir aluno
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query('DELETE FROM alunos WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Aluno não encontrado' });
    }

    res.json({ success: true, message: 'Aluno excluído com sucesso' });
  } catch (err) {
    console.error('Erro ao excluir aluno:', err);
    res.status(500).json({ success: false, message: 'Erro ao excluir aluno' });
  }
});

module.exports = router;
