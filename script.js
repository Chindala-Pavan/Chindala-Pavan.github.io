// Load data from JSON and render dynamic content
let portfolioData = {};

async function loadPortfolioData() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error('Failed to load portfolio data');
        }
        portfolioData = await response.json();
        renderPortfolio();
    } catch (error) {
        console.error('Error loading portfolio data:', error);
    }
}

function renderPortfolio() {
    renderHeader();
    renderAbout();
    renderSkills();
    renderExperience();
    renderFooter();
    initializeAnimations();
}

function renderHeader() {
    const { personal } = portfolioData;
    
    document.getElementById('personal-name').textContent = personal.name;
    document.getElementById('personal-title').textContent = personal.title;
    document.getElementById('personal-contact').innerHTML = 
        `📍 ${personal.location} | 📱 ${personal.phone} | 📧 ${personal.email}`;
    
    const linkedinLink = document.getElementById('linkedin-link');
    linkedinLink.href = personal.linkedin;
    linkedinLink.textContent = '💼 LinkedIn Profile';
}

function renderAbout() {
    const { about } = portfolioData;
    
    document.getElementById('about-title').textContent = about.title;
    document.getElementById('about-description').textContent = about.description;
}

function renderSkills() {
    const { skills } = portfolioData;
    const skillsContainer = document.getElementById('skills-container');
    
    skillsContainer.innerHTML = skills.map(skill => 
        `<div class="skill-tag">${skill}</div>`
    ).join('');
}

function renderExperience() {
    const { experience } = portfolioData;
    const experienceContainer = document.getElementById('experience-container');
    
    experienceContainer.innerHTML = experience.map(job => `
        <article>
            <h4>${job.company} | ${job.position}</h4>
            <p class="job-meta">${job.startDate} – ${job.endDate}</p>
            <div class="highlights">
                ${job.technologies.map(tech => 
                    `<div class="highlight">${tech}</div>`
                ).join('')}
            </div>
            <p>${job.description}</p>
        </article>
    `).join('');
}

function renderFooter() {
    const { footer } = portfolioData;
    document.getElementById('footer-container').innerHTML = `<p>${footer}</p>`;
}

function initializeAnimations() {
    const articles = document.querySelectorAll('article');
    const skillTags = document.querySelectorAll('.skill-tag');
    const highlights = document.querySelectorAll('.highlight');
    const sections = document.querySelectorAll('section');
    const h3Elements = document.querySelectorAll('h3');

    // Stagger animations for articles
    articles.forEach((article, index) => {
        article.style.animationDelay = `${index * 0.12}s`;
    });

    // Stagger animations for skill tags
    skillTags.forEach((tag, index) => {
        tag.style.animationDelay = `${index * 0.06}s`;
    });

    // Stagger animations for highlights
    highlights.forEach((highlight, index) => {
        highlight.style.animationDelay = `${index * 0.08}s`;
    });

    // Stagger animations for sections
    sections.forEach((section, index) => {
        section.style.animationDelay = `${index * 0.15}s`;
    });

    // Scroll reveal with enhanced fade-in animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '-50px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.animation = 'fadeInUp 0.7s ease-out forwards';
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    articles.forEach(article => {
        article.style.opacity = '0';
        scrollObserver.observe(article);
    });

    highlights.forEach(highlight => {
        highlight.style.opacity = '0';
        scrollObserver.observe(highlight);
    });

    // Smooth scroll for anchor links with pulse effect on target
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                target.style.animation = 'pulse 1s ease-out';
            }
        });
    });

    // Enhanced hover effect for skill tags
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function () {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'float 0.6s ease-in-out';
            }, 10);
        });

        tag.addEventListener('mouseleave', function () {
            this.style.animation = 'none';
        });

        // Cursor tracking glow effect
        tag.addEventListener('mousemove', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            this.style.setProperty('--mouse-x', x + 'px');
            this.style.setProperty('--mouse-y', y + 'px');
        });
    });

    // Parallax effect on mouse move for h3 headers
    document.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.02;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.02;
        
        h3Elements.forEach(h3 => {
            h3.style.transform = `translateX(${moveX}px) translateY(${moveY}px)`;
        });
    });

    // Optional: Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            sections.forEach(section => {
                section.style.animation = 'pulse 0.8s ease-out';
            });
        }
    });

    // Ripple effect on link clicks
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function (e) {
            // Skip if link navigates away
            if (this.getAttribute('href') && !this.getAttribute('href').startsWith('#')) {
                return;
            }

            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.pointerEvents = 'none';
            ripple.style.animation = 'float 0.6s ease-out';
            
            const rect = this.getBoundingClientRect();
            ripple.style.left = (e.clientX - rect.left) + 'px';
            ripple.style.top = (e.clientY - rect.top) + 'px';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Page load animation
    window.addEventListener('load', () => {
        document.body.style.animation = 'fadeInUp 0.7s ease-out';
    });

    // Add bounce effect on skill tag hover
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function () {
            this.style.setProperty('transform', 'scale(1.08) translateY(-5px)', 'important');
        });

        tag.addEventListener('mouseleave', function () {
            this.style.transform = '';
        });
    });
}

// Load and render portfolio when DOM is ready
document.addEventListener('DOMContentLoaded', loadPortfolioData);
