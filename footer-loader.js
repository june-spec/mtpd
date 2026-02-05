
/**
 * Footer Loader
 * Dynamically fetches and inserts the footer into the page
 */
document.addEventListener('DOMContentLoaded', () => {
    const footerContainer = document.querySelector('.site-footer');
    if (!footerContainer) return;

    fetch('footer.html')
        .then(response => {
            if (!response.ok) throw new Error('Footer not found');
            return response.text();
        })
        .then(html => {
            footerContainer.innerHTML = html;
            highlightCurrentPage();
        })
        .catch(err => console.error('Error loading footer:', err));
});

function highlightCurrentPage() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('.footer-links a');

    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === 'index.html' && href.startsWith('index.html'))) {
            link.style.color = 'var(--accent-color)';
        }
    });
}
