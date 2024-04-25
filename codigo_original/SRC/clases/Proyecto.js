import { crearElemento } from '../librerias/APIElementosHTML.js';
import { FilaContenedor } from './FilaContenedor.js';
import { Fila } from './Fila.js';

export class Proyecto {
    #id;
    #htmlBase;
    #header;
    #body; //Array objeto Fila
    #footer;

    constructor(_id) {
        this.#id = _id;
        this.#header = this.#crearHeader();
        this.#body = this.#crearBody();
        this.#footer = this.#crearFooter();
        this.#htmlBase = this.#crearHtmlProyecto();
    }

    #crearHeader() {
        let contenedor = new FilaContenedor("Header-" + this.#id, 3);
        contenedor.containerSinOpciones();
        let filaHeader = new Fila("rowHeader-"+ this.#id, [contenedor])
        return filaHeader;
    }

    #crearBody() {
        let arr = [];
        let filaBody = new Fila("Body-" + this.#id, []);
        arr.push(filaBody);
        return arr;
    }

    #crearFooter() {
        let contenedor = new FilaContenedor("Footer-" + this.#id, 4);
        contenedor.containerSinOpciones();
        let filaFooter = new Fila("rowFooter-"+ this.#id, [contenedor])
        return filaFooter;
    }

    #crearHtmlProyecto() {
        let html = crearElemento("html", "");
        let divRowHeader = crearElemento("div", "", "id", "rowHeaderProject");
        let divRowBody = crearElemento("div", "", "id", "rowBodyProject");
        let divRowFooter = crearElemento("div", "", "id", "rowFooterProject");

        divRowHeader.setAttribute("class", "row border-bottom border-dark border-2");
        divRowBody.setAttribute("class", "row mt-4 border-bottom border-dark border-2");
        divRowFooter.setAttribute("class", "row mt-4 ");

        // let contenedorHeader = filaHeader.getFilasContenedor();

        divRowHeader.appendChild(this.#header.getHtmlBase());
        for (const body of this.#body) {
            divRowBody.appendChild(body.getHtmlBase());
        }
        divRowFooter.appendChild(this.#footer.getHtmlBase());

        html.appendChild(divRowHeader);
        html.appendChild(divRowBody);
        html.appendChild(divRowFooter);

        return html;
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
        proyecto.#header = Fila.fromJSON(json.header);
        proyecto.#body = json.body;
        proyecto.#footer = Fila.fromJSON(json.footer);
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

    setId(id) {
        this.#id = id;
    }

    setHtmlBase(html) {
        this.#htmlBase = html;
    }

    setHeader(header) {
        this.#header = header;
        this.#htmlBase = this.#crearHtmlProyecto();
    }

    setBody(body) {
        this.#body = body;
        this.#htmlBase = this.#crearHtmlProyecto();
    }

    setFooter(footer) {
        this.#footer = footer;
        this.#htmlBase = this.#crearHtmlProyecto();
    }

    addContainerBody(nuevaFila, filaContainer) {
        for (const filaCont of this.#body) {
            let row = filaCont.getId();
            if (row == filaContainer.id) {
                let indexCont = this.#body.indexOf(filaCont);
                this.#body.splice(indexCont, 0, nuevaFila);
                console.log(this.#body);
                break;
            }
        }
    }

    deleteContainerBody(filaContainer) {
        for (const filaCont of this.#body) {
            let row = filaCont.getId();
            if (row == filaContainer.id) {
                let indexCont = this.#body.indexOf(filaCont);
                this.#body.splice(indexCont, 1);
                console.log(this.#body);
                break;
            }
        }
    }

    moverAbajoContainerBody(filaContainer) {
        for (const filaCont of this.#body) {
            let row = filaCont.getId();
            if (row == filaContainer.id) {
                let indexCont = this.#body.indexOf(filaCont);
                let indexAbajo = indexCont + 1;
                let contAbajo = this.#body[indexAbajo];

                if (contAbajo != undefined) {
                    this.#body[indexAbajo] = this.#body[indexCont];
                    this.#body[indexCont] = contAbajo;
                }
                console.log(this.#body);
                break;
            }
        }

    }

    moverArribaContainerBody(filaContainer) {
        for (const filaCont of this.#body) {
            let row = filaCont.getId();
            if (row == filaContainer.id) {
                let indexCont = this.#body.indexOf(filaCont);
                let indexArriba = indexCont - 1;
                if (indexArriba >= 0) {
                    let contArriba = this.#body[indexArriba];
                    this.#body[indexArriba] = this.#body[indexCont];
                    this.#body[indexCont] = contArriba;
                }
                console.log(this.#body);
                break;
            }
        }
    }



}