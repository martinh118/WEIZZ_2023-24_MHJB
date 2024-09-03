<html>

<head>
    <script src="https://code.jquery.com/jquery-3.6.3.min.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
        crossorigin="anonymous"></script>
    <link rel="stylesheet" href="../../SRC/CSS/admin/all_users.css">

</head>
<?php
require_once("../../controlador/config_admin/mostrar_usuarios.php");
session_start();
?>


<header>
    <div class="row container-fluid" id="encabezado">
        <div class="col">
            <a href="./index.php">
                <img src="../../SRC/imagenes_web/logo_weizz_fondo.png" alt="logo_weizz" id="logo_weizz">
            </a>

        </div>
        <div class="col">
            <h2 id="inicioPage"><a href="../../index.php" class="tituloHeader">Inicio</a></h2>
        </div>
        <div class='col'><a href='' class='tituloHeader'>Usuarios</a>&nbsp;&nbsp;</div>
        <div class='col'> <a href='' class='tituloHeader'>Proyectos</a>&nbsp;&nbsp;</div>
        <div class="col"></div>

        <?php
        if (isset($_SESSION['admin'])) {
            echo "<div class='col-4'>
            <h2 id='iniciarSesionPage'>
                    <a href='../config_usuario/configurar_usuario.php' class='tituloHeader'><b>" . $_SESSION['usuario'] . "</b></a>&nbsp;&nbsp;
                    <a href='../../controlador/forms/controlador_cerrar_sesion.php' class='tituloHeader'>Cerrar Sesión</a>
                </h2>
            </div>
            ";
        } else {
            echo "<div class='col-2 offset-2'>
                <h2 id='iniciarSesionPage'>
                    <a href='./vista/forms/iniciar_sesion_form.php' class='tituloHeader'>Iniciar Sesión</a>
                </h2>
            </div>
            <div class='col-3'>
                <h2 id='registroPage'>
                    <a href='./vista/forms/registrar_form.php' class='tituloHeader'>Crear cuenta</a>
                </h2>

            </div>";
        }

        ?>

    </div>

    <hr class="hrLinea">

</header>

<body>

    <div class="row container-fluid">
        <h2 id="mainTitle">Usuarios</h2>
    </div>


    <?php
    mostrarConfigUsuarios();
    ?>



</body>

</html>