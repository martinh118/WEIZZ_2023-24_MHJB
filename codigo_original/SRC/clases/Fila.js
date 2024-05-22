import { crearElemento } from '../librerias/APIElementosHTML.js';


export class Fila{
    #id;
    #htmlBase;
    #filasContenedor;
    #colorFondo;
    

    constructor(_id, _filasContenedor){
        this.#id = _id;
        this.#filasContenedor = _filasContenedor;
        this.#htmlBase = this.#crearHtmlBase();
        this.#colorFondo = undefined;
        
    }

    #crearHtmlBase(){
        let elementoDiv = crearElemento("div", "", "id", this.#id);
        
        elementoDiv.setAttribute("class", "row mt-4 mx-auto");
        if(this.#colorFondo != undefined) elementoDiv.setAttribute("style", `background-color: ${this.#colorFondo}`);
        
        for (const FilaContenedor of this.#filasContenedor) {
            elementoDiv.appendChild(FilaContenedor.getRow());
        }

        return elementoDiv;
    }

    toJSON(){
        return {
            idFila: this.#id,
            htmlBase: this.#htmlBase.innerHTML,
            filasContenedor: this.#filasContenedor,
            colorFondo: this.#colorFondo
        }
    }

    static fromJSON(json){
        let elementoDiv = crearElemento("div", "", "id", json.idFila);
        elementoDiv.setAttribute("class", "row mt-4 mx-auto");
        let fila = new Fila(json.idFila, json.filasContenedor);
        elementoDiv.innerHTML = json.htmlBase;
        fila.#htmlBase = elementoDiv;
        fila.#colorFondo = json.colorFondo
        
        if(json.idFila.includes("Header") || json.idFila.includes("Footer")){
            let filaContenedorObject = fila.getFilasContenedor();
            filaContenedorObject[0].rewriteHTML()
            filaContenedorObject[0].containerSinOpciones()
        }
        fila.rewriteHTML();
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

    setColorFondo(color){
        this.#colorFondo = color;
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

    rewriteHTML(){
        this.#htmlBase = this.#crearHtmlBase();
    }

    obtenerConfigEstilo(titulo){
        let html = `
        <div id="contenidoRecuadroEstilo" style="padding: 5px 5px 5px 5px">
        <div hidden class='idElemento'>${this.#id}</div>
            <h5>${titulo}</h5>
            <label for="colorFondo"><b>Color borde:</b></label><br>`
            if(this.#colorFondo != undefined) html += `<input type="color" id="colorFondo" value='${this.#colorFondo}'>`
            else html += `<input type="color" id="colorFondo" value='#000000'>`
            html += `
            <br><br>
            <input type='button' value='Guardar' class="guardarEstiloFilaBackground">
            <input type='button' value='Reset' class="resetEstiloFilaBackground">
        </div>
        
        `
        return html;
    }
}