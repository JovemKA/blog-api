const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
require('dotenv').config();

// Middleware para JSON
app.use(bodyParser.json());

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Importando as rotas
const postsRouter = require('./routes/posts');
app.use('/posts', postsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
