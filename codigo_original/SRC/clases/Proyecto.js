import { modificarAtributoElemento, crearElemento } from '../librerias/APIElementosHTML.js';
import { FilaContenedor } from './FilaContenedor.js';

export class Proyecto {
    #id;
    #htmlBase;
    #header;
    #body;
    #footer;
    

    constructor(_id) {
        this.#id = _id;
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
        let filaBody = new FilaContenedor("Body-" + this.#id, 1);
        arr.push(filaBody);
        return arr;
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

    

    // #mostrarContainers() {
    //     for (let cont of this.#containers) {
    //         console.log(`
    //         ID: ${cont.getId()}
    //         FilaPrincipal: ${cont.getRow()}
    //         NumContainers: ${cont.getNumContainers()}
    //         `);
    //     }
    // }


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

    // setContainers(cont) {
    //     this.#containers = cont;
    // }



}