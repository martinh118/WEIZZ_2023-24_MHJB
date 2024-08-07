import { RecuadroArrastrable } from '../../SRC/clases/RecuadroArrastrable.js';
import { proyecto } from './editor_proyecto.js';
import { encontrarPadre } from '../../SRC/librerias/gestionElementos.js';
import { crearElemento } from '../../SRC/librerias/APIElementosHTML.js';
import { cambiarEstiloTitulo, cambiarEstiloTabla, cambiarEstiloImagen, cambiarEstiloLista, aplicarCambios } from './libreria_cambiar_estilo_elementos.js'
import { mostrarTablaElementos } from './config_mostrar_elementos.js';
import { aplicarListenersFilaContainer } from './aplicar_event_listener.js';
import { mostrarConfigEstiloBackground, listenerGuardarEstiloFilaBackground, listenerReiniciarEstiloFilaBackground } from './config_background_filas.js';
import { aplicarEventoOnChange } from './config_cambiar_contenido.js';
import { aplicarEventosArrastrar } from './arrastrar_elementos.js';
import { encontrarObjetoElemento } from '../../SRC/librerias/gestionElementos.js';

var cuadroEstilo = undefined;
/**
 * Aplica eventListener para abrir el recuadro de estilo.
 */
$("#mostrarEstilo").click(function () {
  abrirRecuadro(null);
});

aplicarEventoMostrarEstilo();

/**
 * Muestra el recuadro flotante de configuración de estilo CSS.
 */
export function aplicarEventoMostrarEstilo() {
  let contenedoresHijo = document.querySelectorAll(".containerHijo");
  let botonesEstilosBackground = document.querySelectorAll(".estiloBackground");


  contenedoresHijo.forEach((cont) => {
    mostrarConfigEstilo(cont);
  });

  botonesEstilosBackground.forEach((boton) => {
    mostrarConfigEstiloBackground(boton);
  });

}

/**
 * Aplica eventListener a los Containers para abrir el recuadro de configuración de estilo.
 * @param {DOMElement} contenedor Container seleccionado
 */
export function mostrarConfigEstilo(contenedor) {
  contenedor.addEventListener("click", function (event) { eventListener(event) });
  // contenedor.firstChild.addEventListener("click", function (event) {eventListener(event)});

  function eventListener(event) {
    let contenido = null;
    let elemento;

    if ($(event.target).attr("class")) {
      if ($(event.target).attr("class").includes("containerHijo")) {

        let hijoContainerHijo = $(event.target).children()[0];
        if ($(hijoContainerHijo).attr('class').includes("element")) {
          elemento = hijoContainerHijo

        }

      } else if ($(event.target).attr("class").includes("element")) {
        elemento = event.target;
      }
    }

    if (elemento != undefined) {
      contenido = mostrarContenidoCSS(elemento);
      abrirRecuadro(contenido);
    } else mostrarTablaElementos();
  }

}

/**
 * Obtiene el objeto en especifico del elemento y llama a la función para obtener las opciones de editar el CSS.
 * @param {DOMElement} elemento Elemento seleccionado
 * @returns {DOMElement} divPrincipal: Devuelve el div con las opciones de configuración del estilo CSS.
 */
export function mostrarContenidoCSS(elemento) {
  let elementoObject = encontrarObjetoElemento(elemento)
  let divPrincipal = crearElemento("div", "");
  divPrincipal.innerHTML = elementoObject.obtenerConfigEstilo();
  return divPrincipal;


}



/**
 * Abre el recuadro del estilo del objeto con el contenido del objeto dependiendo del elemento
 * @param {*} contenido Contenido devuelto por el objeto a partir de una función propia.
 */
export function abrirRecuadro(contenido) {
  var selection = document.querySelector('#cuadroEstilo') !== null;

  if (!selection) {

    let offsetX, offsetY, isDragging = false;
    cuadroEstilo = new RecuadroArrastrable("cuadroEstilo", "Estilo", contenido);
    let elementoEstilo = cuadroEstilo.getRecuadro();
    let cerrarElementoEstilo;

    elementoEstilo.style.left = 65 + "em";
    elementoEstilo.style.top = 10 + "em";
    document.body.appendChild(elementoEstilo);


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


  } else if (selection) {
    cuadroEstilo.setContenido(contenido);
  }

  listenerGuardarEstilo();
  listenerReiniciarEstilo();

  listenerGuardarEstiloFilaBackground();
  listenerReiniciarEstiloFilaBackground();
}

/**
 * Aplica el eventListener al botón de guardar para actualizar el estilo del elemento seleccionado.
 */
function listenerGuardarEstilo() {

  $(".guardarEstiloElemento").click(function () {
    let idElemento = $(".idElemento").html();
    let elemento = document.getElementById(idElemento);
    if (elemento != null) {

      let elementoObjecto = encontrarObjetoElemento(elemento);

      if (idElemento.includes("Titulo")) {
        cambiarEstiloTitulo(elementoObjecto);
      }

      if (idElemento.includes("Texto")) {
        cambiarEstiloTitulo(elementoObjecto);
      }

      if (idElemento.includes("Tabla")) {
        cambiarEstiloTabla(elementoObjecto);
      }

      if (idElemento.includes("Imagen")) {
        cambiarEstiloImagen(elementoObjecto);
      }

      if (idElemento.includes("Lista")) {
        cambiarEstiloLista(elementoObjecto);
      }

      aplicarEventoOnChange(elementoObjecto);
      aplicarCambios(elemento);
      aplicarEventoMostrarEstilo();
      aplicarEventosArrastrar(proyecto);

      let filaRowDom = encontrarPadre(elemento, "id", "FilaRow");
      let filaContenedorDom = encontrarPadre(elemento, "class", "FilaContenedor");

      let filaRowObject = proyecto.getFilaRow(filaRowDom.id);

      if (filaRowObject != undefined) {
        let filaContenedorObject = filaRowObject.getFilaContenedorUnico(filaContenedorDom.id);
        aplicarListenersFilaContainer(filaContenedorObject, proyecto);
      }
    }

  });

}

/**
 * Aplica el eventListener al botón de reiniciar para actualizar el estilo del elemento seleccionado al estilo por defecto.
 */
function listenerReiniciarEstilo() {
  $(".resetEstiloElemento").click(function () {
    let idElemento = $(".idElemento").html();
    let elemento = document.getElementById(idElemento);
    if (elemento != null) {
      let elementoObjecto = encontrarObjetoElemento(elemento);

      elementoObjecto.reiniciarEstilo();

      aplicarCambios(elemento);
      aplicarEventoMostrarEstilo();

      let filaRowDom = encontrarPadre(elemento, "id", "FilaRow");
      let filaContenedorDom = encontrarPadre(elemento, "class", "FilaContenedor");

      let filaRowObject = proyecto.getFilaRow(filaRowDom.id);

      if (filaRowObject != undefined) {
        let filaContenedorObject = filaRowObject.getFilaContenedorUnico(filaContenedorDom.id);
        aplicarListenersFilaContainer(filaContenedorObject, proyecto);
      }

      let divPrincipal = crearElemento("div", "");
      divPrincipal.innerHTML = elementoObjecto.obtenerConfigEstilo();
      abrirRecuadro(divPrincipal);
    }
  });
}

