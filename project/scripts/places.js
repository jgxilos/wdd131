// Places page functionality
function setupMapInteractions() {
    const mapPoints = document.querySelectorAll('.map-point');
    
    mapPoints.forEach(point => {
        point.addEventListener('click', function() {
            const location = this.dataset.location;
            alert(`Showing details for ${location}. In a full implementation, this would display detailed information about the location.`);
        });
    });
}

// Initialize places page
document.addEventListener('DOMContentLoaded', function() {
    // Load footer content FIRST
    loadFooterContent();
    
    // Then initialize places page functionality
    setupMapInteractions();
    
    // Add scroll animations for place cards
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.place-card');
        
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
    const placeCards = document.querySelectorAll('.place-card');
    placeCards.forEach(card => {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
});