const taskForm = document.querySelector(".task__form");
const taskInput = document.querySelector(".task__input");
const todoList = document.querySelector(".todo__list");
const doneList = document.querySelector(".done__list");

const TODOS_KEY = "todos";
const DONE_KEY = "done";

let todoArr = [];
let doneArr = [];

function saveTodo(key, arrName) {
  localStorage.setItem(key, JSON.stringify(arrName));
}

function saveArr(target) {
  todoArr = todoArr.filter((item) => item.id !== parseInt(target.id));
  saveTodo(TODOS_KEY, todoArr);
  doneArr = doneArr.filter((item) => item.id !== parseInt(target.id));
  saveTodo(DONE_KEY, doneArr);
}

function targetInfo(arrName, target) {
  return arrName.filter((item) => item.id === parseInt(target.id))[0];
}

function targetIndex(arrName, obj) {
  return arrName.indexOf(obj);
}

function toggleTodo(e) {
  const targetBtn = e.target.parentElement;
  const toggleTarget = targetBtn.parentElement;
  toggleTarget.style.display = "none";
  if (e.target.classList.contains("fa-check")) {
    let toggleObj = targetInfo(todoArr, toggleTarget);
    let toggleIndex = targetIndex(todoArr, toggleObj);
    todoArr.splice(toggleIndex, 1);
    doneArr.push(toggleObj);
    paintTodo(toggleObj, doneList);
  }

  if (e.target.classList.contains("fa-minus")) {
    let toggleObj = targetInfo(doneArr, toggleTarget);
    let toggleIndex = targetIndex(doneArr, toggleObj);
    doneArr.splice(toggleIndex, 1);
    todoArr.push(toggleObj);
    paintTodo(toggleObj, todoList);
  }

  saveTodo(TODOS_KEY, todoArr);
  saveTodo(DONE_KEY, doneArr);
}

function deleteTodo(e) {
  const targetBtn = e.target.parentElement;
  const removeTarget = targetBtn.parentElement;
  removeTarget.remove();

  saveArr(removeTarget);
}

function paintTodo(obj, listName) {
  const li = document.createElement("li");
  li.setAttribute("class", "task");
  li.id = obj.id;

  const span = document.createElement("span");
  span.setAttribute("class", "task__text");
  span.innerText = `${obj.text}`;

  const toggleBtn = document.createElement("button");
  toggleBtn.setAttribute("class", "task__toggle");
  if (listName == todoList) {
    toggleBtn.innerHTML = `<i class="fas fa-check"></i>`;
  } else if (listName == doneList) {
    toggleBtn.innerHTML = `<i class="fas fa-minus"></i>`;
  }

  const deleteBtn = document.createElement("button");
  deleteBtn.setAttribute("class", "task__delete");
  deleteBtn.innerHTML = `<i class="far fa-trash-alt"></i>`;

  listName.appendChild(li);
  li.appendChild(span);
  li.appendChild(toggleBtn);
  li.appendChild(deleteBtn);

  toggleBtn.addEventListener("click", toggleTodo);
  deleteBtn.addEventListener("click", deleteTodo);
}

function handleSubmit(e) {
  e.preventDefault();
  const newTodo = taskInput.value;
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };

  todoArr.push(newTodoObj);

  saveTodo(TODOS_KEY, todoArr);
  paintTodo(newTodoObj, todoList);

  taskInput.value = "";
  taskInput.focus();
}

function loadList() {
  const existingTodo = localStorage.getItem(TODOS_KEY);
  const existingDone = localStorage.getItem(DONE_KEY);

  if (existingTodo) {
    const parsedTodo = JSON.parse(existingTodo);
    todoArr = parsedTodo;
    parsedTodo.forEach((obj) => paintTodo(obj, todoList));
  }

  if (existingDone) {
    const parsedDone = JSON.parse(existingDone);
    doneArr = parsedDone;
    parsedDone.forEach((obj) => paintTodo(obj, doneList));
  }

  taskForm.addEventListener("submit", handleSubmit);
}

function init() {
  loadList();
}

init();
