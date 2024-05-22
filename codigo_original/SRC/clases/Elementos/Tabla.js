import { Elemento } from "../Elemento.js";
import { crearElemento, añadirMismoAtributos } from "../../librerias/APIElementosHTML.js";

export class Tabla extends Elemento {
    #filas;
    #columnas;
    #grosor;
    #estiloBorde;
    #colorContorno;
    #colorHeader;
    #colorBody;
    #colorLetraHeader;
    #colorLetraBody;
    #estiloTable;
    #estiloHeader;
    #estiloBody;
    
    constructor(_id, _contenido) {
        super(_id, _contenido);
        this.elemento = "table";
        this.#filas = 3;
        this.#columnas = 3;
        this.#grosor = 1;
        this.#estiloBorde = "solid";
        this.#colorContorno = "#000000";
        this.#colorHeader = "#FFFFFF";
        this.#colorBody = "#FFFFFF";
        this.#colorLetraHeader = "#000000";
        this.#colorLetraBody = "#000000";
        this.#estiloTable = { 'border': '1px solid black', 'border-collapse': 'collapse' };
        this.#estiloHeader = { 'border': '1px solid black' };
        this.#estiloBody = { 'border': '1px solid black' };
        this.elementoDOM = this.#crearElementoDOM();
        // super.aplicarHijo();
    }

    #crearStringEstiloTabla(object) {
        let html = "";

        for (let es in object) {
            html += `${es}: ${object[es]};`;
        }

