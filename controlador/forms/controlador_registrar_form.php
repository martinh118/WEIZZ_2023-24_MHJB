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


/**
 * Realiza el registro de usuario despues de comprobar todos los datos del formulario.
 */
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

/**
 * Comprueba que los datos no estén vacios.
 * @return error Devuelve string con el error encontrado
 */
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

/**
 * Comprueba que los datos no estén repetidos a partir de obtener todos los usuarios.
 * @return error Devuelve string con el error encontrado
 */
function comprobarDatos()
{

    try {
        $errores = "";
        $usuarios = getUsers();
        $userName = $_POST['userName'];
        $email = $_POST['email'];
        $pass = $_POST['pass'];
        $pass2 = $_POST['pass2'];

        foreach ($usuarios as $user) {
            if ($user['email'] == $email) {
                $errores .= "Lo sentimos, el correo electronico <b>'" . $email . "'</b> ya está registrado.<br>";
            }
            if ($user['usuario'] == $userName) {
                $errores .= "Lo sentimos, el nombre de usuario <b>'" . $userName . "'</b> ya está registrado.<br>";
            }
        }

        if(strlen($pass) < 8 || !preg_match('`[A-Z]`',$pass) || !preg_match('`[0-9]`',$pass) ){
            $errores .= "La contraseña debe superar la longitud de 8 digitos, debe contener al menos una letra en mayuscula y al menos un caracter numérico. (Ej.: Weizz2024)<br>";
        }

        if($pass != $pass2){
            $errores .= "Las contraseñas aplicadas no son identicas.<br>";
        }
        return $errores;
    } catch (PDOException $e) {
        return "Error comprobarDatos: " . $e->getMessage();
    }
}

/**
 * Obtener todos los usuario de la base de datos.
 * @return users devuelve todos los usuarios de la base de datos. 
 */
function getUsers()
{
    try {
        $users = obtenerUsuarios()->fetchAll();
        return $users;
    } catch (PDOException $e) {
        echo "Error to getUsers: " . $e->getMessage();;
    }
}
