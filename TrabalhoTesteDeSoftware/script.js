function addTask(event) {
    event.preventDefault();
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-description').value;
    const time = document.getElementById('task-time').value;

    if (title.trim() === '' || description.trim() === '' || time === '') {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    const task = {
        id: Date.now(),
        title: title,
        description: description,
        time: time,
        completed: false
    };

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
    document.getElementById('task-form').reset();
}

function renderTasks() {
    const taskList = document.getElementById('task-list');

    if (!taskList) {
        console.error("Elemento 'task-list' não encontrado.");
        return;
    }

    taskList.innerHTML = '';

    tasks.filter(task => !task.completed).forEach(task => {
        const li = document.createElement('li');
        li.id = `task-${task.id}`;
        li.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <p>Lembrete às ${task.time}</p>
            <div class="actions">
                <button onclick="editTask(${task.id})" class="edit-task">✏️</button>
                <button onclick="deleteTask(${task.id})" class="delete-task">❌</button>
                <button onclick="toggleTask(${task.id})" class="complete-task">${task.completed ? '❌' : '✅'}</button>
            </div>
        `;
        if (task.completed) {
            li.classList.add('completed');
        }
        taskList.appendChild(li);
    });
}

function editTask(id) {
    const task = tasks.find(task => task.id === id);
    const title = prompt('Novo título da tarefa:', task.title);
    const description = prompt('Nova descrição da tarefa:', task.description);

    if (title !== null && description !== null) {
        task.title = title;
        task.description = description;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }
}

function deleteTask(id) {
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
        tasks = tasks.filter(task => task.id !== id);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }
}

function toggleTask(id) {
    const task = tasks.find(task => task.id === id);
    task.completed = !task.completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    
    if (task.completed) {
        const taskElement = document.getElementById(`task-${id}`);
        taskElement.remove();
    }
}

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
renderTasks();
document.getElementById('task-form').addEventListener('submit', addTask);

function toggleAddTaskForm() {
    const taskForm = document.getElementById('task-form');
    if (taskForm.style.display === 'none') {
        taskForm.style.display = 'block';
    } else {
        taskForm.style.display = 'none';
    }
}
