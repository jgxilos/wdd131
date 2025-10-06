// Species page functionality
const speciesData = [
    {
        name: "Turpial",
        scientificName: "Icterus icterus",
        description: "Venezuela's national bird, known for its striking orange and black plumage and melodious song. Often found in open areas, gardens, and forest edges.",
        image: "images/bird5.webp",
        status: "low",
        habitat: "Forests, Gardens",
        size: "20-22 cm",
        diet: "Fruits, Insects",
        category: "endemic"
    },
    {
        name: "Corocoro Rojo",
        scientificName: "Eudocimus ruber",
        description: "Spectacular scarlet ibis found in coastal mangroves. Their vibrant red coloration comes from carotenoids in their crustacean diet.",
        image: "images/bird4.webp",
        status: "medium",
        habitat: "Mangroves, Coast",
        size: "56-61 cm",
        diet: "Crustaceans",
        category: "coastal"
    },
    {
        name: "Rayador",
        scientificName: "Rynchops niger",
        description: "Unique black skimmer with specialized bill for catching fish by skimming water surface. Nocturnal feeder with striking black and white plumage.",
        image: "images/bird6.webp",
        status: "low",
        habitat: "Lagoons, Coast",
        size: "40-50 cm",
        diet: "Small Fish",
        category: "coastal"
    },
    {
        name: "Colibrí Pico de Espada",
        scientificName: "Ensifera ensifera",
        description: "Remarkable hummingbird with bill longer than its body, specialized for feeding from specific long-tubed flowers in cloud forests.",
        image: "images/bird3.webp",
        status: "medium",
        habitat: "Cloud Forests",
        size: "17-23 cm",
        diet: "Nectar, Insects",
        category: "forest"
    },
    {
        name: "Pavita Gris",
        scientificName: "Thamnophilus murinus",
        description: "Small antbird of forest undergrowth, more often heard than seen. Known for its distinctive calls and insect-hunting behavior.",
        image: "images/bird7.webp",
        status: "low",
        habitat: "Forest Understory",
        size: "14-16 cm",
        diet: "Insects",
        category: "forest"
    },
    {
        name: "Aguila Harpía",
        scientificName: "Harpia harpyja",
        description: "One of the world's largest and most powerful eagles. Apex predator of tropical forests with incredible strength and hunting prowess.",
        image: "images/bird1.webp",
        status: "medium",
        habitat: "Rainforests",
        size: "89-105 cm",
        diet: "Mammals, Birds",
        category: "forest"
    }
];

function displaySpecies(speciesArray = speciesData) {
    const container = document.getElementById('speciesContainer');
    
    const speciesHTML = speciesArray.map(species => `
        <div class="species-card" data-category="${species.category}">
            <div class="species-image">
                <img src="${species.image}" alt="${species.name}" loading="lazy">
            </div>
            <div class="species-content">
                <h3 class="species-name">${species.name}</h3>
                <p class="species-scientific">${species.scientificName}</p>
                <p class="species-description">${species.description}</p>
                <div class="species-features">
                    <div class="species-feature">
                        <span>🏠</span>
                        <span>${species.habitat}</span>
                    </div>
                    <div class="species-feature">
                        <span>📏</span>
                        <span>${species.size}</span>
                    </div>
                    <div class="species-feature">
                        <span>🍽️</span>
                        <span>${species.diet}</span>
                    </div>
                </div>
                <span class="species-status status-${species.status}">
                    ${species.status === 'low' ? 'Low Concern' : species.status === 'medium' ? 'Moderate Concern' : 'High Concern'}
                </span>
            </div>
        </div>
    `).join('');
    
    container.innerHTML = speciesHTML;
    
    // Re-setup modal events for new images
    setTimeout(setupImageModal, 100);
}

function setupSpeciesFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.dataset.filter;
            
            if (filter === 'all') {
                displaySpecies();
            } else {
                const filteredSpecies = speciesData.filter(species => species.category === filter);
                displaySpecies(filteredSpecies);
            }
        });
    });
}

// Initialize species page
document.addEventListener('DOMContentLoaded', function() {
    // Load footer content FIRST
    loadFooterContent();
    
    // Then initialize species page functionality
    displaySpecies();
    setupSpeciesFilters();
    
    // Add scroll animations for species cards
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.species-card');
        
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
    const speciesCards = document.querySelectorAll('.species-card');
    speciesCards.forEach(card => {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
});