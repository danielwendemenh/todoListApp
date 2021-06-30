// selctors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');
// evnet  LIstners
todoButton.addEventListener('click', addtodo);
todoList.addEventListener("click",delcheck);
filterOption.addEventListener('click',filtertodo);
document.addEventListener('DOMContentLoaded',getTodos);

// fonctions
function saveLocalTodos(todo){
//CHECK if i have todos 
let todos;
if(localStorage.getItem("todos") === null){
todos = [];
}else{
    todos = JSON.parse(localStorage.getItem("todos"));
}
todos.push(todo);
localStorage.setItem("todos",JSON.stringify(todos));
}


function getTodos(){
    let todos;
if(localStorage.getItem("todos") === null){
todos = [];
}else{
    todos = JSON.parse(localStorage.getItem("todos"));
}
todos.forEach(function(todo){
const todoDiv = document.createElement('div');
todoDiv.classList.add('todo')
const NewTodo = document.createElement('li');
NewTodo.innerText = todo;
NewTodo.classList.add('todo-item');
todoDiv.appendChild(NewTodo);
// save to storge

// check mark
const completeButton = document.createElement('button');
completeButton.innerHTML ='<i class="fas fa-check"></i>';
completeButton.classList.add('complete-btn');
todoDiv.appendChild(completeButton);
// check mark
const trashButton = document.createElement('button');
trashButton.innerHTML ='<i class="fas fa-trash"></i>';
trashButton.classList.add('trash-btn');
todoDiv.appendChild(trashButton);
// appened div to todolist 
todoList.appendChild(todoDiv);
})
}


function removeloacal(todo){
    let todos;
if(localStorage.getItem("todos") === null){
todos = [];
}else{
    todos = JSON.parse(localStorage.getItem("todos"));
}

const todoINdex = todo.children[0].innerText;
todos.splice(todos.indexOf(todoINdex),1);
localStorage.setItem('todos',JSON.stringify(todos));
}

function filtertodo(evnet){
const todos = todoList.childNodes;
todos.forEach(function(todo){
    switch(evnet.target.value){
        case "all":
            todo.style.display ='flex';
        break;
        case "completed":
            if(todo.classList.contains('completed')){
                todo.style.display ='flex';
            }else{
                todo.style.display ='none';
            }
            break;
        case "uncompleted":
            if(!todo.classList.contains('completed')){
                todo.style.display ='flex';
            }else{
                todo.style.display ='none';
            }
            break;

    }
})
}
function delcheck(e){
const item = e.target;
console.log(item)

if(item.classList[0] === 'trash-btn'){
    const todo = item.parentElement;
    todo.classList.add('fall');
    removeloacal(todo);
    todo.addEventListener('transitionend',()=>{
    todo.remove();
    })
    
}

if(item.classList[0]==="complete-btn"){
    const todo = item.parentElement;
    todo.classList.toggle('completed');
}

}
// CHECK MARK

function addtodo(evnet){
evnet.preventDefault();
if(todoInput.value == ''){
    window.alert('enter something')
}else{
//create div and Li
const todoDiv = document.createElement('div');
todoDiv.classList.add('todo')
const NewTodo = document.createElement('li');
NewTodo.innerText = todoInput.value;
NewTodo.classList.add('todo-item');
todoDiv.appendChild(NewTodo);
// save to storge
saveLocalTodos(todoInput.value);
// check mark
const completeButton = document.createElement('button');
completeButton.innerHTML ='<i class="fas fa-check"></i>';
completeButton.classList.add('complete-btn');
todoDiv.appendChild(completeButton);
// check mark
const trashButton = document.createElement('button');
trashButton.innerHTML ='<i class="fas fa-trash"></i>';
trashButton.classList.add('trash-btn');
todoDiv.appendChild(trashButton);
// appened div to todolist 
todoList.appendChild(todoDiv);
todoInput.value="";
}}
// localStorage.clear();