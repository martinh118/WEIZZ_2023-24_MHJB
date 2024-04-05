import { crearElemento, modificarAtributoElemento } from '../librerias/APIElementosHTML.js';
import { Elemento } from './Elemento.js';

export class Container {
    #id;
    #container;
    #elementosHijo = [];

    constructor(id) {
        this.#id = id;
        this.#container = this.#crearContainer();
    }

    #crearContainer() {
        let cont = crearElemento("div", "");
        let imagen = crearElemento("img", "");

        let atributosContainer = { "id": this.#id, "class": "container containerHijo", "style": "border-style: dashed; border-color: grey;  margin: 10px; display:flex; align-items: center; justify-content: center;" }
        let atributosApplyImg = { "id": "apply-" + this.#id, "src": "../SRC/imagenes_web/crear_plus.png", "alt": "aplicarElemento", "style": "width: 50px;","title": "Añadir elemento" };

        modificarAtributoElemento(cont, atributosContainer);
        modificarAtributoElemento(imagen, atributosApplyImg);

        cont.appendChild(imagen);

        return cont;
    }

    añadirElemento(elemento) {
        this.#elementosHijo.push(elemento);
        this.#container.appendChild(elemento);
    }

    eliminarElemento(elemento) {
        for (let index = 0; index < this.#elementosHijo.length; index++) {
            if (this.#elementosHijo[index] == elemento) {
                this.#elementosHijo.splice(index, 1);
            }

        }
        this.#container.removeChild(elemento);
    }

    getId(){
        return this.#id;
    }

    getContainer() {
        return this.#container;
    }

    getElementosHijo() {
        return this.#elementosHijo;
    }


    setId(id){
        this.#id = id;
    }

    setContainer(container) {
        this.#container = container;
    }

    setElementosHijo(elementosHijo) {
        this.#elementosHijo = elementosHijo;
    }
}