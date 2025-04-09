"use strict";
const books = new Map();
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

Book.prototype.toggleRead = function() {
    this.read = !this.read; // Toggle the read status
};

function handleToggleRead(id) {
    const book = books.get(id); // Get the book from the Map using its ID
    if (book) {
        book.toggleRead(); // Toggle the read status of the book
        const readCell = document.getElementById(`read-${id}`); // Get the read cell by ID
        readCell.textContent = book.read ? 'Yes' : 'No'; // Update the cell text
    }
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    books.set(book.id, book); // Store the book in the Map using its ID as the key
    
}

function removeBook(id) {
    books.delete(id); // Remove the book from the Map using its ID
    const row = document.querySelector(`tr[data-id="${id}"]`); // Find the row with the matching ID
    if (row) {
        row.remove(); // Remove the row from the table
    }
}
function displayBooks() {
    const table = document.querySelector('.book-list table');
    const tbody = table.querySelector('tbody');
    tbody.innerHTML = ''; // Clear existing rows
    books.forEach((book) => {
        const row = document.createElement('tr'); // Create a new row
        row.setAttribute('data-id', book.id); // Add a data-id attribute to the row
        // Create and populate the Title column
        const titleCell = document.createElement('td');
        titleCell.textContent = book.title;
        row.appendChild(titleCell);

        // Create and populate the Author column
        const authorCell = document.createElement('td');
        authorCell.textContent = book.author;
        row.appendChild(authorCell);

        // Create and populate the Pages column
        const pagesCell = document.createElement('td');
        pagesCell.textContent = book.pages;
        row.appendChild(pagesCell);

        // Create and populate the Read column
        const readCell = document.createElement('td');
        readCell.textContent = book.read ? 'Yes' : 'No';
        readCell.id = `read-${book.id}`; // Set a unique ID for the read cell
        row.appendChild(readCell);

        const actionsCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => removeBook(book.id));
        actionsCell.appendChild(deleteButton);

        const toggleReadButton = document.createElement('button');
        toggleReadButton.textContent = 'Toggle Read';
        toggleReadButton.addEventListener('click', () => handleToggleRead(book.id)); // Add event listener to toggle read status
        actionsCell.appendChild(toggleReadButton); // Append the toggle read button to the actions cell
        
        row.appendChild(actionsCell);
        tbody.appendChild(row); // Append the row to the table body
    });
}

function generateRandomBooks() {
    const titles = ['Book A', 'Book B', 'Book C', 'Book D', 'Book E'];
    const authors = ['Author X', 'Author Y', 'Author Z', 'Author W', 'Author V'];
    const pages = [100, 200, 300, 400, 500];
    const readStatuses = [true, false];

    for (let i = 0; i < 5; i++) {
        const title = titles[Math.floor(Math.random() * titles.length)];
        const author = authors[Math.floor(Math.random() * authors.length)];
        const page = pages[Math.floor(Math.random() * pages.length)];
        const read = readStatuses[Math.floor(Math.random() * readStatuses.length)];
        addBookToLibrary(title, author, page, read);
    }
}

function showInputForm() {
    const formContainer = document.getElementById('book-form-container');
    formContainer.style.display = 'block'; // Show the form
}

function handleSubmit(event){
    event.preventDefault(); // Prevent default form submission
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = parseInt(document.getElementById('pages').value, 10);
    const read = document.getElementById('read').checked;

    addBookToLibrary(title, author, pages, read); // Add the book to the library
    displayBooks(); // Refresh the book list

    // Hide the form and reset its fields
    const formContainer = document.getElementById('book-form-container');
    formContainer.style.display = 'none';
    document.getElementById('book-form').reset();
}

function handleCancelForm(event) {
    event.preventDefault(); // Prevent default form submission
    const formContainer = document.getElementById('book-form-container');
    formContainer.style.display = 'none'; // Hide the form
    document.getElementById('book-form').reset(); // Reset the form fields
}

function addEventListeners() {
    const addBookButton = document.getElementById('add-book-btn');
    addBookButton.addEventListener('click', showInputForm);
    document.getElementById('book-form').addEventListener('submit', handleSubmit);
    document.getElementById('cancel-form').addEventListener('click', handleCancelForm);
}


generateRandomBooks(); // Generate random books
displayBooks(); // Display the generated books
document.addEventListener('DOMContentLoaded', addEventListeners)