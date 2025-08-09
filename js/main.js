// Main JavaScript file for the fitness platform

// Global variables
let currentPage = 'home';
let isMenuOpen = false;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize theme
    initTheme();
    
    // Initialize navigation
    initNavigation();
    
    // Initialize animations
    utils.animateOnScroll();
    
    // Initialize page content
    loadPageContent();
    
    // Initialize newsletter popup
    initNewsletterPopup();
    
    // Initialize hero animations
    initHeroAnimations();
    
    // Initialize dashboard if user is logged in
    if (auth.isUserLoggedIn()) {
        initDashboard();
    }
    
    console.log('FitZone application initialized successfully!');
}

// Theme management
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = utils.storage.get('theme') || 'light';
    
    // Apply saved theme
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    // Theme toggle functionality
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    utils.storage.set('theme', newTheme);
    updateThemeIcon(newTheme);
    
    utils.showNotification(`Switched to ${newTheme} mode`, 'info');
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// Navigation management
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Hamburger menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }
    
    // Navigation link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (isMenuOpen && !e.target.closest('.nav-container')) {
            closeMobileMenu();
        }
    });
    
    // Handle scroll for navbar background
    window.addEventListener('scroll', utils.throttle(handleNavbarScroll, 100));
}

function toggleMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    const hamburger = document.getElementById('hamburger');
    
    isMenuOpen = !isMenuOpen;
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    // Animate hamburger
    const spans = hamburger.querySelectorAll('span');
    if (isMenuOpen) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans.forEach(span => {
            span.style.transform = '';
            span.style.opacity = '';
        });
    }
}

function closeMobileMenu() {
    if (!isMenuOpen) return;
    
    const navMenu = document.getElementById('nav-menu');
    const hamburger = document.getElementById('hamburger');
    
    isMenuOpen = false;
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
    
    // Reset hamburger animation
    const spans = hamburger.querySelectorAll('span');
    spans.forEach(span => {
        span.style.transform = '';
        span.style.opacity = '';
    });
}

function handleNavClick(e) {
    e.preventDefault();
    const href = e.target.getAttribute('href');
    
    if (href && href.startsWith('#')) {
        const page = href.substring(1);
        showPage(page);
        closeMobileMenu();
    }
}

function handleNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
}

// Page management
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show target page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = pageId;
        
        // Update URL
        window.history.pushState({}, '', `#${pageId}`);
        
        // Update active nav link
        updateActiveNavLink(pageId);
        
        // Load page-specific content
        loadPageContent(pageId);
        
        // Scroll to top
        utils.scrollToTop();
        
        // Trigger animations
        setTimeout(() => {
            utils.animateOnScroll();
        }, 100);
    }
}

function updateActiveNavLink(pageId) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${pageId}`) {
            link.classList.add('active');
        }
    });
}

function loadPageContent(pageId = currentPage) {
    switch (pageId) {
        case 'home':
            loadHomePage();
            break;
        case 'classes':
            loadClassesPage();
            break;
        case 'class-detail':
            loadClassDetailPage();
            break;
        case 'trainers':
            loadTrainersPage();
            break;
        case 'trainer-detail':
            loadTrainerDetailPage();
            break;
        case 'membership':
            loadMembershipPage();
            break;
        case 'dashboard':
            loadDashboardPage();
            break;
        case 'nutrition':
            loadNutritionPage();
            break;
        case 'shop':
            loadShopPage();
            break;
        case 'contact':
            loadContactPage();
            break;
    }
}

// Home page
function loadHomePage() {
    loadFeaturedClasses();
    loadTestimonials();
    initHeroStats();
}

function loadFeaturedClasses() {
    const container = document.getElementById('featured-classes-grid');
    if (!container) return;
    
    const featuredClasses = mockData.classes.slice(0, 3);
    
    container.innerHTML = featuredClasses.map(classItem => `
        <div class="class-card fade-in">
            <img src="${classItem.image}" alt="${classItem.name}" class="card-image">
            <div class="card-content">
                <h3 class="card-title">${classItem.name}</h3>
                <p class="card-subtitle">with ${classItem.trainer}</p>
                <div class="card-tags">
                    <span class="tag">${classItem.type}</span>
                    <span class="tag difficulty-${classItem.difficulty}">${classItem.difficulty}</span>
                </div>
                <div class="card-meta">
                    <span><i class="fas fa-clock"></i> ${classItem.duration} min</span>
                    <span><i class="fas fa-dollar-sign"></i> ${classItem.price}</span>
                    <span><i class="fas fa-star"></i> ${classItem.rating}</span>
                </div>
                <button class="btn-primary book-class" data-class-id="${classItem.id}">
                    Book Class
                </button>
            </div>
        </div>
    `).join('');
    
    // Add card meta styles
    const cardMetas = container.querySelectorAll('.card-meta');
    cardMetas.forEach(meta => {
        meta.style.cssText = `
            display: flex;
            justify-content: space-between;
            margin: var(--spacing-md) 0;
            font-size: var(--font-size-sm);
            color: var(--gray-600);
        `;
        
        const spans = meta.querySelectorAll('span');
        spans.forEach(span => {
            span.style.cssText = `
                display: flex;
                align-items: center;
                gap: var(--spacing-xs);
            `;
        });
    });
}

function loadTestimonials() {
    const container = document.getElementById('testimonials-grid');
    if (!container) return;
    
    container.innerHTML = mockData.testimonials.map(testimonial => `
        <div class="testimonial-card scale-in">
            <div class="testimonial-content">
                "${testimonial.content}"
            </div>
            <div class="testimonial-author">
                <img src="${testimonial.image}" alt="${testimonial.name}" class="testimonial-avatar">
                <div class="author-info">
                    <h4>${testimonial.name}</h4>
                    <p>${testimonial.role}</p>
                    <div class="rating">
                        ${'★'.repeat(testimonial.rating)}
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    
    // Add rating styles
    const ratings = container.querySelectorAll('.rating');
    ratings.forEach(rating => {
        rating.style.cssText = `
            color: var(--warning);
            font-size: var(--font-size-sm);
            margin-top: var(--spacing-xs);
        `;
    });
}

function initHeroStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                utils.animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

// Classes page
function loadClassesPage() {
    populateTrainerFilter();
    loadAllClasses();
    initClassFilters();
}

function populateTrainerFilter() {
    const trainerFilter = document.getElementById('trainer-filter');
    if (!trainerFilter) return;
    
    const trainers = [...new Set(mockData.classes.map(c => c.trainer))];
    
    trainers.forEach(trainer => {
        const option = document.createElement('option');
        option.value = trainer;
        option.textContent = trainer;
        trainerFilter.appendChild(option);
    });
}

function loadAllClasses(filters = {}) {
    const container = document.getElementById('classes-grid');
    if (!container) return;
    
    let filteredClasses = utils.filterItems(mockData.classes, filters);
    
    container.innerHTML = filteredClasses.map(classItem => `
        <div class="class-card fade-in" onclick="showClassDetail(${classItem.id})">
            <img src="${classItem.image}" alt="${classItem.name}" class="card-image">
            <div class="card-content">
                <h3 class="card-title">${classItem.name}</h3>
                <p class="card-subtitle">with ${classItem.trainer}</p>
                <p class="card-description">${classItem.description.substring(0, 100)}...</p>
                <div class="card-tags">
                    <span class="tag">${classItem.type}</span>
                    <span class="tag difficulty-${classItem.difficulty}">${classItem.difficulty}</span>
                </div>
                <div class="card-meta">
                    <span><i class="fas fa-clock"></i> ${classItem.duration} min</span>
                    <span><i class="fas fa-users"></i> ${classItem.enrolled}/${classItem.capacity}</span>
                    <span><i class="fas fa-star"></i> ${classItem.rating}</span>
                </div>
                <div class="card-footer">
                    <span class="price">${utils.formatCurrency(classItem.price)}</span>
                    <button class="btn-primary book-class" data-class-id="${classItem.id}" onclick="event.stopPropagation()">
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    // Style card descriptions
    const descriptions = container.querySelectorAll('.card-description');
    descriptions.forEach(desc => {
        desc.style.cssText = `
            color: var(--gray-600);
            line-height: 1.5;
            margin: var(--spacing-sm) 0;
        `;
    });
    
    // Style card footers
    const footers = container.querySelectorAll('.card-footer');
    footers.forEach(footer => {
        footer.style.cssText = `
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: var(--spacing-md);
            padding-top: var(--spacing-md);
            border-top: 1px solid var(--gray-200);
        `;
        
        const price = footer.querySelector('.price');
        price.style.cssText = `
            font-size: var(--font-size-xl);
            font-weight: 700;
            color: var(--primary);
        `;
    });
}

function initClassFilters() {
    const filters = ['type-filter', 'difficulty-filter', 'trainer-filter'];
    
    filters.forEach(filterId => {
        const filter = document.getElementById(filterId);
        if (filter) {
            filter.addEventListener('change', applyClassFilters);
        }
    });
}

function applyClassFilters() {
    const typeFilter = document.getElementById('type-filter');
    const difficultyFilter = document.getElementById('difficulty-filter');
    const trainerFilter = document.getElementById('trainer-filter');
    
    const filters = {};
    
    if (typeFilter && typeFilter.value !== 'all') {
        filters.type = typeFilter.value;
    }
    
    if (difficultyFilter && difficultyFilter.value !== 'all') {
        filters.difficulty = difficultyFilter.value;
    }
    
    if (trainerFilter && trainerFilter.value !== 'all') {
        filters.trainer = trainerFilter.value;
    }
    
    loadAllClasses(filters);
}

function showClassDetail(classId) {
    const classData = mockData.classes.find(c => c.id === classId);
    if (!classData) return;
    
    const container = document.getElementById('class-detail-content');
    if (!container) return;
    
    container.innerHTML = `
        <div class="class-detail-header">
            <img src="${classData.image}" alt="${classData.name}" class="class-detail-image">
            <div class="class-detail-info">
                <h1>${classData.name}</h1>
                <p class="class-trainer">with ${classData.trainer}</p>
                <div class="class-tags">
                    <span class="tag">${classData.type}</span>
                    <span class="tag difficulty-${classData.difficulty}">${classData.difficulty}</span>
                </div>
                <div class="class-stats">
                    <div class="stat">
                        <i class="fas fa-clock"></i>
                        <span>${classData.duration} minutes</span>
                    </div>
                    <div class="stat">
                        <i class="fas fa-users"></i>
                        <span>${classData.enrolled}/${classData.capacity} enrolled</span>
                    </div>
                    <div class="stat">
                        <i class="fas fa-star"></i>
                        <span>${classData.rating} rating</span>
                    </div>
                    <div class="stat">
                        <i class="fas fa-dollar-sign"></i>
                        <span>${utils.formatCurrency(classData.price)}</span>
                    </div>
                </div>
                <button class="btn-primary btn-large book-class" data-class-id="${classData.id}">
                    Book This Class
                </button>
            </div>
        </div>
        
        <div class="class-detail-content">
            <div class="class-description">
                <h2>About This Class</h2>
                <p>${classData.description}</p>
            </div>
            
            <div class="class-schedule">
                <h2>Schedule</h2>
                <div class="schedule-list">
                    ${classData.schedule.map(slot => `
                        <div class="schedule-item">
                            <span class="schedule-day">${slot.day}</span>
                            <span class="schedule-time">${slot.time}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="trainer-info">
                <h2>Your Trainer</h2>
                <div class="trainer-card" onclick="showTrainerDetail(${classData.trainerId})">
                    ${getTrainerCard(classData.trainerId)}
                </div>
            </div>
        </div>
    `;
    
    showPage('class-detail');
    styleClassDetail();
}

function styleClassDetail() {
    const detailHeader = document.querySelector('.class-detail-header');
    if (detailHeader) {
        detailHeader.style.cssText = `
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: var(--spacing-2xl);
            margin-bottom: var(--spacing-3xl);
        `;
    }
    
    const detailImage = document.querySelector('.class-detail-image');
    if (detailImage) {
        detailImage.style.cssText = `
            width: 100%;
            height: 400px;
            object-fit: cover;
            border-radius: var(--radius-xl);
        `;
    }
    
    const classStats = document.querySelector('.class-stats');
    if (classStats) {
        classStats.style.cssText = `
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: var(--spacing-md);
            margin: var(--spacing-xl) 0;
        `;
        
        const stats = classStats.querySelectorAll('.stat');
        stats.forEach(stat => {
            stat.style.cssText = `
                display: flex;
                align-items: center;
                gap: var(--spacing-sm);
                padding: var(--spacing-md);
                background: var(--gray-50);
                border-radius: var(--radius-lg);
            `;
        });
    }
    
    const scheduleList = document.querySelector('.schedule-list');
    if (scheduleList) {
        scheduleList.style.cssText = `
            display: flex;
            flex-direction: column;
            gap: var(--spacing-sm);
        `;
        
        const scheduleItems = scheduleList.querySelectorAll('.schedule-item');
        scheduleItems.forEach(item => {
            item.style.cssText = `
                display: flex;
                justify-content: space-between;
                padding: var(--spacing-md);
                background: var(--white);
                border: 1px solid var(--gray-200);
                border-radius: var(--radius-lg);
            `;
        });
    }
}

// Trainers page
function loadTrainersPage() {
    const container = document.getElementById('trainers-grid');
    if (!container) return;
    
    container.innerHTML = mockData.trainers.map(trainer => `
        <div class="trainer-card scale-in" onclick="showTrainerDetail(${trainer.id})">
            <img src="${trainer.image}" alt="${trainer.name}" class="card-image">
            <div class="card-content">
                <h3 class="card-title">${trainer.name}</h3>
                <div class="trainer-specialties">
                    ${trainer.specialty.slice(0, 2).map(spec => `<span class="tag">${spec}</span>`).join('')}
                </div>
                <p class="trainer-experience">${trainer.experience} years experience</p>
                <div class="trainer-stats">
                    <div class="stat">
                        <i class="fas fa-star"></i>
                        <span>${trainer.rating}</span>
                    </div>
                    <div class="stat">
                        <i class="fas fa-users"></i>
                        <span>${trainer.clients} clients</span>
                    </div>
                </div>
                <button class="btn-secondary">View Profile</button>
            </div>
        </div>
    `).join('');
    
    // Style trainer cards
    const trainerStats = container.querySelectorAll('.trainer-stats');
    trainerStats.forEach(stats => {
        stats.style.cssText = `
            display: flex;
            justify-content: space-between;
            margin: var(--spacing-md) 0;
        `;
        
        const statItems = stats.querySelectorAll('.stat');
        statItems.forEach(stat => {
            stat.style.cssText = `
                display: flex;
                align-items: center;
                gap: var(--spacing-xs);
                color: var(--gray-600);
                font-size: var(--font-size-sm);
            `;
        });
    });
    
    const experiences = container.querySelectorAll('.trainer-experience');
    experiences.forEach(exp => {
        exp.style.cssText = `
            color: var(--gray-600);
            margin: var(--spacing-sm) 0;
        `;
    });
    
    const specialties = container.querySelectorAll('.trainer-specialties');
    specialties.forEach(spec => {
        spec.style.cssText = `
            display: flex;
            gap: var(--spacing-xs);
            margin: var(--spacing-sm) 0;
            flex-wrap: wrap;
        `;
    });
}

function showTrainerDetail(trainerId) {
    const trainer = mockData.trainers.find(t => t.id === trainerId);
    if (!trainer) return;
    
    const container = document.getElementById('trainer-detail-content');
    if (!container) return;
    
    container.innerHTML = `
        <div class="trainer-detail-header">
            <img src="${trainer.image}" alt="${trainer.name}" class="trainer-detail-image">
            <div class="trainer-detail-info">
                <h1>${trainer.name}</h1>
                <div class="trainer-specialties">
                    ${trainer.specialty.map(spec => `<span class="tag">${spec}</span>`).join('')}
                </div>
                <div class="trainer-stats">
                    <div class="stat-item">
                        <i class="fas fa-medal"></i>
                        <span>${trainer.experience} years experience</span>
                    </div>
                    <div class="stat-item">
                        <i class="fas fa-star"></i>
                        <span>${trainer.rating} rating</span>
                    </div>
                    <div class="stat-item">
                        <i class="fas fa-users"></i>
                        <span>${trainer.clients} clients trained</span>
                    </div>
                </div>
                <div class="trainer-contact">
                    <a href="mailto:${trainer.contact.email}" class="btn-secondary">
                        <i class="fas fa-envelope"></i> Email
                    </a>
                    <a href="https://instagram.com/${trainer.contact.instagram}" class="btn-primary" target="_blank">
                        <i class="fab fa-instagram"></i> Follow
                    </a>
                </div>
            </div>
        </div>
        
        <div class="trainer-detail-content">
            <div class="trainer-bio">
                <h2>About ${trainer.name}</h2>
                <p>${trainer.bio}</p>
            </div>
            
            <div class="trainer-certifications">
                <h2>Certifications</h2>
                <div class="cert-list">
                    ${trainer.certifications.map(cert => `
                        <div class="cert-item">
                            <i class="fas fa-certificate"></i>
                            <span>${cert}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="trainer-achievements">
                <h2>Achievements</h2>
                <div class="achievement-list">
                    ${trainer.achievements.map(achievement => `
                        <div class="achievement-item">
                            <i class="fas fa-trophy"></i>
                            <span>${achievement}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="trainer-classes">
                <h2>Classes by ${trainer.name}</h2>
                <div class="trainer-classes-grid">
                    ${getTrainerClasses(trainerId)}
                </div>
            </div>
        </div>
    `;
    
    showPage('trainer-detail');
    styleTrainerDetail();
}

function getTrainerCard(trainerId) {
    const trainer = mockData.trainers.find(t => t.id === trainerId);
    if (!trainer) return '';
    
    return `
        <img src="${trainer.image}" alt="${trainer.name}" class="trainer-avatar">
        <div class="trainer-info">
            <h4>${trainer.name}</h4>
            <p>${trainer.specialty.slice(0, 2).join(', ')}</p>
            <div class="trainer-rating">
                <i class="fas fa-star"></i>
                <span>${trainer.rating}</span>
            </div>
        </div>
    `;
}

function getTrainerClasses(trainerId) {
    const trainerClasses = mockData.classes.filter(c => c.trainerId === trainerId);
    
    return trainerClasses.map(classItem => `
        <div class="class-card-mini" onclick="showClassDetail(${classItem.id})">
            <img src="${classItem.image}" alt="${classItem.name}">
            <div class="class-info">
                <h5>${classItem.name}</h5>
                <p>${classItem.duration} min • ${utils.formatCurrency(classItem.price)}</p>
                <span class="tag difficulty-${classItem.difficulty}">${classItem.difficulty}</span>
            </div>
        </div>
    `).join('');
}

function styleTrainerDetail() {
    const detailHeader = document.querySelector('.trainer-detail-header');
    if (detailHeader) {
        detailHeader.style.cssText = `
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: var(--spacing-2xl);
            margin-bottom: var(--spacing-3xl);
        `;
    }
    
    const detailImage = document.querySelector('.trainer-detail-image');
    if (detailImage) {
        detailImage.style.cssText = `
            width: 100%;
            height: 400px;
            object-fit: cover;
            border-radius: var(--radius-xl);
        `;
    }
    
    const trainerStats = document.querySelector('.trainer-stats');
    if (trainerStats) {
        trainerStats.style.cssText = `
            display: flex;
            flex-direction: column;
            gap: var(--spacing-md);
            margin: var(--spacing-xl) 0;
        `;
        
        const statItems = trainerStats.querySelectorAll('.stat-item');
        statItems.forEach(item => {
            item.style.cssText = `
                display: flex;
                align-items: center;
                gap: var(--spacing-sm);
                color: var(--gray-700);
            `;
        });
    }
    
    const trainerContact = document.querySelector('.trainer-contact');
    if (trainerContact) {
        trainerContact.style.cssText = `
            display: flex;
            gap: var(--spacing-md);
        `;
    }
    
    const certList = document.querySelector('.cert-list');
    if (certList) {
        certList.style.cssText = `
            display: flex;
            flex-direction: column;
            gap: var(--spacing-sm);
        `;
        
        const certItems = certList.querySelectorAll('.cert-item');
        certItems.forEach(item => {
            item.style.cssText = `
                display: flex;
                align-items: center;
                gap: var(--spacing-sm);
                padding: var(--spacing-md);
                background: var(--gray-50);
                border-radius: var(--radius-lg);
            `;
        });
    }
    
    const achievementList = document.querySelector('.achievement-list');
    if (achievementList) {
        achievementList.style.cssText = `
            display: flex;
            flex-direction: column;
            gap: var(--spacing-sm);
        `;
        
        const achievementItems = achievementList.querySelectorAll('.achievement-item');
        achievementItems.forEach(item => {
            item.style.cssText = `
                display: flex;
                align-items: center;
                gap: var(--spacing-sm);
                padding: var(--spacing-md);
                background: var(--accent);
                color: var(--white);
                border-radius: var(--radius-lg);
            `;
        });
    }
    
    const trainerClassesGrid = document.querySelector('.trainer-classes-grid');
    if (trainerClassesGrid) {
        trainerClassesGrid.style.cssText = `
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: var(--spacing-lg);
        `;
        
        const miniCards = trainerClassesGrid.querySelectorAll('.class-card-mini');
        miniCards.forEach(card => {
            card.style.cssText = `
                display: flex;
                gap: var(--spacing-md);
                padding: var(--spacing-md);
                background: var(--white);
                border: 1px solid var(--gray-200);
                border-radius: var(--radius-lg);
                cursor: pointer;
                transition: all var(--transition-fast);
            `;
            
            const img = card.querySelector('img');
            if (img) {
                img.style.cssText = `
                    width: 80px;
                    height: 80px;
                    object-fit: cover;
                    border-radius: var(--radius-md);
                `;
            }
            
            const classInfo = card.querySelector('.class-info');
            if (classInfo) {
                classInfo.style.cssText = `
                    flex: 1;
                `;
                
                const h5 = classInfo.querySelector('h5');
                if (h5) {
                    h5.style.cssText = `
                        font-size: var(--font-size-base);
                        font-weight: 600;
                        color: var(--gray-900);
                        margin-bottom: var(--spacing-xs);
                    `;
                }
                
                const p = classInfo.querySelector('p');
                if (p) {
                    p.style.cssText = `
                        color: var(--gray-600);
                        font-size: var(--font-size-sm);
                        margin-bottom: var(--spacing-sm);
                    `;
                }
            }
            
            // Hover effect
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-2px)';
                card.style.boxShadow = 'var(--shadow-lg)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
                card.style.boxShadow = '';
            });
        });
    }
}

// Membership page
function loadMembershipPage() {
    const pricingGrid = document.getElementById('pricing-grid');
    const billingToggle = document.getElementById('billing-toggle');
    
    if (!pricingGrid) return;
    
    // Billing toggle functionality
    if (billingToggle) {
        billingToggle.addEventListener('change', updatePricing);
    }
    
    updatePricing();
}

function updatePricing() {
    const pricingGrid = document.getElementById('pricing-grid');
    const billingToggle = document.getElementById('billing-toggle');
    const isAnnual = billingToggle && billingToggle.checked;
    
    if (!pricingGrid) return;
    
    pricingGrid.innerHTML = mockData.membershipPlans.map(plan => `
        <div class="pricing-card ${plan.popular ? 'featured' : ''}">
            <div class="pricing-header">
                <h3 class="pricing-title">${plan.name}</h3>
                <div class="pricing-price">
                    $${isAnnual ? Math.floor(plan.annualPrice / 12) : plan.monthlyPrice}
                </div>
                <div class="pricing-period">
                    per month${isAnnual ? ' (billed annually)' : ''}
                </div>
                ${isAnnual ? `<div class="savings">Save $${(plan.monthlyPrice * 12) - plan.annualPrice}/year</div>` : ''}
            </div>
            <ul class="pricing-features">
                ${plan.features.map(feature => `
                    <li><i class="fas fa-check"></i> ${feature}</li>
                `).join('')}
            </ul>
            <div class="pricing-footer">
                <button class="btn-primary ${plan.popular ? 'btn-large' : ''}" onclick="selectPlan('${plan.name}', ${isAnnual ? plan.annualPrice : plan.monthlyPrice})">
                    Choose ${plan.name}
                </button>
            </div>
        </div>
    `).join('');
    
    // Add savings styles
    const savingsElements = pricingGrid.querySelectorAll('.savings');
    savingsElements.forEach(savings => {
        savings.style.cssText = `
            background: var(--accent);
            color: var(--white);
            padding: var(--spacing-xs) var(--spacing-sm);
            border-radius: var(--radius-full);
            font-size: var(--font-size-sm);
            font-weight: 600;
            margin-top: var(--spacing-sm);
            display: inline-block;
        `;
    });
}

function selectPlan(planName, price) {
    if (!auth.isUserLoggedIn()) {
        utils.showNotification('Please log in to select a membership plan', 'warning');
        showPage('login');
        return;
    }
    
    utils.showNotification(`${planName} plan selected! Redirecting to payment...`, 'success');
    
    // Simulate payment process
    setTimeout(() => {
        utils.showNotification('Payment successful! Welcome to FitZone!', 'success');
        showPage('dashboard');
    }, 2000);
}

// Dashboard page
function loadDashboardPage() {
    if (!auth.isUserLoggedIn()) {
        showPage('login');
        return;
    }
    
    initDashboard();
}

function initDashboard() {
    const dashboardPage = document.getElementById('dashboard');
    if (!dashboardPage || !dashboardPage.classList.contains('active')) return;
    
    // Update user info
    const userInfo = document.querySelector('.user-info');
    const userName = userInfo?.querySelector('.user-name');
    if (userName && auth.currentUser) {
        userName.textContent = `${auth.currentUser.firstName} ${auth.currentUser.lastName}`;
    }
    
    // Initialize chart
    initProgressChart();
    
    // Load upcoming classes
    booking.updateUpcomingClasses();
    
    // Load workout log
    loadWorkoutLog();
}

function initProgressChart() {
    const canvas = document.getElementById('progress-chart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    new Chart(ctx, {
        type: 'line',
        data: chartData.weekly,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            elements: {
                point: {
                    radius: 4,
                    hoverRadius: 6
                }
            }
        }
    });
}

