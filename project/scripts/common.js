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

// Modal functionality for images
function setupImageModal() {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const closeModal = document.querySelector('.close-modal');

    if (!modal) return;

    // Function to open modal
    function openModal(imgSrc, title, description) {
        modalImage.src = imgSrc;
        modalImage.alt = title;
        modalTitle.textContent = title;
        modalDescription.textContent = description;
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    // Function to close modal
    function closeModalHandler() {
        modal.classList.remove('show');
        document.body.style.overflow = ''; // Restore scrolling
    }

    // Close modal when clicking X
    closeModal.addEventListener('click', closeModalHandler);

    // Close modal when clicking outside image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModalHandler();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModalHandler();
        }
    });

    // Add click events to all images
    const clickableImages = document.querySelectorAll('.feature-img, .bird-photo, .species-image img, .place-image img');
    
    clickableImages.forEach(img => {
        img.addEventListener('click', function() {
            const card = this.closest('.feature-card, .bird-card, .species-card, .place-card');
            let title = '';
            let description = '';

            if (card) {
                // Get title and description based on card type
                const titleElement = card.querySelector('h3, .species-name, .bird-name');
                const descElement = card.querySelector('p, .species-description, .bird-description');
                
                title = titleElement ? titleElement.textContent : 'Bird Image';
                description = descElement ? descElement.textContent : 'Beautiful bird species from Venezuela';
            } else {
                title = 'Bird Image';
                description = 'Beautiful bird species from Venezuela';
            }

            openModal(this.src, title, description);
        });
    });
}

// Update the existing DOMContentLoaded event in common.js
document.addEventListener('DOMContentLoaded', function() {
    setupMobileMenu();
    loadFooterContent();
    setupImageModal(); // Add this line
});