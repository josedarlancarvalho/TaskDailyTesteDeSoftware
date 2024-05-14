const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Configuração do MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'users'
});

connection.connect();

// Middleware para analisar solicitações de entrada
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Rota para o cadastro de usuário
app.post('/cadastro', (req, res) => {
  const { nome, email, senha } = req.body;
  const INSERT_USER_QUERY = `INSERT INTO usuarios (nome, email, senha) VALUES ('${nome}', '${email}', '${senha}')`;

  connection.query(INSERT_USER_QUERY, (err, result) => {
    if (err) throw err;
    res.send('Usuário cadastrado com sucesso!');
  });
});

// Rota para o login de usuário
app.post('/login', (req, res) => {
  const { email, senha } = req.body;
  const SELECT_USER_QUERY = `SELECT * FROM usuarios WHERE email = '${email}' AND senha = '${senha}'`;

  connection.query(SELECT_USER_QUERY, (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.send('Login bem-sucedido!');
    } else {
      res.send('Email ou senha incorretos.');
    }
  });
});


app.get('/', (req, res) => {
  res.send('Página inicial');
});

// Redirecionar todas as solicitações GET para uma página de erro
app.get('*', (req, res) => {
  res.status(404).send('Página não encontrada');
});



app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
