// Função para obter parâmetros da URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Função para formatar data
// function formatDate(dateString) {
//     const data = new Date(dateString).toLocaleDateString();
//     const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
//     const dataFormatada = data.split('/');

//     return `${dataFormatada[0]} de ${meses[dataFormatada[1] - 1]} de ${dataFormatada[2]}`;
// }

// Função para carregar o post
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
