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
    $pass = $_POST['newPass'];
    $rePass = $_POST['repPass'];

    if ($pass == "" || $rePass == "") {
        $error .= "Ambos campos son obligatorios. <br>";
    } else if ($pass != $rePass) {
        $error .= "La contraseña en ambos campos deben coincidir.<br>";
    }else if(strlen($pass) < 8 || !preg_match('`[A-Z]`',$pass) || !preg_match('`[0-9]`',$pass) ){
        $error .= "La contraseña debe superar la longitud de 8 digitos, debe contener al menos una letra en mayuscula y al menos un caracter numérico. (Ej.: Weizz2024)<br>";
    }

    return $error;
}
