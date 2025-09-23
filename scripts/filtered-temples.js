// Array of Temple Objects
const temples = [
    {
        templeName: "Los Angeles California Temple",
        location: "Los Angeles, California, United States",
        dedicated: "1956, March, 14",
        area: 190614,
        imageUrl: "https://www.churchofjesuschrist.org/imgs/dc0be5a092a02498cf62ba4f2805aa1ff33d3859/full/1920%2C/0/default"
    },
    {
        templeName: "Bogota, Colombia Temple",
        location: "Bogotá, Distrito Capital Colombia",
        dedicated: "1999, April, 26",
        area: 53500,
        imageUrl: "https://www.churchofjesuschrist.org/imgs/6cf5534366ee359cb42d7e6eb0daede56939fca8/full/1920%2C/0/default"
    },
    {
        templeName: "Manaos, Brasil Temple",
        location: "Avenida Coronel Texeira #3162, Ponta Negra, Manaus–AM, Brazil",
        dedicated: "2012, June, 10",
        area: 32032,
        imageUrl: "https://www.churchofjesuschrist.org/imgs/1960ac6c8302db9b125f90b0b6f37e6b376455e9/full/1920%2C/0/default"
    },
    {
        templeName: "Nauvoo Temple",
        location: "Nauvoo, Illinois, United States",
        dedicated: "1846, May, 1–3",
        area: 50000,
        imageUrl: "https://www.churchofjesuschrist.org/imgs/fceeff831280ad8dd2ef425bcdac6d4fade5a7ae/full/1920%2C/0/default"
    },
    {
        templeName: "Madrid España Temple",
        location: "Calle del Templo Nº2, 28030 Madrid, Spain",
        dedicated: "1999, March, 19–21",
        area: 45800,
        imageUrl: "https://www.churchofjesuschrist.org/imgs/c5cc2a1d92a020ae4358dfeedb3085d924954f66/full/1920%2C/0/default"
    },
    {
        templeName: "Sydney Australia Temple",
        location: "756 Pennant Hills Road, Carlingford, NSW 2118, Australia",
        dedicated: "1984, September, 20–23",
        area: 30067,
        imageUrl: "https://www.churchofjesuschrist.org/imgs/df8c28a226486483f0c41cc98efd4f4091af1394/full/1920%2C/0/default"
    },
    {
        templeName: "Mexico City Temple",
        location: "Avenida 510 N°90, Col. San Juan de Aragón, 07950 Ciudad de México, México",
        dedicated: "1983, December, 2–4",
        area: 116642,
        imageUrl: "https://www.churchofjesuschrist.org/imgs/2b324ee7a730547ecd232c096d4af401293e33be/full/1920%2C/0/default"
    },
    {
        templeName: "Caracas, Venezuela Temple",
        location: "Urb Caurimare, Avenida. C con Calle C-1, Caracas 1062-A, Venezuela",
        dedicated: "2000, August, 20",
        area: 15332,
        imageUrl: "https://www.churchofjesuschrist.org/imgs/d709367e4fd0fdb422b80130d127f341947f6dfa/full/1920%2C/0/default"
    },
    {
        templeName: "Manti Temple",
        location: "200 E 510 N, Manti, Utah 84642-1701, United States",
        dedicated: "1888, May, 21–23",
        area: 74792,
        imageUrl: "https://www.churchofjesuschrist.org/imgs/6cf5534366ee359cb42d7e6eb0daede56939fca8/full/1920%2C/0/default"
    }
];

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

// Function to display temple cards
function displayTemples(templeList, filterName) {
    const gallery = document.getElementById('temple-gallery');
    gallery.innerHTML = ''; // Clear previous content

    // Update the title based on the filter
    const filterTitle = document.getElementById('filter-title');
    filterTitle.textContent = filterName;

    templeList.forEach(temple => {
        // Create the main card container
        const card = document.createElement('figure');
        card.classList.add('temple-card');

        // Create the image element with lazy loading
        const img = document.createElement('img');
        img.src = temple.imageUrl;
        img.alt = `Image of ${temple.templeName}`;
        img.loading = 'lazy'; // Implement lazy loading
        img.width = 300; // Set width for consistent layout
        img.height = 200; // Set height for consistent layout

        // Create the figcaption element
        const figCaption = document.createElement('figcaption');
        figCaption.innerHTML = `
            <h3>${temple.templeName}</h3>
            <p>Location: ${temple.location}</p>
            <p>Dedicated: ${temple.dedicated}</p>
            <p>Area: ${temple.area.toLocaleString()} sq ft</p>
        `;

        // Append image and figcaption to the card
        card.appendChild(img);
        card.appendChild(figCaption);

        // Append the card to the gallery
        gallery.appendChild(card);
    });
}

// Initial display of all temples
displayTemples(temples, 'Home');

// Add event listeners to the navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default anchor behavior
        
        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));
        
        // Add active class to the clicked link
        link.classList.add('active');
        
        // Get the filter type from the data attribute
        const filterType = link.getAttribute('data-filter');
        
        // Apply the appropriate filter
        let filteredTemples;
        let filterName;
        
        switch(filterType) {
            case 'home':
                filteredTemples = temples;
                filterName = 'Home';
                break;
            case 'old':
                filteredTemples = temples.filter(temple => {
                    const year = parseInt(temple.dedicated.split(',')[0]);
                    return year < 1900;
                });
                filterName = 'Old';
                break;
            case 'new':
                filteredTemples = temples.filter(temple => {
                    const year = parseInt(temple.dedicated.split(',')[0]);
                    return year > 2000;
                });
                filterName = 'New';
                break;
            case 'large':
                filteredTemples = temples.filter(temple => temple.area > 50000);
                filterName = 'Large';
                break;
            case 'small':
                filteredTemples = temples.filter(temple => temple.area < 50000);
                filterName = 'Small';
                break;
            default:
                filteredTemples = temples;
                filterName = 'Home';
        }
        
        // Display the filtered temples
        displayTemples(filteredTemples, filterName);
    });
});