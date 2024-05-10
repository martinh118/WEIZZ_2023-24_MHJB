import { Elemento } from "../Elemento.js";


export class Texto extends Elemento{

    constructor(_id, _contenido ){
        super(_id, _contenido);
        this.elemento = "p";
        this.contenido = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
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