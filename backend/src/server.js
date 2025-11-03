import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { db, initSchema } from './db.js';
import { router as apiRouter } from './routes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Inicializa DB (cria tabelas e seeds na primeira execução)
initSchema();

// Servir frontend estático
const frontendPath = path.resolve(__dirname, '../../frontend');
app.use(express.static(frontendPath));

// API
app.use('/api', apiRouter);

// 404 para API
app.use('/api/*', (_req, res) => res.status(404).json({ error: 'Not found' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});