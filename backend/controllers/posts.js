const { supabase } = require('../db');

// Criar um novo artigo
exports.createPost = async (req, res) => {
    const { title, content } = req.body;

    try {
        const { data, error } = await supabase
            .from('posts')
            .insert([{ title, content }]);

        if (error) throw error;
        res.status(201).json(data[0]);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar post: ' + error.message });
    }
};

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
        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar post: ' + error.message });
    }

};

// Atualizar um artigo
exports.updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    try {
        const { data, error } = await supabase
            .from('posts')
            .update({ title, content })
            .eq('id', id);

        if (error) throw error;
        res.status(200).json(data[0]);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar post: ' + error.message });
    }
};

// Deletar um artigo
exports.deletePost = async (req, res) => {
    const { id } = req.params;

    try {
        const { data, error } = await supabase
            .from('posts')
            .delete()
            .eq('id', id);

        if (error) throw error;
        res.status(200).json({ message: 'Post deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar post: ' + error.message });
    }
};
