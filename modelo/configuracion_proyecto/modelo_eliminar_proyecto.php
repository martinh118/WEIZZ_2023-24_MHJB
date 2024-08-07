<?php 
require_once("../../modelo/modelo_principal.php");

function eliminarProyectosUser($idProyecto){
    try {
        $connexio = conectar();
        $statement = $connexio->prepare('DELETE FROM proyectos WHERE ID = :idProyecto');
        $statement->execute(
            array(
                ':idProyecto' => $idProyecto
            )
        );
        
        return $statement;
    } catch (PDOException $e) { //
        // mostrarem els errors
        echo "Error eliminarProyectosUser: " . $e->getMessage();
    }
}