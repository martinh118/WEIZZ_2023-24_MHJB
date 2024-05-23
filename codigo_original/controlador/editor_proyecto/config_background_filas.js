import { crearElemento } from "../../SRC/librerias/APIElementosHTML.js";
import { proyecto } from "./editor_proyecto.js";
import { abrirRecuadro } from "./config_mostrar_estilo.js";
import { aplicarEventoMostrarEstilo } from "./config_mostrar_estilo.js";

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
