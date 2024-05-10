import { Titulo } from '../../SRC/clases/Elementos/Titulo.js';
import { Texto } from '../../SRC/clases/Elementos/Texto.js';
import { Lista } from '../../SRC/clases/Elementos/Lista.js';
import { Imagen } from '../../SRC/clases/Elementos/Imagen.js';
import { Tabla } from '../../SRC/clases/Elementos/Tabla.js';
import { encontrarPadre } from '../../SRC/librerias/gestionElementos.js';
import { aplicarListenersFilaContainer } from './aplicar_event_listener.js';

export function aplicarEventosArrastrar(proyecto) {
    let containers = document.querySelectorAll(".containerHijo");
    containers.forEach((containerHijo) => {
        eventosContainerHijo(containerHijo, proyecto);
    });
}

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
            return new Titulo("Titulo", "TITULO MH", elementoPadre);
        case "Texto":
            return new Texto("Texto", "", elementoPadre);
        case "Imagen":
            return new Imagen("Imagen", "", elementoPadre);
        case "Lista":
            return new Lista("Lista", "", elementoPadre);
        case "Tabla":
            return new Tabla("Tabla", "", elementoPadre);
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
        cambiosHeaderFooter();
    } else if (filaRow.id.includes("Footer")) {
        claseFilaRow = proyecto.getFooter();
        cambiosHeaderFooter();
    } else {
        claseFilaRow = proyecto.getFilaRow(filaRow.id);
        cambiosBody();
    }

    function cambiosHeaderFooter(){
        DOMFilaContenedor = encontrarPadre(elementoPadre, "class", "FilaContenedor");
        claseFilaContenedor = claseFilaRow.getFilaContenedorUnico(DOMFilaContenedor.id)
        claseContainer = claseFilaContenedor.getContainerUnico(elementoPadre.id);
        claseContainer.setElementoHijo(elementoCreado);
        claseContainer.rewriteHTML();
        claseFilaContenedor.rewriteHTML();
        claseFilaContenedor.containerSinOpciones();
        claseFilaRow.rewriteHTML();
        proyecto.rewriteHTML();
        $("#proyecto").html(proyecto.getHtmlBase());
        aplicarListenersFilaContainer(claseFilaContenedor, proyecto);
    }

    function cambiosBody(){
        if (claseFilaRow != undefined) {
            DOMFilaContenedor = encontrarPadre(elementoPadre, "class", "FilaContenedor");
            claseFilaContenedor = claseFilaRow.getFilaContenedorUnico(DOMFilaContenedor.id)
            claseContainer = claseFilaContenedor.getContainerUnico(elementoPadre.id);
            claseContainer.setElementoHijo(elementoCreado);
            reescribirHTML(claseContainer, claseFilaContenedor, claseFilaRow, proyecto);
        }
    }

}

function reescribirHTML(claseContainer, claseFilaContenedor, claseFilaRow, proyecto) {
    claseContainer.rewriteHTML();
    claseFilaContenedor.rewriteHTML();
    claseFilaRow.rewriteHTML();
    proyecto.rewriteHTML();
    $("#proyecto").html(proyecto.getHtmlBase());
    aplicarListenersFilaContainer(claseFilaContenedor, proyecto);
}





