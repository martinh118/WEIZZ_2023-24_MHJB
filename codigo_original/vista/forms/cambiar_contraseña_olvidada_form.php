<html>

<head>
    <script src="https://code.jquery.com/jquery-3.6.3.min.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="../../SRC/CSS/forms/contraseña_olvidada_form.css">

</head>
<?php
session_start();
if (isset($_GET['token'])) {
    $_SESSION['tokenNewPass'] = $_GET['token'];
}
if (isset($_GET['email'])) {
    $_SESSION['emailNewPass'] = $_GET['email'];
}

?>


<body>

    <header>
        <div class="row" id="encabezado">
            <div class="col-2 ">
                <a data-bs-toggle="modal" data-bs-target="#regresarInicio">
                    <img src="../../SRC/imagenes_web/logo_weizz_fondo.png" alt="logo_weizz" id="logo_weizz">
                </a>

            </div>
            <div class="col-2">
                <h2 id="inicioPage"><a type="button" data-bs-toggle="modal" data-bs-target="#regresarInicio" class="tituloHeader">Inicio</a></h2>
            </div>
            <div class="col"></div>

        </div>

        <hr class="hrLinea">

    </header>


    <div class="row">
        <h2 id="welcomeTitle">Cambiar contraseña</h2>
    </div>

    <?php
    if (isset($_SESSION['errorForgotenPass'])) {
        $error = $_SESSION['errorForgotenPass'];
        echo "<div class='alert alert-danger offset-3' role='alert' style='width:40em; text-align:center'><b>" . $error . "</b></div>";
    } else if (isset($_SESSION['successForgotenPass'])) {
        $success = $_SESSION['successForgotenPass'];
        echo "<div class='alert alert-success offset-3' role='alert' style='width:40em; text-align:center' ><b>" . $success . "</b></div>";
    }
    ?>

    <form action="../../controlador/forms/controlador_cambiar_contraseña_olvidada_form.php" class="formTable" method="POST">
        <div class="row">
            <label for="newPass" class="agrandir">Nueva contraseña:</label>
            <input type="password" name="newPass" id="newPass">
        </div>
        <div class="row">
            <label for="repPass" class="agrandir">Repetir contraseña:</label>
            <input type="password" name="repPass" id="repPass">
        </div>
        <br>
        <div class="row">
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

    <div class='modal fade' id='regresarInicio' tabindex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true'>
        <div class='modal-dialog'>
            <div class='modal-content'>
                <h5 class='modal-body'>
                    ¿Ir al inicio de la web?
                </h5>
                <div class='modal-footer'>
                    <a href="../../index.php" type="submit" type='button' class='btn btn-danger'>Confirmar</a>
                    <button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>Cancelar</button>
                </div>
            </div>
        </div>
    </div>


</body>

</html>