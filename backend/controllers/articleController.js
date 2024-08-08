const pool = require('../db');

// Obter todos os artigos
exports.getAllArticles = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM articles');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(200).json({ message: error.message });
    }
}

// Obter um artigo pelo ID
exports.getArticleById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM articles WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            res.status(404).json({ message: 'Artigo não encontrado' });
        } else {
            res.status(200).json(result.rows[0]);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }


}


// Criar um novo artigo

// Atualizar um artigo

// Deletar um artigo



// module.exports = {

