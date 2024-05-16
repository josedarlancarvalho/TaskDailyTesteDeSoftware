const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path'); 

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


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Servir arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, 'frontend')));

// Rota para a raiz, redirecionando para o arquivo de registro
// Rota para a raiz, exibindo a página inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'inicio.html'));
  });
  

// Rota para o cadastro de usuário
app.post('/registro.html', (req, res) => {
  const { nome, email, senha } = req.body;
  
  // Consulta para verificar se o e-mail já existe
  const SELECT_EMAIL_QUERY = `SELECT * FROM usuarios WHERE email = '${email}'`;

  connection.query(SELECT_EMAIL_QUERY, (err, result) => {
      if (err) {
          console.error('Erro ao verificar e-mail:', err);
          res.status(500).send('Erro interno no servidor');
          return;
      }

      // Se o e-mail já existe, envie uma resposta informando
      if (result.length > 0) {
          res.status(400).send('E-mail já em uso');
          return;
      }

      // Se o e-mail não existe, insira o novo usuário no banco de dados
      const INSERT_USER_QUERY = `INSERT INTO usuarios (nome, email, senha) VALUES ('${nome}', '${email}', '${senha}')`;
  
      connection.query(INSERT_USER_QUERY, (err, result) => {
          if (err) {
              console.error('Erro ao cadastrar usuário:', err);
              res.status(500).send('Erro interno no servidor');
              return;
          }
          // Redireciona para a tela de login após o registro
          res.redirect('/inicio.html');
      });
  });
});


// rota para o login de usuário
app.post('/login.html', (req, res) => {
  const { email, senha } = req.body;
  const SELECT_USER_QUERY = `SELECT * FROM usuarios WHERE email = '${email}' AND senha = '${senha}'`;

  connection.query(SELECT_USER_QUERY, (err, result) => {
    if (err) {
      console.error('Erro ao fazer login:', err);
      res.status(500).send('Erro interno no servidor');
      return;
    }
    if (result.length > 0) {
      // Se o usuário existe na base de dados e as credenciais estão corretas, redirecione para a tela de gerenciador de tarefas
      res.redirect('/inicio.html');
    } else {
      // Se não, envie uma resposta indicando que o email ou senha estão incorretos
      res.send('Email ou senha incorretos.');
    }
  });
});


app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
