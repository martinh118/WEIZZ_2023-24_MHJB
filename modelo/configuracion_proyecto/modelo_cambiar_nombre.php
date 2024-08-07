<?php 
require_once("../../modelo/modelo_principal.php");

function cambiarNombreProyecto($idProject, $newName){
    try {
        $connexio = conectar();
        $statement = $connexio->prepare('UPDATE proyectos SET nombre = :nuevoNombre WHERE ID = :idProject');
        $statement->execute(
            array(
                ':idProject' =>$idProject,
                ':nuevoNombre' => $newName
            )
        );
    } catch (PDOException $e) { //
        // mostrarem els errors
        echo "Error cambiarNombreProyecto: " . $e->getMessage();
    }
}