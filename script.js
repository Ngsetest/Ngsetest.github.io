// Language switching functionality
const langButtons = document.querySelectorAll('.lang-btn');
const currentLang = localStorage.getItem('language') || 'en';

function switchLanguage(lang) {
    document.querySelectorAll('[data-' + lang + ']').forEach(element => {
        const translation = element.getAttribute('data-' + lang);
        if (translation) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
            }
        }
    });

    langButtons.forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

    localStorage.setItem('language', lang);
}

langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        switchLanguage(lang);
    });
});

// Initialize language
switchLanguage(currentLang);

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav') && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu after clicking a link
            navLinks.classList.remove('active');
        }
    });
});

// Portfolio show more/less functionality
const showMoreBtn = document.querySelector('.show-more-btn');
const hiddenItems = document.querySelectorAll('.portfolio-item.hidden');
let isExpanded = false;

showMoreBtn.addEventListener('click', () => {
    hiddenItems.forEach(item => {
        item.classList.toggle('hidden');
    });
    
    isExpanded = !isExpanded;
    const btnText = isExpanded ? 
        (currentLang === 'en' ? 'Show Less' : 'Показать Меньше') :
        (currentLang === 'en' ? 'Show More Projects' : 'Показать Больше Проектов');
    showMoreBtn.querySelector('.btn-text').textContent = btnText;
});

// Modal System Implementation
const modal = document.getElementById('portfolioModal');
const modalClose = modal.querySelector('.modal-close');
const modalImage = modal.querySelector('.modal-image');
const modalTitle = modal.querySelector('.modal-title');
const modalDescription = modal.querySelector('.modal-description');
const modalTechStack = modal.querySelector('.modal-tech-stack');
//const liveDemo = modal.querySelector('.live-demo-link');
//const githubLink = modal.querySelector('.github-link');

// Project details data
const projectDetails = {
    '1': {
        description_en: 'Money transfer apps, similar to wise and similar systems. Also works with cryptocurrency',
        description_ru: 'Приложения для денежных переводов, аналог wise и подобных систем. Также работает с криптовалютой',
        techStack: ['Swift', 'Kotlin', 'MVVM', 'Onfido', 'Firebase']
        //demo: 'https://demo.healthapp.com',
        //github: 'https://github.com/techmobile/health-app'
    },
    '2': {
        description_en: 'Application for raising VPN on a mobile device. <br>Main functions:<br>1) Global access: By connecting to servers around the world, the application allows you to bypass geographical blocks and restrictions, giving access to content and resources from different countries<br>2) Ad and Malware Blocking: The app offers additional protection against ads and malicious threats, ensuring a safe and smooth online experience..',
        description_ru: 'Приложение для поднятия VPN на мобильном устройстве. <br>Основные функции:<br>1) Глобальный доступ: Подключаясь к серверам по всему миру, приложение позволяет обходить географические блокировки и ограничения, предоставляя доступ к контенту и ресурсам из разных стран<br>2) Блокировка рекламы и вредоносных программ: Приложение предлагает дополнительную защиту от рекламы и вредоносных угроз, гарантируя безопасную и бесперебойную работу в сети.',
        techStack: ['Swift', 'Kotlin', 'OpenVPN', 'Firebase', 'RX', 'Room', 'YooKassa']
    },
    '3':{
        description_en: 'Application to control the device to show emoticons on the car<br>The device is connected via BLE. Management both manually and by voice.',
        description_ru: 'Приложение для управления устройством для показа смайлов на машине. <br>Соединение с устройством идет по BLE. Управление как вручную так и голосом. <br>Можно выбрать из галереи предустановленные смайлы или нарисовать свой',
        techStack: ['Swift', 'Kotlin', 'BLE', 'Firebase', 'GeoLocation']
    },
    '4':{
        description_en: 'Application for blocking programs and sites in real time according to the conditions:<br>* if the time is currently within the prohibited time range, then block<br>* if today\'s day of the week is included in the forbidden days of the week, then block<br>* if the limit of the application\'s operation by time per day is exceeded, then block<br>* if the limit of launches per day is exceeded, then block<br>* blocking with and without a password (if the password is enabled, you can provide temporary access)',
        description_ru: 'Приложения для блокировки программ и сайтов в режиме реального времени по условиям:<br>* если время в данный момент попадает в запрещенный временной диапазон, то блокировка<br>* если сегодняшний день недели входит в запрещенные дни недели, то блокировка<br>* если превышен лимит работы приложения по времени в сутки, то блокировка<br>* если превышен лимит запусков в сутки, то блокировка<br>* блокировка с паролем и без (если пароль включен, можно предоставить временный доступ)',
        techStack: ['Kotlin', 'Clean Architecture', 'Room']
    },
    '5':{
        description_en: 'Application for completing quests around the city',
        description_ru: 'Приложение для прохождения квестов по городу ',
        techStack: ['Swift', 'Kotlin', 'Firebase', 'Dagger', 'GeoLocation']
    },
    '6':{
        description_en: 'Application for carshering service',
        description_ru: 'Приложение для каршеринга ',
        techStack: ['Swift', 'Kotlin', 'Firebase', 'Realm', 'GeoLocation']
    },
    '7':{
        description_en: 'Applications for ordering products in chain stores',
        description_ru: 'Приложения для заказа продуктов в сети магазинов',
        techStack: ['SwiftUI', 'Firebase', 'Combine', 'YandexMaps']
    },
    '8':{
        description_en: 'Entertainment aggregator app',
        description_ru: 'Приложение-агрегатор развлечений',
        techStack: ['Swift', 'Kotlin', 'Firebase', 'SocialNetworks']
    },
    '9':{
        description_en: 'Taxi Service Application',
        description_ru: 'Приложение для службы такси',
        techStack: ['Swift', 'Kotlin', 'Firebase', 'Navigation', 'In-app purchase']
    },
    // Add more project details as needed
};