function loadWorkoutLog() {
    const workoutLog = document.getElementById('workout-log');
    if (!workoutLog) return;
    
    workoutLog.innerHTML = mockData.workoutLog.map(workout => `
        <div class="workout-item">
            <div class="workout-date">${utils.formatDate(workout.date)}</div>
            <div class="workout-details">
                <h4>${workout.workout}</h4>
                <p>${workout.duration} min • ${workout.calories} cal</p>
                <div class="workout-exercises">
                    ${workout.exercises.slice(0, 2).map(exercise => `<span class="tag">${exercise}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
    
    // Style workout items
    const workoutItems = workoutLog.querySelectorAll('.workout-item');
    workoutItems.forEach(item => {
        item.style.cssText = `
            display: flex;
            gap: var(--spacing-md);
            padding: var(--spacing-md);
            border-bottom: 1px solid var(--gray-200);
        `;
        
        const date = item.querySelector('.workout-date');
        date.style.cssText = `
            font-size: var(--font-size-sm);
            color: var(--gray-600);
            min-width: 80px;
        `;
        
        const details = item.querySelector('.workout-details');
        details.style.cssText = `
            flex: 1;
        `;
        
        const h4 = details.querySelector('h4');
        h4.style.cssText = `
            font-size: var(--font-size-base);
            font-weight: 600;
            color: var(--gray-900);
            margin-bottom: var(--spacing-xs);
        `;
        
        const p = details.querySelector('p');
        p.style.cssText = `
            color: var(--gray-600);
            font-size: var(--font-size-sm);
            margin-bottom: var(--spacing-sm);
        `;
        
        const exercises = details.querySelector('.workout-exercises');
        exercises.style.cssText = `
            display: flex;
            gap: var(--spacing-xs);
            flex-wrap: wrap;
        `;
    });
}

// Nutrition page
function loadNutritionPage() {
    const blogGrid = document.getElementById('blog-grid');
    if (!blogGrid) return;
    
    blogGrid.innerHTML = mockData.blogPosts.map(post => `
        <article class="blog-card fade-in" onclick="openBlogPost(${post.id})">
            <img src="${post.image}" alt="${post.title}" class="card-image">
            <div class="card-content">
                <div class="blog-meta">
                    <span class="blog-category">${post.category}</span>
                    <span class="blog-read-time">${post.readTime}</span>
                </div>
                <h3 class="card-title">${post.title}</h3>
                <p class="blog-excerpt">${post.excerpt}</p>
                <div class="blog-author">
                    <span>By ${post.author}</span>
                    <span>${utils.formatDate(post.date)}</span>
                </div>
            </div>
        </article>
    `).join('');
    
    // Style blog cards
    const blogMetas = blogGrid.querySelectorAll('.blog-meta');
    blogMetas.forEach(meta => {
        meta.style.cssText = `
            display: flex;
            justify-content: space-between;
            margin-bottom: var(--spacing-sm);
        `;
        
        const category = meta.querySelector('.blog-category');
        category.style.cssText = `
            background: var(--primary);
            color: var(--white);
            padding: var(--spacing-xs) var(--spacing-sm);
            border-radius: var(--radius-full);
            font-size: var(--font-size-xs);
            font-weight: 600;
        `;
        
        const readTime = meta.querySelector('.blog-read-time');
        readTime.style.cssText = `
            color: var(--gray-600);
            font-size: var(--font-size-sm);
        `;
    });
    
    const blogExcerpts = blogGrid.querySelectorAll('.blog-excerpt');
    blogExcerpts.forEach(excerpt => {
        excerpt.style.cssText = `
            color: var(--gray-600);
            line-height: 1.6;
            margin: var(--spacing-sm) 0;
        `;
    });
    
    const blogAuthors = blogGrid.querySelectorAll('.blog-author');
    blogAuthors.forEach(author => {
        author.style.cssText = `
            display: flex;
            justify-content: space-between;
            font-size: var(--font-size-sm);
            color: var(--gray-600);
            margin-top: var(--spacing-md);
            padding-top: var(--spacing-md);
            border-top: 1px solid var(--gray-200);
        `;
    });
}

function openBlogPost(postId) {
    const post = mockData.blogPosts.find(p => p.id === postId);
    if (!post) return;
    
    utils.showNotification(`Opening: ${post.title}`, 'info');
    // In a real app, this would navigate to a detailed blog post page
}

// Shop page
function loadShopPage() {
    loadProducts();
    initShopFilters();
}

function loadProducts(categoryFilter = 'all') {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;
    
    let filteredProducts = mockData.products;
    if (categoryFilter !== 'all') {
        filteredProducts = mockData.products.filter(p => p.category === categoryFilter);
    }
    
    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card scale-in">
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.name}" class="card-image">
                ${product.originalPrice > product.price ? '<span class="discount-badge">Sale</span>' : ''}
            </div>
            <div class="card-content">
                <h3 class="card-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-rating">
                    <div class="stars">
                        ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}
                    </div>
                    <span class="rating-text">(${product.reviews} reviews)</span>
                </div>
                <div class="product-price">
                    <span class="current-price">${utils.formatCurrency(product.price)}</span>
                    ${product.originalPrice > product.price ? `<span class="original-price">${utils.formatCurrency(product.originalPrice)}</span>` : ''}
                </div>
                <button class="btn-primary add-to-cart" data-product-id="${product.id}">
                    <i class="fas fa-shopping-cart"></i>
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
    
    styleProductCards();
}

