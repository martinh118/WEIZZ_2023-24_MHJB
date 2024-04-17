<?php 

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once('../../SRC/PHPMailer/Exception.php');
require_once('../../SRC/PHPMailer/PHPMailer.php');
require_once('../../SRC/PHPMailer/SMTP.php');
require_once("../../modelo/configuracion_usuario/modelo_cambiar_token.php");
require_once("../../modelo/configuracion_usuario/modelo_usuarios.php");


session_start();
$_SESSION['errorEmail'] = null;
$_SESSION['successEmail'] = null;

if ($_SERVER["REQUEST_METHOD"] == "POST"){
    $error = "";
    $error .= comprobarCampoVacio();
    $error .= comprobarExistenciaCorreo();

    if($error == ""){
        $email = $_POST['email'];

        $token = uniqid();
        $email = trim($_POST['email']);

        cambiarToken($email, $token);
        enviarCorreo($email, $token);
        $_SESSION['successEmail'] = "Correo enviado correctamente.<br>";

    }else {
        $_SESSION['errorEmail'] = $error;
    }
    ?>
        <script>
            location.replace("../../vista/forms/contraseña_olvidada_form.php");
        </script>
    <?php

}


function comprobarCampoVacio(){
    $error = "";
    if($_POST['email'] == ""){
        $error .= "El campo de correo electronico es obligatorio.<br>";
    }

    return $error;
}

function comprobarExistenciaCorreo(){
    $error = "";
    $usuario = obtenerUsuarioUnico(trim($_POST['email']))->fetch();

    if($usuario == null){
        $error .= "El correo electronico seleccionado no se encuentra en nuestra base de datos.";
    }

    return $error;
}

function enviarCorreo($correo, $token){
    $user = obtenerUsuarioUnico($correo)->fetch();
    $nombre = $user['usuario'];

    //Crea l'objecte de PHPMailer, passant el paràmetre boolean 'true' per deixar passar excepcions.
    $mail = new PHPMailer(true);
    //Passa a la variable $mail l'opció d'enviar correu fent servir SMTP.
    $mail->isSMTP(); 
    try {
        //Server settings
        $mail->CharSet  = "utf-8";
        $mail->SMTPDebug = 0;                                //Versió 0 de sortida de debug, és a dir, sense missatges. 1 per mostrar errors. 2 per mostrar errors i warnings.
        $mail->Host       = 'smtp.gmail.com';                //Passar servidor SMTP per fer l'enviament.
        $mail->SMTPAuth   = true;                            //Habilitar autenticació SMTP.
        $mail->Username   = 'martinjaime118@gmail.com';      //Nom d'usuari SMTP (el meu correu electrònic).
        $mail->Password   = 'tzme wvif twez tnij';           //Contrasenya d'usuari SMTP (contrasenya generat amb la seguretat de Google).
        $mail->SMTPSecure = 'ssl';                           //Habilitar enviament amb seguretat SSL.
        $mail->Port       =  465;                            //Port pel qual s'envia el correu.

        //Recipients
        $mail->setFrom('martinjaime118@gmail.com'); //Nom del correu pel qual s'enviarà el missatge.
        $mail->addAddress($correo, $nombre);     //Correu on s'enviarà el missatge.

        //Content
        $mail->isHTML(true);         //Cambiar el format HTML a true.
        $mail->Subject = "Recuperar contrasenya.";    //Assumpte del correu. En aquest cas el nom aplicat al formulari.   
        $mail->Body    = 
        "<html>
        <head>
            <title>WEIZZ - Recuperar contrasenya</title>   
        </head>
        <body>
        <p>Accede al siguiente link para redirigirte al formulario para aplicar la nueva contraseña de usuario.</p>
            <h3>Link per recuperar contrasenya: </h3>
            <a href='http://localhost/practiques/PROYECTO_FINAL_2DAW/codigo_original/vista/forms/cambiar_contraseña_olvidada_form.php?token=$token&email=$correo'> Click aquí per recuperar contrasenya.</a>
        </body>
        </html>";    //Cos del missatge. En aquest cas el text aplicat al formulari.

        $mail->send(); //Realitzar l'enviament.
        return "Enviat correctament.";
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
}