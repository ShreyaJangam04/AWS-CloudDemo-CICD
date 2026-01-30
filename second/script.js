const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const progressBar = document.getElementById("progressBar");
const completionRate = document.getElementById("completionRate");

let tasks = JSON.parse(localStorage.getItem("focus_tasks")) || [];

// Initial Load
document.getElementById("dateDisplay").textContent =
  new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
render();

// Handle "Enter" Key
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

function addTask() {
  const val = taskInput.value.trim();
  if (!val) return;

  tasks.push({ id: Date.now(), text: val, completed: false });
  taskInput.value = "";
  saveAndRender();
}

function toggleTask(id) {
  tasks = tasks.map((t) =>
    t.id === id ? { ...t, completed: !t.completed } : t
  );
  saveAndRender();
}

function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  saveAndRender();
}

function saveAndRender() {
  localStorage.setItem("focus_tasks", JSON.stringify(tasks));
  render();
}

function render() {
  taskList.innerHTML = "";

  tasks.forEach((t) => {
    const li = document.createElement("li");
    li.className = t.completed ? "completed" : "";
    li.innerHTML = `
            <div class="task-text" onclick="toggleTask(${t.id})">${t.text}</div>
            <span class="delete-btn" onclick="deleteTask(${t.id})">Delete</span>
        `;
    taskList.appendChild(li);
  });

  // Update Progress
  const done = tasks.filter((t) => t.completed).length;
  const total = tasks.length;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);

  progressBar.style.width = `${percent}%`;
  completionRate.textContent = `${percent}%`;
}
