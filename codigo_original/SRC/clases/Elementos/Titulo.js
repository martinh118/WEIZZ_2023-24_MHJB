import { Elemento } from "../Elemento.js";


export class Titulo extends Elemento {
    #color;
    #fontFamily;
    #fontSize;
    #medida;
    #subrayado;
    constructor(_id, _contenido) {
        super(_id, _contenido);
        this.elemento = "h1";
        this.#color = "#000000";
        this.#fontFamily = "Verdana, Geneva, Tahoma, sans-serif";
        this.#fontSize = "50";
        this.#subrayado = false;
        this.#medida = "px";
        this.estiloElemento = { "color": "#000000", "font-family": "Verdana, Geneva, Tahoma, sans-serif", "font-size": "50px" };
        this.elementoDOM = super.crearElemento();
    }

    toJSON() {
        let object = super.toJSON();
        object.color = this.#color;
        object.fontFamily = this.#fontFamily;
        object.fontSize = this.#fontSize;
        object.medida = this.#medida;
        object.subrayado = this.#subrayado;
        return object
    }

    static fromJSON(json) {
        let titulo = new Titulo(json.id, json.contenido);
        
        titulo.setColor(json.color);
        titulo.setFuente(json.fontFamily);
        titulo.setTamaño(json.fontSize);
        titulo.setMedida(json.medida);
        titulo.setSubrayado(json.subrayado);
        titulo.cambiarEstilo(json.estiloElemento);
        titulo.rewriteHTML();
        return titulo;
    }

    setColor(newColor){
        this.#color = newColor;
    }

    setFuente(nuevaFuente){
        this.#fontFamily = nuevaFuente;
    }

    setTamaño(nuevoTamaño){
        this.#fontSize = nuevoTamaño;
    }

    setMedida(medida){
        this.#medida = medida;
    }

    setSubrayado(bol){
        this.#subrayado = bol;
    }

    cambiarEstilo(objectEstilo){
        this.estiloElemento = objectEstilo;
    }

    reiniciarEstilo(){
        this.#color = "#000000";
        this.#fontFamily = "Verdana, Geneva, Tahoma, sans-serif";
        this.#fontSize = "50";
        this.#subrayado = false;
        this.#medida = "px";
        this.estiloElemento = { "color": "#000000", "font-family": "Verdana, Geneva, Tahoma, sans-serif", "font-size": "50px" };
        this.elementoDOM = super.crearElemento();
    }

    obtenerConfigEstilo() {
        
        let html = `<div id="contenidoRecuadroEstilo" style='padding:5px 5px 5px 5px'>
        <div hidden class='idElemento'>${this.id}</div>
        <label for='contenidoTitulo'><b>Contenido Titulo: </b></label><br>
        <textarea id='contenidoTitulo' cols='30' rows='2'>${this.contenido}</textarea>
        <br>
        <label for='colorTextoTitulo'><b>Color texto Titulo:</b></label><br>
        <input type='color' id='colorTextoTitulo' value='${this.#color}'>
        <br>
        <label for='tamañoTitulo'><b>Tamaño texto Titulo: </b></label> <br>
        <input type='number' id='tamañoTitulo' min='0' max='100' value='${this.#fontSize}'>
        <select id='medidaTamañoTitulo'> 
            <option value='px'>px</option>
            <option value='%'>%</option>
            <option value='em'>em</option>
            <option value='cm'>cm</option>
        </select>
        <br>
        <label for='fuenteTextoTitulo'><b>Fuente texto Titulo: </b></label> <br>
        <select id='fuenteTextoTitulo'> 
            <option value='Arial, Helvetica, sans-serif' style='font-family:Arial, Helvetica, sans-serif;'>Arial</option>
            <option value='Georgia, Times New Roman, Times, serif' style='font-family:Georgia, Times New Roman, Times, serif;'>Georgia</option>
            <option value='Impact, Haettenschweiler, Arial Narrow Bold, sans-serif' style='font-family:Impact, Haettenschweiler, Arial Narrow Bold, sans-serif;'>Impact</option>
            <option value='Verdana, Geneva, Tahoma, sans-serif' style='font-family:Verdana, Geneva, Tahoma, sans-serif;'>Verdana</option>
        </select>
        <br><br>
        <label for="subrayado"><b>Subrayar</b></label>
        `;

        if(this.#subrayado){
            html += `<input type="checkbox" checked name="" id="subrayado" >`;
        }else html += `<input type="checkbox" name="" id="subrayado" >`;

        html += `<br><br>
        <input type='button' class='guardarEstiloElemento' value='Guardar'>
        <input type='button' value='Reset' class='resetEstiloElemento'>
    </div>
        `;
        return html;

    }

}