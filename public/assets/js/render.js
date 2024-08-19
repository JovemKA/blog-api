// Função para renderizar os posts na página principal
async function loadPosts() {
    try {
        const response = await fetch('/posts');
        if (!response.ok) {
            throw new Error('Erro na resposta da API: ' + response.statusText);
        }
        const posts = await response.json();

        const postsContainer = document.querySelector('.posts-grid'); // Ajustado para refletir o HTML
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

        // Adiciona o evento de clique nos links "Leia Mais"
        document.querySelectorAll('.read-more').forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const slug = event.target.getAttribute('data-slug');
                window.location.href = `/public/post.html?slug=${slug}`; // Redireciona para a página do post
            });
        });

    } catch (error) {
        console.error('Erro ao carregar posts:', error);
    }
}

// Carrega os posts quando a página principal é carregada
window.addEventListener('DOMContentLoaded', loadPosts);



// Função para carregar o conteúdo do post
async function loadPostContent() {
    try {
        const slug = getQueryParam('slug'); // Obtém o slug da URL
        const response = await fetch(`http://localhost:3000/posts/${slug}`);
        if (!response.ok) {
            throw new Error('Erro na resposta da API: ' + response.statusText);
        }
        const post = await response.json();

        document.title = `${post.title} | ${post.category} | ${new Date(post.updated_at).toLocaleDateString()}`; // Define o título da página

        // Preenche os elementos HTML com os dados do post
        document.querySelector('.post-title').innerText = post.title;
        document.querySelector('.post-date').innerText = new Date(post.updated_at).toLocaleDateString();
        document.querySelector('.category').innerText = post.category;
        document.querySelector('.post-container').innerHTML = post.content; // Assume que 'content' é HTML

    } catch (error) {
        console.error('Erro ao carregar post:', error);
    }
}

// Carrega o post quando a página post.html é carregada
window.addEventListener('DOMContentLoaded', loadPostContent);
