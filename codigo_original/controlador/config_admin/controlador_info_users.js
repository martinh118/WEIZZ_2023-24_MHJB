/**
 * Aplica eventListener para mostrar la información del usuario seleccionado.
 */
$(document).ready(function () {
    $(".accionInfoUser").click(function () {
        let idProyecto = "<b>Identificador:</b> " + $(this).data('id');
        let nombreProyecto = "<b>Nombre del usuario:</b> " + $(this).data('nombre');
        let fechaCreacion = "<b>Fecha creacion:</b> " + $(this).data('fecha');
        let lastSession = "<b>Última sesión:</b> " + $(this).data('lastsession');

        $("#infoIdUsusario").html(idProyecto);
        $("#infoNombreUsusario").html(nombreProyecto);
        $("#infoFechaCreacion").html(fechaCreacion);
        $("#infoLastSession").html(lastSession);
    })
})