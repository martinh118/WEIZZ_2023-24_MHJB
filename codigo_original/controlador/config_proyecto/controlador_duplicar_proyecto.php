<?php
require_once("../../modelo/configuracion_proyecto/modelo_duplicar_proyecto.php");


if(isset($_GET['idProyecto'])){
    $idProject = $_GET['idProyecto'];

    duplicarProyectoUser($idProject);
    ?>

    <script>
        location.replace("../../welcome_page.php");
    </script>
    <?php
}


