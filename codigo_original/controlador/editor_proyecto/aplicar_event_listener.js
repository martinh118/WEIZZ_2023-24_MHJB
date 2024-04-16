import { FilaContenedor } from '../../SRC/clases/FilaContenedor.js';

export function aplicarEventListener(proyecto) {
    let botonCrear = document.querySelectorAll(".botonCrear");
    let botonSubir = document.querySelectorAll(".botonSubir");
    let botonBajar = document.querySelectorAll(".botonBajar");
    let botonBorrar = document.querySelectorAll(".botonBorrar");

    botonCrear.forEach((button) => {
        crearContainer(proyecto, button)
    });

    botonSubir.forEach((button) => {
        moverArribaCont(proyecto,button);
    });

    botonBajar.forEach((button) => {
        moverAbajoCont(proyecto,button);
    });


    botonBorrar.forEach((button) => {
        borrarContianer(proyecto,button);
    });

}

function isElement(object) {
    return (
        typeof HTMLElement === "object" ? object instanceof HTMLElement : //DOM2
            object && typeof object === "object" && object !== null && object.nodeType === 1 && typeof object.nodeName === "string"
    );
}

function moverArribaCont(proyecto, button) {
    button.addEventListener('click', function () {
        let filaBotones = button.parentNode;
        let filaContenedor = filaBotones.parentNode;
        let elArriba = filaContenedor.previousSibling;
        if (isElement(elArriba)) {
            filaContenedor.insertAdjacentElement("afterend", elArriba);
            // proyecto.moverArribaContainerBody(filaContenedor);
        }
    });
}

function moverAbajoCont(proyecto, button) {
    button.addEventListener('click', function () {
        let filaBotones = button.parentNode;
        let filaContenedor = filaBotones.parentNode;
        let elAbajo = filaContenedor.nextSibling;
        if (isElement(elAbajo)) {
            filaContenedor.insertAdjacentElement("beforebegin", elAbajo);
            // proyecto.moverAbajoContainerBody(filaContenedor);
        }
    })
}

function crearContainer(proyecto, button) {
    button.addEventListener('click', function (event) {
        if (event.target.type != "button") {
            let filaBotones = button.parentNode;
            let filaContenedor = filaBotones.parentNode;
            let padre = filaContenedor.parentNode;

            let fila = new FilaContenedor(padre.childNodes.length, event.target.value);
            filaContenedor.insertAdjacentElement("beforebegin", fila.getRow());
            // proyecto.addContainerBody(fila);

            // aplicarEventListener();
        }
    });
}

function borrarContianer(proyecto, button){
    button.addEventListener('click', function () {
        let filaBotones = button.parentNode;
        let filaContenedor = filaBotones.parentNode;
        filaContenedor.remove();
        // proyecto.deleteContainerBody(filaContenedor)
    });
}