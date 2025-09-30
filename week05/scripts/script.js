// Selecting DOM elements
const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');

// Initialize the chapters array from localStorage or set to an empty array
// This checks if data exists in localStorage and parses it, otherwise assigns an empty array
let chaptersArray = getChapterList() || [];

// Function to retrieve the chapter list from localStorage
function getChapterList() {
    // Get the stringified array from localStorage using the key 'myFavBOMList'
    const storedData = localStorage.getItem('myFavBOMList');
    // If data exists, parse it back into an array; otherwise, return null
    return storedData ? JSON.parse(storedData) : null;
}

// Function to save the current chapters array to localStorage
function setChapterList() {
    // Stringify the chaptersArray and store it in localStorage with the key 'myFavBOMList'
    localStorage.setItem('myFavBOMList', JSON.stringify(chaptersArray));
}

// Function to display a single chapter item in the list
function displayList(item) {
    // Create the list item element
    let li = document.createElement('li');
    // Create the delete button element
    let deleteButton = document.createElement('button');

    // Set the text content of the list item to the chapter name
    li.textContent = item;

    // Configure the delete button
    deleteButton.textContent = '❌';
    deleteButton.classList.add('delete-btn'); // Apply CSS class for styling
    deleteButton.setAttribute('aria-label', `Remove ${item}`); // Accessibility label

    // Append the delete button to the list item
    li.appendChild(deleteButton);

    // Append the list item to the main list
    list.appendChild(li);

    // Add click event listener to the delete button
    deleteButton.addEventListener('click', function () {
        // Remove the corresponding item from the chaptersArray
        deleteChapter(li.textContent); // Pass the full text content (including the '❌')
        // Remove the list item from the DOM
        li.remove();
        // Focus back on the input field after deletion
        input.focus();
    });
}

// Function to remove a chapter from the array and update localStorage
function deleteChapter(chapterWithEmoji) {
    // Remove the '❌' emoji from the end of the string to get the actual chapter name
    const chapter = chapterWithEmoji.slice(0, chapterWithEmoji.length - 1);

    // Filter the chaptersArray to exclude the chapter to be deleted
    chaptersArray = chaptersArray.filter(item => item !== chapter);

    // Update the localStorage with the modified array
    setChapterList();
}

// Populate the list on page load using the data from chaptersArray
chaptersArray.forEach(chapter => {
    displayList(chapter);
});

// Event listener for the "Add Chapter" button
button.addEventListener('click', function (event) {
    event.preventDefault(); // Prevent default form submission

    // Get the trimmed value from the input field
    const newChapter = input.value.trim();

    // Check if the input is not empty
    if (newChapter !== '') {
        // Add the new chapter to the display list
        displayList(newChapter);
        // Add the new chapter to the internal array
        chaptersArray.push(newChapter);
        // Save the updated array to localStorage
        setChapterList();
        // Clear the input field
        input.value = '';
        // Focus back on the input field
        input.focus();
    }
});

// Allow adding a chapter by pressing the Enter key
input.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        button.click(); // Trigger the button click event
    }
});