
export class Elemento{
    #id;
    #contenido;
    #elemento;
    #elementoPadre;
    #estiloElemento;

    constructor(_id, _elementoPadre, _estilo){
        this.#id = _id;
        this.#elementoPadre = _elementoPadre;
        this.#estiloElemento = _estilo;
    }


    getId(){
        return this.#id;
    }

    getContenido(){
        return this.#contenido;
    }

    getElemento(){
        return this.#elemento;
    }

    getElementoPadre(){
        return this.#elementoPadre;
    }

    getEstiloElemento(){
        return this.#estiloElemento;
    }

    setId(newId){
        this.#id = newId;
    }

    setContenido(contenido){
        this.#contenido = contenido;
    }

    setElementoPadre(nuevoPadre){
        this.#elementoPadre = nuevoPadre;
    }

    setEstiloElemento(estilo){
        this.#estiloElemento = estilo;
    }


}