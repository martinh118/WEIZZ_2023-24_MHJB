<?php
require_once("../modelo/configuracion_proyecto/modelo_obtener_proyecto_unico.php");

/**
 * A partir del identificador del proyecto seleccionado llama a la función del modelo para obtener los datos del proyecto y los devuelve.
 * @return $project: proyecto seleccionado.
 */
function cargarProyecto($id){
    try{    
        $project = proyectoUnico($id)->fetch();
        return $project;

    }catch(PDOException $e){
        echo "Error obtenerProyecto: " . $e->getMessage();
    }
}

