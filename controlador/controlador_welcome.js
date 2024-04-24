
$(document).ready(function () {
    $("img.flechaOpcionesProyecto").hover(function () {
        $(this).attr('src', './SRC/imagenes_web/flecha_opciones_proyecto_desplegado.png');

    },
        function () {
            $(this).attr('src', './SRC/imagenes_web/flecha_opciones_proyecto.png');

        }
    )
})


$(document).ready(function () {
    $(".accionBorrar").click(function(){
        let info = $(this).data('info');
        let href = "./controlador/config_proyecto/controlador_eliminar_proyecto.php?idProyecto=" + info;
        
        $("#botonEliminarProyecto").attr("href", href);
    })
})

$(document).ready(function () {
    $(".accionCambiarNombre").click(function(){
        let info = $(this).data('info');
        
        $("#idProyecto").attr("value", info);
    })
})

$(document).ready(function () {
    $(".accionInfoProyecto").click(function(){
        let idProyecto = "<b>Identificador:</b> " + $(this).data('id');
        let nombreProyecto = "<b>Nombre del proyecto:</b> " + $(this).data('nombre');
        
        $("#infoIdProyecto").html(idProyecto);
        $("#infoNombreProyecto").html(nombreProyecto);
    })
})