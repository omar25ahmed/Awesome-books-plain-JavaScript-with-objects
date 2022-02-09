/* eslint-disable max-classes-per-file */
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(author) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if (book.author === author) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

class showBooks {
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach((book) => showBooks.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector('#list');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${book.title} by </td>
        <td>${book.author}</td>
        <td><button class="delete">Remove book</button></td>
      `;

    list.appendChild(row);
  }

  static deleteBook(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
  }
}

document.addEventListener('DOMContentLoaded', showBooks.displayBooks);

const showBookList = document.getElementById('nav-list');
const showAddBook = document.getElementById('nav-add');
const showContact = document.getElementById('nav-contact');

function showList() {
  document.getElementById('book-list').style.display = 'flex';
  document.getElementById('add-new').style.display = 'none';
  document.getElementById('contact').style.display = 'none';
}
function showAdd() {
  document.getElementById('book-list').style.display = 'none';
  document.getElementById('add-new').style.display = 'flex';
  document.getElementById('contact').style.display = 'none';
}
function showContactPage() {
  document.getElementById('book-list').style.display = 'none';
  document.getElementById('add-new').style.display = 'none';
  document.getElementById('contact').style.display = 'flex';
}

window.addEventListener('load', () => {
  showList();
});
showBookList.addEventListener('click', () => {
  showList();
});
showAddBook.addEventListener('click', () => {
  showAdd();
});
showContact.addEventListener('click', () => {
  showContactPage();
});

document.querySelector('#form').addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;

  const book = new Book(title, author);

  showBooks.addBookToList(book);
  Store.addBook(book);
  showBooks.clearFields();
});

document.querySelector('#list').addEventListener('click', (e) => {
  showBooks.deleteBook(e.target);

  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
});

const date = new Date();
document.getElementById('date').innerHTML = date;
