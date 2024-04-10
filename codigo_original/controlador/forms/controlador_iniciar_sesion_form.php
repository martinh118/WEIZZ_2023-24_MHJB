<?php
require_once("../../modelo/configuracion_usuario/modelo_usuarios.php");


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    try {
        session_start();
        iniciarSesion();
    } catch (PDOException $e) {
        echo "Error Server Request Iniciar Sesion: " . $e->getMessage();
    }
}



function iniciarSesion()
{
    try {
        $errores = "";
        $errores .= comprobarCamposVacios();
        $errores .= comprobarDatos();

        if ($errores == "") {

            $usuario = obtenerUsuarioUnico($_POST['email'])->fetch();
            $_SESSION['ID'] = $usuario['ID'];
            $_SESSION['usuario'] = $usuario['usuario'];
            $_SESSION['email'] = $usuario['email'];
            $_SESSION['token'] = $usuario['token'];

        } else if ($errores != "") {
            $_SESSION['error'] = $errores;
        }

        ?>
        <script>
            location.replace("../../vista/forms/iniciar_sesion_form.php");
        </script>
    <?php
    } catch (PDOException $e) {
        echo "Error iniciarSesion: " . $e->getMessage();
    }
}


function comprobarCamposVacios()
{
    try {
        $errores = "";

        $errores .= empty($_POST['email']) ? "El correo electronico es obligatorio.<br>" : "";
        $errores .= empty($_POST['pass']) ? "La contraseña es obligatorio.<br>" : "";

        return $errores;
    } catch (PDOException $e) {
        echo "Error comprobarCamposVacios: " - $e->getMessage();
    }
}

function comprobarDatos()
{
    try {
        $errores = "";
        $usuarios = getUsers();
        $email = $_POST['email'];
        $contra = $_POST['pass'];

        foreach ($usuarios as $user) {
            if ($user['email'] == $email) {
                if (password_verify($contra, $user['contra'])) {
                    return $errores;
                } else {
                    $errores .= "La contraseña introducida no es correcta.<br><br>";
                    return $errores;
                }
            }
        }
        $errores .= "No existe ningun usuario con este correo electronico.<br><br>";
    } catch (PDOException $e) {
        return "Error comprobarDatos: " . $e->getMessage();
    }
}

function getUsers()
{
    try {
        $users = obtenerUsuarios()->fetchAll();
        return $users;
    } catch (PDOException $e) {
        echo "Error to getUsers: " . $e->getMessage();;
    }
}
