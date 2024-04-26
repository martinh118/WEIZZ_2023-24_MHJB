<?php 
require_once("../../modelo/configuracion_proyecto/modelo_crear_proyecto.php");

session_start();

if(isset($_SESSION['usuario'])){
    echo "Base: " .$_GET['base'] . "; UsuarioID= " . $_SESSION['ID'];  
    $base = $_GET['base'];
    $contenido = datosBase($base);
    $nombre = "nuevo_proyecto";
    crearProyectoUser($_SESSION['ID'], $contenido, $nombre);
    
}else{
    echo "anonimos";
}
?>
        <script>
            location.replace("../../vista/editor_proyecto.php");
        </script>
    <?php


function datosBase($baseSeleccionada){
       
    switch ($baseSeleccionada){
        case "basico":
            $file = file_get_contents("../../SRC/plantillas_base/plantilla_base_basico.json");
            $jsonData = json_encode($file);
            return $jsonData;
        break;
        case "galeria":
            $file = file_get_contents("../../SRC/plantillas_base/plantilla_base_galeria.json");
            $jsonData = json_decode($file);
            return $jsonData;
        break;
        case "multiple":
            $file = file_get_contents("../../SRC/plantillas_base/plantilla_base_multiple.json");
            $jsonData = json_decode($file);
            return $jsonData;
        break;
        case "modelo":
            $file = file_get_contents("../../SRC/plantillas_base/plantilla_base_modelo.json");
            $jsonData = json_decode($file);
            return $jsonData;
        break;
        default:
            echo "error encontrar datos base";
        break;
    };
}