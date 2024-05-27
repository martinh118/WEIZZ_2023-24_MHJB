<html>

<head>
    <script src="https://code.jquery.com/jquery-3.6.3.min.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="../../SRC/CSS/config_users/editar_nombre_usuario.css">
    <title>Weizz - Cambiar contraseña</title>
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

            <?php
            if (isset($_SESSION['usuario'])) {

                echo "<div class='col-4 offset-2'>
                <h2 id='iniciarSesionPage'>
                    <a href='./configurar_usuario.php' class='tituloHeader'><b>" . $_SESSION['usuario'] . "</b></a>&nbsp;&nbsp;
                    <a href='../../controlador/forms/controlador_cerrar_sesion.php' class='tituloHeader'>Cerrar Sesión</a>
                </h2>
            </div>";
            } 

            ?>

        </div>

        <hr class="hrLinea">

    </header>


    <div class="row container-fluid">
        <h2 id="welcomeTitle">Editar usuario</h2>
    </div>

    <?php

    if (isset($_SESSION['errorPass'])) {
        $error = $_SESSION['errorPass'];
        echo "<div class='alert alert-danger mx-auto' role='alert' style='width:40em; text-align:center'><b>" . $error . "</b></div>";
        // session_unset();
    } else if (isset($_SESSION['successPass'])) {
        $success = $_SESSION['successPass'];
        echo "<div class='alert alert-success mx-auto' role='alert' style='width:40em; text-align:center'><b>" . $success . "</b></div>";
    }

    ?>

    <form action="../../controlador/config_usuario/controlador_cambiar_contraseña.php" class="formTable" method="POST">
        <div class="row">
            <label for="oldPass" class="agrandir">Contraseña antigua:</label>
            <input type="password" name="oldPass" id="oldPass">
        </div>
        <div class="row">
            <label for="newPass" class="agrandir">Nueva contraseña:</label>
            <input type="password" name="newPass" id="newPass">
        </div>
        <div class="row">
            <label for="repPass" class="agrandir">Repetir contraseña:</label>
            <input type="password" name="repPass" id="repPass">
        </div>
        <div class="row">
        <br>
            <input type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" class="submitButton col-5 offset-2 btn btn-outline-danger" value="Cambiar">
        </div>
        <!-- Modal Preguntar eliminar cuenta de usuario -->
        <div class='modal fade' id='exampleModal' tabindex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true'>
            <div class='modal-dialog'>
                <div class='modal-content'>
                    <h5 class='modal-body'>
                        ¿Cambiar contraseña?
                    </h5>
                    <div class='modal-footer'>

                        <input type="submit" type='button' class='btn btn-danger' value="Confirmar">
                        <button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    </form>




</body>

</html>