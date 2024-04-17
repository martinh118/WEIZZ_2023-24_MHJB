<?php 
require_once("../../modelo/modelo_principal.php");

function cambiarContraseñaUsuario($ID, $nuevaContra){
    try {
        $connexio = conectar();
        $statement = $connexio->prepare('UPDATE usuarios SET contra = :nuevaContra WHERE ID = :id');
        $statement->execute(
            array(
                ':id' =>$ID,
                ':nuevaContra' => $nuevaContra
            )
        );
    } catch (PDOException $e) { //
        // mostrarem els errors
        echo "Error cambiarContraseñaUsuario: " . $e->getMessage();
    }
}

