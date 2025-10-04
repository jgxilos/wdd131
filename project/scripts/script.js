// Main JavaScript for Nest & Nature website

// DOM elements
const exploreBtn = document.getElementById('exploreBtn');
const birdDisplay = document.getElementById('birdDisplay');
const newsletterForm = document.getElementById('newsletterForm');
const formMessage = document.getElementById('formMessage');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const googleMap = document.querySelector('.google-map');

// Updated bird data array with more details
const birds = [
    {
        name: "Turpial",
        scientificName: "Icterus icterus",
        description: "The national bird of Venezuela, known for its vibrant orange and black plumage. These beautiful birds are often spotted in gardens and forest areas throughout the country.",
        habitat: "Wide variety of habitats including forests, gardens, and agricultural areas. They are known for their melodious songs and territorial behavior.",
        status: "low-risk",
        statusText: "Low Concern",
        statusDescription: "This species is not currently threatened and has a stable population across its natural habitat.",
        image: "images/bird (5).webp",
        viewingTime: "Early morning",
        location: "Carabobo region",
        trait: "Melodious song",
        facts: {
            size: "20-22 cm",
            weight: "65-75 g",
            diet: "Fruits & Insects",
            lifespan: "8-10 years"
        }
    },
    {
        name: "Corocoro Rojo",
        scientificName: "Eudocimus ruber",
        description: "A spectacular wading bird with bright red plumage, commonly found in coastal mangroves. Their vibrant color makes them one of Venezuela's most recognizable birds.",
        habitat: "Mangroves, swamps, and coastal lagoons, particularly in Morrocoy National Park. They often gather in large flocks.",
        status: "medium-risk",
        statusText: "Moderate Concern",
        statusDescription: "Habitat loss in coastal areas poses a threat to this species, though populations remain stable in protected areas.",
        image: "images/bird (4).webp",
        viewingTime: "Throughout the day",
        location: "Coastal areas",
        trait: "Vibrant red plumage",
        facts: {
            size: "56-61 cm",
            weight: "775-925 g",
            diet: "Crustaceans & Small Fish",
            lifespan: "15-20 years"
        }
    },
    {
        name: "Rayador / Pico de Tijera",
        scientificName: "Rynchops niger",
        description: "Unique bird with a specialized bill for skimming the water surface to catch fish. Their distinctive feeding behavior is fascinating to observe.",
        habitat: "Coastal lagoons and estuaries, especially La Bocaina lagoon in San Esteban National Park. They prefer calm waters for feeding.",
        status: "low-risk",
        statusText: "Low Concern",
        statusDescription: "This species has a wide distribution and stable populations throughout its range.",
        image: "images/bird (6).webp",
        viewingTime: "Late afternoon",
        location: "Coastal lagoons",
        trait: "Unique feeding technique",
        facts: {
            size: "40-50 cm",
            weight: "225-400 g",
            diet: "Small Fish",
            lifespan: "10-15 years"
        }
    },
    {
        name: "Colibrí Pico de Espada",
        scientificName: "Ensifera ensifera",
        description: "Remarkable hummingbird with an extremely long bill, longer than its body. This adaptation allows it to feed from specific flowers.",
        habitat: "High-altitude cloud forests in the Andes mountains. They are specialized to certain flowering plants in these ecosystems.",
        status: "medium-risk",
        statusText: "Moderate Concern",
        statusDescription: "Habitat specialization makes this species vulnerable to climate change and deforestation.",
        image: "images/bird (3).webp",
        viewingTime: "Midday",
        location: "Cloud forests",
        trait: "Extraordinarily long bill",
        facts: {
            size: "17-23 cm (including bill)",
            weight: "10-15 g",
            diet: "Nectar & Insects",
            lifespan: "5-8 years"
        }
    },
    {
        name: "Pavita Gris",
        scientificName: "Thamnophilus murinus",
        description: "A small antbird species found in the undergrowth of humid forests. These elusive birds are more often heard than seen.",
        habitat: "Undergrowth of humid forests, particularly in the Cordillera de la Costa. They prefer dense vegetation for protection.",
        status: "low-risk",
        statusText: "Low Concern",
        statusDescription: "This species has a stable population and is common within its preferred habitat.",
        image: "images/bird (7).webp",
        viewingTime: "Early morning",
        location: "Forest undergrowth",
        trait: "Elusive nature",
        facts: {
            size: "14-16 cm",
            weight: "20-25 g",
            diet: "Insects & Spiders",
            lifespan: "6-8 years"
        }
    }
];

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

// Function to get a consistent "bird of the day" based on the date
function getBirdOfTheDay() {
    // Use the current date to determine which bird to show
    // This ensures the same bird is shown throughout the day
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    
    // Use the day of year to select a bird (cycling through the array)
    const birdIndex = dayOfYear % birds.length;
    return birds[birdIndex];
}

