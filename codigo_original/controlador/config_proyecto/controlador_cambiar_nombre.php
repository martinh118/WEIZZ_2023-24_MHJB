<?php
/**
 * Obtiene el nuevo nombre de proyecto aplicado en el formulario y llama a la función del modelo para realizar los cambios a la base de datos. 
 */

require_once("../../modelo/configuracion_proyecto/modelo_cambiar_nombre.php");

if (isset($_SERVER['REQUEST_METHOD']) == "POST") {
    $idProyecto = $_POST['idProyecto'];
    $nuevoNombre = $_POST['nuevoNombre'];

    cambiarNombreProyecto($idProyecto, $nuevoNombre);

?>
    <script>
        location.replace("../../index.php");
    </script>

<?php


}
