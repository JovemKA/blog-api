const { supabase } = require('../config/database');
const { slugify } = require('../utils/slugify');

exports.createPost = async ({ title, content, excerpt, category, status }) => {
    const slug = slugify(title);
    const { data, error } = await supabase
        .from('Posts')
        .insert([
            { title, slug, content, excerpt, category, status: status || 'draft' },
        ])
        .select();

    if (error) throw new Error(error.message);
    if (!data || data.length === 0) throw new Error('Nenhum dado retornado ao criar post');

    return data[0];
};

exports.getPosts = async () => {
    const { data, error } = await supabase
        .from('Posts')
        .select('*')
        .order('updated_at', { ascending: false });

    if (error) throw new Error(error.message);
    return data;
};

exports.getPostBySlug = async (slug) => {
    const { data, error } = await supabase
        .from('Posts')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error) throw new Error(error.message);
    if (!data) throw new Error('Post não encontrado');

    return data;
};

exports.updatePost = async (id, { title, content, excerpt, category, status }) => {
    let slug;
    if (title) {
        slug = slugify(title);
    }

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
        .select();

    if (error) throw new Error(error.message);
    if (!data || data.length === 0) throw new Error('Post não encontrado para atualizar');

    return data[0];
};

exports.deletePost = async (id) => {
    const { data, error } = await supabase
        .from('Posts')
        .delete()
        .eq('id', id);

    if (error) throw new Error(error.message);
    return data;
};
