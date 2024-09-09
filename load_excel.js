const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');
const db = require('./database');

// Carregar o arquivo Excel
const workbook = xlsx.readFile(path.join(__dirname, 'public/source/xlsx/base.xlsx'));
const sheet_name_list = workbook.SheetNames;
const sheet = workbook.Sheets[sheet_name_list[0]];

// Converter os dados da planilha em JSON
const data = xlsx.utils.sheet_to_json(sheet);

// Função para substituir valores vazios por "Dado não preenchido"
function fillMissingData(value) {
    return value ? value : "Dado não preenchido";
}

// Função para inserir dados no banco de dados
function insertData() {
    data.forEach(row => {
        const nomeUser = fillMissingData(row.nomeUser);
        const departamento = fillMissingData(row.departamento);
        const licenca = fillMissingData(row.licenca);
        const dataCriacao = fillMissingData(row.dataCriacao);
        const fornecedor = fillMissingData(row.fornecedor);
        const valor = fillMissingData(row.valor);
        const cc = fillMissingData(row.cc);

        const stmt = db.prepare(`INSERT INTO users (nomeUser, departamento, licenca, dataCriacao, fornecedor, valor, cc) VALUES (?, ?, ?, ?, ?, ?, ?)`);
        stmt.run(nomeUser, departamento, licenca, dataCriacao, fornecedor, valor, cc, function(err) {
            if (err) {
                console.error('Erro ao inserir dados:', err.message);
            } else {
                console.log(`Usuário inserido com ID: ${this.lastID}`);
            }
        });
        stmt.finalize();
    });
}

// Executar a inserção de dados
db.serialize(() => {
    insertData();
});
