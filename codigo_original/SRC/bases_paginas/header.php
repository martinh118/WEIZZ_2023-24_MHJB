<?php 
session_start();
?>

<header>
        <div class="row container-fluid" id="encabezado">
            <div class="col">
                <a href="./index.php">
                    <img src="./SRC/imagenes_web/logo_weizz_fondo.png" alt="logo_weizz" id="logo_weizz">
                </a>

            </div>
            <div class="col">
                <h2 id="inicioPage"><a href="./index.php" class="tituloHeader">Inicio</a></h2>
            </div>
            <?php
            if (isset($_SESSION['admin'])) {
                echo "<div class='col'><a href='./vista/admin/all_users.php' class='tituloHeader'>Usuarios</a>&nbsp;&nbsp;</div>
                       <div class='col'> <a href='' class='tituloHeader'>Proyectos</a>&nbsp;&nbsp;</div>
                ";
            } 
            ?>
            <div class="col"></div>

            <?php
        if (isset($_SESSION['admin'])) {
            echo "<div class='col-4'>
            <h2 id='iniciarSesionPage'>
                    <a href='./vista/config_usuario/configurar_usuario.php' class='tituloHeader'><b>" . $_SESSION['usuario'] . "</b></a>&nbsp;&nbsp;
                    <a href='./controlador/forms/controlador_cerrar_sesion.php' class='tituloHeader'>Cerrar Sesión</a>
                </h2>
            </div>
            ";
        } else if (isset($_SESSION['usuario'])) {
            echo "<div class='col-4 offset-2'>
                <h2 id='iniciarSesionPage'>
                    <a href='./vista/config_usuario/configurar_usuario.php' class='tituloHeader'><b>" . $_SESSION['usuario'] . "</b></a>&nbsp;&nbsp;
                    <a href='./controlador/forms/controlador_cerrar_sesion.php' class='tituloHeader'>Cerrar Sesión</a>
                </h2>
            </div>";
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
