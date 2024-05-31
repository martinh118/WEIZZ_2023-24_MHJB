import { RecuadroArrastrable } from '../../SRC/clases/RecuadroArrastrable.js';
import { crearElemento } from '../../SRC/librerias/APIElementosHTML.js';
import { modificarAtributoElemento } from '../../SRC/librerias/APIElementosHTML.js';
import { mostrarContenidoCSS, abrirRecuadro } from './config_mostrar_estilo.js';

/**
 * Muestra recuadro con las capas aplicadas actualmente en el proyecto.
 * Aplica la configuración de eventos para poder arrastrar el elemento alrededor de la página.
 */
$("#mostrarCapas").click(abrirRecuadroCapas);

/**
 * Obtiene de manera ordenada todas las capas aplicadas en el proyecto.
 * @returns contenidoCompleto: Devuelve un div que muestra todos los elementos creados para que el usuario visualice las capas del proyecto.
 */
function obtenerCapasProyecto() {
  let contenidoCompleto = crearElemento("div", "", "id", "contenidoRecuadroCapas");
  let atributos = {
    "style": "width:16em; background-color: #FF4242;",
    "class": "accordion"
  }
  modificarAtributoElemento(contenidoCompleto, atributos);

  contenidoCompleto.appendChild(crearCapasHeader());
  contenidoCompleto.appendChild(crearCapasBody());
  contenidoCompleto.appendChild(crearCapasFooter());

  return contenidoCompleto;
}

/**
 * Obtiene de manera ordenada todas las capas aplicadas en la zona Header del proyecto.
 * @returns rowHeader: Devuelve un div que muestra todos los elementos creados para que el usuario visualice las capas en la zona Header del proyecto.
 */
function crearCapasHeader() {
  let rowHeader = crearElemento("div", "", "class", "accordion-item");


  let divPrincipalBody = crearBodyItem("HEADER");

  let divHijoBody = crearElemento("div", "", "class", "accordion-body");
  let divHeader = document.getElementById("rowHeaderProject")

  crearContenidoRecuadro(divHijoBody, divHeader, 14, "#6D6C6C")
  divPrincipalBody.appendChild(divHijoBody);


  rowHeader.appendChild(crearHeaderItem("HEADER"));
  rowHeader.appendChild(divPrincipalBody);

  return rowHeader;
}

/**
 * Obtiene de manera ordenada todas las capas aplicadas en la zona Body del proyecto.
 * @returns rowHeader: Devuelve un div que muestra todos los elementos creados para que el usuario visualice las capas en la zona Body del proyecto.
 */
function crearCapasBody() {
  let rowHeader = crearElemento("div", "", "class", "accordion-item");

  let divPrincipalBody = crearBodyItem("BODY");

  let divHijoBody = crearElemento("div", "", "class", "accordion-body");
  let divHeader = document.getElementById("rowBodyProject")

  crearContenidoRecuadro(divHijoBody, divHeader, 14, "#6D6C6C")
  divPrincipalBody.appendChild(divHijoBody);


  rowHeader.appendChild(crearHeaderItem("BODY"));
  rowHeader.appendChild(divPrincipalBody);

  return rowHeader;
}

/**
 * Obtiene de manera ordenada todas las capas aplicadas en la zona Footer del proyecto.
 * @returns rowHeader: Devuelve un div que muestra todos los elementos creados para que el usuario visualice las capas en la zona Footer del proyecto.
 */
function crearCapasFooter() {
  let rowHeader = crearElemento("div", "", "class", "accordion-item");

  let divPrincipalBody = crearBodyItem("FOOTER");

  let divHijoBody = crearElemento("div", "", "class", "accordion-body");
  let divHeader = document.getElementById("rowFooterProject")

  crearContenidoRecuadro(divHijoBody, divHeader, 14, "#6D6C6C")
  divPrincipalBody.appendChild(divHijoBody);

  rowHeader.appendChild(crearHeaderItem("FOOTER"));
  rowHeader.appendChild(divPrincipalBody);

  return rowHeader;
}

/**
 * Función recursivo para obtener todos los elementos de la zona del proyecto seleccionado y crear el contenido de este.
 * @param {DOMElement} divPrincipal Zona del proyecto seleccionado.
 * @param {DOMElement} elemento Elemento seleccionado del cual se comprueba sus predecesores.
 * @param {number} width Ancho de recuadro de los elementos detectados a mostrar.
 * @param {String} color Color del qual se muestra el recuadro.
 */
function crearContenidoRecuadro(divPrincipal, elemento, width, color) {
  if (elemento.id) {
    let clases = elemento.getAttribute("class");
    if (elemento.id.includes("FilaRow") || clases.includes("FilaContenedor") || clases.includes("containerHijo") || clases.includes("element")) {
      let divMostrar
      let contenidoTexto;
      if (clases.includes("element")) {
        contenidoTexto = devolverNombreElemento(elemento.tagName);
      } else if (clases.includes("containerHijo")) {
        contenidoTexto = elemento.id.split(".")[1];
      }
      else {
        contenidoTexto = elemento.id;
      }
      divMostrar = crearElemento("div", contenidoTexto, "style", `width: ${width}em; height: 2em;background-color: ${color}; border: 2px solid black; font-weight: bold; `);
      divMostrar.setAttribute("data-idElemento", elemento.id);
      
      if (clases.includes("element")) añadirEventListenerEstilo(divMostrar, elemento.id)
      // divMostrar.setAttribute("class", "offset-3");
      divPrincipal.appendChild(divMostrar);
    }
    Array.from(elemento.children).forEach(child => {
      let colorOscuro = oscurecerColor(color, -20);
      crearContenidoRecuadro(divPrincipal, child, width - 1, colorOscuro);
    });
  }

}

