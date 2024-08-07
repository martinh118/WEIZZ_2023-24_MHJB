<?php
require_once("../../modelo/modelo_principal.php");

/**
 * Elimina la cuenta de usuario de la base de datos
 * @param usuario: ID del usuari que quiere eliminar la cuenta.
 */
function deleteUser($usuario)
{
    try {
        $connexio = conectar();
        $statement = $connexio->prepare('DELETE FROM usuarios WHERE ID = :usuario');
        $statement->execute(
            array(
                ':usuario' => $usuario
            )
        );
        // reordenarUsuarios();
    } catch (PDOException $e) { //
        // mostrarem els errors
        echo "Error deleteUser: " . $e->getMessage();
    }
}

/**
 * Reordenar el identificador de todos los usuario para seguir un orden.
 */
function reordenarUsuarios()
{
    try {
        $connexio = conectar();
        $statement = $connexio->prepare("ALTER TABLE usuarios DROP ID");
        $statement->execute();
        $statement = $connexio->prepare("ALTER TABLE usuarios AUTO_INCREMENT = 1");
        $statement->execute();
        $statement = $connexio->prepare("ALTER TABLE usuarios ADD ID int NOT NULL AUTO_INCREMENT PRIMARY KEY FIRST");
        $statement->execute();
    } catch (PDOException $e) { //
        // mostrarem els errors
        echo "Error reordenarUsuarios: " . $e->getMessage();
    }
}

function eliminarProyectosUser($idUsuario){
    try {
        $connexio = conectar();
        $statement = $connexio->prepare('DELETE FROM proyectos WHERE id_usuario = :idUsuario');
        $statement->execute(
            array(
                ':idUsuario' => $idUsuario
            )
        );
        
        return $statement;
    } catch (PDOException $e) { //
        // mostrarem els errors
        echo "Error eliminarProyectosUser: " . $e->getMessage();
    }
}