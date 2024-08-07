<?php 
/**
 * Obtiene los datos del nuevo proyecto creado y llama a la función para crear el nuevo proyecto a la base de datos.
 */
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
    echo json_encode(['mensaje' => 'anonimo']);
}


