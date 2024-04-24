<?php
require_once("../../modelo/modelo_principal.php");


function cambiarToken($email, $nuevoToken){
    try {
        $connexio = conectar();
        $statement = $connexio->prepare('UPDATE usuarios SET token = :nuevoToken WHERE email = :email');
        $statement->execute(
            array(
                ':email' =>$email,
                ':nuevoToken' => $nuevoToken
            )
        );
    } catch (PDOException $e) { //
        // mostrarem els errors
        echo "Error cambiarNombre: " . $e->getMessage();
    }
}