import { fetchPosts, fetchPost } from './utils/api.js';
import { renderPosts, renderPostContent } from './utils/dom.js';

// Função para carregar e renderizar os posts na página principal
async function loadPosts() {
    try {
        const posts = await fetchPosts();
        renderPosts(posts);

        document.querySelectorAll('.read-more').forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const slug = event.target.getAttribute('data-slug');
                window.location.href = `/post.html?slug=${slug}`;
            });
        });

    } catch (error) {
        console.error('Erro ao carregar posts:', error);
    }
}

// Função para carregar e renderizar o conteúdo de um post específico
async function loadPostContent() {
    try {
        const slug = new URLSearchParams(window.location.search).get('slug');
        const post = await fetchPost(slug);
        renderPostContent(post);

    } catch (error) {
        console.error('Erro ao carregar post:', error);
    }
}

// Carrega os posts na página principal
window.addEventListener('DOMContentLoaded', loadPosts);

// Carrega o conteúdo do post na página post.html
window.addEventListener('DOMContentLoaded', loadPostContent);
