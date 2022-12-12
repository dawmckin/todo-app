const tasksTableBody = document.querySelector("#tasks-table-body");
const tasksSelect = document.querySelector("#tasks-select");
const addTaskForm = document.querySelector("#add-task-form");
const editTaskForm = document.querySelector("#edit-task-form");
const removeTaskModal = document.querySelector("#removeTaskModal");
const completeTaskModal = document.querySelector("#completeTaskModal");
const editTaskModal = document.querySelector("#editTaskModal");
const alertPlaceholder = document.getElementById('alertPlaceholder');

const alert = (message, type) => {
    alertPlaceholder.innerHTML = "";
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" id="alert" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')

    alertPlaceholder.append(wrapper);
    setTimeout(() => {
        let alertElement = bootstrap.Alert.getOrCreateInstance(document.querySelector("#alert"));
        alertElement.close();
    }, 5000);
}

function displayTasks(tasks) {
    tasksTableBody.innerHTML = "";
    tasks.forEach(task => {
        if(task.isCompleted) {
            tasksTableBody.insertAdjacentHTML('beforeend', 
            `<tr id="task-id-${task.id}" class="container">
                <div class="row">
                    <td class="col-3 task-name">${task.taskName}</td>
                    <td class="col-4 task-description">${task.description ?? '...'}</td>
                    <td class="col-2 task-due-date">${task.dueDate.map(data => (data.toString().length < 2) ? `0${data}` : data.toString()).join("-")}</td>
                    <td class="col-1"></td>
                    <td class="text-center col-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil icon" viewBox="0 0 16 16"  data-bs-toggle="modal" data-bs-target="#editTaskModal" data-bs-task-id="${task.id}">
                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                        </svg>
                    </td>
                    <td class="text-center col-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash icon" viewBox="0 0 16 16" data-bs-toggle="modal" data-bs-target="#removeTaskModal" data-bs-task-id="${task.id}">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg>
                    </td>
                </div>
            </tr>`);
        } else {
            tasksTableBody.insertAdjacentHTML('beforeend', 
            `<tr id="task-id-${task.id}" class="container">
                <div class="row">
                    <td class="col-3 task-name">${task.taskName}</td>
                    <td class="col-4 task-description">${task.description ?? '...'}</td>
                    <td class="col-2 task-due-date">${task.dueDate.map(data => (data.toString().length < 2) ? `0${data}` : data.toString()).join("-")}</td>
                    <td class="text-center col-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-check-lg icon" viewBox="0 0 16 16" data-bs-toggle="modal" data-bs-target="#completeTaskModal" data-bs-task-id="${task.id}" title="Complete">
                            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                        </svg>
                    </td>
                    <td class="text-center col-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil icon" viewBox="0 0 16 16" data-bs-toggle="modal" data-bs-target="#editTaskModal" data-bs-task-id="${task.id}" title="Edit">
                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                        </svg>
                    </td>
                    <td class="text-center col-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash icon" viewBox="0 0 16 16" data-bs-toggle="modal" data-bs-target="#removeTaskModal" data-bs-task-id="${task.id}" title="Remove">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg>
                    </td>
                </div>
            </tr>`);
        }
        
    });
}

function backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
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
    
    let taskName = document.querySelector("#add-task-name").value;
    let description = document.querySelector("#add-task-description").value;
    let dueDate = document.querySelector("#add-task-due-date").value;

    let task = {taskName, description, dueDate};

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/todo-app/tasks");
    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4) {
            if(xhr.status === 201) {
                console.log("added new task");
                addTaskForm.reset();
                getTasks(tasksSelect.value);
                alert("Task added!", "success");
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

                const task = document.querySelector(`#task-id-${taskId}`);
                task.remove();

                const modal = bootstrap.Modal.getInstance(removeTaskModal)
                modal.hide();

                alert("Task removed!", "success");
            } else {
                console.log("there was an issue removing task --- status code: "+xhr.status+" "+xhr.statusText);
            }
        }
    }
    let payload = JSON.stringify({id: taskId});
    xhr.send(payload);
}

function completeTask() {
    const taskId = completeTaskModal.getAttribute("data-bs-task-id");
    let xhr = new XMLHttpRequest();
    xhr.open("PUT", `http://localhost:8080/todo-app/tasks?action=complete`);
    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4) {
            if(xhr.status === 201) {
                console.log("completed task");
                
                if(tasksSelect.value === "pending") {
                    const task = document.querySelector(`#task-id-${taskId}`);
                    task.remove();
                } else {
                    const completedIcon = document.querySelector(".completed");
                    completedIcon.remove();
                }

                const modal = bootstrap.Modal.getInstance(completeTaskModal)
                modal.hide();

                alert("Task completed!", "success");
            } else {
                console.log("there was an issue completing task --- status code: "+xhr.status+" "+xhr.statusText);
            }
        }
    }
    let payload = JSON.stringify({id: taskId});
    xhr.send(payload);
}

function editTask(e) {
    e.preventDefault();

    const taskId = editTaskModal.getAttribute("data-bs-task-id");
    let taskName = document.querySelector("#edit-task-name").value;
    let description = document.querySelector("#edit-task-description").value;
    let dueDate = document.querySelector("#edit-task-due-date").value;

    let editedTask = {id: taskId, taskName, description, dueDate};
    let xhr = new XMLHttpRequest();
    xhr.open("PUT", `http://localhost:8080/todo-app/tasks?action=edit`);
    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4) {
            if(xhr.status === 201) {
                console.log("edited task");

                document.querySelector(`#task-id-${taskId} .task-name`).textContent = taskName;
                document.querySelector(`#task-id-${taskId} .task-description`).textContent = description;
                document.querySelector(`#task-id-${taskId} .task-due-date`).textContent = dueDate;

                const modal = bootstrap.Modal.getInstance(editTaskModal)
                modal.hide();
                
                alert("Task edited successfully!", "success");
            } else {
                console.log("there was an issue editing task --- status code: "+xhr.status+" "+xhr.statusText);
            }
        }
    }
    let payload = JSON.stringify(editedTask);
    xhr.send(payload);
}

getTasks(tasksSelect.value);

tasksSelect.addEventListener("change", event => {
    getTasks(tasksSelect.value);
});

addTaskForm.addEventListener("submit", addTask);

editTaskForm.addEventListener("submit", editTask);

removeTaskModal.addEventListener("show.bs.modal", event => {
    const targetId = event.relatedTarget.getAttribute("data-bs-task-id");
    removeTaskModal.setAttribute("data-bs-task-id", targetId);
});

completeTaskModal.addEventListener("show.bs.modal", event => {
    event.relatedTarget.classList.add("completed");
    const targetId = event.relatedTarget.getAttribute("data-bs-task-id");
    completeTaskModal.setAttribute("data-bs-task-id", targetId);
});

editTaskModal.addEventListener("show.bs.modal", event => {
    const targetId = event.relatedTarget.getAttribute("data-bs-task-id");
    editTaskModal.setAttribute("data-bs-task-id", targetId);

    const taskName = document.querySelector(`#task-id-${targetId} .task-name`).textContent;
    const taskDescription = document.querySelector(`#task-id-${targetId} .task-description`).textContent;
    const taskDueDate = document.querySelector(`#task-id-${targetId} .task-due-date`).textContent;

    document.querySelector("#edit-task-name").value = taskName;
    document.querySelector("#edit-task-description").value = (taskDescription === "..." ? "" : taskDescription);
    document.querySelector("#edit-task-due-date").value = taskDueDate;
});