function initShopFilters() {
    const categoryFilter = document.getElementById('category-filter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', (e) => {
            loadProducts(e.target.value);
        });
    }
}

function styleProductCards() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const imageContainer = card.querySelector('.product-image-container');
        if (imageContainer) {
            imageContainer.style.cssText = `
                position: relative;
                overflow: hidden;
                border-radius: var(--radius-lg) var(--radius-lg) 0 0;
            `;
            
            const discountBadge = imageContainer.querySelector('.discount-badge');
            if (discountBadge) {
                discountBadge.style.cssText = `
                    position: absolute;
                    top: var(--spacing-md);
                    right: var(--spacing-md);
                    background: var(--error);
                    color: var(--white);
                    padding: var(--spacing-xs) var(--spacing-sm);
                    border-radius: var(--radius-full);
                    font-size: var(--font-size-xs);
                    font-weight: 600;
                `;
            }
        }
        
        const description = card.querySelector('.product-description');
        if (description) {
            description.style.cssText = `
                color: var(--gray-600);
                font-size: var(--font-size-sm);
                line-height: 1.5;
                margin: var(--spacing-sm) 0;
            `;
        }
        
        const rating = card.querySelector('.product-rating');
        if (rating) {
            rating.style.cssText = `
                display: flex;
                align-items: center;
                gap: var(--spacing-sm);
                margin: var(--spacing-sm) 0;
            `;
            
            const stars = rating.querySelector('.stars');
            if (stars) {
                stars.style.cssText = `
                    color: var(--warning);
                    font-size: var(--font-size-sm);
                `;
            }
            
            const ratingText = rating.querySelector('.rating-text');
            if (ratingText) {
                ratingText.style.cssText = `
                    color: var(--gray-600);
                    font-size: var(--font-size-xs);
                `;
            }
        }
        
        const priceContainer = card.querySelector('.product-price');
        if (priceContainer) {
            priceContainer.style.cssText = `
                display: flex;
                align-items: center;
                gap: var(--spacing-sm);
                margin: var(--spacing-md) 0;
            `;
            
            const currentPrice = priceContainer.querySelector('.current-price');
            if (currentPrice) {
                currentPrice.style.cssText = `
                    font-size: var(--font-size-xl);
                    font-weight: 700;
                    color: var(--primary);
                `;
            }
            
            const originalPrice = priceContainer.querySelector('.original-price');
            if (originalPrice) {
                originalPrice.style.cssText = `
                    font-size: var(--font-size-base);
                    color: var(--gray-500);
                    text-decoration: line-through;
                `;
            }
        }
    });
}

