<?php 

require_once("../../modelo/configuracion_usuario/modelo_eliminar_usuario.php");

/**
 * Elimina al usuario de la base de datos a partir del identificador.
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
                window.location.replace("../../index.php");
                alert('Usuario eliminado correctamente.');
                </script>
                EOT;
    echo $script;
}

eliminarUsuario();