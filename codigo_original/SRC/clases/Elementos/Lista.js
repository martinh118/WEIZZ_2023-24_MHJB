import { Elemento } from "../Elemento.js";
import { crearElemento } from "../../librerias/APIElementosHTML.js";


export class Lista extends Elemento{

    constructor(_id, _contenido ){
        super(_id, _contenido);
        this.elemento = "ol";
        this.elementoDOM = this.#crearElementoDOM();
        // super.aplicarHijo();
    }

    #crearElementoDOM(){
        let ol = crearElemento("ul", "", "id", this.id);

        ol.setAttribute("class", "element");

        for (let index = 0; index < 5; index++) {
            let li = crearElemento("li", "Item-"+index);
            li.setAttribute("class", "element");
            li.setAttribute("contenteditable", "");
            ol.appendChild(li);
        }

        return ol;
    }

    

    toJSON(){
        return super.toJSON();
    }

    static fromJSON(json){
        return super.fromJSON(json);
    }

}