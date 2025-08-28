const dialog = document.querySelector(".books_input");
const showBtn = document.querySelector(".new-book");
const closeBtn = document.querySelector(".close-button");
const bookForm = document.querySelector("#book-form");

showBtn.addEventListener("click", () => {
    dialog.showModal();
});

closeBtn.addEventListener("click", () => {
    dialog.close();
});




const myLibrary = [

  {
  title: "UV - The Love Story",
  author: "Utkarsh Yadav",
  pages: "234",
  status: "Not Read",
  uniqueId: "uv22"
  }
  
];


function Book(title, author, pages, status, uniqueid) {
  // the constructor...
  this.title = title
  this.author = author
  this.pages = pages
  this.status = status
  this.uniqueId = uniqueid


}

function addBookToLibrary(title, author, pages, status) {
  // take params, create a book then store it in the array
  let bookObj = new Book(title, author, pages, status, crypto.randomUUID())
  myLibrary.push(bookObj)


// console.log(myLibrary[0].uniqueId);

}




// Function to Delete Books from Frontent and Backend Both

function deleteBooks(bookId) {
  // alert("mmmm")
  // console.log(bookId);
  
  let tempBook = document.querySelector(`[data-uid="${bookId}"]`)
  console.log(tempBook)
  // tempBook.remove()
  // alert("mmmm")

  myLibrary.forEach((tempBook, index) => {
    if(tempBook.uniqueId == bookId) {
      // alert("found")
      myLibrary.splice(index, 1)
      console.log(myLibrary)
    }
  })
displayBooks()
}



function changeStatus(bookId) {

// Book.prototype.changeStatus = function(bookId) {


  myLibrary.forEach((tempBook, index) => {
    if(tempBook.uniqueId == bookId) {
      // alert("found")
      if(myLibrary[index].status == "Not Read") {
        myLibrary[index].status = "Read"
      }
      else if(myLibrary[index].status == "Read") {
        myLibrary[index].status = "Not Read"
      }
      console.log(myLibrary)

    }
    })
  displayBooks()
}




function displayBooks() {
      //Loop to Display Books
      
      const container = document.querySelector(".books-container")
      
    
      container.innerHTML = ""
      
      myLibrary.forEach((bookForm, index) => {

    const book = document.createElement("div")
    book.classList.add("book")
    book.setAttribute("data-uid", `${myLibrary[index].uniqueId}`)
    book.innerHTML = `<h3>${myLibrary[index].title}</h3> <p>By ${myLibrary[index].author}</p> <p>Pages: ${myLibrary[index].pages}</p> <p>Status: ${myLibrary[index].status}</p> <div class="button-group">
            <button class="status" onclick="changeStatus('${myLibrary[index].uniqueId}')">Change Status</button>
            <button class="delete" onclick="deleteBooks('${myLibrary[index].uniqueId}')">Delete</button>
           
        </div>`
    container.appendChild(book)




      })

      
}

 


bookForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let titleOfBook = document.querySelector("#book-name");
    let authorOfBook = document.querySelector("#author-name");
    let numberOfPages = document.querySelector("#total-pages");

    let statusOfBook;

    if (document.querySelector("#status-1").checked == true) {
        statusOfBook = document.querySelector("#status-1");
    } else {
        statusOfBook = document.querySelector("#status-2");
    }

    // handle Form Closing and Reset**
    if (
        !(
            titleOfBook.value == "" &&
            authorOfBook.value == "" &&
            numberOfPages.value == "" &&
            statusOfBook.value !== ""
        )
    ) {



        addBookToLibrary(titleOfBook.value, authorOfBook.value, numberOfPages.value, statusOfBook.value)
        console.log(myLibrary)

       displayBooks()


        dialog.close();
        bookForm.reset();

    }

    const deleteButton = document.querySelector(".delete")

});

 displayBooks()
