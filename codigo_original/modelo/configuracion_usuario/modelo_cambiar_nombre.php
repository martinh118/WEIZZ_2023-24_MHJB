<?php
require_once("../../modelo/modelo_principal.php");


function cambiarNombre($ID, $nuevoNombre){
    try {
        $connexio = conectar();
        $statement = $connexio->prepare('UPDATE usuarios SET usuario = :nuevoNombre WHERE ID = :id');
        $statement->execute(
            array(
                ':id' =>$ID,
                ':nuevoNombre' => $nuevoNombre
            )
        );
    } catch (PDOException $e) { //
        // mostrarem els errors
        echo "Error: " . $e->getMessage();
    }
}