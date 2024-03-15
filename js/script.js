const textoCaixa = document.getElementById("texto");
const tarefasContainer = document.getElementById("tarefas");

function addTarefa() {
    if (textoCaixa.value === '') {
        alert("Escreva algo!");
    } else {
        const taskId = Date.now().toString();

        let li = document.createElement("li");
        li.setAttribute("data-task-id", taskId);

        let textSpan = document.createElement("span");
        textSpan.classList.add("edit");
        textSpan.setAttribute("data-task-id", taskId);
        textSpan.innerText = textoCaixa.value;

        let closeSpan = document.createElement("span");
        closeSpan.classList.add("close");
        closeSpan.setAttribute("data-task-id", taskId);
        closeSpan.innerText = "\u00d7";

        li.appendChild(textSpan);
        li.appendChild(closeSpan);

        tarefasContainer.appendChild(li);
    }
    textoCaixa.value = "";
    salvar();
}

textoCaixa.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        addTarefa();
    }
});

tarefasContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("edit")) {
        const taskId = e.target.getAttribute("data-task-id");
        const taskText = prompt("Editar tarefa:", e.target.innerText);
        if (taskText !== null) {
            e.target.innerText = taskText;
            salvar();
        }
    } else if (e.target.classList.contains("close")) {
        const taskId = e.target.getAttribute("data-task-id");
        const taskToRemove = document.querySelector(`li[data-task-id="${taskId}"]`);
        taskToRemove.remove();
        salvar();
    } else if (e.target.tagName === "SPAN" || e.target.tagName === "LI") {
        const taskId = e.target.getAttribute("data-task-id");
        const taskElement = document.querySelector(`li[data-task-id="${taskId}"]`);
        taskElement.classList.toggle("verificado");
        salvar();
    }
}, false);

function salvar() {
    localStorage.setItem("data", tarefasContainer.innerHTML);
}

function mostrarTarefas() {
    tarefasContainer.innerHTML = localStorage.getItem("data");
}

mostrarTarefas();
