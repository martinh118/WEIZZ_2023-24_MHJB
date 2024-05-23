import { Titulo } from '../../SRC/clases/Elementos/Titulo.js';
import { Texto } from '../../SRC/clases/Elementos/Texto.js';
import { Lista } from '../../SRC/clases/Elementos/Lista.js';
import { Imagen } from '../../SRC/clases/Elementos/Imagen.js';
import { Tabla } from '../../SRC/clases/Elementos/Tabla.js';
import { encontrarPadre } from '../../SRC/librerias/gestionElementos.js';
import { encontrarObjetoElemento } from './config_mostrar_estilo.js';
import { aplicarListenersFilaContainer } from './aplicar_event_listener.js';
import { aplicarEventoMostrarEstilo } from './config_mostrar_estilo.js';
import { aplicarEventoOnChange } from './config_cambiar_contenido.js';
import { reescribirHTML, reescribirHTMLHeaderFooter } from '../../SRC/librerias/gestionElementos.js';
/**
 * 
 * @param {Proyecto} proyecto 
 */
export function aplicarEventosArrastrar(proyecto) {
    let containers = document.querySelectorAll(".containerHijo");
    containers.forEach((containerHijo) => {
        eventosContainerHijo(containerHijo, proyecto);
        if(!containerHijo.children[0].id.includes("apply")){
            let element = encontrarObjetoElemento(containerHijo.children[0]);
            aplicarEventoOnChange(element);
        }
    });
}

/**
 * 
 * @param {*} cont 
 * @param {*} proyecto 
 */
export function eventosContainerHijo(cont, proyecto) {

    cont.addEventListener("drop", function (event) {
        try {

            event.preventDefault();
            var data = event.dataTransfer.getData("text");
            if (data != "Container") {

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

                let elementoCreado = crearElemento(data, elementoPadre);
                añadirCambiosClase(elementoCreado, elementoPadre, proyecto);
                aplicarEventoMostrarEstilo();
                aplicarEventoOnChange(elementoCreado);

            }
        } catch (err) {
            console.error(err);
        }
    })

    cont.addEventListener("dragover", function (event) {
        event.preventDefault();

        if ($(event.target).hasClass('containerHijo')) {
            event.target.setAttribute("style", "border-style: solid; border-width: 4px; border-color: grey;  margin: 10px; display:flex; align-items: center; justify-content: center;")
        } else {
            let elementoPadre = encontrarPadre(event.target, "class", "containerHijo");
            elementoPadre.setAttribute("style", "border-style: solid; border-width: 4px; border-color: grey;  margin: 10px; display:flex; align-items: center; justify-content: center;")
        }

    })

    cont.addEventListener("dragleave", function (event) {

        if ($(event.target).hasClass('containerHijo')) {
            event.target.setAttribute("style", "border-style: dashed; border-color: grey;  margin: 10px; display:flex; align-items: center; justify-content: center;")
        } else {
            let elementoPadre = encontrarPadre(event.target, "class", "containerHijo");
            elementoPadre.setAttribute("style", "border-style: dashed; border-color: grey;  margin: 10px; display:flex; align-items: center; justify-content: center;")
        }
    })
}

function crearElemento(data, elementoPadre) {

    switch (data) {
        case "Titulo":
            return new Titulo(elementoPadre.id + ".Titulo", "TITULO H1", elementoPadre);
        case "Texto":
            return new Texto(elementoPadre.id + ".Texto", "", elementoPadre);
        case "Imagen":
            return new Imagen(elementoPadre.id + ".Imagen", "", elementoPadre);
        case "Lista":
            return new Lista(elementoPadre.id + ".Lista", "", elementoPadre);
        case "Tabla":
            return new Tabla(elementoPadre.id + ".Tabla", "", elementoPadre);
        default:
            return null;
    }
}

function añadirCambiosClase(elementoCreado, elementoPadre, proyecto) {
    let filaRow = encontrarPadre(elementoPadre, "id", "FilaRow");
    let claseFilaRow, DOMFilaContenedor, claseFilaContenedor, claseContainer;

    // console.log(filaRow);
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
        if(filaRow.id.includes("Header") || filaRow.id.includes("Footer")){
            cambiosHeaderFooter();
        }else cambiosBody();
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






