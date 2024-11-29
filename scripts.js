const myLibrary = [];
myLibrary.push(new Book('The Hobbit', 'J.R.R. Tolkien', '234', 'read'));
myLibrary.push(new Book('Project Hail Mary', 'Andy Weir', '110', 'unread'));

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;

    this.info = function(){
        return `${this.title} by ${this.author}, came out in ${this.pages} pages, ${this.status}`;
    }
}

function addBookToLibrary(title, author, pages, status) {
  const newBook = new Book(title, author, pages, status);
  myLibrary.push(newBook);
}

function displayBook(book){
  const main = document.getElementById('main');

  const bookDisplay = document.createElement('div');
  bookDisplay.classList.add('bookDisplay');

  const readStatus = document.createElement('div');
  readStatus.classList.add('readStatus', book.status);
  readStatus.setAttribute('title', 'change status');

  const status = document.createElement('p');
  status.classList.add('status', 'no-select');
  status.textContent = book.status;

  readStatus.addEventListener('click', () => {
    switch (status.textContent){
      case 'read':
        status.textContent = 'unread';
        readStatus.classList.replace('read','unread')
        book.status = 'unread';
        break;
      case 'unread':
        status.textContent = 'read';
        readStatus.classList.replace('unread','read')
        book.status = 'read';
        break;
    }
  })


  const bookContent = document.createElement('div');
  bookContent.classList.add('bookContent');

  const deleteButton = document.createElement('button');
  deleteButton.setAttribute('type', 'button');
  deleteButton.setAttribute('title', 'delete book');
  deleteButton.addEventListener('click', () => {
    main.removeChild(bookDisplay);
  })

  const bookName = document.createElement('h2');
  bookName.textContent = book.title;
  const bookAuthor = document.createElement('h3');
  bookAuthor.textContent = book.author;
  const amountPages = document.createElement('h4');
  amountPages.textContent = book.pages + ' pages';

  main.appendChild(bookDisplay);

  bookDisplay.appendChild(readStatus);
  bookDisplay.appendChild(bookContent);
  
  readStatus.appendChild(status);

  bookContent.appendChild(deleteButton);
  bookContent.appendChild(bookName);
  bookContent.appendChild(bookAuthor);
  bookContent.appendChild(amountPages);
}

const modal = document.getElementById('modal');
const addButton = document.getElementById('addBookBtn');
const closeModalBtn = document.getElementById('close');

function openModal() {
  modal.style.display = 'block';
}

function closeModal() {
  modal.style.display = 'none';
}

window.addEventListener('click', function(event) {
  if (event.target === modal) {
      closeModal();
  }})

addButton.addEventListener('click', openModal)
closeModalBtn.addEventListener('click', closeModal);

document.getElementById('addBookForm').addEventListener('submit',
  function(event){
    event.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const statusChecked = document.getElementById('status').checked;
    let status;
    if (statusChecked){
      status = 'read';
    } else {
      status = 'unread';
    }

    addBookToLibrary(title, author, pages, status)
    displayBook(myLibrary[myLibrary.length-1]);
    closeModal();
    this.reset();
  }
)



myLibrary.forEach(displayBook);
