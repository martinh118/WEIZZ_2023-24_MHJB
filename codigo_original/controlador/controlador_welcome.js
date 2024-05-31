/**
 * Aplica eventListener para cambiar la imagen de la flecha de opciones de cada proyecto en la pagina de inicio.
 */
$(document).ready(function () {
    $("img.flechaOpcionesProyecto").hover(function () {
        $(this).attr('src', './SRC/imagenes_web/flecha_opciones_proyecto_desplegado.png');

    },
        function () {
            $(this).attr('src', './SRC/imagenes_web/flecha_opciones_proyecto.png');

        }
    )
})

/**
 * Aplica eventListener para borrar el proyecto seleccionado.
 */
$(document).ready(function () {
    $(".accionBorrar").click(function () {
        let info = $(this).data('info');
        let href = "./controlador/config_proyecto/controlador_eliminar_proyecto.php?idProyecto=" + info;

        $("#botonEliminarProyecto").attr("href", href);
    })


})

/**
 * Aplica eventListener para duplicar el proyecto seleccionado.
 */
$(document).ready(function () {
    $(".accionDuplicar").click(function () {
        let info = $(this).data('info');
        let href = "./controlador/config_proyecto/controlador_duplicar_proyecto.php?idProyecto=" + info;

        $("#botonDuplicarPrpyecto").attr("href", href);
    })
})

/**
 * Aplica eventListener para cambiar el nombre el proyecto seleccionado.
 */
$(document).ready(function () {
    $(".accionCambiarNombre").click(function () {
        let info = $(this).data('info');

        $("#idProyecto").attr("value", info);
    })
})

/**
 * Aplica eventListener para mostrar la información del proyecto seleccionado.
 */
$(document).ready(function () {
    $(".accionInfoProyecto").click(function () {
        let idProyecto = "<b>Identificador:</b> " + $(this).data('id');
        let nombreProyecto = "<b>Nombre del proyecto:</b> " + $(this).data('nombre');
        let fechaCreacion = "<b>Fecha creacion:</b> " + $(this).data('fecha');

        $("#infoIdProyecto").html(idProyecto);
        $("#infoNombreProyecto").html(nombreProyecto);
        $("#infoFechaCreacion").html(fechaCreacion);
    })
})