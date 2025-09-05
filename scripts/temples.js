// Update copyright year
const currentYear = new Date().getFullYear();
document.getElementById('copyright-year').textContent = currentYear;

// Update last modified date
const lastModified = document.lastModified;
document.getElementById('last-modified').textContent = lastModified;

// Hamburger menu functionality
const hamburgerBtn = document.getElementById('hamburger-btn');
const navMenu = document.getElementById('primary-nav');
const closeIcon = document.querySelector('.close-icon');
const hamburgerIcon = document.querySelector('.hamburger-icon');

hamburgerBtn.addEventListener('click', function() {
    const navList = navMenu.querySelector('ul');
    navList.classList.toggle('show');
    
    // Toggle between hamburger icon and close icon
    if (navList.classList.contains('show')) {
        hamburgerIcon.style.display = 'none';
        closeIcon.style.display = 'inline';
    } else {
        hamburgerIcon.style.display = 'inline';
        closeIcon.style.display = 'none';
    }
});

// Close menu when clicking on a navigation link
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        const navList = navMenu.querySelector('ul');
        navList.classList.remove('show');
        hamburgerIcon.style.display = 'inline';
        closeIcon.style.display = 'none';
        
        // Update active link
        document.querySelectorAll('nav a').forEach(a => {
            a.classList.remove('active');
        });
        link.classList.add('active');
    });
});