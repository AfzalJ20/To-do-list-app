const taskInput = document.getElementById("taskInput");

const addBtn = document.getElementById("addBtn");

const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

displayTasks();

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function(e){

if(e.key==="Enter"){

addTask();

}

});

function addTask(){

const text = taskInput.value.trim();

if(text===""){

alert("Please enter a task.");

return;

}

tasks.push({

text:text,

completed:false

});

taskInput.value="";

saveTasks();

displayTasks();

}

function displayTasks(){

taskList.innerHTML="";

tasks.forEach((task,index)=>{

const li=document.createElement("li");

if(task.completed){

li.classList.add("completed");

}

const span=document.createElement("span");

span.innerText=task.text;

const buttons=document.createElement("div");

buttons.className="task-buttons";

const complete=document.createElement("button");

complete.innerHTML="✔";

complete.className="complete";

complete.onclick=function(){

tasks[index].completed=!tasks[index].completed;

saveTasks();

displayTasks();

};

const del=document.createElement("button");

del.innerHTML="🗑";

del.className="delete";

del.onclick=function(){

tasks.splice(index,1);

saveTasks();

displayTasks();

};

buttons.appendChild(complete);

buttons.appendChild(del);

li.appendChild(span);

li.appendChild(buttons);

taskList.appendChild(li);

});

updateStats();

}

function updateStats(){

document.getElementById("total").innerText=tasks.length;

const completed=tasks.filter(task=>task.completed).length;

document.getElementById("completed").innerText=completed;

document.getElementById("remaining").innerText=tasks.length-completed;

}

function saveTasks(){

localStorage.setItem("tasks",JSON.stringify(tasks));

}