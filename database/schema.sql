PRAGMA foreign_keys = ON;

-- Tabelas
CREATE TABLE IF NOT EXISTS usuarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  senha TEXT,
  perfil TEXT NOT NULL CHECK (perfil IN ('aluno','docente','secretaria'))
);

CREATE TABLE IF NOT EXISTS disciplinas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS solicitacoes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  aluno_id INTEGER NOT NULL,
  disciplina_id INTEGER NOT NULL,
  tipo TEXT NOT NULL CHECK (tipo IN ('nota','frequencia')),
  justificativa TEXT,
  nota_antiga REAL,
  nota_solicitada REAL,
  frequencia_antiga REAL,
  frequencia_solicitada REAL,
  status TEXT NOT NULL DEFAULT 'em_analise' CHECK (status IN ('em_analise','aprovado_docente','rejeitado_docente','validado_secretaria')),
  docente_id INTEGER,
  secretaria_id INTEGER,
  observacoes TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (aluno_id) REFERENCES usuarios(id),
  FOREIGN KEY (disciplina_id) REFERENCES disciplinas(id),
  FOREIGN KEY (docente_id) REFERENCES usuarios(id),
  FOREIGN KEY (secretaria_id) REFERENCES usuarios(id)
);

-- Seeds mínimos
INSERT OR IGNORE INTO usuarios (id, nome, email, perfil) VALUES
  (1, 'Alice Aluna', 'alice@faculdade.edu', 'aluno'),
  (2, 'Diego Docente', 'diego@faculdade.edu', 'docente'),
  (3, 'Sara Secretaria', 'sara@faculdade.edu', 'secretaria');

INSERT OR IGNORE INTO disciplinas (id, nome) VALUES
  (1, 'Algoritmos'),
  (2, 'Banco de Dados'),
  (3, 'Engenharia de Software');