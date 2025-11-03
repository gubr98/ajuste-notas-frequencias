import express from 'express';
import { db } from './db.js';

export const router = express.Router();

// Health
router.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'ajuste-notas-backend', now: new Date().toISOString() });
});

// Disciplinas
router.get('/disciplinas', (_req, res) => {
  const rows = db.prepare('SELECT id, nome FROM disciplinas ORDER BY nome').all();
  res.json(rows);
});

// Solicitações - listar
router.get('/solicitacoes', (req, res) => {
  const { status } = req.query;
  let sql = `SELECT s.*, u.nome AS aluno_nome, d.nome AS disciplina_nome
             FROM solicitacoes s
             JOIN usuarios u ON u.id = s.aluno_id
             JOIN disciplinas d ON d.id = s.disciplina_id`;
  const params = [];
  if (status) {
    sql += ' WHERE s.status = ?';
    params.push(status);
  }
  sql += ' ORDER BY s.created_at DESC';
  const rows = db.prepare(sql).all(...params);
  res.json(rows);
});

// Solicitações - criar
router.post('/solicitacoes', (req, res) => {
  const {
    aluno_id = 1, // demo
    disciplina_id,
    tipo,
    justificativa = '',
    nota_antiga = null,
    nota_solicitada = null,
    frequencia_antiga = null,
    frequencia_solicitada = null
  } = req.body || {};

  if (!disciplina_id || !tipo) {
    return res.status(400).json({ error: 'disciplina_id e tipo são obrigatórios' });
  }

  const stmt = db.prepare(`INSERT INTO solicitacoes
    (aluno_id, disciplina_id, tipo, justificativa, nota_antiga, nota_solicitada, frequencia_antiga, frequencia_solicitada)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);
  const info = stmt.run(aluno_id, disciplina_id, tipo, justificativa, nota_antiga, nota_solicitada, frequencia_antiga, frequencia_solicitada);

  const row = db.prepare('SELECT * FROM solicitacoes WHERE id = ?').get(info.lastInsertRowid);
  res.status(201).json(row);
});

// Solicitações - obter por id
router.get('/solicitacoes/:id', (req, res) => {
  const id = Number(req.params.id);
  const row = db.prepare('SELECT * FROM solicitacoes WHERE id = ?').get(id);
  if (!row) return res.status(404).json({ error: 'Solicitação não encontrada' });
  res.json(row);
});

// Solicitações - atualizar status
router.patch('/solicitacoes/:id/status', (req, res) => {
  const id = Number(req.params.id);
  const { status, usuario_id = null, observacoes = null } = req.body || {};

  const valid = ['em_analise','aprovado_docente','rejeitado_docente','validado_secretaria'];
  if (!valid.includes(status)) {
    return res.status(400).json({ error: 'Status inválido' });
  }

  let setExtra = '';
  let params = [status, observacoes, id];

  if (status === 'aprovado_docente' || status === 'rejeitado_docente') {
    setExtra = ', docente_id = ?';
    params = [status, observacoes, usuario_id, id];
  } else if (status === 'validado_secretaria') {
    setExtra = ', secretaria_id = ?';
    params = [status, observacoes, usuario_id, id];
  }

  const stmt = db.prepare(`UPDATE solicitacoes
    SET status = ?, observacoes = ?, updated_at = datetime('now') ${setExtra}
    WHERE id = ?`);

  const info = stmt.run(...params);
  if (info.changes === 0) return res.status(404).json({ error: 'Solicitação não encontrada' });

  const row = db.prepare('SELECT * FROM solicitacoes WHERE id = ?').get(id);
  res.json(row);
});