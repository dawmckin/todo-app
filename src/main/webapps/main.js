const tasksTableBody = document.querySelector("#tasks-table-body");
const tasksSelect = document.querySelector("#tasks-select");
const addTaskForm = document.querySelector("#add-task-form");
const removeTaskModal = document.querySelector("#removeTaskModal");


function displayTasks(tasks) {
    tasksTableBody.innerHTML = "";
    tasks.forEach(task => {
        tasksTableBody.insertAdjacentHTML('beforeend', 
        `<tr id="task-id-${task.id}">
            <td>${task.taskName}</td>
            <td>${task.description ?? '...'}</td>
            <td>${new Date(task.dueDate).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</td>
            <td class="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash icon" viewBox="0 0 16 16" data-bs-toggle="modal" data-bs-target="#removeTaskModal" data-bs-task-id="${task.id}">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
            </td>
        </tr>`);
    });
}

function getTasks(criteria) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET",`http://localhost:8080/todo-app/tasks?criteria=${criteria}`);
    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4) {
            let taskJson = xhr.responseText;
            let tasksData = JSON.parse(taskJson);
            displayTasks(tasksData);

        }
    }
    xhr.send();
}

function addTask(e) {
    e.preventDefault();
    
    let taskName = document.querySelector("#task-name").value;
    let description = document.querySelector("#task-description").value;
    let dueDate = document.querySelector("#task-due-date").value;

    let task = {taskName, description, dueDate};
    console.log(task);

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/todo-app/tasks");
    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4) {
            if(xhr.status === 201) {
                console.log("added new task");
                addTaskForm.reset();
                getTasks(tasksSelect.value);
            } else {
                console.log("there was an issue creating task --- status code: "+xhr.status+" "+xhr.statusText);
            }
        }
    }

    let payload = JSON.stringify(task);
    xhr.send(payload);
}

function removeTask() {
    const taskId = removeTaskModal.getAttribute("data-bs-task-id");
    let xhr = new XMLHttpRequest();
    xhr.open("DELETE", "http://localhost:8080/todo-app/tasks");
    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4) {
            if(xhr.status === 201) {
                console.log("removed task");
            } else {
                console.log("there was an issue removing task --- status code: "+xhr.status+" "+xhr.statusText);
            }
        }
    }
    let payload = JSON.stringify({id: taskId});
    xhr.send(payload);
    
    console.log(taskId);
    const task = document.querySelector(`#task-id-${taskId}`);
    task.remove();
}

getTasks(tasksSelect.value);

tasksSelect.addEventListener("change", event => {
    getTasks(tasksSelect.value);
});

addTaskForm.addEventListener("submit", addTask);

removeTaskModal.addEventListener("show.bs.modal", event => {
    const targetId = event.relatedTarget.getAttribute("data-bs-task-id");
    removeTaskModal.setAttribute("data-bs-task-id", targetId);
});
