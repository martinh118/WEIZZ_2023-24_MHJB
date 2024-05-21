import { Elemento } from "../Elemento.js";
import { crearElemento } from "../../librerias/APIElementosHTML.js";


export class Lista extends Elemento {
    #itemsContent = [];
    #numItems;
    #estilo;
    #color;
    #fuente;
    #negrita;

    constructor(_id, _contenido) {
        super(_id, _contenido);
        this.#itemsContent = ["Item-0", "Item-1", "Item-2", "Item-3", "Item-4"];
        this.#numItems = 5;
        this.#estilo = "default";
        this.#color = "#000000";
        this.#fuente = "Arial, Helvetica, sans-serif";
        this.#negrita = false;
        this.estiloElemento = {"color": this.#color, "list-style-type": this.#estilo, "font-family": this.#fuente}
        this.elementoDOM = this.#crearElementoDOM();
        // super.aplicarHijo();
    }

    #crearElementoDOM() {
        let ul = crearElemento("ul", "", "id", this.id);

        ul.setAttribute("class", "element");
        ul.setAttribute("style", super.crearStringEstilo())

        for (let index = 0; index < this.#numItems; index++) {
            let li = crearElemento("li", this.#itemsContent[index]);
            li.setAttribute("class", "element");
            li.setAttribute("contenteditable", "");
            ul.appendChild(li);
        }

        return ul;
    }

    rewriteLista(){
        this.elementoDOM = this.#crearElementoDOM();
    }

    toJSON() {
        let lista = super.toJSON();
        lista.itemsContent = this.#itemsContent ;
        lista.numItems = this.#numItems;
        lista.estilo = this.#estilo;
        lista.color = this.#color;
        lista.fuente = this.#fuente ;
        lista.negrita = this.#negrita;
        lista.estiloElemento = this.estiloElemento
        return lista;
    }

    static fromJSON(json) {
        let lista = new Lista(json.id, json.contenido);
        lista.setItemsContent(json.itemsContent);
        lista.setNumItems(json.numItems)
        lista.setEstilo(json.estilo)
        lista.setColor(json.color)
        lista.setFuente(json.fuente)
        lista.setNegrita(json.negrita);
        lista.setEstiloElemento(json.estiloElemento)
        lista.rewriteLista();
        return lista;
    }

    // Setter para #itemsContent
    setItemsContent(itemsContent) {
        this.#itemsContent = itemsContent;
    }

    // Setter para #numItems
    setNumItems(numItems) {
        this.#numItems = numItems;
    }

    // Setter para #estilo
    setEstilo(estilo) {
        this.#estilo = estilo;
    }

    // Setter para #color
    setColor(color) {
        this.#color = color;
    }

    // Setter para #fuente
    setFuente(fuente) {
        this.#fuente = fuente;
    }

    // Setter para #negrita
    setNegrita(negrita) {
        this.#negrita = negrita;
    }

    reiniciarEstilo(){
        this.#numItems = 5;
        this.#estilo = "default";
        this.#color = "#000000";
        this.#fuente = "Arial, Helvetica, sans-serif";
        this.#negrita = false;
        this.estiloElemento = {"color": this.#color, "list-style-type": this.#estilo, "font-family": this.#fuente}
        this.elementoDOM = this.#crearElementoDOM();
    }

    obtenerConfigEstilo() {

        let html = `<div id="contenidoRecuadroEstilo" style="padding:5px 5px 5px 5px">
        <div hidden class='idElemento'>${this.id}</div>
        <label for=""><b>Contenido:</b></label><br>
        <div id="itemsLista">`;

        for (let index = 0; index < this.#numItems; index++) {
            html += `<input type='text' class='itemContent' value='${this.#itemsContent[index]}'><br>`;            
        }


        html += `
        </div>
        <br>
        <label for="numItems"><b>Numero de items: </b></label>
        <br>
        <input type="number" name="" id="numItems" min="0" max="10" value='${this.#numItems}'>
        <br><br>

        <label for='estiloLista'><b>Estilo Lista: </b></label> <br>
        <select name='' id='estiloLista'>
            <option value='default'>Discos</option>
            <option value='circle'>Circulo</option>
            <option value='square'>Cuadrados</option>
            <option value='upper-alpha'>Abecedario</option>
            <option value='numeric'>Numeros</option>
            <option value='upper-roman'>Numeros Romanos</option>
        </select>

        <br><br>

        <label for='colorTexto'><b>Color texto:</b></label><br>
        <input type='color' name='' id='colorTexto' value='${this.#color}'>
        <br><br>

        <label for='fuenteTexto'><b>Fuente Texto: </b></label> <br>
        <select name='' id='fuenteTexto'>
            <option value='Arial, Helvetica, sans-serif' style='font-family:Arial, Helvetica, sans-serif;'>Arial</option>
            <option value='Georgia, Times New Roman, Times, serif' style='font-family:Georgia, Times New Roman, Times, serif;'>Georgia</option>
            <option value='Impact, Haettenschweiler, Arial Narrow Bold, sans-serif' style='font-family:Impact, Haettenschweiler, Arial Narrow Bold, sans-serif;'>Impact</option>
            <option value='Verdana, Geneva, Tahoma, sans-serif' style='font-family:Verdana, Geneva, Tahoma, sans-serif;'>Verdana</option>
        </select>

        <br><br>
        <label for="negrita" >Negrita</label>
        `

        if(this.#negrita) html += `<input type="checkbox" checked name="" id="negritaTexto">`;
        else html +=  `<input type="checkbox"  name="" id="negritaTexto">`

        html +=`
        <br><br>
        <input type='button' value='Guardar' class='guardarEstiloElemento'>    
        <input type='button' value='Reset' class='resetEstiloElemento'>
    </div>`;
        return html;
    }

}