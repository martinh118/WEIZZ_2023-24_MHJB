import { Elemento } from "../Elemento.js";
import { crearElemento, modificarAtributoElemento} from "../../librerias/APIElementosHTML.js";


export class Imagen extends Elemento{
    #source;
    #ancho;
    #alto;
    #borderRadius;
    #anchoBorde;
    #colorBorde;

    constructor(_id, _contenido ){
        super(_id, _contenido);
        this.elemento = "img";
        this.#source = "../SRC/imagenes_usuario/default_image.jpg";
        this.#ancho = 90;
        this.#alto = 90
        this.#borderRadius = 0;
        this.#anchoBorde = 0;
        this.#colorBorde = "#000000";
        this.estiloElemento = {"height": `${this.#alto}px`,"width": `${this.#ancho}px`, "border": `${this.#anchoBorde}px solid ${this.#colorBorde}`, "border-radius": `${this.#borderRadius}% !important`}
        this.elementoDOM = this.#crearElementoDOM();    
    }

    #crearElementoDOM(){
        let imagen = crearElemento("img", "", "id", this.id);

        let atributos = {
            "src": this.#source,
            "class": "element"
        }

        modificarAtributoElemento(imagen, atributos);
        imagen.setAttribute("style", super.crearStringEstilo());
        
        return imagen;
    }

    toJSON(){
        let object = super.toJSON();
        object.source = this.#source;
        object.ancho = this.#ancho;
        object.alto = this.#alto;
        object.borderRadius = this.#borderRadius;
        object.anchoBorde = this.#anchoBorde;
        object.colorBorde = this.#colorBorde;
        object.estiloElemento = this.estiloElemento;
        return object;
    }

    static fromJSON(json){
        let img = new Imagen(json.id, json.contenido);
        img.setSource(json.source);
        img.setAncho(json.ancho);
        img.setAlto(json.alto)
        img.setBorderRadius(json.borderRadius);
        img.setAnchoBorde(json.anchoBorde);
        img.setColorBorde(json.colorBorde);
        img.setEstilo(json.estiloElemento)
        img.rewriteImagen();
        return img;
    }

    // Setter para #source
    setSource(source) {
        this.#source = source;
    }

    // Setter para #tamaño
    setAncho(ancho) {
        this.#ancho = ancho;
    }

    setAlto(alto){
        this.#alto = alto;
    }

    // Setter para #borderRadius
    setBorderRadius(borderRadius) {
        this.#borderRadius = borderRadius;
    }

    // Setter para #anchoBorde
    setAnchoBorde(anchoBorde) {
        this.#anchoBorde = anchoBorde;
    }

    // Setter para #colorBorde
    setColorBorde(colorBorde) {
        this.#colorBorde = colorBorde;
    }

    setEstilo(object){
        this.estiloElemento = object;
    }

    rewriteImagen(){
        this.elementoDOM = this.#crearElementoDOM(); 
    }

    reiniciarEstilo(){
        this.#source = "../SRC/imagenes_usuario/default_image.jpg";
        this.#ancho = 90;
        this.#alto = 90
        this.#borderRadius = 0;
        this.#anchoBorde = 0;
        this.#colorBorde = "#000000";
        this.estiloElemento = {"height": `${this.#alto}px`,"width": `${this.#ancho}px`, "border": `${this.#anchoBorde}px solid ${this.#colorBorde}`, "border-radius": `${this.#borderRadius}% !important`}
        this.elementoDOM = this.#crearElementoDOM();  
    }

    obtenerConfigEstilo() {
        let html = `
        <div id="contenidoRecuadroEstilo" style="padding: 5px 5px 5px 5px">
        <div hidden class='idElemento'>${this.id}</div>
            <label for="inputImagen"><b>Imagen:</b> </label><br>
            <input type="file" id="inputImagen" accept="image/png, image/jpeg, image/webp">
            <br><br>
            <label for="anchoImagen"><b>Ancho imagen (width px): </b></label>
            <input type="number" id="anchoImagen" value='${this.#ancho}' min='0' max='100'>
            <br>
            <label for="altoImagen"><b>Alto imagen (height px):</b> </label>
            <br>
            <input type="number" id="altoImagen" value='${this.#alto}' min='0' max='100'>
            <br><br>
            <label for="borderRadius"><b>Border Radius (%):</b> </label>
            <br>
            <input type="number" id="borderRadius" value='${this.#borderRadius}' min='0' max='100'>
            <br>
            <label for="anchoBorde"><b>Ancho borde (px):</b></label>
            <br>
            <input type="number" id="anchoBorde" value='${this.#anchoBorde}' min='0' max='100'>
            <br>
            <label for="colorBorde"><b>Color borde:</b></label><br>
            <input type="color" id="colorBorde" value='${this.#colorBorde}'>
            <br><br>
        <div style="position: sticky; bottom: 0; background-color: #FF4242; padding: 2px 2px 2px 2px">
            <input type='button' value='Guardar' class="guardarEstiloElemento">
            <input type='button' value='Reset' class="resetEstiloElemento">
        </div>
        </div>
        `


        return html;
    }

}