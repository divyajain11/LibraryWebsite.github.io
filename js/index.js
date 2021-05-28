console.log("This is Divya's library");
showBooks();

// Add Scroll Bar into the table
let tableBody = document.getElementById('table');
tableBody.style.overflow = 'auto';
tableBody.style.height = '350px';


// Show Books in the table
function showBooks() {

    let getBooks = localStorage.getItem('books');
    let bookObj;
    if (getBooks == null) {
        bookObj = [];
    } else {
        bookObj = JSON.parse(getBooks);
    }

    let addRow = "";
    bookObj.forEach(function (element, index) {
        addRow += `<tr>
                    <td>${element.title}</td>
                    <td>${element.author}</td>
                    <td>${element.type}</td>
                    <td><button id="${index}" onclick="deleteBook(this.id)" class="btn btn-primary">Delete Book</button></td>
                  </tr>`;
    });
    let tableBody = document.getElementById('tableBody');
    if (bookObj.length == 0) {
        tableBody.innerHTML = "";
    }else{
        tableBody.innerHTML = addRow;
    }
}

// Delete Book from the table
function deleteBook(index) {
    let getBooks = localStorage.getItem('books');
    let bookObj;
    if (getBooks == null) {
        bookObj = [];
    } else {
        bookObj = JSON.parse(getBooks);
    }
    let bookTitle = bookObj[index].title;
    bookObj.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(bookObj));
    let message = document.getElementById('message');
    let boldText = 'Deleted';
    message.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
    <strong>${boldText}:</strong> The book ${bookTitle} has been deleted from the library! 
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`;
    setTimeout(() => {
        message.innerHTML = "";
    }, 5000);
    showBooks();
}

// Create a Book Constructor
class Book {
    constructor(title, author, type) {
        this.title = title;
        this.author = author;
        this.type = type;
    }
}

class Display {
    add(book) {
        console.log("Book has been added to library");

        let getBooks = localStorage.getItem('books');
        let bookObj;
        if (getBooks == null) {
            bookObj = [];
        } else {
            bookObj = JSON.parse(getBooks);
        }

        bookObj.push(book);
        localStorage.setItem('books', JSON.stringify(bookObj));
        let tableBody = document.getElementById('tableBody');
        showBooks();

    }

    clear() {
        let libraryForm = document.getElementById('libraryForm');
        libraryForm.reset();
    }

    validate(book) {
        if (book.title.length < 2 || book.author.length < 2) {
            return false;
        } else {
            return true;
        }
    }

    show(type, displayMessage) {
        let message = document.getElementById('message');
        let boldText;
        if (type === 'success') {
            boldText = 'Success';
        } else {
            boldText = 'Error';
        }
        message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
        <strong>${boldText}:</strong> ${displayMessage}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`;
        setTimeout(() => {
            message.innerHTML = "";
        }, 5000);
    }
}

// Get the libraryForm
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);


function libraryFormSubmit(e) {

    e.preventDefault();

    let title = document.getElementById('bookTitle').value;
    let author = document.getElementById('author').value;
    let type;
    let fiction = document.getElementById('fiction');
    let informative = document.getElementById('informative');
    let drama = document.getElementById('drama');
    if (fiction.checked) {
        type = fiction.value;
    } else if (informative.checked) {
        type = informative.value;
    } else if (drama.checked) {
        type = drama.value;
    }

    let book = new Book(title, author, type);


    let display = new Display();

    if (display.validate(book)) {
        display.add(book);
        display.clear();
        display.show('success', 'Your book has been added successfully!');
    } else {
        display.show('danger', 'Sorry you cannot add this book!');
    }

}