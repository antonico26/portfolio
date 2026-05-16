document.addEventListener('DOMContentLoaded', () => {
    // Seleccionamos todos los enlaces/botones que tienen "data-target"
    const navLinks = document.querySelectorAll('[data-target]');
    // Seleccionamos todas las secciones de contenido
    const sections = document.querySelectorAll('.view-section');

    function navigateTo(targetId) {
        // 1. Ocultar todas las secciones
        sections.forEach(sec => {
            sec.classList.remove('active-view');
        });
        
        // 2. Mostrar solo la sección seleccionada
        const targetSection = document.getElementById(targetId);
        if(targetSection) {
            targetSection.classList.add('active-view');
        }

        // 3. Resaltar el enlace activo en el menú superior
        document.querySelectorAll('.top-nav a').forEach(link => {
            link.classList.remove('active-link');
            if(link.getAttribute('data-target') === targetId) {
                link.classList.add('active-link');
            }
        });

        // 4. Volver al principio de la página al cambiar de sección
        window.scrollTo(0, 0);
    }

    // Le ponemos la "oreja" a cada botón para detectar el clic
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Evitamos que la web salte o recargue
            const target = link.getAttribute('data-target');
            navigateTo(target);
        });
    });
});