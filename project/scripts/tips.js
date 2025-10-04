// Tips page functionality
function setupEquipmentComparisons() {
    // This function could be expanded to handle interactive comparisons
    console.log('Equipment comparison functionality ready');
}

// Initialize tips page
document.addEventListener('DOMContentLoaded', function() {
    // Load footer content FIRST
    loadFooterContent();
    
    // Then initialize tips page functionality
    setupEquipmentComparisons();
    
    // Add scroll animations for content cards
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.equipment-card, .ethic-card, .time-slot');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = "1";
                element.style.transform = "translateY(0)";
            }
        });
    };
    
    // Set initial state
    const animatedElements = document.querySelectorAll('.equipment-card, .ethic-card, .time-slot');
    animatedElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
});