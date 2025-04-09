"use strict";
const books = [];
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    books.push(book);
}

function displayBooks() {
    const table = document.querySelector('.book-list table');
    const tbody = table.querySelector('tbody');
    tbody.innerHTML = ''; // Clear existing rows
    books.forEach((book) => {
        const row = document.createElement('tr'); // Create a new row

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
        row.appendChild(readCell);
        
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

generateRandomBooks(); // Generate random books
displayBooks(); // Display the generated books