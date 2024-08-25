// js/render.js

import { getQueryParam } from './utils.js';

// URL base do backend
const BASE_URL = 'https://jovemkablog.vercel.app'; // Ajuste conforme necessário

// Função para renderizar os posts na página principal
async function loadPosts() {
    try {
        const response = await fetch(`${BASE_URL}/posts`); // Rota completa da API
        if (!response.ok) {
            throw new Error('Erro na resposta da API: ' + response.statusText);
        }
        const posts = await response.json();

        const postsContainer = document.querySelector('.posts-grid');
        postsContainer.innerHTML = '';

        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('post-card');

            postElement.innerHTML = `
                <span class="date">${new Date(post.updated_at).toLocaleDateString()}</span>
                <h2>${post.title}</h2>
                <p>${post.excerpt}</p>
                <div class="post-card-footer">
                    <a href="#" data-slug="${post.slug}" class="read-more">Leia Mais</a>
                    <button class="filter-button category">${post.category}</button>
                </div>
            `;

            postsContainer.appendChild(postElement);
        });

        document.querySelectorAll('.read-more').forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const slug = event.target.getAttribute('data-slug');
                window.location.href = `/public/post.html?slug=${slug}`;
            });
        });

    } catch (error) {
        console.error('Erro ao carregar posts:', error);
    }
}

// Função para carregar o conteúdo do post
async function loadPostContent() {
    try {
        const slug = getQueryParam('slug');
        const response = await fetch(`${BASE_URL}/posts/${slug}`); // Rota completa da API
        if (!response.ok) {
            throw new Error('Erro na resposta da API: ' + response.statusText);
        }
        const post = await response.json();

        document.title = `${post.title} | ${post.category} | ${new Date(post.updated_at).toLocaleDateString()}`;

        document.querySelector('.post-title').innerText = post.title;
        document.querySelector('.post-date').innerText = new Date(post.updated_at).toLocaleDateString();
        document.querySelector('.category').innerText = post.category;
        document.querySelector('.post-container').innerHTML = post.content;

    } catch (error) {
        console.error('Erro ao carregar post:', error);
    }
}

window.addEventListener('DOMContentLoaded', loadPosts);
window.addEventListener('DOMContentLoaded', loadPostContent);
