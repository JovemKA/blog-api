const postService = require('../services/postService');

exports.createPost = async (req, res) => {
    try {
        const post = await postService.createPost(req.body);
        res.status(201).json(post);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Erro ao criar post: ' + error.message });
    }
};

exports.getPosts = async (req, res) => {
    try {
        const posts = await postService.getPosts();
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Erro ao listar posts: ' + error.message });
    }
};

exports.getPostBySlug = async (req, res) => {
    const { slug } = req.params;

    try {
        const post = await postService.getPostBySlug(slug);
        res.status(200).json(post);
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).json({ error: 'Erro ao encontrar post: ' + error.message });
    }
};

exports.updatePost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await postService.updatePost(id, req.body);
        res.status(200).json(post);
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ error: 'Erro ao atualizar post: ' + error.message });
    }
};

exports.deletePost = async (req, res) => {
    const { id } = req.params;

    try {
        await postService.deletePost(id);
        res.status(200).json({ message: 'Post deletado com sucesso' });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ error: 'Erro ao deletar post: ' + error.message });
    }
};
