import { proyecto } from "../../controlador/editor_proyecto/editor_proyecto.js";

/**
 * Encuentra el objeto DOM padre que se desee a partir de una key y valor del atributo del padre que se desea buscar.
 * @param {DOMElement} elementoSeleccionado 
 * @param {string} atributoKeyPadre 
 * @param {string} valorAtributoPadre 
 * @returns DOMElement del padre que se desea buscar.
 */
export function encontrarPadre(elementoSeleccionado, atributoKeyPadre, valorAtributoPadre) {
    let elementoPadre = elementoSeleccionado.parentNode;
    if (elementoPadre != null) {
        let atributoPadre = elementoPadre.getAttribute(atributoKeyPadre);


        while (atributoPadre == null) {
            elementoPadre = elementoPadre.parentNode;
            atributoPadre = elementoPadre.getAttribute(atributoKeyPadre);
        }


        if (atributoPadre != undefined) {
            while (!atributoPadre.includes(valorAtributoPadre)) {
                elementoPadre = elementoPadre.parentNode;
                atributoPadre = elementoPadre.getAttribute(atributoKeyPadre);
                while (atributoPadre == null) {
                    elementoPadre = elementoPadre.parentNode;
                    atributoPadre = elementoPadre.getAttribute(atributoKeyPadre);
                }
            }
        }
        return elementoPadre;
    }
    return elementoSeleccionado;

}

export function encontrarObjetoElemento(elemento) {
    let filaRowDom = encontrarPadre(elemento, "id", "FilaRow");
    let filaContenedorDom = encontrarPadre(elemento, "class", "FilaContenedor")
    let contenedorHijoDom = encontrarPadre(elemento, "class", "containerHijo")
    let filaRowObject;
  
    if (filaRowDom.id.includes("Header")) {
      filaRowObject = proyecto.getHeader();
    } else if (filaRowDom.id.includes("Footer")) {
      filaRowObject = proyecto.getFooter();
    } else {
      filaRowObject = proyecto.getFilaRow(filaRowDom.id);
    }
  
    let filaContenedorObject = filaRowObject.getFilaContenedorUnico(filaContenedorDom.id);
    let contenedorHijoObject = filaContenedorObject.getContainerUnico(contenedorHijoDom.id);
  
    return contenedorHijoObject.getElementoHijo();
  }

export function encontrarObjectoContainer(elemento) {
    let filaRowDom = encontrarPadre(elemento, "id", "FilaRow");
    let filaContenedorDom = encontrarPadre(elemento, "class", "FilaContenedor")
    let contenedorHijoDom = encontrarPadre(elemento, "class", "containerHijo")
    let filaRowObject;

    if (filaRowDom.id.includes("Header")) {
        filaRowObject = proyecto.getHeader();
    } else if (filaRowDom.id.includes("Footer")) {
        filaRowObject = proyecto.getFooter();
    } else {
        filaRowObject = proyecto.getFilaRow(filaRowDom.id);
    }

    let filaContenedorObject = filaRowObject.getFilaContenedorUnico(filaContenedorDom.id);
    let contenedorHijoObject = filaContenedorObject.getContainerUnico(contenedorHijoDom.id);
    return contenedorHijoObject
}

/**
 * 
 * @param {*} claseContainer 
 * @param {*} claseFilaContenedor 
 * @param {*} claseFilaRow 
 * @param {*} proyecto 
 */
export function reescribirHTML(claseContainer, claseFilaContenedor, claseFilaRow, proyecto) {
    claseContainer.rewriteHTML();
    claseFilaContenedor.rewriteHTML();
    claseFilaRow.rewriteHTML();
    proyecto.rewriteHTML();
    $("#proyecto").html(proyecto.getHtmlBase());
}

export function reescribirHTMLHeaderFooter(claseContainer, claseFilaContenedor, claseFilaRow, proyecto) {
    claseContainer.rewriteHTML();
    claseFilaContenedor.rewriteHTML();
    claseFilaContenedor.containerSinOpciones();
    claseFilaRow.rewriteHTML();
    proyecto.rewriteHTML();
    $("#proyecto").html(proyecto.getHtmlBase());
}