
<?php 
session_start();
?>


<header>
        <div class="row container-fluid" id="encabezado">
            <div class="col">
                <a href="/practiques/Proyecto_Final_2DAW_2023-24_MHJB/codigo_original/index.php">
                    <img src="/practiques/Proyecto_Final_2DAW_2023-24_MHJB/codigo_original/SRC/imagenes_web/logo_weizz_fondo.png" alt="logo_weizz" id="logo_weizz">
                </a>

            </div>
            <div class="col">
                <a href="/practiques/Proyecto_Final_2DAW_2023-24_MHJB/codigo_original/index.php" class="tituloHeader">Inicio</a>
            </div>
            <?php
            if (isset($_SESSION['admin'])) {
                echo "<div class='col'><a href='/practiques/Proyecto_Final_2DAW_2023-24_MHJB/codigo_original/vista/admin/all_users.php' class='tituloHeader'>Usuarios</a></div>
                       <div class='col'> <a href='' class='tituloHeader'>Proyectos</a></div>
                ";
            } 
            ?>
            <div class="col"></div>

            <?php
        if (isset($_SESSION['admin'])) {
            echo "<div class='col-4'>
            <h2 id='iniciarSesionPage'>
                    <a href='/practiques/Proyecto_Final_2DAW_2023-24_MHJB/codigo_original//vista/config_usuario/configurar_usuario.php' class='tituloHeader'><b>" . $_SESSION['usuario'] . "</b></a>&nbsp;&nbsp;
                    <a href='/practiques/Proyecto_Final_2DAW_2023-24_MHJB/codigo_original//controlador/forms/controlador_cerrar_sesion.php' class='tituloHeader'>Cerrar Sesión</a>
                </h2>
            </div>
            ";
        } else if (isset($_SESSION['usuario'])) {
            echo "<div class='col-4 offset-2'>
                <h2 id='iniciarSesionPage'>
                    <a href='/practiques/Proyecto_Final_2DAW_2023-24_MHJB/codigo_original//vista/config_usuario/configurar_usuario.php' class='tituloHeader'><b>" . $_SESSION['usuario'] . "</b></a>&nbsp;&nbsp;
                    <a href='/practiques/Proyecto_Final_2DAW_2023-24_MHJB/codigo_original//controlador/forms/controlador_cerrar_sesion.php' class='tituloHeader'>Cerrar Sesión</a>
                </h2>
            </div>";
        } else {
            echo "<div class='col-2 offset-2'>
                <h2 id='iniciarSesionPage'>
                    <a href='/practiques/Proyecto_Final_2DAW_2023-24_MHJB/codigo_original//vista/forms/iniciar_sesion_form.php' class='tituloHeader'>Iniciar Sesión</a>
                </h2>
            </div>
            <div class='col-3'>
                <h2 id='registroPage'>
                    <a href='/practiques/Proyecto_Final_2DAW_2023-24_MHJB/codigo_original//vista/forms/registrar_form.php' class='tituloHeader'>Crear cuenta</a>
                </h2>

            </div>";
        }

            ?>

        </div>

        <hr class="hrLinea">

    </header>
