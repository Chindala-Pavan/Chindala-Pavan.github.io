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
    renderSummary();
    renderSkills();
    renderExperience();
    renderEducation();
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

function renderSummary() {
    const { summary } = portfolioData;
    
    if (!summary) return;
    
    document.getElementById('summary-title').textContent = summary.title;
    const summaryContainer = document.getElementById('summary-container');
    
    summaryContainer.innerHTML = summary.points.map(point => 
        `<p style="margin-bottom: 16px; line-height: 1.8;">• ${point}</p>`
    ).join('');
}

function renderSkills() {
    const { skills } = portfolioData;
    
    if (!skills) return;
    
    document.getElementById('skills-title').textContent = skills.title;
    const skillsContainer = document.getElementById('skills-container');
    
    if (Array.isArray(skills.categories)) {
        // Render skills with categories
        skillsContainer.innerHTML = skills.categories.map(category => `
            <div style="margin-bottom: 24px;">
                <h4 style="color: #667eea; font-size: 1.1em; font-weight: 700; margin-bottom: 12px; border-bottom: 2px solid #667eea; padding-bottom: 8px;">
                    ${category.category}
                </h4>
                <div class="skill-grid" style="margin-top: 10px;">
                    ${category.items.map(item => 
                        `<div class="skill-tag">${item}</div>`
                    ).join('')}
                </div>
            </div>
        `).join('');
    } else if (Array.isArray(skills)) {
        // Fallback for flat skill array
        skillsContainer.innerHTML = skills.map(skill => 
            `<div class="skill-tag">${skill}</div>`
        ).join('');
    }
}

function renderExperience() {
    const { experience } = portfolioData;
    const experienceContainer = document.getElementById('experience-container');
    
    experienceContainer.innerHTML = experience.map(job => `
        <article>
            <h4>${job.company} | ${job.position}</h4>
            <p class="job-meta">${job.startDate} – ${job.endDate}</p>
            <p style="font-size: 0.95em; color: #6b7280; margin-bottom: 16px; font-style: italic;">
                Tech Stack: ${job.techStack}
            </p>
            <div style="margin-top: 16px;">
                ${job.achievements.map(achievement => 
                    `<p style="margin-bottom: 12px; line-height: 1.8;">• ${achievement}</p>`
                ).join('')}
            </div>
        </article>
    `).join('');
}

function renderEducation() {
    const { education } = portfolioData;
    
    if (!education) return;
    
    const educationContainer = document.getElementById('education-container');
    
    educationContainer.innerHTML = education.map(edu => `
        <article style="border-bottom: 2px solid #e5e7eb; padding-bottom: 20px; margin-bottom: 20px;">
            <h4 style="color: #4f46e5; margin-bottom: 8px;">${edu.degree}</h4>
            <p style="color: #6b7280; font-size: 1em;">${edu.school}</p>
        </article>
    `).join('');
}
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
