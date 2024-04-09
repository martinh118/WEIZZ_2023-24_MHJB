import { Proyecto } from '../SRC/clases/Proyecto.js';
import { RecuadroArrastrable } from '../SRC/clases/RecuadroArrastrable.js';
import { crearElemento, crearDobleElemento, añadirHijos, añadirMismoAtributos} from '../SRC/librerias/APIElementosHTML.js';



/**
 * Muestra recuadro con las capas aplicadas actualmente en el proyecto.
 * Aplica la configuración de eventos para poder arrastrar el elemento alrededor de la página.
 */
$("#mostrarCapas").click(function () {
  var selection = document.querySelector('#cuadroCapas') !== null;

  if (!selection) {

    let offsetX, offsetY, isDragging = false;
    let content = obtenerCapasProyecto();
    let cuadroCapas = new RecuadroArrastrable("cuadroCapas", "Capas", content);
    let elementoCapas = cuadroCapas.getRecuadro();
    let cerrarElementoCapas;

    elementoCapas.style.left = 2 + "em";
    elementoCapas.style.top = 15 + "em";
    $("#proyecto").append(elementoCapas);


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
});

$("#mostrarElementos").click(function () {
  var selection = document.querySelector('#cuadroElementos') !== null;

  if (!selection) {


    let offsetX, offsetY, isDragging = false;
    let content = obtenerElementosDisponibles();
    let cuadroElementos = new RecuadroArrastrable("cuadroElementos", "Elementos", content);
    let elementoElementos = cuadroElementos.getRecuadro();
    let cerrarElementoElementos;

    elementoElementos.style.left = 2 + "em";
    elementoElementos.style.top = 25 + "em";
    $("#proyecto").append(elementoElementos);


    cerrarElementoElementos = document.getElementById("cerrarcuadroElementos");
    cerrarElementoElementos.addEventListener("click", function () {

      let cuadro = document.getElementById("cuadroElementos");
      cuadro.remove();
    });

    elementoElementos.addEventListener('mousedown', (e) => {
      isDragging = true;
      offsetX = e.clientX - elementoElementos.getBoundingClientRect().left;
      offsetY = e.clientY - elementoElementos.getBoundingClientRect().top;
    });

    document.addEventListener('mousemove', (e) => {
      e.preventDefault;
      if (isDragging) {
        const x = e.clientX - offsetX;
        const y = e.clientY - offsetY;

        elementoElementos.style.left = x + 'px';
        elementoElementos.style.top = y + 'px';
      }
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
    });


  }
});

$("#mostrarEstilo").click(function () {
  var selection = document.querySelector('#cuadroEstilo') !== null;

  if (!selection) {

    let offsetX, offsetY, isDragging = false;
    let cuadroEstilo = new RecuadroArrastrable("cuadroEstilo", "Estilo", null);
    let elementoEstilo = cuadroEstilo.getRecuadro();
    let cerrarElementoEstilo;

    elementoEstilo.style.left = 60 + "em";
    elementoEstilo.style.top = 15 + "em";
    $("#proyecto").append(elementoEstilo);


    cerrarElementoEstilo = document.getElementById("cerrarcuadroEstilo");
    cerrarElementoEstilo.addEventListener("click", function () {

      let cuadro = document.getElementById("cuadroEstilo");
      cuadro.remove();
    });

    elementoEstilo.addEventListener('mousedown', (e) => {
      isDragging = true;
      offsetX = e.clientX - elementoEstilo.getBoundingClientRect().left;
      offsetY = e.clientY - elementoEstilo.getBoundingClientRect().top;
    });

    document.addEventListener('mousemove', (e) => {
      e.preventDefault;
      if (isDragging) {
        const x = e.clientX - offsetX;
        const y = e.clientY - offsetY;

        elementoEstilo.style.left = x + 'px';
        elementoEstilo.style.top = y + 'px';
      }
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
    });


  }
});

/**
 * Cierra todas los recuadros que esten actualmente abiertas.
 */
$("#cerrarPestañas").click(function () {
  var selectionEstilo = document.querySelector('#cuadroEstilo') !== null;
  var selectionElementos = document.querySelector('#cuadroElementos') !== null;
  var selectionCapas = document.querySelector('#cuadroCapas') !== null;
  let cuadroEstilo;
  let cuadroElementos;
  let cuadroCapas;

  if (selectionEstilo) {
    cuadroEstilo = document.querySelector('#cuadroEstilo');
    cuadroEstilo.remove();
  }
  if (selectionElementos) {
    cuadroElementos = document.querySelector('#cuadroElementos');
    cuadroElementos.remove();
  }
  if (selectionCapas) {
    cuadroCapas = document.querySelector('#cuadroCapas');
    cuadroCapas.remove();
  }

});

/**
 * Obtiene de manera ordenada todas las capas aplicadas en el proyecto.
 * @returns contenidoCompleto: Devuelve un div que muestra todos los elementos creados para que el usuario visualice las capas del proyecto.
 */
function obtenerCapasProyecto() {
  let contenidoCompleto = crearElemento("div", "", "id", "contenidoRecuadroCapas");
  contenidoCompleto.setAttribute("style", "width:15em; background-color: #FF4242;");

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
  let rowHeader = crearElemento("div", "", "class", "row");
  let colTituloHeader = crearDobleElemento("div", "div", "Header", "style", "width:15em; height:2em;font-weight: bold; background-color: #6D6C6C; border: 2px solid black;")

  function hijosRowHeader() {
    let rowPrincipalHeader = crearElemento("div", "", "class", "row");

    let firstCol = crearElemento("div", "Container Header", "style", "width:14em; height:2em; background-color: #A8A8A8; border: 2px solid black;");
    let proyecto = document.getElementById("proyecto");
    let containerHeader = proyecto.querySelectorAll("#principalContainers-FilaContenedor-Header-1");
    let hijosHeader = containerHeader[0].children;

    firstCol.setAttribute("class", "offset-1");

    rowPrincipalHeader.appendChild(firstCol);
    for (const cont of hijosHeader) {

      let rowCont = crearElemento("div", "", "class", "row");
      let idElement = cont.id.split(".")[1];
      let contenidoRow = crearElemento("div", idElement, "style", "width:13em; height:2em; background-color: #C7C6C6; border: 2px solid black;");

      contenidoRow.setAttribute("class", "offset-2");

      rowCont.appendChild(contenidoRow);
      rowPrincipalHeader.appendChild(rowCont);

    }

    // console.log(hijosHeader);

    return rowPrincipalHeader;
  }

  rowHeader.appendChild(colTituloHeader);
  rowHeader.appendChild(hijosRowHeader());

  return rowHeader;
}

/**
 * Obtiene de manera ordenada todas las capas aplicadas en la zona Body del proyecto.
 * @returns rowHeader: Devuelve un div que muestra todos los elementos creados para que el usuario visualice las capas en la zona Body del proyecto.
 */
function crearCapasBody() {
  let rowBody = crearElemento("div", "", "class", "row");
  let colTituloBody = crearDobleElemento("div", "div", "Body", "style", "font-weight: bold;width:15em; height:2em; background-color: #6D6C6C; border: 2px solid black;")

  function hijosRowBody() {
    let rowPrincipalBody = crearElemento("div", "", "class", "row");

    let proyecto = document.getElementById("proyecto");
    let containersBody = proyecto.querySelector("#rowBodyProject1");
    let index = 1;
    for (const container of containersBody.children) {

      let rowContainer = crearElemento("div", "", "class", "row");
      let idContainer = container.id.split("-");
      let tituloContainer = crearElemento("div", idContainer[1] + "-" + index, "style", "width:14em; height:2em; background-color: #A8A8A8; border: 2px solid black;");

      tituloContainer.setAttribute("class", "offset-1");

      let guardaElementos = container.children[1];
      let elementos = guardaElementos.children;
      rowContainer.appendChild(tituloContainer);

      for (const element of elementos) {
        let rowElemento = crearElemento("div", "", "class", "row");
        let idElement = element.id.split(".")[1];
        let colElemento = crearElemento("div", idElement + "-" + index, "style", "width:13em; height:2em; background-color: #C7C6C6; border: 2px solid black;");
        colElemento.setAttribute("class", "offset-3");

        rowElemento.appendChild(colElemento);
        rowContainer.appendChild(rowElemento);
      }

      rowPrincipalBody.appendChild(rowContainer);
      index++;
    }



    return rowPrincipalBody;
  }

  rowBody.appendChild(colTituloBody);
  rowBody.appendChild(hijosRowBody());

  return rowBody;
}

/**
 * Obtiene de manera ordenada todas las capas aplicadas en la zona Footer del proyecto.
 * @returns rowHeader: Devuelve un div que muestra todos los elementos creados para que el usuario visualice las capas en la zona Footer del proyecto.
 */
function crearCapasFooter() {
  let rowFooter = crearElemento("div", "", "class", "row");
  let colTituloFooter = crearDobleElemento("div", "div", "Footer", "style", "width:15em; height:2em;font-weight: bold; background-color: #6D6C6C; border: 2px solid black;")

  function hijosRowFooter() {
    let rowPrincipalFooter = crearElemento("div", "", "class", "row");

    let firstCol = crearElemento("div", "Container Footer", "style", "width:14em; height:2em; background-color: #A8A8A8; border: 2px solid black;");
    let proyecto = document.getElementById("proyecto");
    let containerFooter = proyecto.querySelectorAll("#principalContainers-FilaContenedor-Footer-1");
    let hijosFooter = containerFooter[0].children;

    firstCol.setAttribute("class", "offset-1");

    rowPrincipalFooter.appendChild(firstCol);
    for (const cont of hijosFooter) {

      let rowCont = crearElemento("div", "", "class", "row");
      let idElement = cont.id.split(".")[1];
      let contenidoRow;
      contenidoRow = crearElemento("div", idElement, "style", "width:13em; height:2em; background-color: #C7C6C6; border: 2px solid black;");

      contenidoRow.setAttribute("class", "offset-2");

      rowCont.appendChild(contenidoRow);
      rowPrincipalFooter.appendChild(rowCont);

    }

    return rowPrincipalFooter;
  }

  rowFooter.appendChild(colTituloFooter);
  rowFooter.appendChild(hijosRowFooter());

  return rowFooter;
}

function obtenerElementosDisponibles(){
  let contenidoCompleto = crearElemento("div", "", "id", "contenidoRecuadroElementos");

  let container = crearElemento("div", "Container", "class", "elementoContainer");
  let titulo = crearElemento("div", "Titulo", "class", "elementoTitulo");
  let texto = crearElemento("div", "Texto", "class", "elementoTexto");
  let imagen = crearElemento("div", "Imagen", "class", "elementoImagen");
  let lista = crearElemento("div", "Lista", "class", "elementoLista");
  let tabla = crearElemento("div", "Tabla", "class", "elementoTabla");

  let arrElementos = [container, titulo, texto, imagen, lista, tabla];

  añadirMismoAtributos("style", "width:14em; height:2em; background-color: #A8A8A8; border: 2px solid black; margin-left: 10px; margin-bottom: 10px", arrElementos);
  añadirHijos(contenidoCompleto, arrElementos);

  return contenidoCompleto;
}

function init(){
  let proyecto = new Proyecto(1);
  $("#proyecto").html(proyecto.getHtmlBase());
}


window.onload = init();
