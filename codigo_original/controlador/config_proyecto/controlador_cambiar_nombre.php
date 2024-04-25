<?php
require_once("../../modelo/configuracion_proyecto/modelo_cambiar_nombre.php");

if (isset($_SERVER['REQUEST_METHOD']) == "POST") {
    $idProyecto = $_POST['idProyecto'];
    $nuevoNombre = $_POST['nuevoNombre'];

    cambiarNombreProyecto($idProyecto, $nuevoNombre);

?>
    <script>
        location.replace("../../welcome_page.php");
    </script>

<?php


}
