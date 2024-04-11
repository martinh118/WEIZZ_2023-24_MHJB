import { modificarAtributoElemento, crearElemento } from '../librerias/APIElementosHTML.js';
import { BotonesContainer } from './BotonesContainer.js';
import { Container } from './Container.js';

export class FilaContenedor {
    #id;
    filaDivPrincipal;
    #numContainers;
    opcionesRow;
    #containers;

    constructor(_id, _numContainers) {
        this.#id = "FilaContenedor-" + _id;
        this.#numContainers = _numContainers;
        this.opcionesRow = new BotonesContainer("fila-" + _id + ".botones-" + _id);
        this.#containers = this.#crearArrayContainers();
        this.filaDivPrincipal = this.#crearElementoDivPrincipal();

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


    isElement(object) {
        return (
            typeof HTMLElement === "object" ? object instanceof HTMLElement : //DOM2
                object && typeof object === "object" && object !== null && object.nodeType === 1 && typeof object.nodeName === "string"
        );
    }

    #crearElementoDivPrincipal() {
        let elementoDiv = crearElemento("div", "", "id", "principal-" + this.#id);
        let containerFilaContenedor = crearElemento("div", "", "id", "principalContainers-" + this.#id);
        let opcionesCont = this.opcionesRow.getDivGrupoBotones();

        let separador = crearElemento("br", "");

        let attrElementoDiv = { "class": "align-items-center d-flex flex-column position-relative" };
        let attrFilaContenedor = { "class": "container border border-3 border-dark d-flex justify-content-center", "style": "height: 5cm;" };

        modificarAtributoElemento(elementoDiv, attrElementoDiv);
        modificarAtributoElemento(containerFilaContenedor, attrFilaContenedor);

        elementoDiv.appendChild(opcionesCont);
        elementoDiv.appendChild(containerFilaContenedor);
        elementoDiv.appendChild(separador);

        for (let cont of this.#containers) {
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

        for (let cont of this.#containers) {
            containerFilaContenedor.appendChild(cont.getContainer());
        }

        this.filaDivPrincipal = elementoDiv;

    }

    toJSON() {
        return {
            idFilaContenedor: this.#id,
            divPrincipal: this.filaDivPrincipal,
            numContainers: this.#numContainers,
            opcionesRow: JSON.stringify(this.opcionesRow),
            containers: this.#containers
        }
    }

    fromJSON(json) {

        let filaContenedor = new FilaContenedor(json.idFilaContenedor, json.numContainers);

        filaContenedor.opcionesRow = BotonesContainer.fromJSON(JSON.parse(json.opcionesRow));
        filaContenedor.#containers = crearContianers();
        filaContenedor.filaDivPrincipal = crearDivPrincipal();

        return filaContenedor;

        function crearDivPrincipal() {
            let elementoDiv = crearElemento("div", "", "id", "principal-" + filaContenedor.#id);
            let containerFilaContenedor = crearElemento("div", "", "id", "principalContainers-" + filaContenedor.#id);
            let opcionesCont = filaContenedor.opcionesRow.getDivGrupoBotones();

            let separador = crearElemento("br", "");

            let attrElementoDiv = { "class": "align-items-center d-flex flex-column position-relative" };
            let attrFilaContenedor = { "class": "container border border-3 border-dark d-flex justify-content-center", "style": "height: 5cm;" };

            modificarAtributoElemento(elementoDiv, attrElementoDiv);
            modificarAtributoElemento(containerFilaContenedor, attrFilaContenedor);

            elementoDiv.appendChild(opcionesCont);
            elementoDiv.appendChild(containerFilaContenedor);
            elementoDiv.appendChild(separador);

            for (let cont of filaContenedor.#containers) {
                containerFilaContenedor.appendChild(cont.getContainer());
            }

            return elementoDiv;
        }

        function crearContianers() {
            let listaContainers = [];
            let id = "";
            for (let index = 0; index < filaContenedor.#numContainers; index++) {

                id = filaContenedor.#id + ".container-" + index;
                listaContainers.push(new Container(id));
            }

            return listaContainers;
        }
    }

    getId() {
        return this.#id;
    }

    getRow() {
        return this.filaDivPrincipal;
    }

    getNumContainers() {
        return this.#numContainers;
    }

    getOpcionesRow() {
        return this.opcionesRow;
    }

    getContainers() {
        return this.#containers;
    }

    setId(newId) {
        this.#id = "FilaContenedor-" + newId;
    }

    setNumContainers(numCont) {
        this.#numContainers = numCont;
    }



}