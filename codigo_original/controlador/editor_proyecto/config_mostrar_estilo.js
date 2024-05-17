import { RecuadroArrastrable } from '../../SRC/clases/RecuadroArrastrable.js';
import { proyecto } from './editor_proyecto.js';
import { encontrarPadre } from '../../SRC/librerias/gestionElementos.js';
import { crearElemento } from '../../SRC/librerias/APIElementosHTML.js';
import {cambiarEstiloTitulo, cambiarEstiloTabla, cambiarEstiloImagen, cambiarEstiloLista, aplicarCambios} from './libreria_cambiar_estilo_elementos.js'

var cuadroEstilo = undefined;

$("#mostrarEstilo").click(function () {
  abrirRecuadro(null);
});

aplicarEventoMostrarEstilo();

/**
 * Muestra el recuadro flotante de configuración de estilo CSS.
 */
export function aplicarEventoMostrarEstilo() {
  let contenedoresHijo = document.querySelectorAll(".containerHijo");

  contenedoresHijo.forEach((cont) => {
    mostrarConfigEstilo(cont);
  });

}


function mostrarConfigEstilo(contenedor) {
  contenedor.addEventListener("click", function (event) { eventListener(event) });
  // contenedor.firstChild.addEventListener("click", function (event) {eventListener(event)});

  function eventListener(event) {
    let contenido = null;
    let elemento;
    if ($(event.target).attr("class").includes("containerHijo")) {

      let hijoContainerHijo = $(event.target).children()[0];
      if ($(hijoContainerHijo).attr('class').includes("element")) {
        elemento = hijoContainerHijo

      }

    } else if ($(event.target).attr("class").includes("element")) {
      elemento = event.target;
    }

    contenido = mostrarContenidoCSS(elemento);
    abrirRecuadro(contenido);
  }

}

/**
 * Obtiene el objeto en especifico del elemento y llama a la función para obtener las opciones de editar el CSS.
 * @param {DOMElement} elemento Elemento seleccionado
 * @returns {DOMElement} divPrincipal: Devuelve el div con las opciones de configuración del estilo CSS.
 */
function mostrarContenidoCSS(elemento) {
  let elementoObject = encontrarObjetoElemento(elemento)
  let divPrincipal = crearElemento("div", "");
  divPrincipal.innerHTML = elementoObject.obtenerConfigEstilo();
  return divPrincipal;


}

function encontrarObjetoElemento(elemento) {
  let filaRowDom = encontrarPadre(elemento, "id", "FilaRow");
  let filaContenedorDom = encontrarPadre(elemento, "class", "FilaContenedor")
  let contenedorHijoDom = encontrarPadre(elemento, "class", "containerHijo")
  let filaRowObject;

  if (filaRowDom.id.includes("Header")) {
    filaRowObject = proyecto.getHeader(filaRowDom.id);
  } else if (filaRowDom.id.includes("Footer")) {
    filaRowObject = proyecto.getFooter(filaRowDom.id);
  } else {
    filaRowObject = proyecto.getFilaRow(filaRowDom.id);
  }

  let filaContenedorObject = filaRowObject.getFilaContenedorUnico(filaContenedorDom.id);
  let contenedorHijoObject = filaContenedorObject.getContainerUnico(contenedorHijoDom.id);

  return contenedorHijoObject.getElementoHijo();
}

/**
 * Abre el recuadro del estilo del objeto con el contenido del objeto dependiendo del elemento
 * @param {*} contenido Contenido devuelto por el objeto a partir de una función propia.
 */
function abrirRecuadro(contenido) {
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

}

function listenerGuardarEstilo() {
  $(".guardarEstiloElemento").click(function () {
    let idElemento = $(".idElemento").html();
    let elemento = document.getElementById(idElemento);
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

    aplicarCambios(elemento);
    aplicarEventoMostrarEstilo();
    // console.log(elementoObjecto);
  });
}


