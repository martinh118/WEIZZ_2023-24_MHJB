import { Titulo } from '../../SRC/clases/Elementos/Titulo.js';
import { Texto } from '../../SRC/clases/Elementos/Texto.js';
import { Lista } from '../../SRC/clases/Elementos/Lista.js';
import { Imagen } from '../../SRC/clases/Elementos/Imagen.js';
import { Tabla } from '../../SRC/clases/Elementos/Tabla.js';
import { Fila } from '../../SRC/clases/Fila.js';
import { FilaContenedor } from '../../SRC/clases/FilaContenedor.js';
import { encontrarPadre } from '../../SRC/librerias/gestionElementos.js';
import { encontrarObjetoElemento } from '../../SRC/librerias/gestionElementos.js';
import { aplicarListenersFilaContainer } from './aplicar_event_listener.js';
import { aplicarEventoMostrarEstilo } from './config_mostrar_estilo.js';
import { aplicarEventoOnChange } from './config_cambiar_contenido.js';
import { reescribirHTML, reescribirHTMLHeaderFooter } from '../../SRC/librerias/gestionElementos.js';
import { obtenerFilaRowId, obtenerFilaContenedorId } from './aplicar_event_listener.js';


var elementData;
/**
 * Obtiene todos los elementos DOM de los containers y aplica los event listeners para la aplicación de elementos.
 * También aplica los event listeners de los elentos que contengan en su interior para cambiar dinamicamente su contenido de texto.
 * @param {Proyecto} proyecto : Proyecto sobre el que se trabaja. 
 */
export function aplicarEventosArrastrar(proyecto) {
    let containers = document.querySelectorAll(".containerHijo");
    let filasRow = document.querySelectorAll("[class*='FilaContenedor']");

    containers.forEach((containerHijo) => {
        eventosContainerHijo(containerHijo, proyecto);
        if (!containerHijo.children[0].id.includes("apply")) {
            let element = encontrarObjetoElemento(containerHijo.children[0]);
            aplicarEventoOnChange(element);
        }
    });

    filasRow.forEach((FR) => {
        eventosFilaCont(FR, proyecto);
    })

}

/**
 * Aplica al contenedor seleccionado los event listeners drop (para aplicar los nuevos elementos dentro de este),
 * dragover (para cambiar el estilo de este cuando el elemento que se quiera crear pase por encima),
 * drafleave (para dejar el estilo como estaba cuando el elemento que se quiera crear deje de estar encima de este).
 * @param {DOMElement} cont: Contenedor al que se le aplica los event Listeners.
 * @param {Proyecto} proyecto: Proyecto sobre el que se trabaja. 
 */
