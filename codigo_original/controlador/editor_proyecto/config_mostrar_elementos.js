import { RecuadroArrastrable } from '../../SRC/clases/RecuadroArrastrable.js';
import { crearElemento, añadirHijos, añadirMismoAtributos } from '../../SRC/librerias/APIElementosHTML.js';
var cuadroElementos  = undefined;
/**
 * Muestra el recuadro flotante para mostrar los elementos disponibles para aplicar en el proyecto.
 */
$("#mostrarElementos").click(mostrarTablaElementos);

export function mostrarTablaElementos(){

    var selection = document.querySelector('#cuadroElementos') !== null;

    if (!selection) {

        let offsetX, offsetY, isDragging = false;
        let content = obtenerElementosDisponibles();
        cuadroElementos = new RecuadroArrastrable("cuadroElementos", "Elementos", content);
        let elementoElementos = cuadroElementos.getRecuadro();
        let cerrarElementoElementos;

        elementoElementos.style.left = 2 + "em";
        elementoElementos.style.top = 15 + "em";
        document.body.appendChild(elementoElementos);


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

        elementoElementos.addEventListener('mouseleave', () => {
            isDragging = false;
        })


    }
}

/**
 * Crea el contenido del recuadro flotando con los elementos disponibles.
 * @returns {DOMElement} Body con los elementos disponibles.
 */
function obtenerElementosDisponibles() {
    let contenidoCompleto = crearElemento("div", "", "id", "contenidoRecuadroElementos");

    let container = crearElemento("div", "Container", "class", "selectElement");
    let titulo = crearElemento("div", "Titulo", "class", "selectElement ");
    let texto = crearElemento("div", "Texto", "class", "selectElement ");
    let imagen = crearElemento("div", "Imagen", "class", "selectElement ");
    let lista = crearElemento("div", "Lista", "class", "selectElement ");
    let tabla = crearElemento("div", "Tabla", "class", "selectElement ");

    container.setAttribute("data-elemento", "Container");
    titulo.setAttribute("data-elemento", "Titulo");
    texto.setAttribute("data-elemento", "Texto");
    imagen.setAttribute("data-elemento", "Imagen");
    lista.setAttribute("data-elemento", "Lista");
    tabla.setAttribute("data-elemento", "Tabla");


    let arrElementos = [container, titulo, texto, imagen, lista, tabla];

    añadirMismoAtributos("draggable", "true", arrElementos);
    añadirMismoAtributos("ondragstart", "dragStart(event)", arrElementos);

    añadirMismoAtributos("style", "width:14em; height:2em; background-color: #A8A8A8; border: 2px solid black; margin-left: 10px; margin-bottom: 10px; font-weight: bold; text-align: center ", arrElementos);
    añadirHijos(contenidoCompleto, arrElementos);

    return contenidoCompleto;
}