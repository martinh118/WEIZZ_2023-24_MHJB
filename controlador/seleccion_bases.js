import { Proyecto } from "../SRC/clases/Proyecto.js";
import { Fila } from "../SRC/clases/Fila.js";
import { FilaContenedor } from "../SRC/clases/FilaContenedor.js";
import { transformarJson } from "./editor_proyecto/transformar_json.js";

let reader = new FileReader();

/**
 * Aplica el event listener a las bases disponibles para crear el nuevo proyecto.
 */
$(document).ready(function () {
    let base;
    $(".seleccionBase").click(
        function () {
            fetch("../controlador/config_proyecto/controlador_obtener_nuevo_id.php")
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Hubo un problema al obtener un nuevo ID.');
                    }
                    // Devuelve la respuesta como JSON
                    return response.json();
                }).then(data => {
                    let newId;
                    base = $(this).data('base');
                    if (data.ID == undefined) {
                        newId = 1;
                    } else newId = data.ID;
                    newId = parseInt(newId) + 1;
                    let project = crearProyecto(base, newId);
                    enviarDatos(project, newId, base);
                }).catch(error => {
                    console.error('Error:', error);
                });

        }
    )

    $("#importButton").on("change", function (event) {
        reader.onload = onReaderLoad;
        reader.readAsText(event.target.files[0]);
    })

    /**
     * Obtiene el identificador del nuevo proyecto y envia los datos para crear el nuevo proyecto.
     * @param {Object} event 
     */
    function onReaderLoad(event) {
        fetch("../controlador/config_proyecto/controlador_obtener_nuevo_id.php")
            .then(response => {
                if (!response.ok) {
                    throw new Error('Hubo un problema al obtener un nuevo ID.');
                }
                // Devuelve la respuesta como JSON
                return response.json();
            }).then(data => {
                let newId;
                if (data.ID == undefined) {
                    newId = 1;
                } else newId = data.ID;
                newId = parseInt(newId) + 1;
                var obj = JSON.parse(event.target.result);
                console.log(obj);
                let project = transformarJson(obj);
                enviarDatos(project, newId, base)
            }).catch(error => {
                console.error('Error:', error);
            });

    }


});

/**
 * Crea las bases del proyecto seleccionado.
 * @param {String} base Nombre de la base
 * @param {number} id identificador del nuevo proyecto
 * @returns {Proyecto} proyecto a editar.
 */
function crearProyecto(base, id) {
    let proyecto = new Proyecto(id);
    let fila1, fila2, fila3, fila4;
    let filaRow1, filaRow2;
    switch (base) {
        case "basico":

            fila1 = new FilaContenedor("FilaContenedor-1", 1);
            fila2 = new FilaContenedor("FilaContenedor-2", 2);
            fila3 = new FilaContenedor("FilaContenedor-3", 3);
            fila4 = new FilaContenedor("FilaContenedor-4", 4);
            filaRow1 = new Fila("FilaRow-1", [fila1]);
            filaRow2 = new Fila("FilaRow-2", [fila2]);
            let filaRow3 = new Fila("FilaRow-3", [fila3]);
            let filaRow4 = new Fila("FilaRow-4", [fila4]);
            proyecto.setBody([filaRow1, filaRow2, filaRow3, filaRow4]);
            break;

        case "multiple":
            fila1 = new FilaContenedor("FilaContenedor-1", 1);
            fila2 = new FilaContenedor("FilaContenedor-2", 2);
            fila3 = new FilaContenedor("FilaContenedor-3", 3);
            fila4 = new FilaContenedor("FilaContenedor-4", 4);
            filaRow1 = new Fila("FilaRow-1", [fila1, fila2]);
            filaRow2 = new Fila("FilaRow-2", [fila3, fila4]);
            proyecto.setBody([filaRow1, filaRow2]);
            break;
        case "galeria":

            break;

        case "modelo":

            break;
    }

    return proyecto;
}

/**
 * Envia los datos del nuevo proyecto para aplicarlos a la base de datos y que muestre el editor del proyecto.
 * @param {Proyecto} project proyecto sobre el que se trabaja.
 * @param {String} id identificador del proyeccto .
 * @param {String} base base sobre que se trabaja.
 */
function enviarDatos(project, id, base) {
    fetch("../controlador/config_proyecto/controlador_crear_proyecto.php", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "contenido": JSON.stringify(project), "idProject": id })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Hubo un problema al solicitar guardar el nuevo proyecto.');
            }
            // Devuelve la respuesta como JSON
            return response.json();
        })
        .then(data => {
            console.log(data.mensaje);
            if (data.mensaje == "anonimo") {
                if (base == undefined) {
                    enviarImportAnonimo(project)
                } else location.replace("./editor_proyecto.php?baseAnonimo=" + base);
            } else location.replace("./editor_proyecto.php?idProject=" + id);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

/**
 * Envia el proyecto del usuario anonimo al editor del proyecto.
 * @param {Proyecto} project 
 */
function enviarImportAnonimo(project) {
    let form = document.createElement("form");
    form.method = "POST";
    form.action = "./editor_proyecto.php";

    let input = document.createElement("input");
    input.type = "hidden";
    input.name = "contenido";
    input.value = JSON.stringify(project);
    form.appendChild(input);

    document.body.appendChild(form);
    form.submit();
}