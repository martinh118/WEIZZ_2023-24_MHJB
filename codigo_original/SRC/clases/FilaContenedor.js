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
        this.#opcionesRow = new BotonesContainer(_id + ".botones-" + _id);
        this.#containersHijo = this.#crearArrayContainers();
        this.#filaDivPrincipal = this.#crearElementoDivPrincipal();
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


    #crearElementoDivPrincipal() {
        let elementoDiv = crearElemento("div", "", "id", this.#id);
        let containerFilaContenedor = crearElemento("div", "", "id", "principalContainers-" + this.#id);
        let opcionesCont = this.#opcionesRow.getDivGrupoBotones();

        let separador = crearElemento("br", "");

        let attrElementoDiv = { "class": " col align-items-center d-flex flex-column position-relative FilaContenedor" };
        let attrFilaContenedor = { "class": "container border border-3 border-dark d-flex justify-content-center", "style": "height: 5cm;", "data-elemento": "baseFilaContenedor" };

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
        let elementoDiv = crearElemento("div", "", "id",this.#id);
        let containerFilaContenedor = crearElemento("div", "", "id", "principalContainers-" + this.#id);

        let separador = crearElemento("br", "");

        let attrElementoDiv = { "class": "col align-items-center d-flex flex-column position-relative FilaContenedor" };
        let attrFilaContenedor = { "class": "container border border-3 border-dark d-flex justify-content-center", "style": "height: 5cm;", "data-elemento": "baseFilaContenedor" };

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
        
        let elementoDiv = crearElemento("div", "", "id", json.idFilaContenedor);
        elementoDiv.innerHTML = json.divPrincipal;
        fc.#opcionesRow = json.opcionesRow;
        fc.#containersHijo = json.containersHijo;
        fc.#filaDivPrincipal = elementoDiv;
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

    getContainerUnico(idCont){
        for (const Cont of this.#containersHijo) {
            let row = Cont.getId();
            if (row == idCont) {
                return Cont;
            }
        }
    }

    setId(newId) {
        this.#id = newId;
    }

    setNumContainers(numCont) {
        this.#numContainers = numCont;
    }

    rewriteHTML(){
        this.#opcionesRow = new BotonesContainer(this.#id + ".botones-" + this.#id);
        this.#filaDivPrincipal = this.#crearElementoDivPrincipal();
    }

    rewriteHTMLSinOpciones(){
        this.#filaDivPrincipal = this.containerSinOpciones();
    }
    


}