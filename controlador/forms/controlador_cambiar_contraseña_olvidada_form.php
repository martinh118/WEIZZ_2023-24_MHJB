<?php
require_once("../../modelo/configuracion_usuario/modelo_cambiar_contraseña.php");
require_once("../../modelo/configuracion_usuario/modelo_usuarios.php");

session_start();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $errores = "";
    $errores .= revisarForm();

    $emailUser = $_SESSION['emailNewPass'];
    $tokenUser = $_SESSION['tokenNewPass'];
    $_SESSION['successForgotenPass'] = null;
    $_SESSION['errorForgotenPass'] = null;

    $user = obtenerUsuarioUnico($emailUser)->fetch();

    if ($errores == "") {
        if ($user != null) {
            if ($tokenUser == $user['token']) {

                $newPass = password_hash($_POST['newPass'], PASSWORD_DEFAULT);
                cambiarContraseñaUsuario($user['ID'], $newPass);
                $_SESSION['successForgotenPass'] = "Contraseña cambiada correctamente.<br>";
            } else {
                $errores .= "Token no coincide.<br>";
                $_SESSION['errorForgotenPass'] = $errores;
            }

        } else {
            $errores .= "Usuario por correo no encontrado.<br>";
            $_SESSION['errorForgotenPass'] = $errores;
        }

    } else $_SESSION['errorForgotenPass'] = $errores;

    ?>
    <script>
        location.replace("../../vista/forms/cambiar_contraseña_olvidada_form.php");
    </script>
    <?php

}

function revisarForm()
{
    $error = "";

    if ($_POST['newPass'] == "" || $_POST['repPass'] == "") {
        $error .= "Ambos campos son obligatorios. <br>";
    } else if ($_POST['newPass'] != $_POST['repPass']) {
        $error .= "La contraseña en ambos campos deben coincidir.<br>";
    }

    return $error;
}
