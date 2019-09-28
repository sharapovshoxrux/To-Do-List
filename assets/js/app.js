// Variables
const todoList = document.getElementById('todoList');


// Event Listeners
eventListeners();

function eventListeners() {
    //Form Submission
    document.querySelector('#form').addEventListener('submit', newTask);

    // Remove task from the lst
    todoList.addEventListener('click', removeTask);

    // Document
    document.addEventListener('DOMContentLoaded', localStorageOnLoad);
}



// Functions

function newTask(e) {
    e.preventDefault();

    // Read the textarea value
    const task = document.getElementById('task').value;

    // Create the remove button
    const removeBtn = document.createElement('a');
    removeBtn.classList = 'remove-task';
    removeBtn.textContent = 'X';

    // Create an <li> element
    const li = document.createElement('li');
    li.textContent = task;

    // Add the remove button to each task
    li.appendChild(removeBtn);

    // Add to the list
    todoList.appendChild(li);

    // add to local storage
    addTaskLocalStorage(task);

    // print an alert
    alert("Task Added")

    this.reset();
}

// Remove tasks from the DOM
function removeTask(e) {
    if(e.target.classList.contains('remove-task')) {
        e.target.parentElement.remove();
    }
    
    // Remove from storage
    removeTaskLocalStorage(  e.target.parentElement.textContent  );
}

// Add the tasks into the local sotrage
function addTaskLocalStorage(task) {
    let tasks = getTasksFromStorage();
    
    // Add the task into the array
    tasks.push(task);

    // Convert task array into string
    localStorage.setItem('tasks', JSON.stringify( tasks ) );
}

function getTasksFromStorage() {
    let tasks;
    const tasksLS = localStorage.getItem('tasks');
    // get the values, if ull is returned then we create an empty array
    if(tasksLS === null) {
        tasks = [];
    }else {
        tasks = JSON.parse( tasksLS );
    }
    return tasks;
}

// Prints local Storage Tasks on Load
function localStorageOnLoad() {
    let tasks = getTasksFromStorage();

    // Loop throught storage and bring the values
    tasks.forEach(function(task) {
        // Create the remove button
        const removeBtn = document.createElement('a');
        removeBtn.classList = 'remove-task';
        removeBtn.textContent = 'X';

        // Create an <li> element
        const li = document.createElement('li');
        li.textContent = task;

        // Add the remove button to each task
        li.appendChild(removeBtn);

        // Add to the list
        todoList.appendChild(li);
    });
}

// Remove the task from local storage
function removeTaskLocalStorage(task) {
    // get tasks from storage
    let tasks = getTasksFromStorage();

    // remove 'x' from the tasks
    const taskDelete = task.substring( 0, task.length - 1);
    
    // Loop throught the tasks and remove the tasks that's equal
    tasks.forEach(function(tasksLS, index){
        if(taskDelete === tasksLS) {
            tasks.splice(index, 1);
        }
    });

    // Save the data
    localStorage.setItem('tasks', JSON.stringify(tasks) );
}