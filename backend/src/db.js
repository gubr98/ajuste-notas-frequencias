import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = process.env.DB_PATH || path.resolve(__dirname, '../../database/db.sqlite');
const SCHEMA_PATH = path.resolve(__dirname, '../../database/schema.sql');

// Abre conexão
export const db = new Database(DB_PATH);

// Inicializa schema se tabelas não existirem
function needInit() {
  try {
    const row = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='usuarios'").get();
    return !row;
  } catch (e) {
    return true;
  }
}

export function initSchema() {
  if (!fs.existsSync(path.dirname(DB_PATH))) {
    fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
  }
  if (needInit()) {
    const schema = fs.readFileSync(SCHEMA_PATH, 'utf-8');
    db.exec(schema);
    console.log('[DB] Schema criado e seeds aplicados.');
  } else {
    console.log('[DB] Schema já existente.');
  }
}