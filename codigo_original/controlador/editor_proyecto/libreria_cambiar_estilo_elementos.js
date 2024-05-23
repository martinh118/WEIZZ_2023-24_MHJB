import { encontrarPadre } from '../../SRC/librerias/gestionElementos.js';
import { reescribirHTML, reescribirHTMLHeaderFooter } from '../../SRC/librerias/gestionElementos.js';
import { proyecto } from './editor_proyecto.js';
import { crearElemento } from '../../SRC/librerias/APIElementosHTML.js';


export function cambiarEstiloTitulo(elementoObjecto) {
    let newContent = document.getElementById("contenidoTitulo").value;
    let newColor = document.getElementById("colorTextoTitulo").value;
    let nuevaFuente = document.getElementById("fuenteTextoTitulo").value;
    let nuevoTamaño = document.getElementById("tamañoTitulo").value;
    let medida = document.getElementById("medidaTamañoTitulo").value;
    let subrayado = document.getElementById("subrayado");
    let bolSub, cssSub = "";

    elementoObjecto.setContenido(newContent);
    elementoObjecto.setColor(newColor);
    elementoObjecto.setFuente(nuevaFuente);
    elementoObjecto.setTamaño(nuevoTamaño);
    elementoObjecto.setMedida(medida);
    if (subrayado.checked) {
        bolSub = true;
        cssSub = "underline " + newColor + ";";
    }
    else bolSub = false;
    elementoObjecto.setSubrayado(bolSub);

    let objetoEstilo = {
        "color": newColor,
        "font-family": nuevaFuente,
        "font-size": nuevoTamaño + medida,
        "text-decoration": cssSub
    }

    if (document.getElementById("negrita")) {
        let bolNeg;
        let negrita = document.getElementById("negrita");

        if (negrita.checked) {
            bolNeg = true;
            objetoEstilo["font-weight"] = "bold";
        }
        else bolNeg = false;
        elementoObjecto.setNegrita(bolSub);

    }

    elementoObjecto.cambiarEstilo(objetoEstilo);
    elementoObjecto.rewriteHTML();

}

export function cambiarEstiloTabla(elementoObjeto) {
    let numFilas = document.getElementById("numFilas").value;
    let numColumnas = document.getElementById("numColumnas").value;
    let grosorTabla = document.getElementById("grosorTabla").value;
    let estiloBordeTabla = document.getElementById("estiloBordeTabla").value;
    let colorContornoTabla = document.getElementById("colorContornoTabla").value;
    let colorFondoHeader = document.getElementById("colorFondoHeader").value;
    let colorFondoBody = document.getElementById("colorFondoBody").value;
    let colorLetraHeader = document.getElementById("colorLetraHeader").value;
    let colorLetraBody = document.getElementById("colorLetraBody").value;
    let boolHeader = document.getElementById("boolHeader");
    let bool;

    if(boolHeader.checked) bool = true;
    else bool = false;

    elementoObjeto.setFilas(numFilas);
    elementoObjeto.setColumnas(numColumnas)
    elementoObjeto.setGrosor(grosorTabla)
    elementoObjeto.setEstiloBorde(estiloBordeTabla)
    elementoObjeto.setColorContorno(colorContornoTabla)
    elementoObjeto.setColorHeader(colorFondoHeader)
    elementoObjeto.setColorBody(colorFondoBody)
    elementoObjeto.setColorLetraHeader(colorLetraHeader)
    elementoObjeto.setColorLetraBody(colorLetraBody);
    elementoObjeto.setBoolHeader(bool)

    let estiloTable = {
        'border': `${grosorTabla}px ${estiloBordeTabla} ${colorContornoTabla}`,
        'border-collapse': 'collapse'
    }

    let estiloHeader = {
        'border': `${grosorTabla}px ${estiloBordeTabla} ${colorContornoTabla}`,
        'background': colorFondoHeader,
        'color': colorLetraHeader,
    }

    let estiloBody = {
        'border': `${grosorTabla}px ${estiloBordeTabla} ${colorContornoTabla}`,
        'background': colorFondoBody,
        'color': colorLetraBody,
    }

    elementoObjeto.setEstiloTable(estiloTable)
    elementoObjeto.setEstiloHeader(estiloHeader)
    elementoObjeto.setEstiloBody(estiloBody)

    elementoObjeto.rewriteTabla();

}

export function cambiarEstiloImagen(elementoObjeto) {
    let imagen = document.getElementById("inputImagen").files[0];
    let ancho = document.getElementById("anchoImagen").value;
    let alto = document.getElementById("altoImagen").value;
    let borderRadius = document.getElementById("borderRadius").value;
    let anchoBorde = document.getElementById("anchoBorde").value;
    let colorBorde = document.getElementById("colorBorde").value;

    if (imagen != undefined) {
        guardarImagen(imagen);
        elementoObjeto.setSource("../SRC/imagenes_usuario/" + imagen.name);
    }

    elementoObjeto.setAncho(ancho);
    elementoObjeto.setAlto(alto);
    elementoObjeto.setBorderRadius(borderRadius);
    elementoObjeto.setAnchoBorde(anchoBorde);
    elementoObjeto.setColorBorde(colorBorde);

    let object = {
        "height": `${alto}px`,
        "width": `${ancho}px`,
        "border": `${anchoBorde}px solid ${colorBorde}`,
        "border-radius": `${borderRadius}% !important;`
    }
    elementoObjeto.setEstilo(object);

    elementoObjeto.rewriteImagen();
}

export function cambiarEstiloLista(elementoObjeto) {
    let itemsLista = document.querySelectorAll(".itemContent");
    let arrItemsLista = [];
    for (const item of itemsLista) {
        arrItemsLista.push(item.value);
    }
    let numItems = document.getElementById("numItems").value;
    let estiloLista = document.getElementById("estiloLista").value;
    let color = document.getElementById("colorTexto").value;
    let fuente = document.getElementById("fuenteTexto").value;
    let negrita = document.getElementById("negritaTexto");
    let bolNeg;

    if (negrita.checked) bolNeg = true
    else bolNeg = false;

    elementoObjeto.setItemsContent(arrItemsLista);
    elementoObjeto.setNumItems(numItems)
    elementoObjeto.setEstilo(estiloLista)
    elementoObjeto.setColor(color)
    elementoObjeto.setFuente(fuente)
    elementoObjeto.setNegrita(bolNeg);

    let estiloElemento = {
        "list-style-type": estiloLista,
        "color": color,
        "font-family": fuente
    }

    if (bolNeg) estiloElemento["font-weight"] = "bold";

    elementoObjeto.setEstiloElemento(estiloElemento)
    elementoObjeto.rewriteLista();
    let divPrincipal = crearElemento("div", "");
    divPrincipal.innerHTML = elementoObjeto.obtenerConfigEstilo();
    abrirRecuadro(divPrincipal);

}

function guardarImagen(file) {
    const formData = new FormData();
    formData.append('file', file);

    fetch('../controlador/editor_proyecto/guardar_archivo.php', {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al guardar el archivo.');
            }
            console.log('El archivo se ha guardado correctamente en el servidor.');
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


export function aplicarCambios(elemento) {
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

    if (filaRowDom.id.includes("Header") || filaRowDom.id.includes("Footer")) {
        reescribirHTMLHeaderFooter(contenedorHijoObject, filaContenedorObject, filaRowObject, proyecto);
    } else reescribirHTML(contenedorHijoObject, filaContenedorObject, filaRowObject, proyecto);

}

