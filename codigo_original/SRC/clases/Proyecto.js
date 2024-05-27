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
        let filaHeader = new Fila("FilaRowHeader-" + this.#id, [contenedor]);
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
        let filaFooter = new Fila("FilaRowFooter-" + this.#id, [contenedor])
        return filaFooter;
    }

    #crearHtmlProyecto() {
        let html = crearElemento("html", "");
        let divRowHeader = crearElemento("div", "", "id", "rowHeaderProject");
        let divRowBody = crearElemento("div", "", "id", "rowBodyProject");
        let divRowFooter = crearElemento("div", "", "id", "rowFooterProject");

        let botonHeader = crearElemento("button", "COLOR HEADER", "class", "w-25 btn btn-outline-danger rounded-bottom mx-auto estiloBackground")
        let botonBody = crearElemento("button", "COLOR BODY", "class", "w-25 btn btn-outline-danger rounded-bottom mx-auto mb-5 estiloBackground")
        let botonFooter = crearElemento("button", "COLOR FOOTER", "class", "w-25 btn btn-outline-danger rounded-bottom mx-auto estiloBackground")
       
        divRowHeader.appendChild(botonHeader);
        divRowBody.appendChild(botonBody);
        divRowFooter.appendChild(botonFooter);

        divRowHeader.setAttribute("class", "row border-bottom border-dark border-2");        
        divRowBody.setAttribute("class", "row border-bottom border-dark border-2");
        divRowFooter.setAttribute("class", "row ");


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

    getFilaRow(id) {
        for (const filaRow of this.#body) {
            let row = filaRow.getId();
            if (row == id) {
                return filaRow;
            }
        }
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

    rewriteHTML() {
        this.#htmlBase = this.#crearHtmlProyecto();
    }

    addFilaRowBody(nuevaFila, filaContainer = undefined) {
        if (filaContainer != undefined) {

            for (const filaCont of this.#body) {
                let row = filaCont.getId();
                if (row == filaContainer.id) {
                    let indexCont = this.#body.indexOf(filaCont);
                    this.#body.splice(indexCont, 0, nuevaFila);
                    break;
                }
            }
        } else this.#body.push(nuevaFila);
    }

    deleteContainerBody(filaContainer) {
        for (const filaCont of this.#body) {
            let row = filaCont.getId();
            if (row == filaContainer.id) {
                let indexCont = this.#body.indexOf(filaCont);
                this.#body.splice(indexCont, 1);
                break;
            }
        }
    }

    moverFilasRow(FilaRowArriba, FilaRowAbajo) {
        let indexFRArriba, indexFRAbajo;

        for (const filaCont of this.#body) {
            let row = filaCont.getId();
            if (row == FilaRowArriba.id) {
                indexFRArriba = this.#body.indexOf(filaCont);
            }
        }

        for (const filaCont of this.#body) {
            let row = filaCont.getId();
            if (row == FilaRowAbajo.id) {
                indexFRAbajo = this.#body.indexOf(filaCont);
            }
        }

        if (FilaRowArriba >= 0 && FilaRowAbajo >= 0) {
            let contArriba = this.#body[indexFRArriba];
            this.#body[indexFRArriba] = this.#body[indexFRAbajo];
            this.#body[indexFRAbajo] = contArriba;
        }


    }



}