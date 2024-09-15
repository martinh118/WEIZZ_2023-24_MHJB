<?php
require_once("../../modelo/modelo_principal.php");

/**
 * A partir d'una comanda SQL, selecciona tots els usuaris seleccionats en la taula users de la base de dades.
 * @return statement: Lista array amb tots els usuaris seleccionats.
 */
function obtenerUsuarios(){
    try {
        $connexio = conectar();
        $statement = $connexio->prepare('SELECT * FROM usuarios');
        $statement->execute();
        
        return $statement;
    } catch (PDOException $e) { //
        // mostrarem els errors
        echo "Error obtenerUsuarios: " . $e->getMessage();
    }
}

function obtenerUsuarioUnico($email){
    try {
        $connexio = conectar();
        $statement = $connexio->prepare('SELECT * FROM usuarios WHERE email = :email');
        $statement->execute(
            array(
                ':email' => $email
            )
        );
        
        return $statement;
    } catch (PDOException $e) { //
        // mostrarem els errors
        echo "Error obtenerUsuarios: " . $e->getMessage();
    }
}

function crearUsuario( $usuario, $email, $contra, $token){
    try {
        $fechaCreacion = date('Y-m-d H:i:s');
        $connexio = conectar();
        $statement = $connexio->prepare('INSERT INTO usuarios 
        (ID,usuario, email, contra, token, created_date) VALUES 
        (NULL,:usuario, :email, :contra, :token, :fechaCreacion)');
        $statement->execute(
            array(
                ':usuario' => $usuario,
                ':email' => $email,
                ':contra' => $contra,
                ':token' => $token,
                ':fechaCreacion' => $fechaCreacion
            )
        );
    } catch (PDOException $e) { //
        // mostrarem els errors
        echo "Error crearUsuario: " . $e->getMessage();
    }
}