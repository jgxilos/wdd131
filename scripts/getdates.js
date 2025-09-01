// Current year
const year = new Date().getFullYear();
document.getElementById('currentyear').textContent = year;

// Last modified date
document.getElementById('lastModified').textContent = `Última Modificación: ${document.lastModified}`;