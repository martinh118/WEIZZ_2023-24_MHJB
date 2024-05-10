import { Elemento } from "../Elemento.js";
import { crearElemento, modificarAtributoElemento} from "../../librerias/APIElementosHTML.js";


export class Imagen extends Elemento{

    constructor(_id, _contenido ){
        super(_id, _contenido);
        this.elemento = "img";
        this.elementoDOM = this.#crearElementoDOM();    
    }

    #crearElementoDOM(){
        let imagen = crearElemento("img", "", "id", this.id);

        let atributos = {
            "src": "../SRC/imagenes_usuario/default_image.jpg",
            "style" : "width: 90%; height: 90%;display: block;",
            "class": "element"
        }

        modificarAtributoElemento(imagen, atributos);
        
        return imagen;
    }

    toJSON(){
        return super.toJSON();
    }

    static fromJSON(json){
        return super.fromJSON(json);
    }


}