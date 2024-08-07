<html lang="es">

<head>
    <script src="https://code.jquery.com/jquery-3.6.3.min.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="../../SRC/CSS/forms/contraseña_olvidada_form.css">

</head>
<?php
session_start();


?>


<body>

    <header>
        <div class="row container-fluid" id="encabezado">
            <div class="col ">
                <a href="../../index.php">
                    <img src="../../SRC/imagenes_web/logo_weizz_fondo.png" alt="logo_weizz" id="logo_weizz">
                </a>

            </div>
            <div class="col">
                <h2 id="inicioPage"><a href="../../index.php" class="tituloHeader">Inicio</a></h2>
            </div>
            <div class="col"></div>
            <div class='col-2 offset-2'>
                <h2 id='iniciarSesionPage'>
                    <a href='./iniciar_sesion_form.php' class='tituloHeader'>Iniciar Sesión</a>
                </h2>
            </div>
            <div class='col-3'>
                <h2 id='registroPage'>
                    <a href='./registrar_form.php' class='tituloHeader'>Crear cuenta</a>
                </h2>

            </div>



        </div>

        <hr class="hrLinea">

    </header>


    <div class="row container-fluid">
        <h2 id="welcomeTitle">Recuperar contraseña</h2>
    </div>

    <?php
    if (isset($_SESSION['errorEmail'])) {
        $error = $_SESSION['errorEmail'];
        echo "<div class='alert mx-auto alert-danger' role='alert' style='width:40em; text-align:center'><b>" . $error . "</b></div>";
    } else if (isset($_SESSION['successEmail'])) {
        $success = $_SESSION['successEmail'];
        echo "<div class='alert  mx-auto alert-success' role='alert' style='width:40em; text-align:center' ><b>" . $success . "</b></div>";
    }

    ?>

    <form action="../../controlador/forms/controlador_contraseña_olvidada.php" class="formTable" method="POST">
        <p class="infoText">Aplica el correo electrónico de tu cuenta de usuario para que te podamos enviar el link de cambio de contraseña.</p>
        <div class="row">
            <label for="email" class="agrandir">Correo electronico:</label>
            <input type="email" name="email" id="email">
        </div>
        <br>
        <div class="row">
            <input type="submit" class="submitButton col-5 offset-2 btn btn-outline-danger" value="Enviar">
        </div>

    </form>


</body>

</html>