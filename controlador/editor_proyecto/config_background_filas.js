import { crearElemento } from "../../SRC/librerias/APIElementosHTML.js";
import { proyecto } from "./editor_proyecto.js";
import { abrirRecuadro } from "./config_mostrar_estilo.js";
import { aplicarEventoMostrarEstilo } from "./config_mostrar_estilo.js";

/**
 * Aplica el eventListener al botón que se le ha pasado como parametro de entrada para
 * mostrar el contenido de configuración del estilo de la clase seleccionada.
 * Esta función está hecha para el background de Header, Body y Footer.
 * @param {DOMElement} boton DOM Element al que se le aplica el event listener. 
 */
export function mostrarConfigEstiloBackground(boton) {
    boton.addEventListener("click", function (event) { eventListener(event) })

    function eventListener(event) {
        let elemento;
        if ($(event.target).next().attr("id").includes("FilaRow")) {
            elemento = $(event.target).next()[0];
            let FilaRowObject;
            let divPrincipal = crearElemento("div", "");
            let title;
            if (elemento.id.includes("Header")) {
                FilaRowObject = proyecto.getHeader();
                title = "HEADER"
            } else if (elemento.id.includes("Footer")) {
                FilaRowObject = proyecto.getFooter();
                title = "FOOTER"
            } else {
                FilaRowObject = proyecto.getBody()[0];
                title = "BODY"
            }


            divPrincipal.innerHTML = FilaRowObject.obtenerConfigEstilo(title);
            abrirRecuadro(divPrincipal);
        }
    }
}


/**
 * Aplica un eventListener al elemento html que contenga la clase "guardarEstiloFilaBackground" para aplicar el color de fondo seleccionado.
 */
export function listenerGuardarEstiloFilaBackground() {
    $(".guardarEstiloFilaBackground").click(function () {
        let FilaRowObject, filaContenedorObject;
        let idElemento = $(".idElemento").html();
        let newColor = document.getElementById("colorFondo").value;

        if (idElemento.includes("Header")) {
            FilaRowObject = proyecto.getHeader();
            FilaRowObject.setColorFondo(newColor);
            filaContenedorObject = FilaRowObject.getFilasContenedor();
            filaContenedorObject[0].rewriteHTML()
            filaContenedorObject[0].containerSinOpciones()
            
            FilaRowObject.rewriteHTML()
        } else if (idElemento.includes("Footer")) {
            FilaRowObject = proyecto.getFooter();
            FilaRowObject.setColorFondo(newColor);
            
            filaContenedorObject = FilaRowObject.getFilasContenedor();
            filaContenedorObject[0].rewriteHTML()
            filaContenedorObject[0].containerSinOpciones()
            
            FilaRowObject.rewriteHTML()
        } else {
            FilaRowObject = proyecto.getBody();
            FilaRowObject.forEach(filaRow => {
                filaRow.setColorFondo(newColor);
                filaRow.rewriteHTML()
            });

        }

        proyecto.rewriteHTML();
        $("#proyecto").html(proyecto.getHtmlBase());
        aplicarEventoMostrarEstilo();
        // console.log(elementoObjecto);
    });
}

/**
 * Aplica un eventListener al elemento html que contenga la clase "resetEstiloFilaBackground" para reiniciar el color de fondo seleccionado.
 * Es decir, pone el color de fondo por defecto.
 */
export function listenerReiniciarEstiloFilaBackground() {
    $(".resetEstiloFilaBackground").click(function (){
        let FilaRowObject, filaContenedorObject;
        let idElemento = $(".idElemento").html();

        if (idElemento.includes("Header")) {
            FilaRowObject = proyecto.getHeader();
            FilaRowObject.reiniciarEstilo();
            filaContenedorObject = FilaRowObject.getFilasContenedor();
            filaContenedorObject[0].rewriteHTML()
            filaContenedorObject[0].containerSinOpciones()
            
            FilaRowObject.rewriteHTML()
        } else if (idElemento.includes("Footer")) {
            FilaRowObject = proyecto.getFooter();
            FilaRowObject.reiniciarEstilo();
            
            filaContenedorObject = FilaRowObject.getFilasContenedor();
            filaContenedorObject[0].rewriteHTML()
            filaContenedorObject[0].containerSinOpciones()
            
            FilaRowObject.rewriteHTML()
        } else {
            FilaRowObject = proyecto.getBody();
            FilaRowObject.forEach(filaRow => {
                filaRow.reiniciarEstilo();
                filaRow.rewriteHTML()
            });

        }

        proyecto.rewriteHTML();
        $("#proyecto").html(proyecto.getHtmlBase());
        aplicarEventoMostrarEstilo();
    })
}
