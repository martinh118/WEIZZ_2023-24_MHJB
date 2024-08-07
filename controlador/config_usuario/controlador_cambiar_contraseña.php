<?php
// include_once("../../vista/config_usuario/cambiar_contraseña.php");
require_once("../../modelo/configuracion_usuario/modelo_usuarios.php");
require_once("../../modelo/configuracion_usuario/modelo_cambiar_contraseña.php");

session_start();

/**
 * Obtiene los datos del formulario para cambiar la contraseña y comprueba que los datos
 * son correctos o pasan las restricciones de contraseña.
 */
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $oldPass = $_POST['oldPass'];
    $newPass = $_POST['newPass'];
    $repPass = $_POST['repPass'];

    $usuario = obtenerUsuarioUnico($_SESSION['email'])->fetch();

    $_SESSION['errorPass'] = null;
    $_SESSION['successPass'] = null;

    if ($oldPass == "") {
        $_SESSION['errorPass'] .= "El campo de la contraseña antigua es obligatoria. <br>";
    }
    if ($oldPass == "") {
        $_SESSION['errorPass'] .= "El campo de la nueva contraseña es obligatoria. <br>";
    }
    if ($repPass == "") {
        $_SESSION['errorPass'] .= "El campo de repetir contraseña es obligatoria. <br>";
    }

    if ($newPass != $repPass) {
        $_SESSION['errorPass'] .= "La nueva contraseña y la repetida no son iguales. <br>";
    }

    if (strlen($pass) < 8 || !preg_match('`[A-Z]`', $pass) || !preg_match('`[0-9]`', $pass)) {
        $_SESSION['errorPass'] .= "La contraseña debe superar la longitud de 8 digitos, debe contener al menos una letra en mayuscula y al menos un caracter numérico. (Ej.: Weizz2024)<br>";
    }

    if (password_verify($oldPass, $usuario['contra'])) {
        if ($_SESSION['errorPass'] == null) {
            $new = password_hash($newPass, PASSWORD_DEFAULT);
            $_SESSION['successPass'] = "Contraseña cambiada correctamente.";
            cambiarContraseñaUsuario($usuario['ID'], $new);
        }
    } else {
        $_SESSION['errorPass'] .= "La contraseña antigua no es correcta. <br>";
    }
?>

    <script>
        location.replace("../../vista/config_usuario/cambiar_contraseña.php");
    </script>
<?php
}
