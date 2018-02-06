function createNewTask(task) {   
    this.newTask = task   
}

function addNewEdit(newListEl, newElement){
    var newEdit = document.createElement('img')
    var apply = document.createElement('img')
    newEdit.setAttribute('src', 'images/edit.svg')
    newListEl.appendChild(newEdit)
    apply.setAttribute('src', 'images/correct.svg')
    apply.classList.add('apply')
    apply.classList.add('hidden')
    newListEl.appendChild(apply)
    newElement.app
    newEdit.addEventListener('click', function(e){
        e.stopPropagation()
        editTask(e, newElement)
    })
    apply.addEventListener('click', function(e){
        e.stopPropagation()
        applyChanges(e, newElement)
        setStorage()
    })
    
}

function addNewDelete(newListEl){
    var newDelete = document.createElement('img')
    newDelete.setAttribute('src', 'images/delete.svg')
    newListEl.appendChild(newDelete)
    newDelete.addEventListener('click', function(e){
        e.stopPropagation()
        e.target.parentElement.setAttribute('class', 'toDelete')
        var toDelete = document.querySelector('.toDelete')
        e.target.parentElement.parentElement.removeChild(toDelete)
        isEmpty()
        setStorage()
    })
    
}

function appendTask() {
    var ul = document.querySelector('ul')
    if (ul.textContent == 'List is empty...'){
        ul.textContent = ''
    }
    var newTaskName = document.querySelector(".newTaskName").value
    createTask(newTaskName)
    setStorage()
}

function main() {
    // checking if localstorage is empty, if not, create new tasks of storage objects // 
    if(localStorage.length>0){
        var temp
        for (var i = 0; i<localStorage.length; i++){
            temp = localStorage.getItem('name'+i)
            createTask(temp)
        }
    } else {
    // if localStogare is empty, initialize tasks of example terms //
    createTask('Write a letter.')
    createTask('Clean up apartment.')
    createTask('Take out garbage.')
    createTask('Wash the dishes.')
    }
    
    var clearStorage = document.querySelector('.clearButton')
    clearStorage.addEventListener('click', clearStorageFunc)
    var addTask = document.querySelector("button")
    var newTaskName = document.querySelector('.newTaskName')
    newTaskName.focus()
    addTask.addEventListener("click", appendTask)
}

function createTask (newTaskName) {
    var newElement = new createNewTask(newTaskName)
    // creating input el. to editing task //
    var newInput = document.createElement('input')
    // event listener to prevent correct task while clicking on input //
    newInput.addEventListener('click', function(e){
        e.stopPropagation()
    })
    newInput.setAttribute('type', 'text')
    newInput.setAttribute('placeholder', newElement.newTask);
    newInput.classList.add('newInput')
    newInput.classList.add('hidden')
    var taskList = document.querySelector('.taskContent')
    var newLi = document.createElement('li')
    var p = document.createElement('p')
    p.textContent = newElement.newTask
    newLi.appendChild(p)
    newLi.appendChild(newInput)
    addNewDelete(newLi)
    addNewEdit(newLi, newElement)
    taskList.appendChild(newLi)
    newLi.addEventListener('click', function(e){
        e.target.classList.toggle('correct')
    })
}

function editTask(e, newElement) {
    e.target.previousSibling.previousSibling.classList.remove('hidden')
    e.target.previousSibling.previousSibling.focus()
    e.target.parentElement.firstChild.classList.add('hidden')
    e.target.classList.toggle('hidden')
    e.target.nextSibling.classList.toggle('hidden')
}

function isEmpty (){
    var taskCounter = document.querySelectorAll('li')
    if (taskCounter.length === 0){
        console.log(taskCounter.length)
        taskCounter = document.querySelector('ul')
        taskCounter.textContent = "List is empty..."
    }
}

function applyChanges (e, newElement) {
    var thisEl = e.target
    newElement = thisEl.parentElement.firstChild.nextSibling.value
    thisEl.parentElement.firstChild.textContent = newElement
    thisEl.parentElement.firstChild.nextSibling.classList.toggle('hidden')
    thisEl.parentElement.firstChild.classList.toggle('hidden')
    thisEl.classList.toggle('hidden')
    thisEl.previousSibling.classList.toggle('hidden')
}

function setStorage () {
    var overwrite = document.querySelectorAll('p')
    for (var j = 0; j<overwrite.length; j++){
        localStorage.setItem('name' + j, overwrite[j].textContent)
    }
}

function clearStorageFunc () {
    localStorage.clear()
}

document.addEventListener("DOMContentLoaded", main());