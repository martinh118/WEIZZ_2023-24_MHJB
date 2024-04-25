import { FilaContenedor } from '../../SRC/clases/FilaContenedor.js';
import { Fila } from '../../SRC/clases/Fila.js';
import { crearElemento } from '../../SRC/librerias/APIElementosHTML.js';

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

function crearContainer(button, proyecto) {
    button.addEventListener('click', function (event) {

        if (event.target.type != "button") {
            let selectedFilaBotones = button.parentNode;
            let selectedFilaContenedor = selectedFilaBotones.parentNode;
            let selectedFilaRow = selectedFilaContenedor.parentNode;

            let newId = obtenerId();
            let newFilaCont = new FilaContenedor(newId, event.target.value);
            let newFilaRow = new Fila(newId, [newFilaCont]);

            aplicarListenersFilaContainer(newFilaCont, proyecto);

            selectedFilaRow.insertAdjacentElement("beforebegin", newFilaRow.getHtmlBase());
            // proyecto.addContainerBody(newFilaRow, selectedFilaRow);

            // aplicarEventListener();
        }
    });
}


function moverArribaCont(button, proyecto) {
    button.addEventListener('click', function () {
        let selectedFilaBotones = button.parentNode;
        let selectedFilaContenedor = selectedFilaBotones.parentNode;
        let selectedFilaRow = selectedFilaContenedor.parentNode;

        let filaRowArriba = selectedFilaRow.previousSibling;
        let filaContenedorIzquierda = selectedFilaContenedor.previousSibling;

        if (isElement(filaContenedorIzquierda)) {
            if (isFilaContenedor(filaContenedorIzquierda)) {
                selectedFilaContenedor.insertAdjacentElement("afterend", filaContenedorIzquierda);

            }
        } else if (isElement(filaRowArriba)) {

            let ultimoHijoArriba = filaRowArriba.lastChild;
            selectedFilaContenedor.insertAdjacentElement("beforebegin", ultimoHijoArriba);

            filaRowArriba.appendChild(selectedFilaContenedor);
            // proyecto.moverArribaContainerBody(selectedFilaRow);
        }else{
            let filaContenedorDerecha = selectedFilaContenedor.nextSibling;
            if(isElement(filaContenedorDerecha)){
                let newIdFila = obtenerId();
                let newFila = new Fila(newIdFila, []);
                let elementoDiv = crearElemento("div", "", "id", newIdFila);
                
                elementoDiv.setAttribute("class", "row mt-4");
                elementoDiv.appendChild(selectedFilaContenedor);
                
                newFila.setHtmlBase(elementoDiv);
                let contentNewFila = newFila.getHtmlBase();
                selectedFilaRow.insertAdjacentElement("beforebegin", contentNewFila);
            }
        }

    });
}


function moverAbajoCont(button, proyecto) {
    button.addEventListener('click', function () {
        let selectedFilaBotones = button.parentNode;
        let selectedFilaContenedor = selectedFilaBotones.parentNode;
        let selectedFilaRow = selectedFilaContenedor.parentNode;

        let filaRowAbajo = selectedFilaRow.nextSibling;
        let filaContenedorDerecha = selectedFilaContenedor.nextSibling;

        if (isElement(filaContenedorDerecha)) {
            if (isFilaContenedor(filaContenedorDerecha)) {
                selectedFilaContenedor.insertAdjacentElement("beforebegin", filaContenedorDerecha);

            }
        } else if (isElement(filaRowAbajo)) {

            let primeroHijoAbajo = filaRowAbajo.firstChild;
            selectedFilaContenedor.insertAdjacentElement("afterend", primeroHijoAbajo);

            filaRowAbajo.prepend(selectedFilaContenedor);
            // proyecto.moverAbajoContainerBody(selectedFilaRow);
        }else{
            let filaContenedorIzquierda = selectedFilaContenedor.previousSibling;
            if(isElement(filaContenedorIzquierda)){
                let newIdFila = obtenerId();
                let newFila = new Fila(newIdFila, []);
                let elementoDiv = crearElemento("div", "", "id", newIdFila);
                
                elementoDiv.setAttribute("class", "row mt-4");
                elementoDiv.appendChild(selectedFilaContenedor);
                
                newFila.setHtmlBase(elementoDiv);
                let contentNewFila = newFila.getHtmlBase();
                selectedFilaRow.insertAdjacentElement("afterend", contentNewFila);
            }
        }


    })
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

function isFilaContenedor(object) {
    let idFilaContenedor = object.id;
    let confirm = idFilaContenedor.split("-")[0];

    if (confirm == "FilaContenedor") {
        return true;
    } else return false;
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

    return "FilaRow-" + index;

}

function aplicarListenersFilaContainer(filaRow, proyecto) {
    let botones = filaRow.getOpcionesRow();
    let botonCrear = botones.getBotonCrear();
    let botonSubir = botones.getSubirElemento();
    let botonBajar = botones.getBajarElemento();
    let botonBorrar = botones.getBorrarElemento();

    crearContainer(botonCrear, proyecto)
    moverArribaCont(botonSubir, proyecto);
    moverAbajoCont(botonBajar, proyecto);
    borrarContianer(botonBorrar, proyecto);

}