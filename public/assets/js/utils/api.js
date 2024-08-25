export async function fetchPosts() {
    const response = await fetch('/posts');
    if (!response.ok) {
        throw new Error('Erro na resposta da API: ' + response.statusText);
    }
    return response.json();
}

export async function fetchPost(slug) {
    const response = await fetch(`/posts/${slug}`);
    if (!response.ok) {
        throw new Error('Erro na resposta da API: ' + response.statusText);
    }
    return response.json();
}
