<?php

require_once("../../modelo/modelo_principal.php");


function duplicarProyectoUser($idProyecto){
    try {
        $fechaCreacion = date('Y-m-d H:i:s');
        $connexio = conectar();
        $statement = $connexio->prepare('INSERT INTO proyectos 
        (id_usuario, contenido, nombre, created_date) 
        SELECT id_usuario, contenido, CONCAT(nombre, "_copia"), :fechaCreacion
        FROM proyectos WHERE id = :id');
        $statement->execute(
            array(
                ':id' => $idProyecto,
                ':fechaCreacion' => $fechaCreacion
            )
        );
    } catch (PDOException $e) { //
        // mostrarem els errors
        echo "Error duplicarProyectoUser: " . $e->getMessage();
    }
}