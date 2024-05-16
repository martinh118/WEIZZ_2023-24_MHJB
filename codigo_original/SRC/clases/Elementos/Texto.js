import { Elemento } from "../Elemento.js";


export class Texto extends Elemento{
    #color;
    #fontFamily;
    #fontSize;
    #medida;
    #subrayado;
    #negrita;
    constructor(_id, _contenido ){
        super(_id, _contenido);
        this.elemento = "p";
        this.contenido = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
        this.#color = "#000000";
        this.#fontFamily = "Verdana, Geneva, Tahoma, sans-serif";
        this.#fontSize = "50";
        this.#subrayado = false;
        this.#negrita = false;
        this.#medida = "px";
        this.estiloElemento = "overflow-wrap: break-word;word-wrap: break-word;"
        this.elementoDOM = super.crearElemento();

    }

    toJSON(){
        let object = super.toJSON();
        object.color = this.#color;
        object.fontFamily = this.#fontFamily;
        object.fontSize = this.#fontSize;
        object.medida = this.#medida;
        object.subrayado = this.#subrayado;
        object.negrita = this.#negrita;
        return object
    }

    static fromJSON(json){
        let object = new Texto(json.id, json.contenido);
        object.setContenido(json.contenido);
        object.setColor(json.color);
        object.setFuente(json.fontFamily);
        object.setTamaño(json.fontSize);
        object.setMedida(json.medida);
        object.setSubrayado(json.subrayado);
        object.setSubrayado(json.negrita);
        object.cambiarEstilo(json.estiloElemento);
        object.rewriteHTML();
        return object;
    }

    setContenido(newContent){
        this.contenido = newContent;
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

    setNegrita(bol){
        this.#negrita = bol;
    }

    cambiarEstilo(objectEstilo){
        this.estiloElemento = objectEstilo;
    }

    obtenerConfigEstilo() {
        
        let html = `<div id="contenidoRecuadroEstilo" style='padding:5px 5px 5px 5px'>
        <div hidden class='idElemento'>${this.id}</div>
        <label for='contenidoTitulo'><b>Contenido Titulo: </b></label><br>
        <textarea id='contenidoTitulo' cols='30' rows='5'>${this.contenido}</textarea>
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

        html += `<br><label for="negrita"><b>Negrita</b></label>`;
        if(this.#negrita){
            html += `<input type="checkbox" checked name="" id="negrita" >`;
        }else html += `<input type="checkbox" name="" id="negrita" >`;


        html += `<br><br>
        <input type='button' class='guardarEstiloElemento' value='Guardar'>
        <input type='button' value='Reset' class='ResetEstiloElemento'>
    </div>
        `;
        return html;

    }


}