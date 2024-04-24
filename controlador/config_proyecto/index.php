<?php 
require_once("..\..\modelo\configuracion_proyecto\modelo_obtener_proyectos.php");

function mostrarProyectosUser($idUser){
    try{
        $proyectosUser = obtenerProyectosUser($idUser)->fetchAll();
        $html = "<div class='row justify-content-center'>";
        foreach($proyectosUser as $proj){
            $html .= "<div class='col-2'>";
            $html .= "<a style='text-decoration-line: none;'>";
            $html .= "<div style='background-color: #969696;height: 11em;width: 11em;border: 2px solid black;border-radius: 20px;position: relative;'>";
            $html .= "</div>";
            $html .= "<h3 style='font-family: 'AgrandirRegular'; color: black;font-size: 25px;margin-left: 15px;'>";
            $html .= $proj["ID"] ."</h3>";
            $html .= "</a>";
            
            $html .= "</div>";
        }
        $html .= "</div>";

        echo $html;
    }catch(PDOException $e){
        echo "Error mostrarProyectosUser: ".$e->getMessage();
    }
}