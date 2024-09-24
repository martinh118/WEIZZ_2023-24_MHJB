<?php
require_once("../../modelo/configuracion_usuario/modelo_usuarios.php");


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    try {
        session_start();
        $_SESSION['ID'] = null;
        $_SESSION['usuario'] = null;
        $_SESSION['email'] = null;
        $_SESSION['token'] = null ;
        $_SESSION['error'] = null;
        iniciarSesion();
    } catch (PDOException $e) {
        echo "Error Server Request Iniciar Sesion: " . $e->getMessage();
    }
}


/**
 * Realiza el inicio de sesión despues de comprobar todos los datos del formulario.
 */
function iniciarSesion()
{
    try {
        $errores = "";
        $errores .= comprobarCamposVacios();
        $errores .= comprobarDatos();

        if ($errores == "") {

            $usuario = obtenerUsuarioUnico($_POST['email'])->fetch();
            if($usuario['admin'] == 1){
                $_SESSION['admin'] = $usuario['admin'];
            }
            $_SESSION['ID'] = $usuario['ID'];
            $_SESSION['usuario'] = $usuario['usuario'];
            $_SESSION['email'] = $usuario['email'];
            $_SESSION['token'] = $usuario['token'];
            aplicarUltimaSesion($usuario['ID']);
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

/**
 * Comprueba que los datos no estén vacios.
 * @return error Devuelve string con el error encontrado
 */
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

/**
 * Comprueba que los datos sean los correctos a partir de obtener todos los usuarios.
 * @return error Devuelve string con el error encontrado
 */
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
        $errores .= "No existe ningún usuario con este correo electronico.<br><br>";
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
