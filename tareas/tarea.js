let tareas = [];
let editarTarea =  null;

const agregarTarea = document.getElementById('agregarTarea');
const prioridadTarea = document.getElementById('prioridad') ;
const tareaListas = document.getElementById('tareaLista');
const tareaformularios = document.getElementById(`tareaFormulario`);


function renderTasks(){

    tareaListas.innerHTML= '';

    tareas.sort((  a, b) =>  a.prioridad - b.prioridad);

    tareas.forEach((tarea, index) =>{
        const li = document.createElement('li');
        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        li.innerHTML = `
            ${tarea.descripcion} (${getPriorityName(tarea.prioridad)})
            <div>
                <button class="btn btn-sm btn-success me-2" onclick="editTask(${index})">Editar</button>
                <button class="btn btn-sm btn-danger" onclick="deleteTask(${index})">Eliminar</button>
            </div>
        `;
        tareaListas.appendChild(li);
    });
}


function addTask(event){
    event.preventDefault();
    
    const tareaDescripcion = agregarTarea.value.trim();
    const tareaPrioridad = prioridadTarea.value;

    if(!tareaDescripcion){
        alert('Llene el campo de descripcion.');
        return;
    }

    if (tareaPrioridad === 'default'){
        alert('Seleccione su prioridad  para Continuar');
        return;
    }

    if(editarTarea !== null){
        tareas[editarTarea] = {descripcion: tareaDescripcion, prioridad: parseInt(tareaPrioridad)};
        editarTarea= null;
    } else{
        tareas.push({descripcion: tareaDescripcion, prioridad: parseInt(tareaPrioridad)});
    }

    agregarTarea.value = '';
    prioridadTarea.value = 'default';
    renderTasks();
}

function deleteTask(index){
    tareas.splice(index, 1);
    renderTasks();
}

function editarTask(index){
    const tarea = tareas[index];
    agregarTarea.value = tarea.descripcion;
    prioridadTarea.value = tarea.prioridad;
    editarTarea = index;
}

function getPriorityName(prioridad) {
    const priorityNames = {
        1: 'URGENTE',
        2: 'NO urgente',
        3: 'Aplazada'
    };
    return priorityNames[prioridad] || 'Desconocida';
}
 
 tareaformularios.addEventListener('submit', addTask);

 renderTasks();