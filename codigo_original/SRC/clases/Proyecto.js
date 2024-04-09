import { modificarAtributoElemento, crearElemento } from '../librerias/APIElementosHTML.js';
import { FilaContenedor } from './FilaContenedor.js';

export class Proyecto{
    #id;
    #htmlBase;
    #header;
    #body;
    #footer;
    #containers;
    #elementos;

    constructor(_id){
        this.#id = _id;
        this.#header = this.#crearHeader();
        this.#body = this.#crearBody();
        this.#footer = this.#crearFooter();
        this.#htmlBase = this.#crearHtmlProyecto();
    }

    #crearHeader(){
        let divRowHeader = crearElemento("div", "", "id", "rowHeaderProject" + this.#id);
        let filaHeader = new FilaContenedor("Header-"+this.#id, 3) 
        filaHeader.containerSinOpciones();
        divRowHeader.setAttribute("class", "row border-bottom border-dark border-2" );
        
        divRowHeader.appendChild(filaHeader.getRow());

        return divRowHeader;
    }
    
    #crearBody(){
        let divRowBody = crearElemento("div", "", "id", "rowBodyProject" + this.#id);
        let filaBody = new FilaContenedor("Body-"+this.#id, 1); 

        divRowBody.setAttribute("class", "row mt-4 border-bottom border-dark border-2" );
        
        divRowBody.appendChild(filaBody.getRow());

        return divRowBody;
    }

    #crearFooter(){
        let divRowFooter = crearElemento("div", "", "id", "rowFooterProject" + this.#id);
        let filaFooter = new FilaContenedor("Footer-"+this.#id, 4);
        
        divRowFooter.setAttribute("class", "row mt-4 " );
        filaFooter.containerSinOpciones();
        
        divRowFooter.appendChild(filaFooter.getRow());

        return divRowFooter;
    }

    #crearHtmlProyecto(){
        let html = crearElemento("html", "");

        html.appendChild(this.#header);
        html.appendChild(this.#body);
        html.appendChild(this.#footer);

        return html;
    }

    getId(){
        return this.#id
    }

    getHtmlBase(){
        return this.#htmlBase;
    }

    getHeader(){
        return this.#header
    }

    getBody(){
        return this.#body;
    }

    getFooter(){
        return this.#footer;
    }

    getContainers(){
        return this.#containers;
    }

    getElementos(){
        return this.#elementos;
    }

    setId(id){
        this.#id = id;
    }

    setHtmlBase(html){
        this.#htmlBase = html;
    }

    setHeader(header){
        this.#header = header;
    }

    setBody(body){
        this.#body = body;
    }

    setFooter(footer){
        this.#footer = footer;
    }

    setContainers(cont){
        this.#containers = cont;
    }

    setElementos(el){
        this.#elementos = el;
    }

}