// Contact page
function loadContactPage() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
}

async function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };
    
    const submitBtn = e.target.querySelector('button[type="submit"]');
    utils.showLoading(submitBtn, 'Sending...');
    
    try {
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        utils.showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
        e.target.reset();
        
    } catch (error) {
        utils.showNotification('Failed to send message. Please try again.', 'error');
    } finally {
        utils.hideLoading(submitBtn);
    }
}

// Hero animations
function initHeroAnimations() {
    // Parallax effect for hero video
    window.addEventListener('scroll', utils.throttle(() => {
        const scrolled = window.pageYOffset;
        const heroVideo = document.querySelector('.hero-video');
        if (heroVideo) {
            heroVideo.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    }, 16));
}

// Newsletter popup
function initNewsletterPopup() {
    const popup = document.getElementById('newsletter-popup');
    const closeBtn = document.getElementById('close-newsletter');
    
    if (!popup) return;
    
    // Show popup on exit intent (simplified)
    let hasShown = utils.storage.get('newsletter-popup-shown');
    
    if (!hasShown) {
        setTimeout(() => {
            popup.classList.add('active');
            utils.storage.set('newsletter-popup-shown', true);
        }, 30000); // Show after 30 seconds
    }
    
    // Close popup
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            popup.classList.remove('active');
        });
    }
    
    // Handle newsletter form submission
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', handleNewsletterSignup);
    });
}

