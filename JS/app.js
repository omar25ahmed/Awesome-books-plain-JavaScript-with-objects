let books = [];

function book(title, author) {
  this.title = title;
  this.author = author;
}

const deleteBook = function(title, author) {
  books = books.filter((book) => book.title !== title || book.author !== author);
}

const setLocalStorage = function(books) {
  const data = JSON.stringify(books);
  localStorage.setItem('books', data);
}

 const bookContainer = document.querySelector('book-container');

 function showBook(books) {
  const bookDiv = document.createElement('div');
  const titleBook = document.createElement('p');
  const authorBook = document.createElement('p');
  const deleteBtn = document.createElement('button');
  const hr = document.createElement('hr');

  deleteBtn.textContent('Delete');
  titleBook.textContent(book.title);
  authorBook.textContent(book.author);
  bookDiv.appendChild(titleBook);
  bookDiv.appendChild(authorBook);
  bookDiv.appendChild(deleteBtn);
  bookDiv.appendChild(hr);
  bookContainer.appendChild(bookDiv);

  deleteBtn.addEventListener('click', () => {
    deleteBook(book.title, book.author);
    setLocalStorage(books);
    bookContainer.removeChild(bookDiv);
  });
 }