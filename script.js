const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const searchInput = document.getElementById("searchInput");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(filteredTasks = tasks) {
    taskList.innerHTML = "";

    filteredTasks.forEach((task, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <span class="${task.completed ? "completed" : ""}">
                ${task.text}
            </span>

            <div class="actions">
                <button class="complete-btn" onclick="toggleTask(${index})">✓</button>
                <button class="delete-btn" onclick="deleteTask(${index})">✕</button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

function addTask() {
    const text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task");
        return;
    }

    tasks.push({
        text,
        completed: false
    });

    taskInput.value = "";
    saveTasks();
    renderTasks();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function searchTasks() {
    const keyword = searchInput.value.toLowerCase();

    const filtered = tasks.filter(task =>
        task.text.toLowerCase().includes(keyword)
    );

    renderTasks(filtered);
}

addBtn.addEventListener("click", addTask);
searchInput.addEventListener("input", searchTasks);

renderTasks();
