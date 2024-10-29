document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const todoList = document.getElementById('todo-list');

    let tasks = [] || JSON.parse(localStorage.getItem('tasks'));

    tasks.forEach(task => render(task));

    addTaskBtn.addEventListener("click", (e) => {
        const taskText = todoInput.value.trim();
        if (taskText === "") return;

        const newTaskObj = {
            id: Date.now(),
            text: taskText,
            completed: false
        };

        tasks.push(newTaskObj);
        saveTasks();
        render(newTaskObj);
        todoInput.value = "";
    });

    function render(task) {
        const li = document.createElement('li');
        li.classList.add("completed");
        li.setAttribute('data-id', task.id);

        li.innerHTML = `
            <span>${task.text}</span>
            <button data-id="${task.id}">delete</button>
        `;

        li.classList.toggle("completed", task.completed);

        li.addEventListener('click', (e) => {
            if (e.target.tagName === "BUTTON") return;
            task.completed = !task.completed;
            li.classList.toggle("completed");
            saveTasks();
        });

        li.querySelector("button").addEventListener("click", (e) => {
            e.stopPropagation();
            tasks = tasks.filter((t) => t.id !== task.id);
            li.remove();
            saveTasks();
        });

        todoList.appendChild(li);
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
