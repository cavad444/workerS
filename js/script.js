import database from "./database.js";
import { showWorkers, createWorker,resetInputValues } from "./functions.js";

const workers = document.querySelector('.workers-section');
const searchInput = document.querySelector('.search-input');
const searchForm = document.querySelector('.search-form');
const selectFilter = document.querySelector('.select-filter');
const minMaxSalaryForm = document.querySelector('.min-max-salary');
const minSalary = document.querySelector('.min-salary');
const maxSalary = document.querySelector('.max-salary');
const addForm = document.querySelector('.add-form');
const addPosition = document.querySelector('.add-position');
const addNameInput = document.querySelector('.add-name-input');
const addSurnameInput = document.querySelector('.add-surname-input');
const addSalary = document.querySelector('.add-salary-input');
const deleteForm = document.querySelector('.delete-form');
const deleteNameInput = document.querySelector('.delete-name-input');
const deleteSurnameInput = document.querySelector('.delete-surname-input');
const formControls = document.querySelectorAll('.form-control');

let nameD = "";
let surnameD = "";
let parentD;


let deletedDatabase = database;


deleteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    deletedDatabase = deletedDatabase.filter(worker => worker.name !== deleteNameInput.value.trim() && worker.surname !== deleteSurnameInput.value.trim());
    workers.innerHTML = " ";
    showWorkers(deletedDatabase, workers);
    deleteForm.reset();
})
showWorkers(deletedDatabase, workers);
const deleteButtons = document.querySelectorAll('.delete-button');
deleteButtons.forEach(deleteButton => {
    deleteButton.addEventListener('click', (e) => {
        parentD = deleteButton.parentElement;
        nameD = parentD.firstElementChild.firstElementChild.innerText;
        surnameD = parentD.firstElementChild.lastElementChild.innerText;
        deletedDatabase = deletedDatabase.filter(worker => worker.name !== nameD && worker.surname !== surnameD);
        console.log(nameD + surnameD);
        workers.innerHTML = " ";
        showWorkers(deletedDatabase, workers);
    });
    
})


addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('salam');
    const workerObj =   { "name": addNameInput.value, "surname": addSurnameInput.value, "salary": addSalary.value, "position":addPosition.value}
    database.push(workerObj);
    workers.innerHTML = " ";
    showWorkers(database, workers)
    addForm.reset();
});


minMaxSalaryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    workers.innerHTML = " ";
    const minSalaryValue = minSalary.value.trim();
    const maxSalaryValue = maxSalary.value.trim();
    if(minSalaryValue.length === 0 && maxSalaryValue.length === 0){
    alert("Zehmet olmasa deyer daxil et");
    showWorkers(database, workers);
    }else{
    database.forEach(worker => {
    if(minSalaryValue.length === 0){
        if(worker.salary < maxSalaryValue){
           
        workers.appendChild(createWorker(worker));
        }
    }else if(maxSalaryValue.length === 0){
        if(worker.salary > minSalaryValue){
        workers.appendChild(createWorker(worker));
        }
    }else{
        if(worker.salary < maxSalaryValue && worker.salary > minSalaryValue){
            
        workers.appendChild(createWorker(worker));
        }
    }
})};
minMaxSalaryForm.reset();
});





selectFilter.addEventListener("change", () => {
    workers.innerHTML = ' ';
    database.forEach(worker => {
        if(worker.position.toLowerCase() == selectFilter.value.toLowerCase()){
        workers.appendChild(createWorker(worker));
    }else if(selectFilter.value == "None"){
        workers.innerHTML = " ";
        showWorkers(database, workers);
    }
});
});










searchForm.addEventListener("submit",(e) => {
    e.preventDefault();
    workers.innerHTML = " ";
    const searchValue = searchInput.value.toLowerCase();
    database.forEach(worker => {
        const workerDiv = document.createElement("div");
        workerDiv.classList.add("worker");
        if(worker.name.toLowerCase().includes(searchValue.toLowerCase()) || worker.surname.toLowerCase().includes(searchValue.toLowerCase())){
       
        workers.appendChild(createWorker(worker));
    }
});
searchForm.reset();
});

