function createNewTask(task) {
    this.newTask = task
}

function addNewEdit(newListEl, newElement) {
    var newEdit = document.createElement('img')
    var apply = document.createElement('img')
    newEdit.setAttribute('src', 'images/edit.svg')
    newEdit.setAttribute('id', 'edit')
    newListEl.appendChild(newEdit)
    apply.setAttribute('src', 'images/correct.svg')
    apply.setAttribute('id', 'apply')
    apply.classList.add('hidden')
    newListEl.appendChild(apply)
    newElement.app
    newEdit.addEventListener('click', function (e) {
        e.stopPropagation()
        editTask(e, newElement)
    })
    apply.addEventListener('click', function (e) {
        e.stopPropagation()
        applyChanges(e, newElement)
        setStorage()
    })

}

function addNewDelete(newListEl) {
    var newDelete = document.createElement('img')
    newDelete.setAttribute('src', 'images/delete.svg')
    newListEl.appendChild(newDelete)
    newDelete.addEventListener('click', function (e) {
        e.stopPropagation()
        e.target.parentElement.setAttribute('id', 'toDelete')
        var toDelete = document.querySelector('#toDelete')
        e.target.parentElement.parentElement.removeChild(toDelete)
        isEmpty()
        setStorage()
    })

}

function appendTask() {
    var ul = document.querySelector('ul')
    if (ul.textContent == 'List is empty...') {
        ul.textContent = ''
    }
    var newTaskName = document.querySelector(".addTask input").value
    createTask(newTaskName)
    setStorage()
}

function main() {
    // checking if localstorage is empty, if not, create new tasks of storage objects // 
    if (localStorage.length > 0) {
        var temp
        for (var i = 0; i < localStorage.length; i++) {
            temp = localStorage.getItem('name' + i)
            createTask(temp)
        }
    } else {
        // if localStogare is empty, initialize tasks of example terms //
        createTask('Write a letter.')
        createTask('Clean up apartment.')
        createTask('Take out garbage.')
        createTask('Wash the dishes.')
    }

    var clearStorage = document.querySelector('#clearButton')
    clearStorage.addEventListener('click', clearStorageFunc)
    var addTask = document.querySelector("button")
    var newTaskName = document.querySelector('.addTask input')
    newTaskName.focus()
    addTask.addEventListener("click", appendTask)
}

function createTask(newTaskName) {
    var newElement = new createNewTask(newTaskName)
    // creating input el. to editing task //

    var taskList = document.querySelector('.taskContent')
    var newLi = document.createElement('li')
    var p = document.createElement('p')
    p.textContent = newElement.newTask
    newLi.appendChild(p)
    addNewDelete(newLi)
    addNewEdit(newLi, newElement)
    taskList.appendChild(newLi)
    newLi.addEventListener('click', function (e) {
        e.target.classList.toggle('correct')
    })
}

function editTask(e, newElement) {
    var newInput = document.createElement('input')
    newInput.setAttribute('type', 'text')
    newInput.setAttribute('placeholder', newElement.newTask)
    var thisLi = e.target.parentElement
    var thisP = thisLi.querySelector('p').classList.add('hidden')
    thisLi.insertBefore(newInput, thisP)
    newInput.focus()
    thisLi.querySelector('#apply').classList.remove('hidden')
    e.target.classList.add('hidden')
    newInput.addEventListener('click', function (event) {
        event.stopPropagation()
    })
}

function applyChanges(e, newElement) {
    var thisEl = e.target.parentElement
    var thisElInput = thisEl.querySelector('input')
    newElement = thisElInput.value
    thisEl.firstChild.textContent = newElement
    thisEl.removeChild(thisElInput)
    thisEl.firstChild.classList.remove('hidden')
    e.target.classList.toggle('hidden')
    thisEl.querySelector('#edit').classList.remove('hidden')
}

function isEmpty() {
    var taskCounter = document.querySelectorAll('li')
    if (taskCounter.length === 0) {
        console.log(taskCounter.length)
        taskCounter = document.querySelector('ul')
        taskCounter.textContent = "List is empty..."
    }
}

function setStorage() {
    var overwrite = document.querySelectorAll('p')
    for (var j = 0; j < overwrite.length; j++) {
        localStorage.setItem('name' + j, overwrite[j].textContent)
    }
}

function clearStorageFunc() {
    localStorage.clear()
}

document.addEventListener("DOMContentLoaded", main());
