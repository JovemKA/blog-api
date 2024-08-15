const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();


const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    } else {
        console.log('Conexão ao banco de dados estabelecida com sucesso!');
    }
});

module.exports = { supabase };
