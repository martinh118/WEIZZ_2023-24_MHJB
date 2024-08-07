<?php 
/**
 * Obtiene el identificador del proyecto seleccionado y llama la funcion del modelo para eliminar el proyecto seleccionado.
 */
require_once("../../modelo/configuracion_proyecto/modelo_eliminar_proyecto.php");


if(isset($_GET['idProyecto'])){
    $idProject = $_GET['idProyecto'];

    eliminarProyectosUser($idProject);
    ?>

    <script>
        location.replace("../../index.php");
    </script>
    <?php
}
