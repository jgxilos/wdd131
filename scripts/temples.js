// Actualizar año de copyright
const currentYear = new Date().getFullYear();
document.getElementById('copyright-year').textContent = currentYear;

// Actualizar fecha de última modificación
const lastModified = document.lastModified;
document.getElementById('last-modified').textContent = lastModified;

// Funcionalidad del menú hamburguesa
const hamburgerBtn = document.getElementById('hamburger-btn');
const navMenu = document.getElementById('primary-nav');
const closeIcon = document.querySelector('.close-icon');
const hamburgerIcon = document.querySelector('.hamburger-icon');

hamburgerBtn.addEventListener('click', function() {
    const navList = navMenu.querySelector('ul');
    navList.classList.toggle('show');
    
    // Alternar entre icono hamburguesa y icono de cierre
    if (navList.classList.contains('show')) {
        hamburgerIcon.style.display = 'none';
        closeIcon.style.display = 'inline';
    } else {
        hamburgerIcon.style.display = 'inline';
        closeIcon.style.display = 'none';
    }
});

// Cerrar menú al hacer clic en un enlace de navegación
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        const navList = navMenu.querySelector('ul');
        navList.classList.remove('show');
        hamburgerIcon.style.display = 'inline';
        closeIcon.style.display = 'none';
        
        // Actualizar enlace activo
        document.querySelectorAll('nav a').forEach(a => {
            a.classList.remove('active');
        });
        link.classList.add('active');
    });
});