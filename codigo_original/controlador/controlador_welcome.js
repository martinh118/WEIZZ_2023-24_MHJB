
$(document).ready(function () {
    $("img.flechaOpcionesProyecto").hover(function () {
        $(this).attr('src', './SRC/imagenes_web/flecha_opciones_proyecto_desplegado.png');

    },
        function () {
            $(this).attr('src', './SRC/imagenes_web/flecha_opciones_proyecto.png');

        }
    )
})