// Handle portfolio item clicks
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('click', () => {
        const id = item.querySelector('h3').id;
        const title = item.querySelector('h3').textContent;
        const imgSrc = item.querySelector('img').src;
        const details = projectDetails[id] || {
            description_en: 'Project details coming soon.',
            description_ru: 'Мы скоро добавим описание проекта',
            techStack: [],
            //demo: '#',
            //github: '#'
        };

        modalImage.src = imgSrc;
        modalImage.alt = title;
        modalTitle.textContent = title;
        modalDescription.innerHTML = `<p>${localStorage.getItem('language') == 'en' ? details.description_en : details.description_ru}</p>`;
        modalTechStack.innerHTML = `<h4>Technologies Used:</h4><p>${details.techStack.join(' • ')}</p>`;
        //liveDemo.href = details.demo;
        //githubLink.href = details.github;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Close modal functionality
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Keyboard accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// Add modal animation classes
modal.querySelector('.modal-content').addEventListener('animationend', (e) => {
    if (e.animationName === 'slideOut') {
        modal.style.display = 'none';
    }
});

// Floating tech elements animation
const floatingElements = document.querySelector('.floating-tech-elements');
const techIcons = ['⚡', '🔥', '💻', '📱', '🚀', '💡'];

for (let i = 0; i < 20; i++) {
    const element = document.createElement('span');
    element.textContent = techIcons[Math.floor(Math.random() * techIcons.length)];
    element.style.position = 'absolute';
    element.style.left = `${Math.random() * 100}%`;
    element.style.top = `${Math.random() * 100}%`;
    element.style.fontSize = `${Math.random() * 20 + 10}px`;
    element.style.opacity = '0.2';
    element.style.animation = `float ${Math.random() * 10 + 5}s linear infinite`;
    element.style.animationDelay = `-${Math.random() * 5}s`;
    floatingElements.appendChild(element);
}

// Enhanced reveal animations
const revealElements = document.querySelectorAll('.service-card, .portfolio-item, .contact-card');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    revealElements.forEach((element, index) => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
};

// Initialize reveal elements with stagger
revealElements.forEach((element, index) => {
    if (!element.classList.contains('hidden')) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        element.style.transitionDelay = `${index * 0.1}s`;
    }
});

// Parallax effect for hero section
const heroContent = document.querySelector('.hero-content');
const cyberGrid = document.querySelector('.cyber-grid');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (heroContent && cyberGrid) {
        heroContent.style.transform = `translateY(${scrolled * 0.4}px)`;
        cyberGrid.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

// Add scroll event listener
window.addEventListener('scroll', revealOnScroll);
// Initial check for elements in view
revealOnScroll();