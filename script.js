const myLibrary = [];
let id = 0;

function Book(title, author, pages, read) {
    this.id = ++id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

function deleteBookFromLibrary(id) {
    let index = myLibrary.findIndex(book => book.id === id);
    if (index !== -1)
        myLibrary.splice(index, 1);
    displayAllBooks();
}

Book.prototype.toggleRead = function() {
    this.read = !this.read;
    displayAllBooks();
}

function displayAllBooks() {
    const booksTable = document.querySelector('.books tbody');

    booksTable.replaceChildren();  // clears all existing rows

    myLibrary.forEach(book => {

        console.log(book);

        let newRow = document.createElement('tr');

        let titleCell = document.createElement('td');
        titleCell.textContent = book.title;

        let authorCell = document.createElement('td');
        authorCell.textContent = book.author;

        let pagesCell = document.createElement('td');
        pagesCell.textContent = book.pages;

        let readCell = document.createElement('td');
        readCell.textContent = book.read ? 'Yes' : 'No';

        let deleteCell = document.createElement('td');
        let deleteButton = document.createElement('button');
        deleteButton.id = book.id;
        deleteButton.textContent = ('X');
        deleteButton.addEventListener('click', function() {
            deleteBookFromLibrary(book.id);
        })        
        deleteCell.appendChild(deleteButton);

        let toggleCell = document.createElement('td');
        let toggleButton = document.createElement('button');
        toggleButton.textContent = 'Read?'
        toggleButton.addEventListener('click', function() {
            book.toggleRead();
        })
        toggleCell.appendChild(toggleButton);

        newRow.append(titleCell, authorCell, pagesCell, readCell, deleteCell, toggleCell);

        booksTable.appendChild(newRow);
    });
}


addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 266, false);
addBookToLibrary('Tales of the City', 'Armistead Maupin', 198, true);
displayAllBooks();

// Dialog Form Functions

const addNewButton = document.getElementById('addNewButton');
const cancelButton = document.getElementById('cancel');
const submitButton = document.getElementById('submit');
const form = document.getElementById('addNewForm');
const dialog = document.getElementById('addNew');

function addNewBook() {
    let formData = new FormData(form);
    let book = Object.fromEntries(formData);

    addBookToLibrary(book.title, book.author, book.pages, book.read === 'on')

    form.reset();
    displayAllBooks();    
}

addNewButton.addEventListener('click', function() {
    dialog.showModal();
});

cancelButton.addEventListener('click', function() {
    dialog.close('no book added');
});

form.addEventListener('submit', function() {
    addNewBook();
});
