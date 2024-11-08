require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4200;

app.use(cors());
app.use(bodyParser.json());

// Conexão com o banco de dados MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) throw err;
  console.log("Conectado ao banco de dados MySQL!");
});

// Endpoint de login (exemplo simples para verificar usuário e senha)
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  db.query("SELECT * FROM usuarios WHERE username = ? AND password = ?", [username, password], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.json({ success: true, message: "Login realizado com sucesso!" });
    } else {
      res.status(401).json({ success: false, message: "Usuário ou senha incorretos." });
    }
  });
});

// Endpoints para "estoque"
app.get('/api/estoque', (req, res) => {
  db.query("SELECT * FROM estoque", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/api/estoque', (req, res) => {
  const { nome, descricao, quantidade, preco } = req.body;
  db.query("INSERT INTO estoque (nome, descricao, quantidade, preco) VALUES (?, ?, ?, ?)", [nome, descricao, quantidade, preco], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, nome, descricao, quantidade, preco });
  });
});

// Endpoints para "financas"
app.get('/api/financas', (req, res) => {
  db.query("SELECT * FROM financas", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/api/financas', (req, res) => {
  const { produto_id, quantidade, valor_total } = req.body;
  db.query("INSERT INTO financas (produto_id, quantidade, valor_total) VALUES (?, ?, ?)", [produto_id, quantidade, valor_total], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, produto_id, quantidade, valor_total });
  });
});

// Endpoints para "clientes"
app.get('/api/clientes', (req, res) => {
  db.query("SELECT * FROM clientes", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/api/clientes', (req, res) => {
  const { nome, cpf, telefone, email, endereco } = req.body;
  db.query("INSERT INTO clientes (nome, cpf, telefone, email, endereco) VALUES (?, ?, ?, ?, ?)", [nome, cpf, telefone, email, endereco], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, nome, cpf, telefone, email, endereco });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
app.put('/api/estoque/quantidade', (req, res) => {
    const { nomeProduto, novaQuantidade } = req.body;
    db.query("UPDATE estoque SET quantidade = ? WHERE nome = ?", [novaQuantidade, nomeProduto], (err, result) => {
      if (err) throw err;
      res.json({ success: true, message: "Quantidade atualizada com sucesso." });
    });
  });
