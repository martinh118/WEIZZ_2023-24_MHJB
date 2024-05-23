import { aplicarCambios } from "./libreria_cambiar_estilo_elementos.js";
import { aplicarEventoMostrarEstilo, mostrarContenidoCSS, abrirRecuadro } from "./config_mostrar_estilo.js";
import { aplicarEventosArrastrar, eventosContainerHijo } from "./arrastrar_elementos.js";
import { proyecto } from "./editor_proyecto.js";

export function aplicarEventoOnChange(elementoObjeto) {
  if (elementoObjeto != null) {

    let elemento = elementoObjeto.getElementoDom();
    let idElemento = elemento.id;

    if (idElemento.includes("Titulo") || idElemento.includes("Texto")) {
      elemento.addEventListener("input", function () {
        cambiarContenidoTitulo(elementoObjeto, elemento);
        let contenido = mostrarContenidoCSS(elemento);
        abrirRecuadro(contenido);

        eventosContainerHijo(elemento.parentNode,proyecto)
      })
    }

    // aplicarCambios(elemento);
    // aplicarEventoMostrarEstilo();
  }
}

function cambiarContenidoTitulo(elementoObjeto, elemento) {
  elementoObjeto.setContenido(elemento.innerHTML);
  // elementoObjeto.rewriteHTML();

}

function cambiarContenidoTabla(elementoObjeto) {
  console.log(elementoObjeto);
}


function cambiarContenidoLista(elementoObjeto) {
  console.log(elementoObjeto);

}