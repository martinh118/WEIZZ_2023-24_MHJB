import { modificarAtributoElemento, crearElemento } from '../librerias/APIElementosHTML.js';
import { FilaContenedor } from './FilaContenedor.js';

export class Proyecto {
    #id;
    #htmlBase;
    #header;
    #body;
    #footer;
    #containers = [];


    constructor(_id) {
        this.#id = _id;
        this.#header = this.#crearHeader();
        this.#body = this.#crearBody();
        this.#footer = this.#crearFooter();
        this.#htmlBase = this.#crearHtmlProyecto();
    }

    #crearHeader() {
        let divRowHeader = crearElemento("div", "", "id", "rowHeaderProject" + this.#id);
        let filaHeader = new FilaContenedor("Header-" + this.#id, 3)

        filaHeader.containerSinOpciones();
        divRowHeader.setAttribute("class", "row border-bottom border-dark border-2");

        divRowHeader.appendChild(filaHeader.getRow());
        return divRowHeader;
    }

    #crearBody() {
        let divRowBody = crearElemento("div", "", "id", "rowBodyProject" + this.#id);
        let filaBody = new FilaContenedor("Body-" + this.#id, 1);

        divRowBody.setAttribute("class", "row mt-4 border-bottom border-dark border-2");

        divRowBody.appendChild(filaBody.getRow());
        this.#configurarEventosBotones(filaBody);
        this.#containers.splice(0, 0, filaBody);
        return divRowBody;
    }

    #crearFooter() {
        let divRowFooter = crearElemento("div", "", "id", "rowFooterProject" + this.#id);
        let filaFooter = new FilaContenedor("Footer-" + this.#id, 4);

        divRowFooter.setAttribute("class", "row mt-4 ");
        filaFooter.containerSinOpciones();

        divRowFooter.appendChild(filaFooter.getRow());
        return divRowFooter;
    }

    #crearHtmlProyecto() {
        let html = crearElemento("html", "");

        html.appendChild(this.#header);
        html.appendChild(this.#body);
        html.appendChild(this.#footer);

        return html;
    }

    #configurarEventosBotones(filaCont) {

        filaCont.opcionesRow.crearClickEvent((event) => {
            event.preventDefault;
            if (event.target.type != "button") {

                let padre = filaCont.filaDivPrincipal.parentNode;
                let fila = new FilaContenedor(padre.childNodes.length, event.target.value);

                this.#configurarEventosBotones(fila);

                let indexCont = this.#containers.indexOf(filaCont);
                this.#containers.splice(indexCont, 0, fila);

                filaCont.filaDivPrincipal.insertAdjacentElement("beforebegin", fila.getRow());

            }
        });

        filaCont.opcionesRow.subirClickEvent(() => {
            let elArriba = filaCont.filaDivPrincipal.previousSibling;

            if (filaCont.isElement(elArriba)) {
                
                let indexCont = this.#containers.indexOf(filaCont);
                let indexArriba = indexCont - 1;
                let contArriba = this.#containers[indexArriba];
                
                this.#containers[indexArriba] = this.#containers[indexCont];
                this.#containers[indexCont] = contArriba;
                
                filaCont.filaDivPrincipal.insertAdjacentElement("afterend", elArriba);
            }

        });

        filaCont.opcionesRow.bajarClickEvent(() => {
            let elAbajo = filaCont.filaDivPrincipal.nextSibling;

            if (filaCont.isElement(elAbajo)) {
                
                let indexCont = this.#containers.indexOf(filaCont);
                let indexAbajo = indexCont + 1;
                let contAbajo = this.#containers[indexAbajo];
                
                this.#containers[indexAbajo] = this.#containers[indexCont];
                this.#containers[indexCont] = contAbajo;
                
                filaCont.filaDivPrincipal.insertAdjacentElement("beforebegin", elAbajo);
            }

        });

        filaCont.opcionesRow.borrarClickEvent(() => {

            filaCont.filaDivPrincipal.remove();

            let indexCont = this.#containers.indexOf(filaCont);
            this.#containers.splice(indexCont, 1);
        });


    }

    #mostrarContainers() {
        for (let cont of this.#containers) {
            console.log(`
            ID: ${cont.getId()}
            FilaPrincipal: ${cont.getRow()}
            NumContainers: ${cont.getNumContainers()}
            `);
        }
    }


    toJSON() {
        return {
            idProyecto: this.#id,
            htmlBase: this.#htmlBase,
            header: this.#header,
            body: this.#body,
            footer: this.#footer,
            containers: this.#containers
        }
    }

    static fromJSON(json) {
        let proyecto = new Proyecto(json.idProyecto);

        proyecto.#containers = convertirContaimers();
        proyecto.#header = crearHeader();
        proyecto.#body = crearBody();
        proyecto.#footer = crearFooter();
        proyecto.#htmlBase = crearHtmlBase();
        return proyecto;

        function convertirContaimers(){
            let arrayFilasContainers = json.containers;
            let arrayReal = [];
            for (const cont of arrayFilasContainers) {
                // console.log(cont);
                let nuevo = new FilaContenedor(proyecto.#id,cont.numContainers )
                arrayReal.push(nuevo);
            }
            // console.log(arrayReal);
            return arrayReal;
        }

        function crearHeader() {
            let divRowHeader = crearElemento("div", "", "id", "rowHeaderProject" + proyecto.#id);
            let filaHeader = new FilaContenedor("Header-" + proyecto.#id, 3)

            filaHeader.containerSinOpciones();
            divRowHeader.setAttribute("class", "row border-bottom border-dark border-2");

            divRowHeader.appendChild(filaHeader.getRow());
            return divRowHeader;
        }

        function crearBody() {
            let divRowBody = crearElemento("div", "", "id", "rowBodyProject" + proyecto.#id);
            divRowBody.setAttribute("class", "row mt-4 border-bottom border-dark border-2");
            for (const container of proyecto.#containers) {
                divRowBody.appendChild(container.getRow());
                proyecto.#configurarEventosBotones(container);
            }
            
            return divRowBody;
        }

        function crearFooter() {
            let divRowFooter = crearElemento("div", "", "id", "rowFooterProject" + proyecto.#id);
            let filaFooter = new FilaContenedor("Footer-" + proyecto.#id, 4);

            divRowFooter.setAttribute("class", "row mt-4 ");
            filaFooter.containerSinOpciones();

            divRowFooter.appendChild(filaFooter.getRow());
            return divRowFooter;
        }

        function crearHtmlBase() {
            let html = crearElemento("html", "");

            html.appendChild(proyecto.#header);
            html.appendChild(proyecto.#body);
            html.appendChild(proyecto.#footer);

            return html;
        }
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

    getContainers() {
        return this.#containers;
    }


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

    setContainers(cont) {
        this.#containers = cont;
    }



}