import { mostrarContenidoCSS, abrirRecuadro } from "./config_mostrar_estilo.js";
import { eventosContainerHijo } from "./arrastrar_elementos.js";
import { proyecto } from "./editor_proyecto.js";

/**
 * Aplica un eventListener "input" al objeto pasado como parametro de entrada para detectar cuando su contenido ha sido cambiado. 
 * Dependiendo del identificador de este, llama a una función u otra.
 * Esta función esta hecho para los objetos tipo Elementos.
 * @param {Elemento} elementoObjeto Elemento al que se le aplica el eventListener.
 */
export function aplicarEventoOnChange(elementoObjeto) {
  if (elementoObjeto != null) {

    let elemento = elementoObjeto.getElementoDom();
    let idElemento = elemento.id;

    if (idElemento.includes("Titulo") || idElemento.includes("Texto")) {
      elemento.addEventListener("input", function () {
        cambiarContenidoTitulo(elementoObjeto, elemento);

      })
    }

    if (idElemento.includes("Lista")) {
      elemento.addEventListener("input", function () {
        cambiarContenidoLista(elementoObjeto, elemento);
      })
    }

    if (idElemento.includes("Tabla")) {
      elemento.addEventListener("input", function () {
        cambiarContenidoTabla(elementoObjeto, elemento);
      })
    }

  }
}

/**
 * Actualiza el contenido del recuadro de configuración del estilo cada vez que el contenido de texto del elemento
 * Titulo o Texto es modificado. 
 * @param {Elemento} elementoObjeto Elemento Texto o Titulo.
 * @param {DOMObject} elemento
 */
function cambiarContenidoTitulo(elementoObjeto, elemento) {
  elementoObjeto.setContenido(elemento.innerHTML);
  let contenido = mostrarContenidoCSS(elemento);
  abrirRecuadro(contenido);
  eventosContainerHijo(elemento.parentNode, proyecto);

}

/**
 * Actualiza el contenido del recuadro de configuración del estilo cada vez que el contenido de texto del elemento
 * Lista es modificado. 
 * @param {Elemento} elementoObjeto Elemento Lista.
 * @param {DOMObject} elemento
 */
function cambiarContenidoLista(elementoObjeto, elemento) {
  let content = elemento.children;
  let arrCont = [];
  for (const cont of content) {
    arrCont.push(cont.innerHTML.toString())
  }
  elementoObjeto.setItemsContent(arrCont);
  let contenido = mostrarContenidoCSS(elemento);
  abrirRecuadro(contenido);
  eventosContainerHijo(elemento.parentNode, proyecto)
}

/**
 * Actualiza el contenido del recuadro de configuración del estilo cada vez que el contenido de texto del elemento
 * Tabla es modificado. 
 * @param {Elemento} elementoObjeto Elemento Tabla.
 * @param {DOMObject} elemento
 */
function cambiarContenidoTabla(elementoObjeto, elemento) {
  let object = {}

  for (const t of elemento.children) {
    if (t.tagName.includes("THEAD")) {
      let trHead = t.children;
      let arrHead = [];
      for (const th of trHead[0].children) {
        arrHead.push(th.innerHTML);
      }
      object['thead'] = arrHead;
    } else {
      let trBody = t.children;
      for (let index = 0; index < trBody.length; index++) {        
        let arrBody = [];
        for (const td of trBody[index].children) {
          arrBody.push(td.innerHTML);
        }
        object["tbody-" + index] = arrBody;
      }
    }
  }

  elementoObjeto.setContenido(object);
  
}