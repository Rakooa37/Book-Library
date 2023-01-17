let myLibrary = [new Book("Pirates of the Caribbean", ": Rob Kidd", 3340), new Book("Harry Potter", " J. K. Rowling", 2550, false), new Book("The three musketeers", "Alexandre Dumas", 1939, false)];
let sessionStorageLibrary = JSON.parse(sessionStorage.getItem('library'));

let index = null;

function Book(name, author, noPages){
    this.name = name;
    this.author = author;
    this.noPages = noPages;
    this.read = false;
}


function updateGrid(library){
    const grid = document.querySelector(".cards-grid");
    grid.innerHTML = "";
    if(library !== null){
        let cards = library.map((book, index)=>`<div class="card" data-index=${index}>
                
        <div class="card-description">
            <span class="card-title">Title: ${book.name}<br> <br></span>
            <span class="card-author">Author: ${book.author} <br> <br></span>
            <span class="card-noPages">NoPages: ${book.noPages}<br></span>
        </div>
        
        
        <div class="card-buttons">
            <button class = "card-button edit" id="edit">Edit</button>
            <button class = "card-button delete" id="delete" data-index=${index}>Delete</button>
        </div>
    
    </div>`)
    
    cards.forEach((card)=>{
        const element = document.createElement('div');
        element.innerHTML = card;
        grid.appendChild(element.firstChild);
    }); 
    }
     

}



if(sessionStorageLibrary !== null && sessionStorageLibrary.length > 0){
    updateGrid(sessionStorageLibrary);
    myLibrary = sessionStorageLibrary;
}else{
    updateGrid(myLibrary);
}




function editButtonsListeners(){
    
    document.addEventListener('click',(e)=>{
        if(e.target && e.target.id == "edit"){
            const modal = document.querySelector(".modal-container-edit");
            modal.style.display = "flex"; 
            const parentCard = e.target.closest(".card");
            index = parentCard.dataset.index;
            let currentBook = myLibrary[index];
            document.querySelector('#title-edit').value = currentBook.name;
            document.querySelector('#author-edit').value = currentBook.author;
            document.querySelector('#noPages-edit').value = currentBook.noPages;
        }
    })


}

editButtonsListeners();



const addButton = document.querySelector("#addBook");
addButton.addEventListener('click', ()=>{
    const modal = document.querySelector(".modal-container");
    modal.style.display = "flex";
    const title = document.querySelector('#title').focus();
});

const saveButton = document.querySelector("#save");
saveButton.addEventListener('click', ()=>{

    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const noPages = document.querySelector('#noPages').value;
    const newBook = new Book(title, author, noPages);

    myLibrary.push(newBook);
    const modal = document.querySelector(".modal-container");
    modal.style.display = "none";
    updateGrid(myLibrary);
    sessionStorage.setItem("library", JSON.stringify(myLibrary));
});
    
    

function deleteButtonsListener(){

    const modalDelete = document.querySelector(".modal-container-delete");
    let deleteButton;
    document.addEventListener("click", (e)=>{
        if(e.target && e.target.id == "delete"){
            modalDelete.style.display = "flex";

            deleteButton = document.querySelector(`[data-index = '${e.target.dataset.index}']`);
            console.log(deleteButton);
            const parentCard = deleteButton.closest(".card");
            console.log(parentCard);
      
            const yesBtn = document.querySelector("#deleteYes");
            const noBtn = document.querySelector("#deleteNo");
        }

        if(e.target && e.target.id == "deleteNo"){
            modalDelete.style.display = "none";
        }

        if(e.target && e.target.id == "deleteYes"){
            const parentCard = deleteButton.closest(".card");
            index = parentCard.dataset.index;
            
            let currentBook = myLibrary[index];    
            myLibrary = myLibrary.filter((book)=>myLibrary.indexOf(book)!= index);
            modalDelete.style.display = "none";
            window.sessionStorage.setItem("library", JSON.stringify(myLibrary));
            updateGrid(myLibrary);
        }

    })
    
}

deleteButtonsListener();

function saveEdit(){
    const saveEditButtons = document.querySelector('#saveEdit');
    saveEditButtons.addEventListener('click', ()=>{
        const modal = document.querySelector(".modal-container-edit");
        myLibrary[index].name = document.querySelector('#title-edit').value;
        myLibrary[index].author = document.querySelector('#author-edit').value;
        myLibrary[index].noPages = document.querySelector('#noPages-edit').value;
        modal.style.display = "none";
        
        updateGrid(myLibrary);
        window.sessionStorage.setItem("library", JSON.stringify(myLibrary));
    
    });
}

saveEdit();

function closeButtons(){
    const closeButtons = document.querySelectorAll(".close");
    closeButtons.forEach(button=>{
        button.addEventListener('click', ()=>{
            const modal1 = document.querySelector(".modal-container");
            const modal2 = document.querySelector(".modal-container-edit");
            const modal3 = document.querySelector(".modal-container-delete");
            modal1.style.display = "none";
            modal2.style.display = "none";
            modal3.style.display = "none";
        })
    })
}

closeButtons();








