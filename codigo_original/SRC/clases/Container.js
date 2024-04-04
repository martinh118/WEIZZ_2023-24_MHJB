import {crearElemento, modificarAtributoElemento} from '../librerias/APIElementosHTML.js';
import {Elemento} from './Elemento.js';

export class Container extends Elemento{
    #container;
    #elementosHijo = [];

    constructor(id, elementoPadre, estilo) {
        super(id, elementoPadre, estilo);
        this.#container = this.#crearContainer();
    }

    #crearContainer() {
        let cont = crearElemento("div", "", "id", this.id);
        let imagen = crearElemento("img", "", "id", "apply-"+ this.id);

        let atributosContainer = {"class": "container containerHijo", "style": "border-style: dashed; border-color: grey;  margin: 10px; display:flex; align-items: center; justify-content: center;"}
        let atributosApplyImg = {"src": "../SRC/imagenes_web/crear_plus.png", "alt":"aplicarElemento", "style":"width: 50px;"};
        
        modificarAtributoElemento(cont, atributosContainer);
        modificarAtributoElemento(imagen, atributosApplyImg);

        cont.appendChild(imagen);

        return cont;
    }

    añadirElemento(elemento){
        this.#elementosHijo.push(elemento);
        this.#container.appendChild(elemento);
    }

    eliminarElemento(elemento){
        for (let index = 0; index < this.#elementosHijo.length; index++) {
            if(this.#elementosHijo[index] == elemento){
                this.#elementosHijo.splice(index, 1);
            }
            
        }
        this.#container.removeChild(elemento);
    }

    getContainer() {
        return this.#container;
    }

    getElementosHijo(){
        return this.#elementosHijo;
    }

    setContainer(container) {
        this.#container = container;
    }

    setElementosHijo(elementosHijo){
        this.#elementosHijo = elementosHijo;
    }
}