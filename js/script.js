const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoDate = document.getElementById("todo-date");
const filterInput = document.getElementById("filter-input");
const todoList = document.getElementById("todo-list");
const sortSelect = document.getElementById("sort-select");
const themeBtn = document.getElementById("theme-btn");

let todos = [];

// ✅ Load data dari localStorage saat pertama kali halaman dibuka
document.addEventListener("DOMContentLoaded", () => {
  const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  todos = savedTodos;
  renderTodos(todos);
});

// 🔹 Simpan ke localStorage
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// 🔹 Tambah To-Do
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const newTodo = {
    text: todoInput.value,
    date: todoDate.value,
    id: Date.now(),
    done: false
  };

  todos.push(newTodo);
  saveTodos(); // simpan setelah tambah
  renderTodos(todos);

  // Reset form
  todoForm.reset();
});

// 🔹 Render To-Do List
function renderTodos(todoArray) {
  todoList.innerHTML = "";

  todoArray.forEach((todo) => {
    const li = document.createElement("li");
    li.className = "todo-item";

    li.innerHTML = `
      <div class="todo-text ${todo.done ? "done" : ""}">
        <span>${todo.text}</span>
        <span class="todo-date">${todo.date}</span>
      </div>
      <div class="actions">
        <button class="done-btn" data-id="${todo.id}">
          ${todo.done ? "Undo" : "Done"}
        </button>
        <button class="delete-btn" data-id="${todo.id}">Delete</button>
      </div>
    `;

    todoList.appendChild(li);
  });
}

// 🔹 Handle Delete & Done
todoList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const id = e.target.getAttribute("data-id");
    todos = todos.filter((todo) => todo.id != id);
    saveTodos(); // simpan setelah delete
    renderTodos(todos);
  }

  if (e.target.classList.contains("done-btn")) {
    const id = e.target.getAttribute("data-id");
    todos = todos.map((todo) =>
      todo.id == id ? { ...todo, done: !todo.done } : todo
    );
    saveTodos(); // simpan setelah update status
    renderTodos(todos);
  }
});

// 🔹 Filter To-Do
filterInput.addEventListener("input", (e) => {
  const keyword = e.target.value.toLowerCase();
  const filtered = todos.filter((todo) =>
    todo.text.toLowerCase().includes(keyword)
  );
  renderTodos(filtered);
});

// 🔹 Fungsi untuk sorting
function sortTodos(todos, criteria) {
  let sorted = [...todos]; // clone biar aman

  switch (criteria) {
    case "date-asc":
      sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
      break;
    case "date-desc":
      sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
      break;
    case "status":
      sorted.sort((a, b) => b.done - a.done); // yang done duluan
      break;
    default:
      // biarkan sesuai urutan input
      break;
  }
  return sorted;
}

// 🔹 Listener untuk sorting
sortSelect.addEventListener("change", () => {
  const criteria = sortSelect.value;
  const sorted = sortTodos(todos, criteria);
  renderTodos(sorted);
});

// 🔹 Load theme preference dari localStorage
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "light";
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeBtn.textContent = "🌞 Light Mode";
  }

  const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  todos = savedTodos;
  renderTodos(todos);
});

const themeCheckbox = document.getElementById("theme-checkbox");

// ✅ Load theme preference dari localStorage
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "light";
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeCheckbox.checked = true;
  }

  const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  todos = savedTodos;
  renderTodos(todos);
});

// 🔹 Toggle Dark/Light Mode
themeCheckbox.addEventListener("change", () => {
  if (themeCheckbox.checked) {
    document.body.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
});


