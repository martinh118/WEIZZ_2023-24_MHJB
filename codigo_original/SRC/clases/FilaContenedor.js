import { modificarAtributoElemento, crearElemento } from '../librerias/APIElementosHTML.js';
import { BotonesContainer } from './BotonesContainer.js';
import { Container } from './Container.js';

export class FilaContenedor {
    #id;
    #filaDivPrincipal;
    #numContainers;
    #opcionesRow;
    #containersHijo = [];

    constructor(_id, _numContainers) {
        this.#id = _id;
        this.#numContainers = _numContainers;
        this.#opcionesRow = new BotonesContainer("fila-" + _id + ".botones-" + _id);
        this.#containersHijo = this.#crearArrayContainers();
        this.#filaDivPrincipal = this.#crearElementoDivPrincipal();
        // this.#configurarEventosBotones();
    }

    #crearArrayContainers() {
        let listaContainers = [];
        let id = "";
        for (let index = 0; index < this.#numContainers; index++) {

            id = this.#id + ".container-" + index;
            listaContainers.push(new Container(id));
        }

        return listaContainers;
    }

    #configurarEventosBotones() {
        this.#opcionesRow.crearClickEvent((event) => {
            event.preventDefault;
            if(event.target.type != "button"){
                let padre = this.#filaDivPrincipal.parentNode;
                let fila = new FilaContenedor(padre.childNodes.length, event.target.value);
                this.#filaDivPrincipal.insertAdjacentElement("beforebegin", fila.getRow());
            }
            
        });

        this.#opcionesRow.subirClickEvent(() => {
            let elArriba = this.#filaDivPrincipal.previousSibling;
            if (this.#isElement(elArriba)) {
                this.#filaDivPrincipal.insertAdjacentElement("afterend", elArriba);
            }
        });

        this.#opcionesRow.bajarClickEvent(() => {
            let elAbajo = this.#filaDivPrincipal.nextSibling;
            if (this.#isElement(elAbajo)) {
                this.#filaDivPrincipal.insertAdjacentElement("beforebegin", elAbajo);
            }
        });

        this.#opcionesRow.borrarClickEvent(() => {
            this.#filaDivPrincipal.remove();
        });


    }


    #isElement(object) {
        return (
            typeof HTMLElement === "object" ? object instanceof HTMLElement : //DOM2
                object && typeof object === "object" && object !== null && object.nodeType === 1 && typeof object.nodeName === "string"
        );
    }

    #crearElementoDivPrincipal() {
        let elementoDiv = crearElemento("div", "", "id", "principal-" + this.#id);
        let containerFilaContenedor = crearElemento("div", "", "id", "principalContainers-" + this.#id);
        let opcionesCont = this.#opcionesRow.getDivGrupoBotones();

        let separador = crearElemento("br", "");

        let attrElementoDiv = { "class": "align-items-center d-flex flex-column position-relative" };
        let attrFilaContenedor = { "class": "container border border-3 border-dark d-flex justify-content-center", "style": "height: 5cm;" };

        modificarAtributoElemento(elementoDiv, attrElementoDiv);
        modificarAtributoElemento(containerFilaContenedor, attrFilaContenedor);

        elementoDiv.appendChild(opcionesCont);
        elementoDiv.appendChild(containerFilaContenedor);
        elementoDiv.appendChild(separador);

        for (let cont of this.#containersHijo) {
            containerFilaContenedor.appendChild(cont.getContainer());
        }

        return elementoDiv;
    }

    containerSinOpciones() {
        let elementoDiv = crearElemento("div", "", "id", "principal-" + this.#id);
        let containerFilaContenedor = crearElemento("div", "", "id", "principalContainers-" + this.#id);

        let separador = crearElemento("br", "");

        let attrElementoDiv = { "class": "align-items-center d-flex flex-column position-relative" };
        let attrFilaContenedor = { "class": "container border border-3 border-dark d-flex justify-content-center", "style": "height: 5cm;" };

        modificarAtributoElemento(elementoDiv, attrElementoDiv);
        modificarAtributoElemento(containerFilaContenedor, attrFilaContenedor);

        elementoDiv.appendChild(containerFilaContenedor);
        elementoDiv.appendChild(separador);

        for (let cont of this.#containersHijo) {
            containerFilaContenedor.appendChild(cont.getContainer());
        }

        this.#filaDivPrincipal = elementoDiv;

    }

    toJSON() {
        return {
            idFilaContenedor: this.#id,
            numContainers: this.#numContainers,
            divPrincipal: this.#filaDivPrincipal.innerHTML,
            opcionesRow: this.#opcionesRow,
            containersHijo: this.#containersHijo
        }
    }

    static fromJSON(json) {
        let fc = new FilaContenedor(json.idFilaContenedor, json.numContainers);  
        let elementoDiv = crearElemento("div", "", "id", "principal-" + json.idFilaContenedor);
        elementoDiv.innerHTML =json.divPrincipal 
        fc.#filaDivPrincipal = elementoDiv;
        fc.#opcionesRow = BotonesContainer.fromJSON(json.opcionesRow);
        fc.#containersHijo = json.containersHijo;
        return fc;

    }

    getId() {
        return this.#id;
    }

    getRow() {
        return this.#filaDivPrincipal;
    }

    getNumContainers() {
        return this.#numContainers;
    }

    getOpcionesRow() {
        return this.#opcionesRow;
    }

    getContainers() {
        return this.#containersHijo;
    }

    setId(newId) {
        this.#id = "FilaContenedor-" + newId;
    }

    setNumContainers(numCont) {
        this.#numContainers = numCont;
    }



}