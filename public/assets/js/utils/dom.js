export function renderPosts(posts) {
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
}

export function renderPostContent(post) {
    document.title = `${post.title} | ${post.category} | ${new Date(post.updated_at).toLocaleDateString()}`;

    document.querySelector('.post-title').innerText = post.title;
    document.querySelector('.post-date').innerText = new Date(post.updated_at).toLocaleDateString();
    document.querySelector('.category').innerText = post.category;
    document.querySelector('.post-container').innerHTML = post.content;
}
