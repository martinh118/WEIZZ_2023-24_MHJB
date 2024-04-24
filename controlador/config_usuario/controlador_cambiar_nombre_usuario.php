<?php
include_once("../../vista/config_usuario/editar_nombre_usuario.php");
require_once("../../modelo/configuracion_usuario/modelo_cambiar_nombre.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombreUsuario = $_SESSION['ID'];
    $nuevoNombre = $_POST['newUserName'];

    $_SESSION['errorName'] = null;
    $_SESSION['successName'] = null;

    if ($nuevoNombre == "") {
        $_SESSION['errorName'] = "El campo para cambiar de nombre es obligatorio.";
    } else {
        cambiarNombre($nombreUsuario, $nuevoNombre);
        $_SESSION['successName'] = "Nombre de usuario cambiado correctamente";
    }

    $_SESSION['usuario'] = $nuevoNombre;

?>
    <script>
        location.replace("../../vista/config_usuario/editar_nombre_usuario.php");
    </script>
<?php
}
