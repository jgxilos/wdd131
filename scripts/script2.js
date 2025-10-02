// script2.js

// Product array
const products = [
    { id: "fc-1888", name: "flux capacitor", averageRating: 4.5 },
    { id: "fc-2050", name: "power laces", averageRating: 4.7 },
    { id: "fs-1987", name: "time circuits", averageRating: 3.5 },
    { id: "ac-2000", name: "low voltage reactor", averageRating: 3.9 },
    { id: "jj-1969", name: "warp equalizer", averageRating: 5.0 }
];

// Populate product select options
function populateProductSelect() {
    const selectElement = document.getElementById('product-name');
    
    // Clear existing options except the first one
    while (selectElement.children.length > 1) {
        selectElement.removeChild(selectElement.lastChild);
    }
    
    // Add product options
    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.id;
        option.textContent = product.name;
        selectElement.appendChild(option);
    });
}

// Initialize page
function initializePage() {
    populateProductSelect();
}

// Run when DOM is loaded
document.addEventListener('DOMContentLoaded', initializePage);