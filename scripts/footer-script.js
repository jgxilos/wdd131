function getCurrentYear() {
    return new Date().getFullYear();
}

function getLastModified() {
    return document.lastModified;
}


function loadFooterContent() {
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (!footerPlaceholder) {
        console.error("Footer placeholder element with id 'footer-placeholder' not found.");
        return;
    }

    const currentYear = getCurrentYear();
    const lastModified = getLastModified();


    const footerHTML = `
        <p>&copy; ${currentYear} Jernigam Gonzalez. All rights reserved.</p>
        <p>Last modified: ${lastModified}</p>
    `;


    footerPlaceholder.innerHTML = footerHTML;
}


document.addEventListener('DOMContentLoaded', loadFooterContent);