const { supabase } = require('../db');

// Criar um novo artigo
exports.createPost = async (req, res) => {
    
}

// Obter todos os artigos
exports.getPosts = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('posts')
            .select('*');

        if (error) throw error;
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar posts: ' + error.message });
    }
};


// Obter um artigo pelo ID
exports.getArticleById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM articles WHERE id = $1", [
      id,
    ]);
    if (result.rows.length === 0) {
      res.status(404).json({ message: "Artigo não encontrado" });
    } else {
      res.status(200).json(result.rows[0]);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Atualizar um artigo

// Deletar um artigo

// module.exports = {
