/**
 * Global Visual Effects
 * Implements mouse click particles and interactive polish
 */

document.addEventListener('click', (e) => {
    createClickParticles(e.clientX, e.clientY);
});

function createClickParticles(x, y) {
    const particleCount = 12;
    const colors = ['#00f2ff', '#ffffff', '#a5f3fc'];

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('click-particle');

        // Randomize initial position slightly
        const offsetX = (Math.random() - 0.5) * 10;
        const offsetY = (Math.random() - 0.5) * 10;

        particle.style.left = `${x + offsetX}px`;
        particle.style.top = `${y + offsetY}px`;
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

        // Randomize direction and speed
        const angle = Math.random() * Math.PI * 2;
        const velocity = 30 + Math.random() * 50;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;

        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);

        document.body.appendChild(particle);

        // Cleanup
        particle.addEventListener('animationend', () => {
            particle.remove();
        });
    }
}

// Add subtle parallax or tilt to glass cards if supported
const cards = document.querySelectorAll('.glass-card');
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// --- Lightbox Implementation ---
const createLightbox = () => {
    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.innerHTML = `
        <span class="lightbox-close">&times;</span>
        <img class="lightbox-content" src="" alt="Enlarged View">
    `;
    document.body.appendChild(overlay);

    const content = overlay.querySelector('.lightbox-content');
    const closeBtn = overlay.querySelector('.lightbox-close');

    const openLightbox = (src) => {
        content.src = src;
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scroll
    };

    const closeLightbox = () => {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            content.src = '';
        }, 400);
    };

    // Global listener for stack cards and project images
    document.addEventListener('click', (e) => {
        const target = e.target;
        if (target.tagName === 'IMG' && (target.closest('.stack-card') || target.closest('.product-card'))) {
            openLightbox(target.src);
        }
        if (target === overlay || target === closeBtn) {
            closeLightbox();
        }
    });

    // ESC key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            closeLightbox();
        }
    });
};

// Initialize
document.addEventListener('DOMContentLoaded', createLightbox);

