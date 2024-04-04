import { crearElemento, añadirHijos, modificarAtributoElemento } from '../librerias/APIElementosHTML.js';


export class BotonesContainer {
    #id;
    #divGrupoBotones;
    constructor(id) {
        this.#id = id;
        this.#divGrupoBotones = this.#crearBotones();
    }
    #crearBotones() {
        //ELEMENTOS HTML
        let grupoBotones = crearElemento("div", "", "id", this.#id);
        let botonCrear = crearElemento("button", "+", "id", "crear" + this.#id);
        let subirElemento = crearElemento("button", "↑", "id", "subir" + this.#id);
        let bajarElemento = crearElemento("button", "↓", "id", "bajar" + this.#id);
        let borrarElemento = crearElemento("button", "x", "id", "eliminar" + this.#id);

        //ATRIBUTOS 
        let atributosGrupoPadre = { "class": "list-group list-group-horizontal p-2", "style": 'height: 30%;top: -48px;position: absolute;' };
        let atributosBotonesHijos = { "class": "list-group-item-action list-group-item border border-2 border-dark" };
        let arrElementos = [botonCrear, subirElemento, bajarElemento, borrarElemento];

        //APLICAR ATRIBUTOS E HIJOS
        modificarAtributoElemento(grupoBotones, atributosGrupoPadre);

        for (let element of arrElementos) {
            modificarAtributoElemento(element, atributosBotonesHijos);
        }

        botonCrear.setAttribute("style","border-top-left-radius: 20px!important;" );
        borrarElemento.setAttribute("style","border-top-right-radius: 20px!important;" );

        añadirHijos(grupoBotones, arrElementos);

        return grupoBotones;
    }
    getDivGrupoBotones() {
        return this.#divGrupoBotones;
    }
}