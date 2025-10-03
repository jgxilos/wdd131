function updateReviewCounter() {
    const countKey = 'reviewCounter';
    let count = localStorage.getItem(countKey);
    
    if (count === null) {
        count = 0;
    } else {
        count = parseInt(count, 10);
    }
    
    count++;
    localStorage.setItem(countKey, count.toString());
    
    const countNumberElement = document.getElementById('count-number');
    if (countNumberElement) {
        countNumberElement.textContent = count;
    } else {
        console.warn("Element with id 'count-number' not found.");
    }
}

function displayFormData() {
    const params = new URLSearchParams(window.location.search);
    const dataObject = {};
    
    for (const [key, value] of params.entries()) {
        if (dataObject[key]) {
            if (Array.isArray(dataObject[key])) {
                dataObject[key].push(value);
            } else {
                dataObject[key] = [dataObject[key], value];
            }
        } else {
            dataObject[key] = value;
        }
    }
    
    const dataDisplayElement = document.getElementById('data-display');
    if (dataDisplayElement) {
        dataDisplayElement.textContent = JSON.stringify(dataObject, null, 2);
    } else {
        console.warn("Element with id 'data-display' not found.");
    }
}

function initializeReviewPage() {
    updateReviewCounter();
    displayFormData();
}

document.addEventListener('DOMContentLoaded', initializeReviewPage);