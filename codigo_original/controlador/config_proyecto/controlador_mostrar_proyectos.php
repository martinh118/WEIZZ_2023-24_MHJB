<?php
require_once(".\modelo\configuracion_proyecto\modelo_obtener_proyectos.php");

function mostrarProyectosUser($idUser)
{
    try {
        $count = 0;
        $proyectosUser = obtenerProyectosUser($idUser)->fetchAll();
        $html = "<div class='row d-flex justify-content-around'>";
        foreach ($proyectosUser as $proj) {
            if ($count == 4) {
                $count = 0;
                $html .= "</div> <div class='row d-flex justify-content-around>";
            }
            $html .= "<div class='col-2' style='margin-left: 2cm;margin-top: 20px;'>";
            $html .= "<div class='dropdown'>
        <img src='./SRC/imagenes_web/flecha_opciones_proyecto.png'  class='flechaOpcionesProyecto'>
        <div class='btn-group-vertical dropdown-content'>
        <button type='button' class='btn btn-outline-danger accionBorrar' data-bs-toggle='modal' data-bs-target='#eliminarProyecto' data-info=\"" . $proj['ID'] . "\">Borrar</button>
        <button type='button' class='btn btn-outline-danger accionCambiarNombre' data-bs-toggle='modal' data-bs-target='#cambiarNombre' data-info=\"" . $proj['ID'] . "\">Cambiar nombre</button>
        <button type='button' class='btn btn-outline-danger accionDuplicar' data-bs-toggle='modal' data-bs-target='#duplicarProyecto' data-info=\"" . $proj['ID'] . "\">Duplicar</button><br>
        <button type='button' class='btn btn-outline-danger accionInfoProyecto' data-bs-toggle='modal' data-bs-target='#infoProyecto' data-id=\"" . $proj['ID'] . "\" data-nombre=\"" . $proj['nombre'] . "\" data-fecha=\"" . $proj['created_date'] . "\">Info</button>
        </div>
    </div>";
            $html .= "<a href='./vista/editor_proyecto.php?idProject=" . $proj["ID"] . "' style='text-decoration-line: none;'>";

            $html .= "<div class='projectCol' style=''>";
            $html .= "</div>";

            $html .= "<h3 class='titutloProject'>";
            $html .= $proj["nombre"] . "</h3>";

            $html .= "</a>"; // Cerrando el enlace aquí, después de todos los elementos dentro de .col-2
            $html .= "</div>";

            $count++;
        }
        $html .= "</div>";

        echo $html;
    } catch (PDOException $e) {
        echo "Error mostrarProyectosUser: " . $e->getMessage();
    }
}
