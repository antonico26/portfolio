document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Lógica de la Portada (Landing Page)
    const landingHero = document.getElementById('landing-hero');
    const startBtn = document.getElementById('start-btn');
    const hiddenElements = document.querySelectorAll('.site-content-hidden');
    const mainContent = document.getElementById('main');

    // Función para entrar al portfolio
    function enterPortfolio() {
        // Ocultar portada
        landingHero.classList.add('hidden');
        
        // Mostrar cabecera, main y footer
        hiddenElements.forEach(el => {
            el.classList.remove('site-content-hidden');
            el.classList.add('content-visible');
        });

        // Asegurar que scroll vuelve arriba al entrar
        window.scrollTo(0, 0);
    }

    startBtn.addEventListener('click', enterPortfolio);

    // 2. Lógica del Menú Lateral Desplegable (Sidebar)
    const menuButton = document.querySelector('.menu-button');
    const siteNav = document.getElementById('site-nav');
    const navLinks = document.querySelectorAll('.site-nav a');

    // Crear overlay de fondo
    const overlay = document.createElement('div');
    overlay.classList.add('body-overlay');
    document.body.appendChild(overlay);

    function toggleMenu() {
        siteNav.classList.toggle('is-open');
        menuButton.classList.toggle('is-active');
        overlay.classList.toggle('is-visible');
    }

    menuButton.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });
});