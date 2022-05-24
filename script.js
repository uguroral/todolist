// elementleri seçme

const todoArea = document.querySelector(".todoArea")
const todoList = document.getElementById("list"); // ul içindeki todo li ler
const input = document.getElementById("task"); // todo input alanı
const addBtn = document.getElementById("liveToastBtn"); // ekle butonu 
const removeTodo = document.querySelector("deleteIcon");
const errToast = document.querySelector('#errorToast');
const successToast = document.querySelector('#successToast');
const delToast = document.querySelector('#delToast');



addBtn.addEventListener("click", addTodo);
document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
todoArea.addEventListener("click", deleteTodo);
input.addEventListener("keyup", enterKey);



function loadAllTodosToUI() {
    let todos = getTodosFromStorage();

    todos.forEach(function (todo) {
        addTodoUI(todo);

    })

}

function addTodo(e) {
    const newTodo = input.value;

    if (newTodo === "") {
        $('#errorToast').toast('show');
        //   $('.toast').toast('show');
    }
    else {
        addTodoUI(newTodo);
        addTodoStorage(newTodo);

        $('#successToast').toast('show');
        e.preventDefault();
    }


}


// Arayüze Todo Ekleme 
function addTodoUI(newTodo) {
    const todoItem = document.createElement("li"); // li oluşturma

    const todoLink = document.createElement("a");
    todoLink.href = "#";
    todoLink.className = "deleteIcon";
    todoLink.innerHTML = "<i class='fas fa-trash-alt'></i>";

    todoItem.className = "list";
    todoItem.appendChild(document.createTextNode(newTodo));
    todoItem.appendChild(todoLink);

    // todoList.appendChild(todoItem);
    todoList.insertBefore(todoItem, todoList.childNodes[0])

    input.value = ""; // input içinin boşaltma 



}


// storageden todoları çekme
function getTodosFromStorage() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];

    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));

    }
    return todos;
}

//storage ekleme
function addTodoStorage(newTodo) {
    let todos = getTodosFromStorage();

    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}
// storageden silme

function deleteTodoFromStorage(delTodo) {
    let todos = getTodosFromStorage();
    todos.forEach(function (todo, index) {
        if (todo === delTodo) {
            todos.splice(index, 1);
        }
    })
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Delete Todo

function deleteTodo(e) {
    if (e.target.className === "fas fa-trash-alt") {
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        $('#delToast').toast('show');
    }
}

// Enter tusunu aktif etme 

function enterKey(e) {
    const newTodo = input.value;
    if ( newTodo === "" && e.keyCode === 13) {
        $('#errorToast').toast('show');
        //   $('.toast').toast('show');
    }
    else if (e.keyCode === 13){
            addTodoStorage(input.value);
            addTodoUI(e.target.value);
             $('#successToast').toast('show');
    
        e.preventDefault();
    }
   
}




