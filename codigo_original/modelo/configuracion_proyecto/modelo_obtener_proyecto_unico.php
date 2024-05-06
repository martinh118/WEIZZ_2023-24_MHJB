<?php

require_once("../modelo/modelo_principal.php");


function proyectoUnico($id){
    try{    
        $connexio = conectar();
        $statement = $connexio->prepare('SELECT * FROM proyectos WHERE ID = :id');
        $statement->execute(
            array(
                ':id' => $id
            )
        );
        return $statement;
        
    }catch(PDOException $e){
        echo "Error obtenerProyecto: " . $e->getMessage();
    }
}