/**
 * Añade un eventListener para abrir la configuración de estilo del elemento seleccionado en la tabla de capas.
 * @param {DOMElement} elementoDiv Elemento DOM al que se le aplica el eventListener
 * @param {String} id identificador del Elemento DOM. 
 */
function añadirEventListenerEstilo(elementoDiv, id){
  elementoDiv.addEventListener("click", function(){
    let target = document.getElementById(id);
    let contenido = mostrarContenidoCSS(target);
    abrirRecuadro(contenido);
  })
}

/**
 * Crea los elemento accordion para mostrar el contenido de la zona del proyecto.
 * @param {String} titulo Titulo al que se le aplica al accordion. 
 * @returns {DOMElement} Elemento accordion
 */
function crearBodyItem(titulo) {
  let divPrincipalBody = crearElemento("div", "", "class", "accordion-collapse collapse show");
  let attrDivPrincipal = {
    "id": "panel" + titulo,
    "aria-labelledby": "panel" + titulo,
    "style": "overflow-y: scroll; scroll-behavior: smooth; height: 200px"
  }
  divPrincipalBody.addEventListener('shown.bs.collapse', function (event) {
    modificarAtributoElemento(divPrincipalBody, attrDivPrincipal);
  }
  );

  modificarAtributoElemento(divPrincipalBody, attrDivPrincipal);
  return divPrincipalBody;
}

/**
 * Crea el encabezado del accordion.
 * @param {String} titulo Titutlo al que se le aplica al accordion.
 * @returns {DOMElement} Elemento accordion.
 */
function crearHeaderItem(titulo) {
  let tituloH2 = crearElemento("h2", "", "class", "accordion-header");
  let buttonHeader = crearElemento("button", titulo, "class", "accordion-button");
  let atributosButton = {
    "type": "button",
    "data-bs-toggle": "collapse",
    "data-bs-target": "#panel" + titulo,
    "aria-expanded": "false",
    "aria-controls": "panel" + titulo,
    "style": "width:16em; height:2em;font-weight: bold; background-color: #6D6C6C; border: 2px solid black;"
  }

  modificarAtributoElemento(buttonHeader, atributosButton);

  tituloH2.appendChild(buttonHeader);
  return tituloH2;
}

/**
 * Reestructura el codigo rgb para oscurecer el color pasado como parametro de entrada.
 * @param {string} color codigo rgb de color.
 * @param {number} cant Cantidad a la que se le reduce el color.
 * @returns {String} codigo rgb de color.
 */
function oscurecerColor(color, cant) {
  //voy a extraer las tres partes del color
  var rojo = color.substr(1, 2);
  var verd = color.substr(3, 2);
  var azul = color.substr(5, 2);

  //voy a convertir a enteros los string, que tengo en hexadecimal
  var introjo = parseInt(rojo, 16);
  var intverd = parseInt(verd, 16);
  var intazul = parseInt(azul, 16);

  //ahora verifico que no quede como negativo y resto
  if (introjo - cant >= 0) introjo = introjo - cant;
  if (intverd - cant >= 0) intverd = intverd - cant;
  if (intazul - cant >= 0) intazul = intazul - cant;

  //voy a convertir a hexadecimal, lo que tengo en enteros
  rojo = introjo.toString(16);
  verd = intverd.toString(16);
  azul = intazul.toString(16);

  //voy a validar que los string hexadecimales tengan dos caracteres
  if (rojo.length < 2) rojo = "0" + rojo;
  if (verd.length < 2) verd = "0" + verd;
  if (azul.length < 2) azul = "0" + azul;

  //voy a construir el color hexadecimal
  var oscuridad = "#" + rojo + verd + azul;

  //la función devuelve el valor del color hexadecimal resultante
  return oscuridad;
}

/**
 * Abre el recuadro capas.
 */
function abrirRecuadroCapas() {
  var selection = document.querySelector('#cuadroCapas') !== null;

  if (!selection) {

    let offsetX, offsetY, isDragging = false;
    let content = obtenerCapasProyecto();
    let cuadroCapas = new RecuadroArrastrable("cuadroCapas", "Capas", content);
    let elementoCapas = cuadroCapas.getRecuadro();
    let cerrarElementoCapas;

    elementoCapas.style.left = 2 + "em";
    elementoCapas.style.top = 15 + "em";
    document.body.appendChild(elementoCapas);


    cerrarElementoCapas = document.getElementById("cerrarcuadroCapas");
    cerrarElementoCapas.addEventListener("click", function () {

      let cuadro = document.getElementById("cuadroCapas");
      cuadro.remove();
    });

    elementoCapas.addEventListener('mousedown', (e) => {
      isDragging = true;
      offsetX = e.clientX - elementoCapas.getBoundingClientRect().left;
      offsetY = e.clientY - elementoCapas.getBoundingClientRect().top;
    });

    document.addEventListener('mousemove', (e) => {
      e.preventDefault;
      if (isDragging) {
        const x = e.clientX - offsetX;
        const y = e.clientY - offsetY;

        elementoCapas.style.left = x + 'px';
        elementoCapas.style.top = y + 'px';
      }
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
    });


  }
}

/**
 * Devuelve el nombre a mostrar dependiendo del tagname html que se pasa como parametro.
 * @param {String} tagName 
 * @returns {String} Nombre seleccionado.
 */
function devolverNombreElemento(tagName) {
  switch (tagName) {
    case "H1":
      return "TITULO"
    case "TABLE":
      return "TABLA"
    case "UL":
      return "LISTA";
    case "P":
      return "TEXTO";
    case "IMG":
      return "IMAGEN";
    default:
      return undefined;
  }
}