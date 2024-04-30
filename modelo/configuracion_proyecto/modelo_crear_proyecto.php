<?php
require_once("../../modelo/modelo_principal.php");


function crearProyectoUser($idProyecto, $idUser, $contenido, $nombre){
    try {
        $connexio = conectar();
        $statement = $connexio->prepare('INSERT INTO proyectos 
        (ID,id_usuario, contenido, nombre) VALUES 
        (:id,:usuario, :contenido, :nombre)');
        $statement->execute(
            array(
                ':id' => $idProyecto,
                ':usuario' => $idUser,
                ':contenido' => $contenido,
                ':nombre' => $nombre
            )
        );
    } catch (PDOException $e) { //
        // mostrarem els errors
        echo "Error crearProyectoUser: " . $e->getMessage();
    }
}