// Function to display the bird of the day
function displayBirdOfTheDay() {
    const bird = getBirdOfTheDay();
    
    // Update the DOM with bird data
    document.getElementById('birdName').textContent = bird.name;
    document.getElementById('birdScientific').textContent = bird.scientificName;
    document.getElementById('birdDescription').textContent = bird.description;
    document.getElementById('birdHabitat').textContent = bird.habitat;
    
    // Update image
    const birdImage = document.getElementById('birdImage');
    birdImage.src = bird.image;
    birdImage.alt = bird.name;
    
    // Update conservation status
    const statusDot = document.getElementById('birdStatusDot');
    statusDot.className = 'status-dot ' + bird.status;
    document.getElementById('birdStatusText').textContent = bird.statusText;
    document.getElementById('birdStatusDescription').textContent = bird.statusDescription;
    
    // Update features
    document.getElementById('birdViewingTime').textContent = `Best viewing: ${bird.viewingTime}`;
    document.getElementById('birdLocation').textContent = `Common in: ${bird.location}`;
    document.getElementById('birdTrait').textContent = `Known for: ${bird.trait}`;
    
    // Update facts
    document.getElementById('birdSize').textContent = bird.facts.size;
    document.getElementById('birdWeight').textContent = bird.facts.weight;
    document.getElementById('birdDiet').textContent = bird.facts.diet;
    document.getElementById('birdLifespan').textContent = bird.facts.lifespan;
}

// Function to handle newsletter form submission
function handleNewsletterSubmit(event) {
    event.preventDefault();
    
    // Get form data
    const email = document.getElementById('email').value;
    const experience = document.getElementById('experience').value;
    
    // Validate email
    if (!validateEmail(email)) {
        showFormMessage('Please enter a valid email address.', 'error');
        return;
    }
    
    // Create subscriber object
    const subscriber = {
        email: email,
        experience: experience,
        date: new Date().toISOString()
    };
    
    // Save to localStorage
    saveSubscriber(subscriber);
    
    // Show success message
    showFormMessage('Thank you for subscribing to our newsletter!', 'success');
    
    // Reset form
    newsletterForm.reset();
}

// Function to validate email format
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Function to save subscriber to localStorage
function saveSubscriber(subscriber) {
    // Get existing subscribers or initialize empty array
    const subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers')) || [];
    
    // Check if email already exists
    const existingSubscriber = subscribers.find(sub => sub.email === subscriber.email);
    
    if (existingSubscriber) {
        // Update existing subscriber
        const index = subscribers.indexOf(existingSubscriber);
        subscribers[index] = subscriber;
    } else {
        // Add new subscriber
        subscribers.push(subscriber);
    }
    
    // Save back to localStorage
    localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));
}

// Function to show form message
function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = type;
    
    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

// Function to toggle mobile menu
function toggleMobileMenu() {
    mobileMenuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
}

// Function to handle explore button click
function handleExploreClick() {
    // Scroll to features section
    document.querySelector('.features').scrollIntoView({
        behavior: 'smooth'
    });
}

// Function to handle map hover effect
function setupMapHover() {
    if (googleMap) {
        // Map starts in grayscale, no need to add event listeners as CSS handles it
        console.log('Map hover effect is enabled via CSS');
    }
}

// Function to add scroll animations
function setupScrollAnimations() {
    // Simple scroll animation for elements
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .bird-card, .detail-card');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = "1";
                element.style.transform = "translateY(0)";
            }
        });
    };
    
    // Set initial state for animated elements
    const animatedElements = document.querySelectorAll('.feature-card, .bird-card, .detail-card');
    animatedElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    });
    
    // Run on scroll and initially
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
}

// Function to handle learn more button click
function setupLearnMoreButton() {
    const learnMoreBtn = document.querySelector('.learn-more-btn');
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', function() {
            const currentBird = document.getElementById('birdName').textContent;
            // In a real implementation, this would navigate to a detailed page
            alert(`Redirecting to detailed information about ${currentBird}. This would typically open a species detail page with more photos, sounds, and detailed information.`);
        });
    }
}

// Function to initialize the page
function init() {
    // Display the bird of the day
    displayBirdOfTheDay();
    
    // Load footer content
    loadFooterContent();
    
    // Set up event listeners
    if (exploreBtn) {
        exploreBtn.addEventListener('click', handleExploreClick);
    }
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Set up map hover effect
    setupMapHover();
    
    // Set up scroll animations
    setupScrollAnimations();
    
    // Set up learn more button
    setupLearnMoreButton();
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);