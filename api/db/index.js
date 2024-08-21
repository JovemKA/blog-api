const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// client.connect(err => {
//     if (err) {
//         console.error('Erro ao conectar ao banco de dados:', err);
//     } else {
//         console.log('Conexão ao banco de dados estabelecida com sucesso!');
//     }
// });

module.exports = { supabase };
