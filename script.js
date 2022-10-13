let form = document.querySelector('#form');

let myLibrary = [
  {
    title: 'Cather In The Rye',
    author: 'J.D. Salinger',
    finished: 'Finished',
    id: 0,
  },
];

function Book(title, author, finished, id) {
  this.title = title;
  this.author = author;
  this.finished = finished;
  this.id = id;
}

Book.prototype.addBookToLibrary = function () {
  const newBookObject = {
    title: this.title,
    author: this.author,
    finished: this.finished,
    id: this.id,
  };
  myLibrary.push(newBookObject);
};

const submitNewBook = form.addEventListener('submit', event => {
  event.preventDefault();
  let title = document.querySelector('#title');
  let author = document.querySelector('#author');
  let finished = document.querySelector('#finished');
  const newBook = new Book(
    title.value,
    author.value,
    finished.value,
    myLibrary.length
    // TU WRÓĆ JUTRO
  );
  newBook.addBookToLibrary();
  title.value = '';
  author.value = '';
  title.focus();
  loopThroughBooks();
});

function loopThroughBooks() {
  const booksContainer = document.querySelector('#books-container');
  booksContainer.innerHTML = '';

  for (let i = 0; i < myLibrary.length; i++) {
    const newBook = document.createElement('div');
    newBook.className = 'book-card';
    booksContainer.appendChild(newBook);
    const div = document.createElement('div');
    newBook.appendChild(div);
    const objects = myLibrary[i];
    div.setAttribute('id', myLibrary[i].id);
    div.innerHTML = `  
  <p class='title'>${objects.title}</p> 
  <p>${objects.author}</p> 
  <p id=${i}>${objects.finished}</p>
  <button class="book-remove">Remove</button>
  `;

    div.classList = 'card';
  }
  const removeButton = document.querySelectorAll('.book-remove');
  removeButton.forEach(button => {
    button.addEventListener('click', () => {
      const index = myLibrary.findIndex(
        num => num.id === parseInt(button.parentNode.id)
      );
      myLibrary.splice(index, 1);

      loopThroughBooks();
    });
  });
}

function createCard() {}

loopThroughBooks();