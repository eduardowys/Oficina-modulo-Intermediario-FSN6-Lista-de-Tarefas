// Array para armazenar tarefas
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Referências aos elementos do DOM
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");
const clearListBtn = document.getElementById("clear-list-btn");

// Função para salvar tarefas no localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Renderizar as tarefas na tela
function renderTasks() {
  taskList.innerHTML = ""; // Limpa a lista para renderizar novamente

  tasks.forEach((task) => {
    const taskItem = document.createElement("li");
    taskItem.className = `task-item ${task.completed ? "completed" : ""}`;
    taskItem.innerHTML = `
      <span>${task.text}</span>
      <div>
        <button class="edit-btn" onclick="editTask(${task.id})">Editar</button>
        <button class="complete-btn" onclick="completeTask(${task.id})">
          ${task.completed ? "Desmarcar" : "Concluir"}
        </button>
        <button class="delete-btn" onclick="deleteTask(${task.id})">Excluir</button>
      </div>
    `;
    taskList.appendChild(taskItem);
  });
}

// Adicionar uma tarefa
function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Por favor, insira uma tarefa.");
    return;
  }

  const task = {
    id: Date.now(),
    text: taskText,
    completed: false,
  };

  tasks.push(task);
  saveTasks();
  renderTasks();
  taskInput.value = ""; // Limpar o campo de input
}

// Marcar uma tarefa como concluída
function completeTask(id) {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  saveTasks();
  renderTasks();
}

// Editar uma tarefa
function editTask(id) {
  const task = tasks.find((task) => task.id === id);
  const newText = prompt("Edite a tarefa:", task.text);

  if (newText === null || newText.trim() === "") return;

  tasks = tasks.map((task) =>
    task.id === id ? { ...task, text: newText.trim() } : task
  );
  saveTasks();
  renderTasks();
}

// Excluir uma tarefa
function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  saveTasks();
  renderTasks();
}

// Excluir toda a lista
function clearList() {
  if (confirm("Tem certeza que deseja excluir toda a lista?")) {
    tasks = [];
    saveTasks();
    renderTasks();
  }
}

// Eventos
addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});
clearListBtn.addEventListener("click", clearList);

// Renderizar tarefas ao carregar a página
renderTasks();
