<html>

<head>
    <script src="https://code.jquery.com/jquery-3.6.3.min.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="../../SRC/CSS/forms/iniciar_sesion_form.css">
    <script src="../../controlador/forms/controlador_iniciar_sesion_form.js"></script>
</head>
<?php 
    require_once("../../controlador/forms/controlador_iniciar_sesion_form.php");
    session_start();
    
?>

<body>

    <header>
        <div class="row" id="encabezado">
            <div class="col ">
                <a href="../../index.php">
                    <img src="../../SRC/imagenes_web/logo_weizz_fondo.png" alt="logo_weizz" id="logo_weizz">
                </a>

            </div>
            <div class="col">
                <h2 id="inicioPage"><a href="../../index.php" class="tituloHeader">Inicio</a></h2>
            </div>
            <div class="col"></div>
            <div class="col-2 offset-2">
                <h2 id="iniciarSesionPage">
                    <a href="./iniciar_sesion_form.php" class="tituloHeader">Iniciar Sesión</a>
                </h2>
            </div>
            <div class="col-3">
                <h2 id="registroPage">
                    <a href="./registrar_form.php" class="tituloHeader">Crear cuenta</a>
                </h2>

            </div>
        </div>

        <hr class="hrLinea">

    </header>
    <?php
    if (isset($_SESSION['error'])) {
        $error = $_SESSION['error'];
        echo "<div class='alert alert-danger offset-3' role='alert' style='width:40em; text-align:center'><b>" . $error . "</b></div>";
        // session_unset();
    } else if (isset($_SESSION['usuario'])) {
    ?>
        <script>
            location.replace("../../index.php");
        </script>
    <?php
    }

    ?>

    <div class="row">
        <h2 id="welcomeTitle">Iniciar sesión</h2>
    </div>

    <form action="../../controlador/forms/controlador_iniciar_sesion_form.php" class="formTable" method="POST">
        <div class="row">
            <label for="email" class="agrandir">Correo electronico:</label>
            <input type="text" name="email" id="email">
        </div>
        <br>
        <div class=" row">
            <label for="pass" class="agrandir">Contraseña:</label>
            <input type="password" name="pass" id="pass">
        </div>
        <div class="row">
            <a href="./contraseña_olvidada_form.php" id="contraOlvidada" class="col-5">Contraseña olvidada.</a>
            <input type="submit" class="submitButton col-5 offset-2 btn btn-outline-danger" value="Iniciar Sesión">
        </div>

    </form>



</body>

</html>