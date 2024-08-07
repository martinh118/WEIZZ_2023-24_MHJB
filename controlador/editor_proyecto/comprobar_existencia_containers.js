import { crearElemento, modificarAtributoElemento } from "../../SRC/librerias/APIElementosHTML.js";
import { proyecto } from "./editor_proyecto.js";
import { obtenerFilaRowId, obtenerFilaContenedorId, aplicarListenersFilaContainer } from "./aplicar_event_listener.js";
import { aplicarEventoMostrarEstilo } from "./config_mostrar_estilo.js";
import { eventosFilaCont } from "./arrastrar_elementos.js";
import { Fila } from "../../SRC/clases/Fila.js";
import { FilaContenedor } from "../../SRC/clases/FilaContenedor.js";

/**
 * Comprueba cada cambio realizado en el body del proyecto.
 * En caso de que este no contenga FilaContainers, muestra un botón de creación de FilaContainer.
 */
export function comprobarCambiosBody() {
    // Selecciona el elemento que quieres observar
    const targetNode = document.getElementById('proyecto');

    // Configura las opciones de observación
    const config = { attributes: true, childList: true, subtree: true };

    // Crea una instancia de MutationObserver
    const observer = new MutationObserver((mutationsList, observer) => {
        // Itera sobre cada mutación detectada
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                let html = targetNode.children[0];
                let body = html.children[1];
                if (body.children.length == 1) {
                    let crearProyecto = crearBotonCrear();
                    body.appendChild(crearProyecto);
                    eventListenerBoton(crearProyecto, proyecto)
                } else {
                    if (document.getElementById("crearPrimerContainer")) {
                        document.getElementById("crearPrimerContainer").remove;
                    }
                }
            } 
        }
    });

    // Inicia la observación del nodo objetivo con las opciones de configuración
    observer.observe(targetNode, config);


}

/**
 * Crea el botón de selección para crear una FilaContainer.
 * @returns {DOMElement} Elemento DOM del botón dropdown con las opciones de creación FilaContainer
 */
function crearBotonCrear() {
    let divDropdown = crearElemento("div", "", "class", "dropdown d-grid gap-2 ")
    let botonCrear = crearElemento("button", "+", "id", "crearPrimerContainer");
    let ulMenu = crearElemento("ul", "", "class", "dropdown-menu");

    for (let index = 1; index <= 4; index++) {
        let item = crearElemento("li", index, "value", index);
        item.setAttribute("class", "dropdown-item");
        ulMenu.appendChild(item);
    }

    let attrsBotonCrear = {
        "title": "Crear una fila de containers superior.",
        "class": "btn dropdown-toggle border border-2 border-dark rounded d-flex justify-content-center mb-5 col-6 mx-auto",
        "type": "button",
        "data-bs-toggle": "dropdown",
        "aria-expanded": "false",
        "style": "background-color:white;"
    };

    modificarAtributoElemento(botonCrear, attrsBotonCrear);

    divDropdown.appendChild(botonCrear);
    divDropdown.appendChild(ulMenu);

    return divDropdown;
}

/**
 * Aplica el event listener del botón que se le haya pasado como parametro para crear una FilaContianer.
 * @param {DOMElement} button Botón dropdown al que se le aplica el eventListener. 
 * @param {Proyecto} proyecto Proyecto sobre el que se trabaja. 
 */
function eventListenerBoton(button, proyecto) {
    button.addEventListener('click', function (event) {

        if (event.target.type != "button") {
            

            let newIdFila = obtenerFilaRowId();
            let newFilaRow = new Fila(newIdFila, []);
            let newFilaCont = new FilaContenedor(obtenerFilaContenedorId(), event.target.value);

            newFilaRow.setFilasContenedor([newFilaCont]);
            newFilaRow.rewriteHTML();

            aplicarListenersFilaContainer(newFilaCont, proyecto);

            proyecto.addFilaRowBody(newFilaRow);
            proyecto.rewriteHTML();
            $("#proyecto").html(proyecto.getHtmlBase());
            eventosFilaCont(newFilaCont.getRow(), proyecto)


        }
        aplicarEventoMostrarEstilo();


    });
}