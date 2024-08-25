// api/app.js

const express = require('express');
const cors = require('cors');
const path = require('path');
const postRoutes = require('./routes/posts');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

// Servir arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, '../public')));

// Rotas
app.use('/posts', postRoutes);

// Middleware para tratamento de erros
app.use(errorHandler);

// Rota para servir a aplicação
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


module.exports = app;