async function handleNewsletterSignup(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const email = formData.get('email');
    
    if (!utils.validateEmail(email)) {
        utils.showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    const submitBtn = e.target.querySelector('button[type="submit"]');
    utils.showLoading(submitBtn, 'Subscribing...');
    
    try {
        // Simulate subscription
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        utils.showNotification('Successfully subscribed to our newsletter!', 'success');
        e.target.reset();
        
        // Close popup if it's open
        const popup = document.getElementById('newsletter-popup');
        if (popup && popup.classList.contains('active')) {
            popup.classList.remove('active');
        }
        
    } catch (error) {
        utils.showNotification('Subscription failed. Please try again.', 'error');
    } finally {
        utils.hideLoading(submitBtn);
    }
}


// Modal management
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

// Handle browser back/forward
window.addEventListener('popstate', (e) => {
    const hash = window.location.hash.substring(1);
    if (hash) {
        showPage(hash);
    } else {
        showPage('home');
    }
});

// Handle initial page load
window.addEventListener('load', () => {
    const hash = window.location.hash.substring(1);
    if (hash) {
        showPage(hash);
    }
});

// Export functions for global access
window.showPage = showPage;
window.showClassDetail = showClassDetail;
window.showTrainerDetail = showTrainerDetail;
window.selectPlan = selectPlan;
window.closeModal = closeModal;
window.openBlogPost = openBlogPost;