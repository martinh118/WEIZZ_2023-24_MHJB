<?php
require_once("../modelo/configuracion_proyecto/modelo_obtener_proyecto_unico.php");

function cargarProyecto($id){
    try{    
        $project = proyectoUnico($id)->fetch();
        return $project;

    }catch(PDOException $e){
        echo "Error obtenerProyecto: " . $e->getMessage();
    }
}

