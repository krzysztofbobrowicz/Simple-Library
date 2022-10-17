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
  console.log(event);

  const newBook = new Book(
    title.value,
    author.value,
    finished.value,
    myLibrary.length
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
    <div class="author">  
  
    ${objects.author}
   
    </div>
  <div class='title'>
 
  ${objects.title}

  </div> 
  


 

  <div class="buttons" id="${i}">
  <button  class="finished-button">${objects.finished}</=$>
  <button class="book-remove remove-button">Remove Book</button>
  </div>
  `;
    div.classList = 'card';
  }

  const finishedButton = document.querySelectorAll('.finished-button');

  finishedButton.forEach(button => {
    button.addEventListener('click', e => {
      const index = myLibrary.findIndex(
        num => num.id === parseInt(button.parentNode.id)
      );
      if (myLibrary[index].finished === 'Not finished') {
        e.target.innerText = 'Finished';
        myLibrary[index].finished = 'Finished';
      } else {
        e.target.innerText = 'Not finished';
        myLibrary[index].finished = 'Not finished';
      }
    });
  });

  const removeButton = document.querySelectorAll('.book-remove');
  removeButton.forEach(button => {
    button.addEventListener('click', () => {
      const index = myLibrary.findIndex(
        title =>
          title.title ===
          button.parentNode.parentNode.querySelector('.title').innerText
      );
      console.log(index);
      myLibrary.splice(index, 1);
      loopThroughBooks();
    });
  });
}
loopThroughBooks();
