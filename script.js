const apiKey = '90daed7b17fd46a1bcab88736f6607c4';
const blogContainer = document.getElementById('blog-container');
const searchField = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

// Fetch random news articles
async function fetchRandomNews() {
    try {
        const apiURL = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${apiKey}`;
        const response = await fetch(apiURL);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error('Error fetching random news:', error);
        return [];
    }
}

// Fetch news articles based on search query
async function fetchNewsQuery(query) {
    try {
        const apiURL = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apiKey}`;
        const response = await fetch(apiURL);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error('Error fetching news by query:', error);
        return [];
    }
}

// Display blog cards
function displayBlogs(articles) {
    blogContainer.innerHTML = ''; // Clear existing content

    if (articles.length === 0) {
        blogContainer.innerHTML = '<p>No articles found. Try another search query.</p>';
        return;
    }

    articles.forEach((article) => {
        const blogCard = document.createElement('div');
        blogCard.classList.add('blog-card');

        // Image
        const img = document.createElement('img');
        img.src = article.urlToImage || 'https://via.placeholder.com/280x180?text=No+Image'; // Placeholder image
        img.alt = article.title || 'No title available';

        // Title
        const title = document.createElement('h2');
        const truncatedTitle =
            article.title && article.title.length > 30 ? article.title.slice(0, 30) + '...' : article.title || 'Untitled';
        title.textContent = truncatedTitle;

        // Description
        const description = document.createElement('p');
        const truncatedDescription =
            article.description && article.description.length > 120
                ? article.description.slice(0, 120) + '...'
                : article.description || 'No description available.';
        description.textContent = truncatedDescription;

        // Append elements to blog card
        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);

        // Add click event to open the article URL
        blogCard.addEventListener('click', () => {
            if (article.url) {
                window.open(article.url, '_blank');
            } else {
                alert('No URL available for this article.');
            }
        });

        blogContainer.appendChild(blogCard);
    });
}

// Search button event listener
searchButton.addEventListener('click', async () => {
    const query = searchField.value.trim(); // Corrected from ariaValueMax to value
    if (query !== '') {
        try {
            const articles = await fetchNewsQuery(query);
            displayBlogs(articles);
        } catch (error) {
            console.error('Error fetching news by query:', error);
        }
    } else {
        alert('Please enter a search query.');
    }
});

// Initial load of random news articles
(async () => {
    try {
        const articles = await fetchRandomNews();
        displayBlogs(articles);
    } catch (error) {
        console.error('Error displaying blogs:', error);
    }
})();
