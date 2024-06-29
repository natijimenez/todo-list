const formulario = document.querySelector('#formulario')
const inputTarea = document.querySelector('#ingresarTareaInput')
const listaTareas = document.querySelector('#listaTareas')
const totalTareas = document.querySelector('#totalTareas')
const tareasRealizadas = document.querySelector('#tareasRealizadas')

let tareas = [
    { id: 1234, nombre: "desafío 1", estado: true },
    { id: 5678, nombre: "desafío 2", estado: true },
    { id: 9101, nombre: "desafío 3", estado: false }
]

//Renderizar
const renderizar = () => {
    let html = ""
    tareas.forEach((tarea) => {
        html += `
        <li id="${tarea.id}">
            <span class"idDinamico">${tarea.id}</span>
            <span class="${tarea.estado ? 'estado' : ''}">${tarea.nombre}</span>
            <a class="completar"><i class="fa-solid fa-check check"></i></a>
            <a class="eliminar"><i class="fa-solid fa-trash trash"></i></a>
        </li>
        <hr>`
    })
    //total tareas
    totalTareas.textContent = `Total: ${tareas.length}`
    //total tareas realizadas
    let tareasListas = tareas.filter(tarea => tarea.estado == true)
    tareasRealizadas.textContent = `Realizadas: ${tareasListas.length}`
    //imprimir en HTML
    listaTareas.innerHTML = html

    tareaTerminada()
    borrarTarea()
}

//completar tarea
const tareaTerminada = () => {
    const botones = document.querySelectorAll("#listaTareas .completar")

    botones.forEach((btn) => {
        btn.addEventListener('click', () => {
            const index = tareas.findIndex((elemento) => elemento.id == btn.parentNode.id)
            tareas[index].estado = !tareas[index].estado
            renderizar()
        })
    })
}

//eliminar tarea
const borrarTarea = () => {
    const botones = document.querySelectorAll("#listaTareas .eliminar")

    botones.forEach((btn) => {
        btn.addEventListener('click', () => {
            tareas = tareas.filter((elemento) => elemento.id != btn.parentNode.id)
            renderizar()
        })
    })
}

//prevenir la carga por defecto
formulario.addEventListener('submit', (e) => {
    e.preventDefault()
    let id = Date.now()
    let ultimosCuatro = id.toString().slice(-4)
    const nuevaTarea = {
        id: ultimosCuatro,
        nombre: inputTarea.value,
        estado: false
    }

    tareas.push(nuevaTarea)
    inputTarea.value = ""
    renderizar()
})

renderizar()