        return html;
    }

    #crearElementoDOM() {
        let table = crearElemento("table", "", "id", this.id);
        let thead = crearElemento("thead", "", "style", this.#crearStringEstiloTabla(this.#estiloHeader));
        let tbody = crearElemento("tbody", "", "style", this.#crearStringEstiloTabla(this.#estiloBody));

        let trHead = crearElemento("tr", "");
        

        table.setAttribute("style", this.#crearStringEstiloTabla(this.#estiloTable));
        table.setAttribute("class", "elementoPadre")

        for (let index = 0; index < this.#columnas; index++) {
            let th = crearElemento("th", "Columna-" + index, "style", `border: ${this.#grosor}px ${this.#estiloBorde} ${this.#colorContorno}; background: ${this.#colorHeader}; color: ${this.#colorLetraHeader}`);
            th.setAttribute("class", "element");
            th.setAttribute("contenteditable", "");
            trHead.appendChild(th);
        }

        for (let i = 0; i < this.#filas; i++) {
            
            let trBody = crearElemento("tr", "");
            trBody.setAttribute("class", "element")
            for (let f = 0; f < this.#columnas; f++) {
                let td = crearElemento("td", "Columna-" + f + ".Fila-" + i, "style", `border: ${this.#grosor}px ${this.#estiloBorde} ${this.#colorContorno}; background: ${this.#colorBody}; color: ${this.#colorLetraBody}`);
                td.setAttribute("class", "element");
                td.setAttribute("contenteditable", "");
                trBody.appendChild(td);
            }
            tbody.appendChild(trBody);
        }

        thead.appendChild(trHead);
        

        table.appendChild(thead);
        table.appendChild(tbody);

        añadirMismoAtributos("class", "element", [table, thead, tbody, trHead]);

        return table;
    }

    rewriteTabla(){
        this.elementoDOM = this.#crearElementoDOM();
    }

    toJSON() {
        let object = super.toJSON();
        object.filas = this.#filas
        object.columnas = this.#columnas
        object.grosor = this.#grosor
        object.estiloBorde = this.#estiloBorde
        object.colorContorno = this.#colorContorno
        object.colorHeader = this.#colorHeader
        object.colorBody = this.#colorBody
        object.colorLetraHeader = this.#colorLetraHeader
        object.colorLetraBody = this.#colorLetraBody
        object.estiloTable = this.#estiloTable
        object.estiloHeader = this.#estiloHeader
        object.estiloBody = this.#estiloBody
        return object
    }

    static fromJSON(json) {
        let tabla = new Tabla(json.id, json.contenido);
        tabla.setFilas(json.filas);
        tabla.setColumnas(json.columnas);
        tabla.setGrosor(json.grosor);
        tabla.setEstiloBorde(json.estiloBorde);
        tabla.setColorContorno(json.colorContorno);
        tabla.setColorHeader(json.colorHeader);
        tabla.setColorBody(json.colorBody);
        tabla.setColorLetraHeader(json.colorLetraHeader);
        tabla.setColorLetraBody(json.colorLetraBody);
        tabla.setEstiloTable(json.estiloTable)
        tabla.setEstiloHeader(json.estiloHeader)
        tabla.setEstiloBody(json.estiloBody)
        tabla.rewriteTabla();
        return tabla;
    }


    setFilas(filas) {
        this.#filas = filas;
    }

    setColumnas(columnas) {
        this.#columnas = columnas;
    }

    setGrosor(grosor) {
        this.#grosor = grosor;
    }

    setEstiloBorde(estiloBorde) {
        this.#estiloBorde = estiloBorde;
    }

    setColorContorno(colorContorno) {
        this.#colorContorno = colorContorno;
    }

    setColorHeader(colorHeader) {
        this.#colorHeader = colorHeader;
    }

    setColorBody(colorBody) {
        this.#colorBody = colorBody;
    }

    setColorLetraHeader(colorLetraHeader) {
        this.#colorLetraHeader = colorLetraHeader;
    }

    setColorLetraBody(colorLetraBody) {
        this.#colorLetraBody = colorLetraBody;
    }

    setEstiloTable(estiloTable) {
        this.#estiloTable = estiloTable;
    }

    setEstiloHeader(estiloHeader) {
        this.#estiloHeader = estiloHeader;
    }

    setEstiloBody(estiloBody) {
        this.#estiloBody = estiloBody;
    }

    reiniciarEstilo(){
        this.elemento = "table";
        this.#filas = 3;
        this.#columnas = 3;
        this.#grosor = 1;
        this.#estiloBorde = "solid";
        this.#colorContorno = "#000000";
        this.#colorHeader = "#FFFFFF";
        this.#colorBody = "#FFFFFF";
        this.#colorLetraHeader = "#000000";
        this.#colorLetraBody = "#000000";
        this.#estiloTable = { 'border': '1px solid black', 'border-collapse': 'collapse' };
        this.#estiloHeader = { 'border': '1px solid black' };
        this.#estiloBody = { 'border': '1px solid black' };
        this.elementoDOM = this.#crearElementoDOM();
    }

    obtenerConfigEstilo() {
        let html = `
        <div id="contenidoRecuadroEstilo" style='padding:5px 5px 5px 5px'>
            <div hidden class='idElemento'>${this.id}</div>
            <label for=""><b>Filas:</b> </label>
            <input type="number" id="numFilas" min='0' max='10' value='${this.#filas}'>
            <br>
            <label for=""><b>Columnas:</b> </label>
            <input type="number"  id="numColumnas" min='0' max='10' value='${this.#columnas}'>
            <br>
            <label for=""><b>Grosor Tabla:</b></label>
            <input type="number"  id="grosorTabla" min='0' max='10' value='${this.#grosor}'>
            <br><br>
            <label for="estiloBordeTabla"><b>Estilo borde:</b></label>
            <select name="" id="estiloBordeTabla">
                <option value="solid">Solid</option>
                <option value="none">Vacio</option>
                <option value="double">Doble</option>
                <option value="dotted">Puntuado</option>
                <option value="dashed">Discontinuo</option>
                <option value="inset">Hundido</option>
                <option value="outset">Expulsado</option>
            </select>
            <br><br>
            <label for=""><b>Color contorno</b></label>
            <input type='color'  id='colorContornoTabla' value='${this.#colorContorno}'>
            <br><br>
            <label for=""><b>Color Header</b></label>
            <input type='color' id='colorFondoHeader' value='${this.#colorHeader}'>
            <br>
            <label for=""><b>Color Body</b></label>
            <input type='color' id='colorFondoBody' value='${this.#colorBody}'>
            <br><br>
            <label for=""><b>Color letra Header</b></label>
            <input type='color' id='colorLetraHeader' value='${this.#colorLetraHeader}'> 
            <br>
            <label for=""><b>Color letra Body</b></label>
            <input type='color' id='colorLetraBody' value='${this.#colorLetraBody}'>
            <br><br>
            <input type='button' value='Guardar' class='guardarEstiloElemento'>
            
            <input type='button' value='Reset' class='resetEstiloElemento'>

        </div>
        `;

        return html;
    }

}