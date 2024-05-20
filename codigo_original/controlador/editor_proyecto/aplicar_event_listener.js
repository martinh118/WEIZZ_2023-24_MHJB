import { FilaContenedor } from '../../SRC/clases/FilaContenedor.js';
import { Fila } from '../../SRC/clases/Fila.js';
import { aplicarEventosArrastrar, eventosContainerHijo } from './arrastrar_elementos.js';

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
        borrarContainer(button, proyecto);
    });

    aplicarEventosArrastrar(proyecto);
    

}

function crearContainer(button, proyecto) {
    button.addEventListener('click', function (event) {

        if (event.target.type != "button") {
            let selectedFilaBotones = button.parentNode;
            let selectedFilaContenedor = selectedFilaBotones.parentNode;
            let selectedFilaRow = selectedFilaContenedor.parentNode;

            let filaContenedorIzquierda = selectedFilaContenedor.previousSibling;

            if (isElement(filaContenedorIzquierda)) {
                if (isFilaContenedor(filaContenedorIzquierda)) {
                    let filaRow = proyecto.getFilaRow(selectedFilaRow.id);
                    let newFilaCont = new FilaContenedor(obtenerFilaContenedorId(), event.target.value);
                    aplicarListenersFilaContainer(newFilaCont, proyecto);
                    filaRow.añadirFilaContenedor(newFilaCont, selectedFilaContenedor);

                    filaRow.rewriteHTML();
                    
                    proyecto.rewriteHTML();
                    $("#proyecto").html(proyecto.getHtmlBase());

                }
            } else {
                let newIdFila = obtenerFilaRowId();
                let newFilaRow = new Fila(newIdFila, []);
                let newFilaCont = new FilaContenedor(obtenerFilaContenedorId(), event.target.value);


                newFilaRow.setFilasContenedor([newFilaCont]);
                newFilaRow.rewriteHTML();

                aplicarListenersFilaContainer(newFilaCont, proyecto);
                
                proyecto.addFilaRowBody(newFilaRow, selectedFilaRow);
                proyecto.rewriteHTML();
                $("#proyecto").html(proyecto.getHtmlBase());
            }

            
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

                let filaRow = proyecto.getFilaRow(selectedFilaRow.id);
                filaRow.moverFilasContenedor(filaContenedorIzquierda, selectedFilaContenedor);
                filaRow.rewriteHTML();
                // selectedFilaRow.replaceWith(filaRow.getHtmlBase());

                proyecto.rewriteHTML();
                $("#proyecto").html(proyecto.getHtmlBase());
            }
        } else if (isElement(filaRowArriba)) {

            let ultimoHijoArriba = filaRowArriba.lastChild;

            ordenarFilasContainer();

            function ordenarFilasContainer() {
                let filaRowArribaObject = proyecto.getFilaRow(filaRowArriba.id);
                let filaRowObject = proyecto.getFilaRow(selectedFilaRow.id);

                let filaContenedorRowArribaObject = filaRowArribaObject.getFilaContenedorUnico(ultimoHijoArriba.id);
                // let previousFilaContenedorRowArribaObject = filaRowArribaObject.getFilaContenedorUnico(ultimoHijoArriba.previousSibling.id);
                let filaContenedorRowObject = filaRowObject.getFilaContenedorUnico(selectedFilaContenedor.id);
                // let nextFilaContenedorRowObject = filaRowObject.getFilaContenedorUnico(selectedFilaContenedor.nextSibling.id);

                filaRowArribaObject.eliminarFilaContenedor(ultimoHijoArriba);
                filaRowObject.eliminarFilaContenedor(selectedFilaContenedor);

                filaRowArribaObject.añadirFilaContenedor(filaContenedorRowObject);

                if (isFilaContenedor(selectedFilaContenedor.nextSibling)) {
                    filaRowObject.añadirFilaContenedor(filaContenedorRowArribaObject, selectedFilaContenedor.nextSibling);
                } else filaRowObject.añadirFilaContenedor(filaContenedorRowArribaObject);

                filaRowObject.rewriteHTML();
                filaRowArribaObject.rewriteHTML();

                proyecto.moverFilasRow(filaRowArribaObject, filaRowObject);
                proyecto.rewriteHTML();
                $("#proyecto").html(proyecto.getHtmlBase());

            }

            // proyecto.moverArribaContainerBody(selectedFilaRow);
        } else {
            let filaContenedorDerecha = selectedFilaContenedor.nextSibling;
            if (isElement(filaContenedorDerecha)) {
                let filaRowObject = proyecto.getFilaRow(selectedFilaRow.id);
                let filaContenedorObject = filaRowObject.getFilaContenedorUnico(selectedFilaContenedor.id);
                let newIdFila = obtenerFilaRowId();
                let newFila = new Fila(newIdFila, [filaContenedorObject]);

                filaRowObject.eliminarFilaContenedor(selectedFilaContenedor);

                proyecto.addFilaRowBody(newFila, selectedFilaRow);

                filaRowObject.rewriteHTML();
                // selectedFilaRow.replaceWith(filaRowObject.getHtmlBase());

                proyecto.rewriteHTML();
                $("#proyecto").html(proyecto.getHtmlBase());

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
                // selectedFilaContenedor.insertAdjacentElement("beforebegin", filaContenedorDerecha);

                let filaRow = proyecto.getFilaRow(selectedFilaRow.id);
                filaRow.moverFilasContenedor(selectedFilaContenedor, filaContenedorDerecha);
                filaRow.rewriteHTML();
                // selectedFilaRow.replaceWith(filaRow.getHtmlBase());
                proyecto.rewriteHTML();
                $("#proyecto").html(proyecto.getHtmlBase());

            }
        } else if (isElement(filaRowAbajo)) {

            let primeroHijoAbajo = filaRowAbajo.firstChild;

            ordenarFilasContainer();

            // selectedFilaContenedor.insertAdjacentElement("afterend", primeroHijoAbajo);

            // filaRowAbajo.prepend(selectedFilaContenedor);

            function ordenarFilasContainer() {
                let filaRowAbajoObject = proyecto.getFilaRow(filaRowAbajo.id);
                let filaRowObject = proyecto.getFilaRow(selectedFilaRow.id);

                let filaContenedorRowAbajoObject = filaRowAbajoObject.getFilaContenedorUnico(primeroHijoAbajo.id);
                // let previousFilaContenedorRowArribaObject = filaRowArribaObject.getFilaContenedorUnico(ultimoHijoArriba.previousSibling.id);
                let filaContenedorRowObject = filaRowObject.getFilaContenedorUnico(selectedFilaContenedor.id);
                // let nextFilaContenedorRowObject = filaRowObject.getFilaContenedorUnico(selectedFilaContenedor.nextSibling.id);

                filaRowAbajoObject.eliminarFilaContenedor(primeroHijoAbajo);
                filaRowObject.eliminarFilaContenedor(selectedFilaContenedor);


                filaRowObject.añadirFilaContenedor(filaContenedorRowAbajoObject);

                if (isFilaContenedor(primeroHijoAbajo.nextSibling)) {
                    filaRowAbajoObject.añadirFilaContenedor(filaContenedorRowObject, primeroHijoAbajo.nextSibling);
                } else filaRowAbajoObject.añadirFilaContenedor(filaContenedorRowObject);

                
                filaRowObject.rewriteHTML();
                filaRowAbajoObject.rewriteHTML();
                
                proyecto.moverFilasRow(filaRowObject, filaRowAbajoObject);
                
                proyecto.rewriteHTML();
                $("#proyecto").html(proyecto.getHtmlBase());

            }
            // proyecto.moverAbajoContainerBody(selectedFilaRow);
        } else {
            let filaContenedorIzquierda = selectedFilaContenedor.previousSibling;
            if (isElement(filaContenedorIzquierda)) {
                let filaRowObject = proyecto.getFilaRow(selectedFilaRow.id);
                let filaContenedorObject = filaRowObject.getFilaContenedorUnico(selectedFilaContenedor.id);
                let newIdFila = obtenerFilaRowId();
                let newFila = new Fila(newIdFila, [filaContenedorObject]);

                filaRowObject.eliminarFilaContenedor(selectedFilaContenedor);
                filaRowObject.rewriteHTML();
                // selectedFilaRow.replaceWith(filaRowObject.getHtmlBase());

                proyecto.addFilaRowBody(newFila);
                proyecto.rewriteHTML();
                $("#proyecto").html(proyecto.getHtmlBase());

            }
        }


    })
}


