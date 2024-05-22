
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
            while (!atributoPadre.includes(valorAtributoPadre) ) {
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