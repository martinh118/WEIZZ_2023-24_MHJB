

export function encontrarPadre(elementoSeleccionado, atributoKeyPadre, valorAtributoPadre) {
    let elementoPadre = elementoSeleccionado.parentNode;
    if( elementoPadre != null){
        let atributoPadre = elementoPadre.getAttribute(atributoKeyPadre);;
    
        if (atributoPadre != undefined) {
            while (!atributoPadre.includes(valorAtributoPadre)) {
                elementoPadre = elementoPadre.parentNode;
                atributoPadre = elementoPadre.getAttribute(atributoKeyPadre);
            }
        }
        return elementoPadre;
    }
    return elementoSeleccionado;
}
