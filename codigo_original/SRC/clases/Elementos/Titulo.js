import { Elemento } from "../Elemento.js";

export class Titulo extends Elemento{

    constructor(_id, _contenido ){
        super(_id, _contenido);
        this.elemento = "h1";
        this.elementoDOM = super.crearElemento();
        // super.aplicarHijo();
    }

    toJSON(){
        return super.toJSON();
    }

    static fromJSON(json){
        return super.fromJSON(json);
    }

}