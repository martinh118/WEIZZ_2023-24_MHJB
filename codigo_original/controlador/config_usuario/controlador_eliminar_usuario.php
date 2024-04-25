<?php 

require_once("../../modelo/configuracion_usuario/modelo_eliminar_usuario.php");

/**
 * Elimina l'usuari a la base de dades i redirecciona la página a l'inici.
 */
function eliminarUsuario()
{
    session_start();
    $idUsuario = $_SESSION['ID'];
    eliminarProyectosUser($idUsuario);
    deleteUser($idUsuario);
    session_destroy();
    session_abort();
    $script = <<<EOT
                <script type='text/javascript'>
                window.location.replace("../../welcome_page.php");
                alert('Usuario eliminado correctamente.');
                </script>
                EOT;
    echo $script;
}

eliminarUsuario();