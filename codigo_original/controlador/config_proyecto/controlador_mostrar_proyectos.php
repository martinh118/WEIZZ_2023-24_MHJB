<?php 
require_once(".\modelo\configuracion_proyecto\modelo_obtener_proyectos.php");

function mostrarProyectosUser($idUser){
    try{
        $count = 0;
        $proyectosUser = obtenerProyectosUser($idUser)->fetchAll();
        $html = "<div class='row justify-content-center'>";
        foreach($proyectosUser as $proj){
            if($count == 4){
                $count = 0;
                $html .= "</div> <div class='row justify-content-center'>";
            }
            $html .= "<div class='col-2' style='margin-left: 2cm;margin-top: 20px;'>";
            $html .= "<a href='./vista/editor_proyecto.php?idProject=". $proj["ID"] ."' style='text-decoration-line: none;'>";
            $html .= "<div style='background-color: #969696;height: 11em;width: 11em;border: 2px solid black;border-radius: 20px;position: relative;'>";
            
            $html .= "<div class='dropdown'>
            <img src='./SRC/imagenes_web/flecha_opciones_proyecto.png' style=' width: 30px;margin-left:9em; margin-top:5px'>
            <div class='dropdown-content'>
            <a href='../eliminar'>Borrar</a><br>
            <a href='../eliminar'>Cambiar nombre</a><br>
            <a href='../eliminar'>Duplicar</a><br>
            <a href='../eliminar'>Info</a><br>
            </div>
          </div>";

            $html .= "</div>";
            $html .= "<h3 style=\"font-family: 'AgrandirRegular'; color: black;font-size: 25px; text-align: center;\">";
            $html .= $proj["nombre"] ."</h3>";
            $html .= "</a>";
            
            $html .= "</div>";
            $count++;
        }
        $html .= "</div>";

        echo $html;
    }catch(PDOException $e){
        echo "Error mostrarProyectosUser: ".$e->getMessage();
    }
}

