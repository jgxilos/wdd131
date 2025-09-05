// Update copyright year
const currentYear = new Date().getFullYear();
document.getElementById('copyright-year').textContent = currentYear;

// Update last modified date
const lastModified = document.lastModified;
document.getElementById('last-modified').textContent = lastModified;

// Hamburger menu functionality
const hamburgerBtn = document.getElementById('hamburger-btn');
const navMenu = document.getElementById('primary-nav').querySelector('ul');

hamburgerBtn.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    // The CSS now handles showing/hiding icons based on the 'open' class
});

// Close menu when a link is clicked (optional, but good UX)
const navLinks = document.querySelectorAll('#primary-nav a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
            navMenu.classList.remove('open');
        }
    });
});