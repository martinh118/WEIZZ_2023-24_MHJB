import { Elemento } from "../Elemento.js";
import { crearElemento, añadirMismoAtributos } from "../../librerias/APIElementosHTML.js";

export class Tabla extends Elemento{

    constructor(_id, _contenido ){
        super(_id, _contenido);
        this.elemento = "table";
        this.elementoDOM = this.#crearElementoDOM();
        // super.aplicarHijo();
    }

    #crearElementoDOM(){
        let table = crearElemento("table", "", "id", this.id);
        let thead = crearElemento("thead", "", "style", "border: 1px solid;");
        let tbody = crearElemento("tbody", "", "style", "border: 1px solid;");

        let trHead = crearElemento("tr", "");
        let trBody = crearElemento("tr", "");

        table.setAttribute("style", "border: 1px solid; border-collapse: collapse;");

        for (let index = 0; index < 3; index++) {
            let th = crearElemento("th", "Columna-" + index, "style", "border: 1px solid;");
            th.setAttribute("class", "element");
            trHead.appendChild(th);
        }

        for (let index = 0; index < 3; index++) {
            let td = crearElemento("td", "Columna-" + index + ".Fila-1", "style", "border: 1px solid;");
            td.setAttribute("class", "element");
            trBody.appendChild(td);
        }

        thead.appendChild(trHead);
        tbody.appendChild(trBody);

        table.appendChild(thead);
        table.appendChild(tbody);

        añadirMismoAtributos("class", "element", [table, thead, tbody, trHead, trBody]);

        return table;
    }

    

    toJSON(){
        return super.toJSON();
    }

    static fromJSON(json){
        return super.fromJSON(json);
    }
}