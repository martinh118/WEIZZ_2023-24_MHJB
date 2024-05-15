import { modificarAtributoElemento, crearElemento } from '../librerias/APIElementosHTML.js';

export class RecuadroArrastrable{
    #id;
    #titulo;
    #contenido;
    #recuadro;
    #botonCerrar;

    constructor(id, titulo, contenido){
        this.#id = id;
        this.#titulo = this.#crearTitulo(titulo);
        this.#contenido = this.#crearContenido(contenido);
        this.#botonCerrar = this.#crearBotonCerrar();
        this.#recuadro = this.#crearRecuadro();
    }

    #crearRecuadro(){
        let recuadro = crearElemento("div", "", "id", this.#id);
        let headRecuadro = crearElemento("div", "", "class", "row headerRecuadro");
        let divBotonCerrar = crearElemento("div", "", "class", "col-1");
        let divTitulo = crearElemento("div", "", "class", "col offset-3");
        let separador = crearElemento("br", "");
        let bodyRecuadro = crearElemento("div", "", "class", "row bodyRecuadro");

        let attrRecuadro = {"style": "width:16em; background-color: #FF4242;position:fixed; box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);", "class": "draggable"}
        modificarAtributoElemento(recuadro, attrRecuadro);
        divTitulo.setAttribute("style", "font-weight: bold;");


        divBotonCerrar.appendChild(this.#botonCerrar);
        headRecuadro.appendChild(divBotonCerrar);
        divTitulo.appendChild(this.#titulo);
        headRecuadro.appendChild(divTitulo);

        bodyRecuadro.appendChild(this.#contenido);

        recuadro.appendChild(headRecuadro);
        recuadro.appendChild(separador);        
        recuadro.appendChild(bodyRecuadro);
        return recuadro;
    }

    #crearTitulo(titulo){
        let divTitulo = crearElemento("div", titulo );

        return divTitulo;
    }

    #crearContenido(content){
        let divContenido = crearElemento("div", "" );
        if(content != null){
            divContenido.appendChild(content);
        }

        return divContenido;
    }

    #crearBotonCerrar(){
        let btnCerrar = crearElemento("button", "x", "id", "cerrar" + this.#id);
        return btnCerrar;
    }

    cerrarRecuadro(callback){
        this.#botonCerrar.addEventListener("click",callback);
    }

    getId(){
        return this.#id;
    }

    getTitulo(){
        return this.#titulo;
    }

    getContenido(){
        return this.#contenido;
    }

    getRecuadro(){
        return this.#recuadro;
    }

    getBotonCerrar(){
        return this.#botonCerrar;
    }

    setId(id){
        this.#id = id;
    }

    setTitulo(titulo){
        this.#titulo = titulo;
    }

    setContenido(contenido){
        this.#contenido = contenido;
        let contenidoCuadro = document.querySelector("#"+this.#id);
        let body = contenidoCuadro.querySelector(".bodyRecuadro");
        contenidoCuadro.removeChild(body);
        let nuevoBody = crearElemento("div", "", "class", "row bodyRecuadro");
        nuevoBody.appendChild(this.#contenido);
        contenidoCuadro.appendChild(nuevoBody);
    }   

    setRecuadro(recuadro){
        this.#recuadro = recuadro;
    }

    setBotonCerrar(botonCerrar){
        this.#botonCerrar = botonCerrar;
        
    }

}