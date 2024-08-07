import { crearElemento, modificarAtributoElemento } from '../librerias/APIElementosHTML.js';

export class Container {
    #id;
    #container;
    #elementoHijo;

    constructor(id) {
        this.#id = id;
        this.#container = this.#crearContainer();
    }

    #crearContainer() {
        let cont = crearElemento("div", "");
        let imagen = crearElemento("img", "");

        let atributosContainer = { "id": this.#id, "class": "container containerHijo", "style": "border-style: dashed; border-color: grey;  margin: 10px; display:flex; align-items: center; justify-content: center;" }
        let atributosApplyImg = { "id": "apply-" + this.#id, "src": "../SRC/imagenes_web/crear_plus.png", "alt": "aplicarElemento", "style": "width: 50px;","title": "Añadir elemento", "class":"imagenPlus" };

        modificarAtributoElemento(cont, atributosContainer);
        modificarAtributoElemento(imagen, atributosApplyImg);

        if(this.#elementoHijo != undefined){
            let content = this.#elementoHijo.getElementoDom()
            cont.appendChild(content);
        }else cont.appendChild(imagen);

        return cont;
    }

    toJSON(){
        return {
            idContainer : this.#id,
            container : this.#container.innerHTML,
            elementoHijo : this.#elementoHijo
        };
    }

    static fromJSON(json){
        let cont = crearElemento("div", "");
        let atributosContainer = { "id": json.idContainer, "class": "container containerHijo", "style": "border-style: dashed; border-color: grey;  margin: 10px; display:flex; align-items: center; justify-content: center;" }
        modificarAtributoElemento(cont, atributosContainer);
        cont.innerHTML = json.container;

        let container = new Container(json.idContainer);
        container.#elementoHijo = json.elementoHijo;
        container.#container = cont;
        return container;
    }

    getId(){
        return this.#id;
    }

    getContainer() {
        return this.#container;
    }

    getElementoHijo() {
        return this.#elementoHijo;
    }


    setId(id){
        this.#id = id;
    }

    setContainer(container) {
        this.#container = container;
    }

    setElementoHijo(elementoHijo) {
        this.#elementoHijo = elementoHijo;
    }

    rewriteHTML(){
        this.#container = this.#crearContainer();
    }
}