function borrarContainer(button, proyecto) {
    button.addEventListener('click', function () {
        let filaBotones = button.parentNode;
        let filaContenedor = filaBotones.parentNode;
        let selectedFilaRow = filaContenedor.parentNode;
        // proyecto.deleteContainerBody(filaContenedor);
        

        if (selectedFilaRow.childNodes.length == 1) {
            selectedFilaRow.remove();
            
            proyecto.deleteContainerBody(selectedFilaRow);
            proyecto.rewriteHTML();
            $("#proyecto").html(proyecto.getHtmlBase());
        } else {
            let filaRow = proyecto.getFilaRow(selectedFilaRow.id);
            filaRow.eliminarFilaContenedor(filaContenedor);
            filaRow.rewriteHTML();
            proyecto.rewriteHTML();
            $("#proyecto").html(proyecto.getHtmlBase());
        }



    });
}

function isElement(object) {
    return (
        typeof HTMLElement === "object" ? object instanceof HTMLElement : //DOM2
            object && typeof object === "object" && object !== null && object.nodeType === 1 && typeof object.nodeName === "string"
    );
}

function isFilaContenedor(object) {
    if (object != undefined) {
        let idFilaContenedor = object.id;
        let confirm = idFilaContenedor.split("-")[0];

        if (confirm == "FilaContenedor") {
            return true;
        } else return false;
    } else return false;

}

function obtenerFilaRowId() {
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

function obtenerFilaContenedorId() {
    let filas = document.querySelectorAll(".FilaContenedor");
    let index = 1;
    let numerosId = []
    let exist;

    if (filas != undefined) {
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
    }


    return "FilaContenedor-" + index;
}

export function aplicarListenersFilaContainer(filaContenedor, proyecto) {
    let containers = filaContenedor.getContainers();
    let botones = filaContenedor.getOpcionesRow();
    let botonCrear = botones.getBotonCrear();
    let botonSubir = botones.getSubirElemento();
    let botonBajar = botones.getBajarElemento();
    let botonBorrar = botones.getBorrarElemento();

    crearContainer(botonCrear, proyecto)
    moverArribaCont(botonSubir, proyecto);
    moverAbajoCont(botonBajar, proyecto);
    borrarContainer(botonBorrar, proyecto);

    containers.forEach(cont => {
        let contenedorHijo = cont.getContainer();
        eventosContainerHijo(contenedorHijo, proyecto);
    });

}