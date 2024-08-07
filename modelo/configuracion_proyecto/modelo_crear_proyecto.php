<?php
require_once("../../modelo/modelo_principal.php");


function crearProyectoUser($idProyecto, $idUser, $contenido, $nombre){
    try {
        $fechaCreacion = date('Y-m-d H:i:s');
        $connexio = conectar();
        $statement = $connexio->prepare('INSERT INTO proyectos 
        (ID,id_usuario, contenido, nombre, created_date) VALUES 
        (:id,:usuario, :contenido, :nombre, :fechaCreacion)');
        $statement->execute(
            array(
                ':id' => $idProyecto,
                ':usuario' => $idUser,
                ':contenido' => $contenido,
                ':nombre' => $nombre,
                ':fechaCreacion' => $fechaCreacion
            )
        );
    } catch (PDOException $e) { //
        // mostrarem els errors
        echo "Error crearProyectoUser: " . $e->getMessage();
    }
}

