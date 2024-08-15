const express = require('express');
const app = express();
require('dotenv').config();

// Middleware para JSON
app.use(express.json());

// Importando as rotas
const postsRouter = require('./routes/posts');
app.use('/posts', postsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
