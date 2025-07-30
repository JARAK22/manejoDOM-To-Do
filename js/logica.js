import { tareas } from "../data/tareas.js"

const tablaBody = document.getElementById("tablaBody")
const inputTarea = document.getElementById("inputTarea")
const agregarTarea = document.getElementById("agregarTarea")
const filtro = document.getElementById("filtro")

// Cargar tareas desde localStorage o usar las tareas por defecto
function cargarTareasDesdeLocalStorage() {
    const tareasGuardadas = localStorage.getItem("tareas")
    console.log(tareasGuardadas)
    if (tareasGuardadas) {
        console.log("entra")
        return JSON.parse(tareasGuardadas)
    }
    console.log("no entra")
    return [...tareas]
}

let tareasOriginales = cargarTareasDesdeLocalStorage() // se ejecuta solo una vez

function mostrarTareas(tareasAMostrar = tareasOriginales) {
    agregarTarea.disabled = true
    // Guardar en localStorage cada vez que se actualicen las tareas
    localStorage.setItem("tareas", JSON.stringify(tareasOriginales))
    tablaBody.innerHTML = ""
    tareasAMostrar.forEach((tarea, index) => {
        console.log(index)
        setTimeout(() => {
            const tr = document.createElement("tr")
            tr.innerHTML = `
            <td>${tarea.tarea}</td>
            <td>${tarea.completada ? "Completada" : "Pendiente"}</td>
            <td>
                <button class="completar" data-index="${index}">${tarea.completada ? "Deshacer" : "Completar"}</button>
                <button class="eliminar" data-index="${index}">Eliminar</button>
            </td>
                `
            tablaBody.appendChild(tr)
        }, 400 * index)
    })
}

filtro.addEventListener("change", () => {
    const valorFiltro = filtro.value
    console.log("Filtro seleccionado:", valorFiltro)

    if (valorFiltro === "pendientes") {
        const tareasPendientes = tareasOriginales.filter(tarea => !tarea.completada)
        mostrarTareas(tareasPendientes)
    } else if (valorFiltro === "completadas") {
        const tareasCompletadas = tareasOriginales.filter(tarea => tarea.completada)
        mostrarTareas(tareasCompletadas)
    } else if (valorFiltro === "todas") {
        mostrarTareas(tareasOriginales)
    }
})

tablaBody.addEventListener("click", (e) => {
    console.log(e.target)
    if (e.target.classList.contains("completar")) {
        const index = parseInt(e.target.getAttribute("data-index"))
        tareasOriginales[index].completada = tareasOriginales[index].completada ? false : true
        mostrarTareas()
    }

    if (e.target.classList.contains("eliminar")) {
        const index = parseInt(e.target.getAttribute("data-index"))
        console.log(index)
        tareasOriginales.splice(index, 1)
        mostrarTareas()
    }
})

agregarTarea.addEventListener("click", () => {
    console.log("click")

    const tarea = inputTarea.value
    console.log("Guardando tarea")
    tareasOriginales.push({ id: tareasOriginales.length + 1, tarea, completada: false })
    console.log(tareasOriginales)
    mostrarTareas()
    inputTarea.value = ""
})

inputTarea.addEventListener("keyup", (e) => {
    if (inputTarea.value.trim() !== "") {
        agregarTarea.disabled = false
    }
})

mostrarTareas()