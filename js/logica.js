import { tareas } from "../data/tareas.js"

const tablaBody = document.getElementById("tablaBody")
const inputTarea = document.getElementById("inputTarea")
const agregarTarea = document.getElementById("agregarTarea")
const filtro = document.getElementById("filtro")

let tareasOriginales = [...tareas] 

function mostrarTareas(tareasAMostrar = tareasOriginales) {
    localStorage.setItem("tareas", JSON.stringify(tareasOriginales))
    tablaBody.innerHTML = ""
    tareasAMostrar.forEach((tarea) => {
        const tr = document.createElement("tr")
        tr.innerHTML = `
        <td>${tarea.tarea}</td>
        <td>${tarea.completada ? "Completada" : "Pendiente"}</td>
        <td>
            <button class="completar" data-index="${tareasOriginales.indexOf(tarea)}">Completar</button>
            <button class="eliminar" data-index="${tareasOriginales.indexOf(tarea)}">Eliminar</button>
        </td>
        `
        tablaBody.appendChild(tr)
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
    console.log(e.target.getAttribute("data-index"))
    if (e.target.classList.contains("completar")) {
        const index = parseInt(e.target.getAttribute("data-index"))
        tareasOriginales[index].completada = true
        mostrarTareas()
        console.log("Tarea completada:", tareasOriginales[index])
    }

    if (e.target.classList.contains("eliminar")) {
        const index = parseInt(e.target.getAttribute("data-index"))
        tareasOriginales.splice(index, 1)
        mostrarTareas()
        console.log("Tarea eliminada")
    }
})

agregarTarea.addEventListener("click", () => {
    console.log("click")

    const tarea = inputTarea.value
    if (tarea.trim() !== "") {
        console.log("Guardando tarea")
        tareasOriginales.push({ id: tareasOriginales.length + 1, tarea, completada: false })
        console.log(tareasOriginales)
        mostrarTareas()
        inputTarea.value = ""
    } else {
        alert("Por favor, ingrese una tarea")
    }
})

mostrarTareas()