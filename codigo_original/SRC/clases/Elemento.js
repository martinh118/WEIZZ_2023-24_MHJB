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
        let estilo = this.crearStringEstilo();
        element.setAttribute("style", estilo);
        element.setAttribute("class", "element")
        element.setAttribute("contenteditable", "");
        return element;
    }

    crearStringEstilo(){
        let html = "";
        
        for(let es in this.estiloElemento){
            html += `${es}: ${this.estiloElemento[es]};`;
        }

        return html;

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
        let elemento = new Elemento(json.id, json.contenido);
        const placeholder = document.createElement("div");
        placeholder.insertAdjacentHTML("afterbegin", json.elementoDOM);
        const node = placeholder.firstElementChild;
        elemento.elementoDOM = node;
        return elemento;
    }

}