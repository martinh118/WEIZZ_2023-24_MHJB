<?php 
require_once("../../modelo/configuracion_proyecto/modelo_crear_proyecto.php");
session_start();
$datosProyecto = json_decode(file_get_contents("php://input"), true);

if(isset($_SESSION['usuario'])){
    $idProyecto = $datosProyecto['idProject'];
    $contenido =  $datosProyecto['contenido'];
    $nombre = "nuevo_proyecto";
    crearProyectoUser( $idProyecto, $_SESSION['ID'], $contenido, $nombre);
    
    echo json_encode(['mensaje' => 'Proyecto guardado correctamente']);

}else{
    echo "anonimos";
}


