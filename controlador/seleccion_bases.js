
$(document).ready(function () {
    $(".seleccionBase").click(function(){
        let base = $(this).data('base');
        let href = "../controlador/config_proyecto/controlador_crear_proyecto.php?base=" + base;
        $("#tituloModal").html("¿Seleccionar base <b>"+ base + "</b>?");
        $("#seleccionarBase").attr("href", href);
    })
})