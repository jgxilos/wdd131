// Common functions for all pages

// Function to get current year
function getCurrentYear() {
    return new Date().getFullYear();
}

// Function to get last modified date
function getLastModified() {
    return document.lastModified;
}

// Function to load footer content
function loadFooterContent() {
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (!footerPlaceholder) {
        console.error("Footer placeholder element with id 'footer-placeholder' not found.");
        return;
    }

    const currentYear = getCurrentYear();
    const lastModified = getLastModified();

    const footerHTML = `
        <p>&copy; ${currentYear} Nest & Nature - Project for WDD131 - Dynamic Web Fundamentals | Jernigan Gonzalez</p>
        <p>Last modified: ${lastModified}</p>
    `;

    footerPlaceholder.innerHTML = footerHTML;
}

// Mobile menu functionality for all pages
function setupMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Initialize common functionality
document.addEventListener('DOMContentLoaded', function() {
    setupMobileMenu();
});