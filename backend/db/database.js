// Importa o módulo 'pg' para conexão com o PostgreSQL
const { Pool } = require('pg');

// Carrega as variáveis de ambiente do arquivo .env
require('dotenv').config();

// Cria um novo pool de conexões com as configurações fornecidas
const pool = new Pool({
  host: process.env.DB_HOST,      // Endereço do host do banco de dados
  user: process.env.DB_USER,      // Nome de usuário para autenticação
  password: process.env.DB_PASSWORD, // Senha do usuário
  database: process.env.DB_NAME,  // Nome do banco de dados
  port: process.env.DB_PORT,      // Porta do banco de dados
  ssl: {
    rejectUnauthorized: false,    // Necessário para conexões SSL com Supabase
  },
});

// Verifica a conexão com o banco de dados
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Erro ao conectar ao banco de dados:', err.stack);
  }
  console.log('Conexão com o banco de dados estabelecida com sucesso.');
  release();
});

// Exporta o pool de conexões para ser usado em outras partes do aplicativo
module.exports = pool;
