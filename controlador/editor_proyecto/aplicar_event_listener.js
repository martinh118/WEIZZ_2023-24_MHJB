import { FilaContenedor } from '../../SRC/clases/FilaContenedor.js';

export function aplicarEventListener(proyecto) {
    let botonCrear = document.querySelectorAll(".botonCrear");
    let botonSubir = document.querySelectorAll(".botonSubir");
    let botonBajar = document.querySelectorAll(".botonBajar");
    let botonBorrar = document.querySelectorAll(".botonBorrar");

    botonCrear.forEach((button) => {
        crearContainer(button, proyecto)
    });

    botonSubir.forEach((button) => {
        moverArribaCont(button, proyecto);
    });

    botonBajar.forEach((button) => {
        moverAbajoCont(button, proyecto);
    });


    botonBorrar.forEach((button) => {
        borrarContianer(button, proyecto);
    });

}


function moverArribaCont(button, proyecto) {
    button.addEventListener('click', function () {
        let filaBotones = button.parentNode;
        let filaContenedor = filaBotones.parentNode;
        let elArriba = filaContenedor.previousSibling;
        if (isElement(elArriba)) {
            filaContenedor.insertAdjacentElement("afterend", elArriba);
            proyecto.moverArribaContainerBody(filaContenedor);
        }
    });
}

function moverAbajoCont(button, proyecto) {
    button.addEventListener('click', function () {
        let filaBotones = button.parentNode;
        let filaContenedor = filaBotones.parentNode;
        let elAbajo = filaContenedor.nextSibling;
        if (isElement(elAbajo)) {
            filaContenedor.insertAdjacentElement("beforebegin", elAbajo);
            proyecto.moverAbajoContainerBody(filaContenedor);
        }
    })
}

function crearContainer(button, proyecto) {
    button.addEventListener('click', function (event) {

        if (event.target.type != "button") {
            let filaBotones = button.parentNode;
            let filaContenedor = filaBotones.parentNode;

            let newId = obtenerId();
            let fila = new FilaContenedor(newId, event.target.value);

            aplicarListenersFilaContainer(fila, proyecto);

            filaContenedor.insertAdjacentElement("beforebegin", fila.getRow());
            proyecto.addContainerBody(fila, filaContenedor);

            // aplicarEventListener();
        }
    });
}

function borrarContianer(button, proyecto) {
    button.addEventListener('click', function () {
        let filaBotones = button.parentNode;
        let filaContenedor = filaBotones.parentNode;
        proyecto.deleteContainerBody(filaContenedor);
        filaContenedor.remove();
    });
}

function isElement(object) {
    return (
        typeof HTMLElement === "object" ? object instanceof HTMLElement : //DOM2
            object && typeof object === "object" && object !== null && object.nodeType === 1 && typeof object.nodeName === "string"
    );
}

function obtenerId() {
    let body = document.getElementById("rowBodyProject");
    let filas = body.childNodes;
    let index = 1;
    let numerosId = []
    let exist;
    for (const fil of filas) {
        let numId = parseFloat(fil.id.split("-")[1]);
        numerosId.push(numId);
    }

    do {
        exist = numerosId.indexOf(index);
        if (exist >= 0) {
            index++;
        }
    } while (exist >= 0)

    return "FilaContenedor-" + index;

}

function aplicarListenersFilaContainer(filaContainer, proyecto) {
    let botones = filaContainer.getOpcionesRow();
    let botonCrear = botones.getBotonCrear();
    let botonSubir = botones.getSubirElemento();
    let botonBajar = botones.getBajarElemento();
    let botonBorrar = botones.getBorrarElemento();

    crearContainer(botonCrear, proyecto)
    moverArribaCont(botonSubir, proyecto);
    moverAbajoCont(botonBajar, proyecto);
    borrarContianer(botonBorrar, proyecto);

}