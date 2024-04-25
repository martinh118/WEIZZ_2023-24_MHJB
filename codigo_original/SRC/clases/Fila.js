import { crearElemento } from '../librerias/APIElementosHTML.js';


export class Fila{
    #id;
    #htmlBase;
    #filasContenedor ;

    constructor(_id, _filasContenedor){
        this.#id = _id;
        this.#filasContenedor = _filasContenedor;
        this.#htmlBase = this.#crearHtmlBase();
    }

    #crearHtmlBase(){
        let elementoDiv = crearElemento("div", "", "id", this.#id);
        
        elementoDiv.setAttribute("class", "row mt-4");
        
        for (const FilaContenedor of this.#filasContenedor) {
            elementoDiv.appendChild(FilaContenedor.getRow());
        }

        return elementoDiv;
    }

    toJSON(){
        return {
            idFila: this.#id,
            htmlBase: this.#htmlBase.innerHTML,
            filasContenedor: this.#filasContenedor
        }
    }

    fromJSON(json){
        let elementoDiv = crearElemento("div", "", "id", this.#id);
        elementoDiv.setAttribute("class", "row mt-4");
        let fila = new Fila(json.idFila, json.filasContenedor);
        elementoDiv.innerHTML = json.htmlBase;
        fila.#htmlBase = elementoDiv;
        return fila;
    }

    getHtmlBase(){
        return this.#htmlBase;
    }

    getFilasContenedor(){
        this.#filasContenedor;
    }

    setHtmlBase(html){
        this.#htmlBase = html;
    }

    setFilasContenedor(filas){
        this.#filasContenedor = filas;
        this.#crearHtmlBase();
    }

}