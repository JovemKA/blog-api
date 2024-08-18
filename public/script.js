// Função para renderizar os posts na página principal
async function loadPosts() {
  try {
    const response = await fetch('http://localhost:3000/posts');
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





// const postTitleField = document.querySelector('.post-title');
// const postDateField = document.querySelector('.post-date');
// const postCategoryField = document.querySelector('.category');
// const postContainer = document.querySelector('.post-container');

// const postTitle = "O Guia de HTML para Iniciantes";
// const postDate = "2021-09-15";
// const postCategory = "Desenvolvimento Web";
// const postContent = "<p>HTML, ou HyperText Markup Language, é a linguagem padrão para criar páginas web. Este guia é destinado a iniciantes que desejam aprender os fundamentos do HTML e como aplicá-los na criação de suas próprias páginas web.</p>\n    <h2>1. Introdução ao HTML</h2>\n    <p>HTML é uma linguagem de marcação usada para estruturar e formatar documentos na web. Ele usa \"tags\" ou \"etiquetas\" para definir diferentes elementos da página, como títulos, parágrafos, links e imagens.</p>\n    <h2>2. Estrutura Básica de um Documento HTML</h2>\n    <p>Um documento HTML básico segue uma estrutura simples, composta por elementos essenciais. Aqui está um exemplo básico:</p>\n    <div class=\"code-block\">\n        <pre>\n            &lt;!DOCTYPE html&gt;\n            &lt;html lang=\"pt-BR\"&gt;\n            &lt;head&gt;\n                &lt;meta charset=\"UTF-8\"&gt;\n                &lt;title&gt;Título da Página&lt;/title&gt;\n            &lt;/head&gt;\n            &lt;body&gt;\n                &lt;h1&gt;Título Principal&lt;/h1&gt;\n                &lt;p&gt;Parágrafo de exemplo&lt;/p&gt;\n            &lt;/body&gt;\n            &lt;/html&gt;\n        </pre>\n    </div>\n    <h2>3. Adicionando Estilo com CSS</h2>\n    <p>CSS (Cascading Style Sheets) é usado para estilizar os elementos HTML. Você pode adicionar CSS diretamente no documento HTML usando a tag <code>&lt;style&gt;</code> ou linkar um arquivo CSS externo.</p>\n    <div class=\"highlight\">\n        <p>Exemplo de código CSS:</p>\n        <div class=\"code-block\">\n            <pre>\n                body {\n                    font-family: Arial, sans-serif;\n                    background-color: #f4f4f4;\n                }\n                h1 {\n                    color: #333;\n                }\n            </pre>\n        </div>\n    </div>\n    <h2>4. Conclusão</h2>\n    <p>HTML é a base de todas as páginas web, e entender sua estrutura e funcionamento é crucial para qualquer desenvolvedor web. Com os conhecimentos básicos de HTML e CSS, você estará pronto para criar páginas web atraentes e funcionais.</p>"

// console.log(postTitleField);
// console.log(postDateField);
// console.log(postCategoryField);
// console.log(postContainer);


// function exibirPost() {
//   postTitleField.innerText = postTitle;
//   postDateField.innerText = postDate;
//   postCategoryField.innerHTML = postCategory;
//   postContainer.innerHTML = postContent;
// }

// exibirPost();
