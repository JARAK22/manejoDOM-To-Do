/*<tr>
    <td>Tarea 1</td>
    <td>
        <button>Completar</button>
        <button>Eliminar</button>
    </td>
</tr> */
import { tareas } from "../data/tareas.js"


const tablaBody = document.getElementById("tablaBody")
const inputTarea = document.getElementById("inputTarea")
const agregarTarea = document.getElementById("agregarTarea")


function mostrarTareas() {
    tareas.forEach(tarea => {
        const tr = document.createElement("tr")
        tr.innerHTML = `
        <td>${tarea.tarea}</td>
        <td>
            <button>Completar</button>
            <button>Eliminar</button>
        </td>
        `
        tablaBody.appendChild(tr)
    })
}

agregarTarea.addEventListener("click", () => {
    console.log("click")
    const tarea = inputTarea.value
    tareas.push({ id: tareas.length + 1, tarea, completada: false })
    console.log(tareas)
    mostrarTareas()
})
console.log(tareas)