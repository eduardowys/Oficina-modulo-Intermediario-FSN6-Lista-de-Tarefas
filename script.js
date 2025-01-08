// Array para armazenar tarefas
let tasks = [];

// Referências aos elementos do DOM
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");

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
  renderTasks();
  taskInput.value = "";
}

// Marcar uma tarefa como concluída
function completeTask(id) {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  renderTasks();
}

// Excluir uma tarefa
function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  renderTasks();
}

// Renderizar as tarefas na tela
function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const taskItem = document.createElement("li");
    taskItem.className = `task-item ${task.completed ? "completed" : ""}`;
    taskItem.innerHTML = `
      <span>${task.text}</span>
      <div>
        <button class="complete-btn" onclick="completeTask(${task.id})">
          ${task.completed ? "Desmarcar" : "Concluir"}
        </button>
        <button class="delete-btn" onclick="deleteTask(${task.id})">Excluir</button>
      </div>
    `;
    taskList.appendChild(taskItem);
  });
}

// Eventos
addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});
