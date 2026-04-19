// Smooth animation initialization
document.addEventListener('DOMContentLoaded', () => {
    // Stagger animations for articles
    const articles = document.querySelectorAll('article');
    articles.forEach((article, index) => {
        article.style.animationDelay = `${index * 0.12}s`;
    });

    // Stagger animations for skill tags
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
        tag.style.animationDelay = `${index * 0.06}s`;
    });

    // Scroll reveal animation with Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.animation = 'scaleUp 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections and articles for scroll reveal
    document.querySelectorAll('section, article').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });

    // Add hover effect with pointer tracking on skill tags
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', (e) => {
            tag.style.transition = 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)';
        });
    });

    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});
