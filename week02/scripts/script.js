// Selecting DOM elements
const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');

// Event listener for the "Add Chapter" button"
button.addEventListener('click', function(event) {
    event.preventDefault();
    
    // Get and clear the input value
    const chapter = input.value.trim();
    
    // Check that it is not empty
    if (chapter !== '') {
        // Create elements
        const _li = document.createElement('li');
        const deleteButton = document.createElement('button');
        
        // Configure the delete button
        deleteButton.textContent = '❌';
        deleteButton.classList.add('delete-btn');
        deleteButton.setAttribute('aria-label', `Remove ${chapter}`);
        
        // Event listener to remove the parent element <li>
        deleteButton.addEventListener('click', function() {
            _li.remove();
        });
        
        // Add chapter text to the <li>
        _li.textContent = chapter;
        
        // Add delete button to <li>
        _li.appendChild(deleteButton);
        
        // Add the <li> to the list
        list.appendChild(_li);
        
        // Clean and focus the input
        input.value = '';
        input.focus();
    }
});

// Allow adding with Enter key
input.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        button.click();
    }
});