export function eventosContainerHijo(cont, proyecto) {

    cont.addEventListener("drop", function (event) {
        try {

            event.preventDefault();
            // var data = event.dataTransfer.getData("text");
            elementData = document.getElementById("tipoElemento").innerHTML;

            if (elementData != "Container") {
                let elementoPadre;

                if ($(event.target).hasClass('containerHijo')) {
                    event.target.setAttribute("style", "border-style: dashed; border-color: grey;  margin: 10px; display:flex; align-items: center; justify-content: center;")
                    if (event.target.firstChild != null) {
                        event.target.firstChild.remove();
                    }
                    elementoPadre = event.target;
                    
                } else {
                    elementoPadre = encontrarPadre(event.target, "class", "containerHijo");
                    elementoPadre.setAttribute("style", "border-style: dashed; border-color: grey;  margin: 10px; display:flex; align-items: center; justify-content: center;");
                    if (event.target.parentNode != null) {
                        if (event.target.parentNode.getAttribute("class").includes("containerHijo")) {
                            event.target.remove();
                        } else {
                            elementoPadre.firstChild.remove();
                        }
                    }
                }

                let elementoCreado = crearElemento(elementData, elementoPadre);
                añadirCambiosClase(elementoCreado, elementoPadre, proyecto);
                aplicarEventoMostrarEstilo();
                aplicarEventoOnChange(elementoCreado);
                let elementoPadreId = document.getElementById(elementoPadre.id);
                eventosFilaCont(encontrarPadre(elementoPadreId, "class", "FilaContenedor"), proyecto)

            }
        } catch (err) {
            console.error(err);
        }
    })

    cont.addEventListener("dragover", function (event) {

        event.preventDefault();
        elementData = document.getElementById("tipoElemento").innerHTML;

        if (elementData != "Container") {
            if ($(event.target).hasClass('containerHijo')) {
                event.target.setAttribute("style", "border-style: solid; border-width: 4px; border-color: grey;  margin: 10px; display:flex; align-items: center; justify-content: center;")
            } else {
                let elementoPadre = encontrarPadre(event.target, "class", "containerHijo");
                elementoPadre.setAttribute("style", "border-style: solid; border-width: 4px; border-color: grey;  margin: 10px; display:flex; align-items: center; justify-content: center;")
            }
        }
    })

    cont.addEventListener("dragleave", function (event) {
        elementData = document.getElementById("tipoElemento").innerHTML;
        if (elementData != "Container") {
            if ($(event.target).hasClass('containerHijo')) {
                event.target.setAttribute("style", "border-style: dashed; border-color: grey;  margin: 10px; display:flex; align-items: center; justify-content: center;")
            } else {
                let elementoPadre = encontrarPadre(event.target, "class", "containerHijo");
                elementoPadre.setAttribute("style", "border-style: dashed; border-color: grey;  margin: 10px; display:flex; align-items: center; justify-content: center;")
            }
        }

    })
}

/**
 * Crea una nueva subclase de la super clase Elemento dependiendo de nombre seleccionado en la variable data y lo devuelve.
 * @param {String} data: String que indica que elemento nuevo ha sido seleccionado para crear.
 * @param {DOMElement} elementoPadre: Elemento padre sobre el que se le aplica el nuevo elemento. Obtiene su identificador. 
 * @returns {Elemento} Elemento nuevo
 */
function crearElemento(data, elementoPadre) {

    switch (data) {
        case "Titulo":
            return new Titulo(elementoPadre.id + ".Titulo", "TITULO H1");
        case "Texto":
            return new Texto(elementoPadre.id + ".Texto", "");
        case "Imagen":
            return new Imagen(elementoPadre.id + ".Imagen", "");
        case "Lista":
            return new Lista(elementoPadre.id + ".Lista", "");
        case "Tabla":
            return new Tabla(elementoPadre.id + ".Tabla", "");
        default:
            return null;
    }
}

/**
 * Encuentra los objetos clase padre donde ha sido aplicado el nuevo elemento y 
 * llama a la funcion de cada uno para reescribir de nuevo su contenido HTML y 
 * mostrarlo correctamente a la pàgina y guardar los datos en el objeto proyecto.
 * También, vuelve a aplicar los eventListeners de cada FilaContenedor y Container. (Botones, drops, dragover...)
 * @param {Elemento} elementoCreado: Elemento nuevo aplicado al proyecto.
 * @param {DOMElement} elementoPadre : Container al que le es aplicado el nuevo Elemento.
 * @param {Proyecto} proyecto : Proyecto sobre el que se trabaja.
 */
export function añadirCambiosClase(elementoCreado, elementoPadre, proyecto) {
    let filaRow = encontrarPadre(elementoPadre, "id", "FilaRow");
    let claseFilaRow, DOMFilaContenedor, claseFilaContenedor, claseContainer;

    if (filaRow.id.includes("Header")) {
        claseFilaRow = proyecto.getHeader();
    } else if (filaRow.id.includes("Footer")) {
        claseFilaRow = proyecto.getFooter();
    } else {
        claseFilaRow = proyecto.getFilaRow(filaRow.id);
    }

    if (claseFilaRow != undefined) {
        DOMFilaContenedor = encontrarPadre(elementoPadre, "class", "FilaContenedor");
        claseFilaContenedor = claseFilaRow.getFilaContenedorUnico(DOMFilaContenedor.id)
        claseContainer = claseFilaContenedor.getContainerUnico(elementoPadre.id);
        claseContainer.setElementoHijo(elementoCreado);
        if (filaRow.id.includes("Header") || filaRow.id.includes("Footer")) {
            cambiosHeaderFooter();
        } else cambiosBody();
    }



    function cambiosHeaderFooter() {
        reescribirHTMLHeaderFooter(claseContainer, claseFilaContenedor, claseFilaRow, proyecto);
        aplicarListenersFilaContainer(claseFilaContenedor, proyecto);
    }

    function cambiosBody() {
        reescribirHTML(claseContainer, claseFilaContenedor, claseFilaRow, proyecto);
        aplicarListenersFilaContainer(claseFilaContenedor, proyecto);
    }

}


