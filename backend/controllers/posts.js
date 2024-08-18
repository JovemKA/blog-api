const { supabase } = require('../db');

// Criar um novo post
exports.createPost = async (req, res) => {
    const { title, content, excerpt, category, status } = req.body;

    const slug = title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/--+/g, '-');

    try {
        const { data, error } = await supabase
            .from('Posts')
            .insert([
                {
                    title,
                    slug,
                    content,
                    excerpt,
                    category,
                    status: status || 'draft',
                },
            ])
            .select(); // Adicionando .select() para retornar os dados inseridos

        if (error) {
            console.error('Supabase error:', error); // Log do erro
            return res.status(400).json({ error: 'Erro ao criar post: ' + error.message });
        }

        if (!data || data.length === 0) {
            console.error('No data returned from Supabase'); // Log para ausência de dados
            return res.status(400).json({ error: 'Nenhum dado retornado ao criar post' });
        }

        res.status(201).json(data[0]);
    } catch (error) {
        console.error('Catch block error:', error); // Log para erros no bloco catch
        res.status(500).json({ error: 'Erro ao criar post: ' + error.message });
    }
};


// Obter todos os posts
exports.getPosts = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('Posts') // Verifique se o nome da tabela é 'Posts'
            .select('*');

        if (error) throw error;
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar posts: ' + error.message });
    }
};

// Obter um post pelo Slug
exports.getPostBySlug = async (req, res) => {
    const { slug } = req.params;

    try {
        const { data, error } = await supabase
            .from('Posts')
            .select('*')
            .eq('slug', slug)
            .limit(1); // Garante que no máximo um resultado seja retornado

        if (error) {
            console.error('Supabase error:', error); // Log do erro
            return res.status(400).json({ error: 'Erro ao encontrar post: ' + error.message });
        }

        if (data.length === 0) {
            return res.status(404).json({ error: 'Post não encontrado' });
        }

        res.status(200).json(data[0]);
    } catch (error) {
        console.error('Catch block error:', error); // Log para erros no bloco catch
        res.status(500).json({ error: 'Erro ao encontrar post: ' + error.message });
    }
};


// Atualizar um post
exports.updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, content, excerpt, category, status } = req.body;

    let slug;
    if (title) {
        slug = title
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/--+/g, '-');
    }

    try {
        const { data, error } = await supabase
            .from('Posts')
            .update({
                title,
                slug,
                content,
                excerpt,
                category,
                status,
                updated_at: new Date(),
            })
            .eq('id', id)
            .select(); // Adiciona .select() para retornar os dados atualizados

        if (error) {
            console.error('Supabase error:', error); // Log do erro
            return res.status(400).json({ error: 'Erro ao atualizar post: ' + error.message });
        }

        if (!data || data.length === 0) {
            return res.status(404).json({ error: 'Post não encontrado para atualizar' });
        }

        res.status(200).json(data[0]); // Retorna o primeiro (e único) item da resposta
    } catch (error) {
        console.error('Catch block error:', error); // Log para erros no bloco catch
        res.status(500).json({ error: 'Erro ao atualizar post: ' + error.message });
    }
};


// Deletar um post
exports.deletePost = async (req, res) => {
    const { id } = req.params;

    try {
        const { data, error } = await supabase
            .from('Posts') // Verifique se o nome da tabela é 'Posts'
            .delete()
            .eq('id', id);

        if (error) throw error;
        res.status(200).json({ message: 'Post deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar post: ' + error.message });
    }
};
