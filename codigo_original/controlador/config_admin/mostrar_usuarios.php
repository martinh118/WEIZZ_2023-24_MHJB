<?php
require_once("../../modelo/configuracion_usuario/modelo_usuarios.php");


function mostrarConfigUsuarios()
{
    $html = '<div class="row container-fluid d-flex justify-content-center">';
    $count = 0;
    $allUsers = obtenerUsuarios()->fetchAll();

    foreach ($allUsers as $user) {
        if ($count == 2) {
            $count = 0;
            $html .= '</div> <div class="row container-fluid d-flex justify-content-center">';
        }
        $html .= '<div class="d-flex col-5 p-3 m-4 bg-body rounded border border-dark userName">';
        $html .= '<div class="me-auto p-2 bd-highlight userName">' . $user["usuario"] . '</div>';

        $html .=  "<button class='accionInfoUser userOption' type='button' data-bs-toggle='modal' data-bs-target='#infoUsuario' data-id=\"" . $user['ID'] . "\" data-nombre=\"" . $user['usuario'] . "\" data-fecha='" . $user['created_date'] . "'><img src='../../SRC/imagenes_web/info.png' class='iconUser bd-highlight p-2' alt='boton ver info usuarios'></button>";
        $html .= "<button class='userOption'>" . '<img src="../../SRC/imagenes_web/folder.png" class="iconUser bd-highlight p-2" alt="boton ver proyectos usuario">' . '</button>';
        $html .= "<button class='userOption'><img src='../../SRC/imagenes_web/pencil.png' class='iconUser bd-highlight p-2' alt='boton editar usuario'" . '></button>';

        $html .= '</div>';

        $count++;
    }
    $html .= `</div>`;
    echo $html;
}
