import { crearElemento, añadirHijos, modificarAtributoElemento } from '../librerias/APIElementosHTML.js';


export class BotonesContainer {
    #id;
    #botonCrear;
    #subirElemento;
    #bajarElemento;
    #borrarElemento;
    #divGrupoBotones;

    constructor(id) {
        this.#id = id;
        this.#botonCrear = this.#crearBotonCrear();
        this.#subirElemento = this.#crearSubirElemento();
        this.#bajarElemento = this.#crearBajarElemento();
        this.#borrarElemento = this.#crearBorrarElemento();
        this.#divGrupoBotones = this.#crearBotones();
    }
    
    #crearBotones() {
        //ELEMENTOS HTML
        let grupoBotones = crearElemento("div", "", "id", this.#id);
        let botonCrear = this.#botonCrear;
        let subirElemento = this.#subirElemento;
        let bajarElemento = this.#bajarElemento;
        let borrarElemento = this.#borrarElemento;

        //ATRIBUTOS 
        let atributosGrupoPadre = { "class": "list-group h-auto list-group-horizontal p-2", "style": 'height: 30%;top: -48px;position: absolute;' };
        // let atributosBotonesHijos = { "class": "list-group-item-action list-group-item border border-2 border-dark" };
        let arrElementos = [subirElemento, bajarElemento, borrarElemento];

        //APLICAR ATRIBUTOS E HIJOS
        modificarAtributoElemento(grupoBotones, atributosGrupoPadre);

        subirElemento.setAttribute("class", "list-group-item-action list-group-item border border-2 border-dark botonSubir");
        bajarElemento.setAttribute("class", "list-group-item-action list-group-item border border-2 border-dark botonBajar");
        borrarElemento.setAttribute("class", "list-group-item-action list-group-item border border-2 border-dark botonBorrar");

        grupoBotones.appendChild(botonCrear);

        añadirHijos(grupoBotones, arrElementos);
        return grupoBotones;
    }

    #crearBotonCrear() {
        let divDropdown = crearElemento("div", "", "class", "dropdown botonCrear")
        let botonCrear = crearElemento("button", "+", "id", "crear-" + this.#id);
        let ulMenu = crearElemento("ul", "", "class", "dropdown-menu");

        for (let index = 1; index <= 4; index++) {
            let item = crearElemento("li", index, "value", index);
            item.setAttribute("class", "dropdown-item");
            item.setAttribute("id", this.#id + "-item-" + index);
            ulMenu.appendChild(item);
        }

        let attrsBotonCrear = {
            "title": "Crear una fila de containers superior.",
            "class": "btn dropdown-toggle border border-2 border-dark",
            "type": "button",
            "data-bs-toggle": "dropdown",
            "aria-expanded": "false",
            "style": "border-top-left-radius: 20px!important;background-color:white;height:47.92px"
        };

        modificarAtributoElemento(botonCrear, attrsBotonCrear);

        divDropdown.appendChild(botonCrear);
        divDropdown.appendChild(ulMenu);

        return divDropdown;
    }

    #crearSubirElemento() {
        let subirElemento = crearElemento("button", "↑", "id", "subir-" + this.#id);
        subirElemento.setAttribute("title", "Subir fila de containers.");
        return subirElemento;
    }

    #crearBajarElemento() {
        let bajarElemento = crearElemento("button", "↓", "id", "bajar-" + this.#id);
        bajarElemento.setAttribute("title", "Bajar fila de containers.");
        return bajarElemento;
    }

    #crearBorrarElemento() {
        let borrarElemento = crearElemento("button", "x", "id", "eliminar-" + this.#id);
        let attrBorrar = {
            "title": "Eliminar fila de containers.",
            "style": "border-top-right-radius: 20px!important;"
        }
        modificarAtributoElemento(borrarElemento, attrBorrar);
        return borrarElemento;
    }

    toJSON() {
        return {
            idBotonesCont: this.#id,
            botonCrear: this.#botonCrear.innerHTML,
            botonSubir: this.#subirElemento.outerHTML,
            botonBajar: this.#bajarElemento.outerHTML,
            botonBorrar: this.#borrarElemento.outerHTML,
            grupoBotones: this.#divGrupoBotones.innerHTML
        };
        
    }

    static fromJSON(json) {
       
        const botonesContainer = new BotonesContainer(json.idBotonesCont);

        botonesContainer.#botonCrear = crearBotonCrear();
        botonesContainer.#subirElemento = json.botonSubir;
        botonesContainer.#bajarElemento = json.botonBajar;
        botonesContainer.#borrarElemento = json.botonBorrar;
        botonesContainer.#divGrupoBotones = grupoBotones();
        
        return botonesContainer;

        function crearBotonCrear(){
            let divDropdown = crearElemento("div", "", "class", "dropdown botonCrear");
            divDropdown.innerHTML = json.botonCrear;
            return divDropdown;
        }

        function grupoBotones(){
            let grupoBotones = crearElemento("div", "", "id", json.idBotonesCont);
            grupoBotones.innerHTML = json.grupoBotones;
            return grupoBotones;
        }

    }

    getDivGrupoBotones() {
        return this.#divGrupoBotones;
    }

    getBotonCrear() {
        return this.#botonCrear;
    }

    getSubirElemento() {
        return this.#subirElemento;
    }

    getBajarElemento() {
        return this.#bajarElemento;
    }

    getBorrarElemento() {
        return this.#borrarElemento;
    }

    crearClickEvent(callback) {
        this.#botonCrear.addEventListener("click", callback);
    }

    subirClickEvent(callback) {
        this.#subirElemento.addEventListener("click", callback);
    }

    bajarClickEvent(callback) {
        this.#bajarElemento.addEventListener("click", callback);
    }

    borrarClickEvent(callback) {
        this.#borrarElemento.addEventListener("click", callback);
    }

    rewriteHTML(){
        this.#divGrupoBotones = this.#crearBotones();
    }

}