/**
 * Aplica los EventListeners al elemento DOM FilaContenedor para detectar cuando un elemento tipo Container es arrastrado
 * por los costados de estos, a la hora de soltar el FilaContenedor, se crea una FilaContenedor con dos Containers dentro.
 * @param {DOMElement} filaCont: Elemento DOM FilaContenedor al que se le aplican los event listeners.
 * @param {Proyecto} proyecto: Proyecto sobre el que se trabaja. 
 */
export function eventosFilaCont(filaCont, proyecto) {

    filaCont.addEventListener("drop", function (event) {
        event.preventDefault();

        elementData = document.getElementById("tipoElemento").innerHTML;
        if (elementData == "Container" && !(filaCont.id.includes("Header") || filaCont.id.includes("Footer")) ) {
            const rect = filaCont.getBoundingClientRect();
            const x = event.clientX - rect.left; // Coordenada X relativa al drop zone
            const width = rect.width;
            let selectedFilaRow = filaCont.parentNode;
            

            filaCont.classList.remove('border-start', 'border-end', 'border-5', 'border-secondary');


             if (x < width / 4) {
                let filaRow = proyecto.getFilaRow(selectedFilaRow.id);
                let newFilaCont = new FilaContenedor(obtenerFilaContenedorId(), 2);
                aplicarListenersFilaContainer(newFilaCont, proyecto);
                filaRow.añadirFilaContenedor(newFilaCont, filaCont);

                filaRow.rewriteHTML();
                
                proyecto.rewriteHTML();
                $("#proyecto").html(proyecto.getHtmlBase());
                eventosFilaCont(newFilaCont.getRow(), proyecto);

            } else if (x > 3 * width / 4) {
                let filaRow = proyecto.getFilaRow(selectedFilaRow.id);
                let newFilaCont = new FilaContenedor(obtenerFilaContenedorId(), 2);
                aplicarListenersFilaContainer(newFilaCont, proyecto);
                filaRow.añadirFilaContenedor(newFilaCont, filaCont, true);

                filaRow.rewriteHTML();
                
                proyecto.rewriteHTML();
                $("#proyecto").html(proyecto.getHtmlBase());
                eventosFilaCont(newFilaCont.getRow(), proyecto);
            }
            aplicarEventoMostrarEstilo();
        }
    })


    filaCont.addEventListener("dragover", function (event) {
        event.preventDefault();

        elementData = document.getElementById("tipoElemento").innerHTML;
        if (elementData == "Container" && !(filaCont.id.includes("Header") || filaCont.id.includes("Footer")) ) {
            const rect = filaCont.getBoundingClientRect();
            const x = event.clientX - rect.left; // Coordenada X relativa al drop zone
            const width = rect.width;
    
            // Limpia las clases de borde
            filaCont.classList.remove( 'border-start', 'border-end', 'border-5', 'border-secondary');
    
            // Determina el borde más cercano
            if (x < width / 4) {
                filaCont.classList.add('border-start', 'border-5', 'border-secondary');
            } else if (x > 3 * width / 4) {
                filaCont.classList.add('border-end', 'border-5', 'border-secondary');
            }

        }
    })

    filaCont.addEventListener("dragleave", function (event) {
        event.preventDefault();

        elementData = document.getElementById("tipoElemento").innerHTML;
        if (elementData == "Container"){
            filaCont.classList.remove( 'border-start', 'border-end', 'border-5', 'border-secondary');
        }
    })
}



