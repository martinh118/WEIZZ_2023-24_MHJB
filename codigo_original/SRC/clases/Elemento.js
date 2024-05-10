import { crearElemento } from "../librerias/APIElementosHTML.js";

export class Elemento {
    id;
    contenido;
    elementoDOM;
    estiloElemento;

    constructor(_id, _contenido) {
        this.id = _id;
        this.contenido = _contenido;
        this.estiloElemento = "";
    }

    // aplicarHijo(){
    //     this.elementoPadre.appendChild(this.elementoDOM);
    // }

    crearElemento() {
        let element = crearElemento(this.elemento, this.contenido, "id", this.id);
        element.setAttribute("style", this.estiloElemento);
        element.setAttribute("class", "element")
        return element;
    }

    rewriteHTML() {
        this.elementoDOM = this.crearElemento();
    }

    getId() {
        return this.id;
    }

    getContenido() {
        return this.contenido;
    }

    getElementoDom() {
        return this.elementoDOM;
    }

    getElementoPadre() {
        return this.elementoPadre;
    }

    getEstiloElemento() {
        return this.estiloElemento;
    }

    setId(newId) {
        this.id = newId;
    }

    setContenido(contenido) {
        this.contenido = contenido;
    }

    setElementoDom(elemento) {
        this.elementoDOM = elemento;
    }

    setElementoPadre(nuevoPadre) {
        this.elementoPadre = nuevoPadre;
        this.aplicarHijo();
    }

    setEstiloElemento(estilo) {
        this.estiloElemento = estilo;
    }

    toJSON() {
        return {
            id: this.id,
            contenido: this.contenido,
            elementoDOM: this.elementoDOM.outerHTML,
            estiloElemento: this.estiloElemento
        }
    }

    static fromJSON(json) {
        let elemento = new Elemento(json.id, json.contenido, json.elementoPadre, json.estiloElemento);
        const placeholder = document.createElement("div");
        placeholder.insertAdjacentHTML("afterbegin", json.elementoDOM);
        const node = placeholder.firstElementChild;
        elemento.elementoDOM = node;
        elemento.elementoPadre = json.elementoPadre;
        return elemento;
    }

}