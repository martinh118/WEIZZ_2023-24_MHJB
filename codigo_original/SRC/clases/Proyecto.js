import {crearElemento } from '../librerias/APIElementosHTML.js';
import base_basico from '../plantillas_base/plantilla_base_basico.json' assert { type: 'json' };
import { FilaContenedor } from './FilaContenedor.js';
import { Container } from './Container.js';

export class Proyecto {
    #id;
    #plantillaBase;
    #htmlBase;
    #header;
    #body;
    #footer;

    constructor(_id, _plantillaBase) {
        this.#id = _id;
        this.#plantillaBase = _plantillaBase;

        this.#header = this.#crearHeader();
        this.#body = this.#crearBody();
        this.#footer = this.#crearFooter();
        this.#htmlBase = this.#crearHtmlProyecto();
    }

    #crearHeader() {
        let filaHeader = new FilaContenedor("Header-" + this.#id, 3)
        filaHeader.containerSinOpciones();
        return filaHeader;
    }

    #crearBody() {
        let arr = [];
        switch (this.#plantillaBase) {
            case "base_basico":
                for (const filaCont of base_basico.body) {
                    let jsonProject = JSON.stringify(filaCont);

                    let newProject = JSON.parse(jsonProject, function (key, value) {
                        if (key == "containersHijo") {
                            let containers = [];
                            for (let v of value) containers.push(Container.fromJSON(v));
                            return containers;
                        } else {
                            return value;   // 'nom' i altres atributs "normals"
                        }
                    });

                    let filaContenedor = FilaContenedor.fromJSON(newProject);
                    this.#configurarEventosBotones(filaContenedor)
                    console.log(filaContenedor);
                    // this.#configurarEventosBotones(filaContenedor);
                    arr.push(filaContenedor);
                }
                // console.log(proyecto);
                return arr
            default:

                let filaBody = new FilaContenedor("Body-" + this.#id, 1);
                this.#configurarEventosBotones(filaBody)
                arr.push(filaBody);
                // this.#configurarEventosBotones(filaBody);
                return arr;
        }

    }

    #crearFooter() {
        let filaFooter = new FilaContenedor("Footer-" + this.#id, 4);
        filaFooter.containerSinOpciones();
        return filaFooter;
    }

    #crearHtmlProyecto() {
        let html = crearElemento("html", "");
        let divRowHeader = crearElemento("div", "", "id", "rowHeaderProject" + this.#id);
        let divRowBody = crearElemento("div", "", "id", "rowBodyProject" + this.#id);
        let divRowFooter = crearElemento("div", "", "id", "rowFooterProject" + this.#id);

        divRowHeader.setAttribute("class", "row border-bottom border-dark border-2");
        divRowBody.setAttribute("class", "row mt-4 border-bottom border-dark border-2");
        divRowFooter.setAttribute("class", "row mt-4 ");


        divRowHeader.appendChild(this.#header.getRow());
        for (const body of this.#body) {
            divRowBody.appendChild(body.getRow());
        }
        divRowFooter.appendChild(this.#footer.getRow());

        html.appendChild(divRowHeader);
        html.appendChild(divRowBody);
        html.appendChild(divRowFooter);

        return html;
    }

    #configurarEventosBotones(filaCont) {
        let botones = filaCont.getOpcionesRow();
        let row = filaCont.getRow();

        botones.crearClickEvent((event) => {
            event.preventDefault;
            if (event.target.type != "button") {

                let padre = row.parentNode;
                let fila = new FilaContenedor(padre.childNodes.length, event.target.value);

                this.#configurarEventosBotones(fila);

                let indexCont = this.#body.indexOf(filaCont);
                this.#body.splice(indexCont, 0, fila);

                row.insertAdjacentElement("beforebegin", fila.getRow());

            }
        });

        botones.subirClickEvent(() => {
            let elArriba = row.previousSibling;

            if (this.#isElement(elArriba)) {

                let indexCont = this.#body.indexOf(filaCont);
                let indexArriba = indexCont - 1;
                let contArriba = this.#body[indexArriba];

                this.#body[indexArriba] = this.#body[indexCont];
                this.#body[indexCont] = contArriba;

                row.insertAdjacentElement("afterend", elArriba);
            }

        });

        botones.bajarClickEvent(() => {
            let elAbajo = row.nextSibling;

            if (this.#isElement(elAbajo)) {

                let indexCont = this.#body.indexOf(filaCont);
                let indexAbajo = indexCont + 1;
                let contAbajo = this.#body[indexAbajo];

                this.#body[indexAbajo] = this.#body[indexCont];
                this.#body[indexCont] = contAbajo;

                row.insertAdjacentElement("beforebegin", elAbajo);
            }

        });

        botones.borrarClickEvent(() => {
            row.remove();
            let indexCont = this.#body.indexOf(filaCont);
            this.#body.splice(indexCont, 1);
        });


    }

    #isElement(object) {
        return (
            typeof HTMLElement === "object" ? object instanceof HTMLElement : //DOM2
                object && typeof object === "object" && object !== null && object.nodeType === 1 && typeof object.nodeName === "string"
        );
    }



    toJSON() {
        return {
            idProyecto: this.#id,
            htmlBase: this.#htmlBase.innerHTML,
            header: this.#header,
            body: this.#body,
            footer: this.#footer,

        }
    }

    static fromJSON(json) {
        let proyecto = new Proyecto(json.idProyecto);
        let html = crearElemento("hmtl", "");
        html.innerHTML = json.htmlBase;
        proyecto.#header = FilaContenedor.fromJSON(json.header);
        proyecto.#body = json.body;
        proyecto.#footer = FilaContenedor.fromJSON(json.footer);
        proyecto.#htmlBase = html;
        return proyecto;

    }

    getId() {
        return this.#id
    }

    getHtmlBase() {
        return this.#htmlBase;
    }

    getHeader() {
        return this.#header
    }

    getBody() {
        return this.#body;
    }

    getFooter() {
        return this.#footer;
    }

    // getContainers() {
    //     return this.#containers;
    // }


    setId(id) {
        this.#id = id;
    }

    setHtmlBase(html) {
        this.#htmlBase = html;
    }

    setHeader(header) {
        this.#header = header;
    }

    setBody(body) {
        this.#body = body;
    }

    setFooter(footer) {
        this.#footer = footer;
    }

    addContainerBody(filaContainer) {
        this.#body.push(filaContainer);
        console.log(this.#body);
    }

    deleteContainerBody(filaContainer) {
        let indexCont = this.#body.indexOf(filaContainer);
        this.#body.splice(indexCont, 1);
        console.log(this.#body);
    }

    moverAbajoContainerBody(filaContainer) {
        let indexCont = this.#body.indexOf(filaContainer);
        let indexAbajo = indexCont + 1;
        let contAbajo = this.#body[indexAbajo];

        this.#body[indexAbajo] = this.#body[indexCont];
        this.#body[indexCont] = contAbajo;
    }

    moverArribaContainerBody(filaContainer) {
        let indexCont = this.#body.indexOf(filaContainer);
        let indexArriba = indexCont - 1;
        let contArriba = this.#body[indexArriba];

        this.#body[indexArriba] = this.#body[indexCont];
        this.#body[indexCont] = contArriba;
    }



}