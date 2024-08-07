//CREAR ETIQUETAS HTML CON TEXTO Y ATRIBUTOS EN LOS PARAMETROS DE ENTRADA
export function crearElemento(etiqueta, texto, atributo = undefined, valorAtributo = undefined) {
    //CREA EL ELEMENTO ESPECIFICADO EN "etiqueta".
    let eti = document.createElement(etiqueta);
    if (texto) {
        //CREA UN NODO DE TEXTO CON EL TEXTO ESPECIFICADO EN "texto".
        let tex = document.createTextNode(texto);
        //CREA UN HIJO EN EL PRIMER ELEMENTO CREADO ("eti") CON EL CONTENIDO DEL NODO DE TEXTO ("tex").
        eti.appendChild(tex);
    }
    if (atributo != undefined && valorAtributo != undefined) {
        //AÑADE AL PRIMER ELEMENTO CREADO ("eti") LOS ATRIBUTOS SELECCIONADOS EN "atributo" y "valorAtributo".
        eti.setAttribute(atributo, valorAtributo);
    }
    return eti;
}
//CREAR DIRECTAMENTE UN ELEMENTO DENTRO DE OTRO
export function crearDobleElemento(elementoPrincipal, subElemento, texto, atributo = undefined, valorAtributo = undefined) {
    //CREA EL ELEMENTO ESPECIFICADO EN "etiqueta".
    let etiPrincipal = document.createElement(elementoPrincipal);
    let subEti = document.createElement(subElemento);
    if (texto) {
        //CREA UN NODO DE TEXTO CON EL TEXTO ESPECIFICADO EN "texto".
        let tex = document.createTextNode(texto);
        //CREA UN HIJO EN EL PRIMER ELEMENTO CREADO ("eti") CON EL CONTENIDO DEL NODO DE TEXTO ("tex").
        subEti.appendChild(tex);
    }
    if (atributo != undefined && valorAtributo != undefined) {
        //AÑADE AL PRIMER ELEMENTO CREADO ("eti") LOS ATRIBUTOS SELECCIONADOS EN "atributo" y "valorAtributo".
        subEti.setAttribute(atributo, valorAtributo);
    }
    etiPrincipal.appendChild(subEti);
    return etiPrincipal;
}
//AÑADIR MISMO ATRIBUTO A UNA LISTA DE ELEMENTOS
export function añadirMismoAtributos(nombreAtributo, valorAtributo, elementos) {
    for (let element of elementos) {
        element.setAttribute(nombreAtributo, valorAtributo);
    }
}
//MODIFICAR ATRIBUTOS DE UN ELEMENTO A PARTIR DE UN OBJETO 
export function modificarAtributoElemento(elemento, atributos) {
    for (let a in atributos) {
        elemento.setAttribute(a, atributos[a]);
    }
}
//AÑADIR MULTIPLES ELEMENTOS HIJO A UN ELEMENTO PADRE
export function añadirHijos(elementoPadre, hijos) {
    for (let h of hijos) {
        elementoPadre.appendChild(h);
    }
}
//MOVER ELEMENTOS
export function moverElemento(elemento1, ubicacion, elemento2) {
    switch (ubicacion) {
        case "beforebegin":
            elemento2.insertAdjacentElement("beforebegin", elemento1);
            break;
        case "afterbegin":
            elemento2.insertAdjacentElement("afterbegin", elemento1);
            break;
        case "beforeend":
            elemento2.insertAdjacentElement("beforeend", elemento1);
            break;
        case "afterend":
            elemento2.insertAdjacentElement("afterend", elemento1);
            break;
    }
}
//# sourceMappingURL=APIElementosHTML.js.map