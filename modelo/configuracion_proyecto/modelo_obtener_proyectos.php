<?php
require_once("./modelo/modelo_principal.php");

function obtenerProyectosUser($idUser){
    try {
        $connexio = conectar();
        $statement = $connexio->prepare('SELECT * FROM proyectos WHERE id_usuario = :idUser');
        $statement->execute(
            array(
                ':idUser' => $idUser
            )
        );
        
        return $statement;
    } catch (PDOException $e) { //
        // mostrarem els errors
        echo "Error obtenerProyectosUser: " . $e->getMessage();
    }
}