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

    getId(){
        return this.#id;
    }

    getHtmlBase(){
        return this.#htmlBase;
    }

    getFilasContenedor(){
        return this.#filasContenedor;
    }

    getFilaContenedorUnico(idFila){
        for (const filaCont of this.#filasContenedor) {
            let row = filaCont.getId();
            if (row == idFila) {
                return filaCont;
            }
        }
    }

    setHtmlBase(html){
        this.#htmlBase = html;
    }

    setFilasContenedor(filas){
        this.#filasContenedor = filas;
    }

    moverFilasContenedor(FilaContenedorArriba,FilaContenedorAbajo){
        let indexFCArriba, indexFCAbajo;

        for (const filaCont of this.#filasContenedor) {
            let row = filaCont.getId();
            if (row == FilaContenedorArriba.id) {
                indexFCArriba = this.#filasContenedor.indexOf(filaCont);
            }
        }

        for (const filaCont of this.#filasContenedor) {
            let row = filaCont.getId();
            if (row == FilaContenedorAbajo.id) {
                indexFCAbajo = this.#filasContenedor.indexOf(filaCont);
            }
        }

        if (indexFCArriba >= 0 && indexFCAbajo >= 0) {
            let contArriba = this.#filasContenedor[indexFCArriba];
            this.#filasContenedor[indexFCArriba] = this.#filasContenedor[indexFCAbajo];
            this.#filasContenedor[indexFCAbajo] = contArriba;
        }
        

    }

    añadirFilaContenedor(newFilaContenedor, selectedFilaContenedor = undefined){
        if(selectedFilaContenedor != undefined){
            let idSelected = selectedFilaContenedor.id;
            for (const filaCont of this.#filasContenedor) {
                let row = filaCont.getId();
                if (row == idSelected) {
                    let indexCont = this.#filasContenedor.indexOf(filaCont);
                    this.#filasContenedor.splice(indexCont, 0, newFilaContenedor);
                    break;
                }
            }
        }else this.#filasContenedor.push(newFilaContenedor);
        

    }

    eliminarFilaContenedor(filaContenedor){
        for (const filaCont of this.#filasContenedor) {
            let row = filaCont.getId();
            if (row == filaContenedor.id) {
                let indexCont = this.#filasContenedor.indexOf(filaCont);
                this.#filasContenedor.splice(indexCont, 1);
                break;
            }
        }
    }

    rewriteHtml(){
        this.#htmlBase = this.#crearHtmlBase();
    }
}