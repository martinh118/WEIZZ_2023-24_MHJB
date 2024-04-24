import { RecuadroArrastrable } from '../../SRC/clases/RecuadroArrastrable.js';
import { crearElemento, crearDobleElemento, añadirHijos, añadirMismoAtributos } from '../../SRC/librerias/APIElementosHTML.js';


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

function obtenerElementosDisponibles() {
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