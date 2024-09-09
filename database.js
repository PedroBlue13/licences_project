const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.sqlite");

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nomeUser TEXT,
    departamento TEXT,
    licenca TEXT,
    dataCriacao TEXT,
    fornecedor TEXT,
    valor REAL,
    cc TEXT
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS analysts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    cost_center INTEGER NOT NULL,
    secret_code TEXT NOT NULL DEFAULT 'TI123doritos'
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS aditivos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    aditivo TEXT,
    patrimonio TEXT,
    chamado TEXT,
    colaborador TEXT,
    email_colaborador TEXT,
    rua TEXT,
    numero TEXT,
    bairro TEXT,
    estado TEXT,
    cidade TEXT,
    responsavel TEXT,
    tipo TEXT,
    modelo TEXT,
    armazenamento TEXT,
    processador TEXT,
    memoria_ram TEXT,
    placa_video TEXT,
    fonte TEXT,
    numero_nf TEXT,
    cnpj TEXT,
    centro_custos TEXT,
    numero_serie TEXT,
    inicio_contrato TEXT,
    observacao_pedido TEXT
)`);
});

module.exports = db;
