<?php
require_once("../../modelo/configuracion_usuario/modelo_usuarios.php");


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    try {
        session_start();
        registrarUsuario();
    } catch (PDOException $e) {
        echo "Error Server Request Iniciar Sesion: " . $e->getMessage();
    }
}



function registrarUsuario()
{
    try {
        $errores = "";
        $errores .= comprobarCamposVacios();
        $errores .= comprobarDatos();

        if ($errores == "") {

            $userName = $_POST['userName'];
            $email = $_POST['email'];
            $contraseña = password_hash($_POST['pass'], PASSWORD_DEFAULT);
            $token = uniqid();
            
            echo $userName . "<br>";
            echo $email . "<br>";
            echo $contraseña . "<br>";
            echo $token . "<br>";

            crearUsuario($userName, $email, $contraseña, $token);

            $_SESSION['success'] = "Usuario registrado correctamente";

        } else if ($errores != "") {
            $_SESSION['error'] = $errores;
        }

?>
        <script>
            location.replace("../../vista/forms/registrar_form.php");
        </script>
<?php
    } catch (PDOException $e) {
        echo "Error registrarUsuario: " . $e->getMessage();
    }
}


function comprobarCamposVacios()
{

    try {
        $errores = "";

        $errores .= empty($_POST['email']) ? "El correo electronico es obligatorio.<br>" : "";
        $errores .= empty($_POST['userName']) ? "El nombre de usuario es obligatorio.<br>" : "";
        $errores .= empty($_POST['pass']) ? "La contraseña es obligatorio.<br>" : "";
        $errores .= empty($_POST['pass2']) ? "Repetir la contraseña es obligatorio.<br>" : "";

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
        $pass = $_POST['pass'];
        $pass2 = $_POST['pass2'];

        foreach ($usuarios as $user) {
            if ($user['email'] == $email) {
                $errores .= "El correo electronico '" . $email . "' ya está registrado.<br>";
            }
        }

        if($pass != $pass2){
            $errores .= "Las contrasenyas aplicadas no son identicas.<br>";
        }
        return $errores;
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
