export function showWorkers(database, workers){
    database.forEach(worker => {
    workers.appendChild(createWorker(worker));
});
}

export function createWorker(worker){
    const workerDiv = document.createElement("div");
    workerDiv.classList.add("worker");
    workerDiv.innerHTML =  `
        
    <div class="name-surname">
        <span class="box-label name">${worker.name} </span>
        <span class="box-label surname">${worker.surname}</span>
    </div>
    <span class="box-label position">${worker.position}</span>
    <span class="box-label salary">Salary: ${worker.salary}$</span>
`;
 return workerDiv;
}

export function resetInputValues(formControls){
    formControls.forEach(formControl => {
        if(formControl.value !== "product owner" || formControl.value !== "tester" || formControl.value !== "developer" || formControl.value !== "engineer"){
        formControl.value = " ";
    }
    })
}