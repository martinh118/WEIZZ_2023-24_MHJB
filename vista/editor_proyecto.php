<html>

<head>

    <link rel="stylesheet" href="../SRC/CSS/editor_proyecto.css" type="text/css">
    <!-- <link rel="stylesheet" href="../SRC/CSS/proyecto1.css" type="text/css"> -->
    <meta charset="UTF-8" />
    <title>Weizz</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>

    <script type="module" src="../controlador/editor_proyecto/config_mostrar_capas.js"></script>
    <script type="module" src="../controlador/editor_proyecto/config_mostrar_elementos.js"></script>
    <script type="module" src="../controlador/editor_proyecto/config_mostrar_estilo.js"></script>
    <script type="module" src="../controlador/editor_proyecto/editor_proyecto.js"></script>
</head>
<?php
session_start();
?>

<body style="background-color: #EFEFEF;">

    
    <header>
        <div class="row " id="encabezado">
            <div class="col ">
                <a href="../welcome_page.php">
                    <img src="../SRC/imagenes_web/logo_weizz_fondo.png" alt="logo_weizz" id="logo_weizz">
                </a>

            </div>
            <div class="col">
                <h2 id="inicioPage"><a href="../welcome_page.php" class="tituloHeader">Inicio</a></h2>
            </div>
            <div class="col"></div>
            <?php
            if (isset($_SESSION['usuario'])) {

                echo "<div class='col-4 offset-4'>
                <h2 id='iniciarSesionPage'>
                    <a href='./config_usuario/configurar_usuario.php' class='tituloHeader'><b>" . $_SESSION['usuario'] . "</b></a>&nbsp;&nbsp;
                    <a href='../controlador/forms/controlador_cerrar_sesion.php' class='tituloHeader'>Cerrar Sesión</a>
                </h2>
            </div>";
            } else {
                echo "<div class='col-2 offset-2'>
                <h2 id='iniciarSesionPage'>
                    <a href='./forms/iniciar_sesion_form.php' class='tituloHeader'>Iniciar Sesión</a>
                </h2>
            </div>
            <div class='col-3'>
                <h2 id='registroPage'>
                    <a href='./forms/registrar_form.php' class='tituloHeader'>Crear cuenta</a>
                </h2>

            </div>";
            }

            ?>

        </div>

        <hr class="hrLinea">

    </header>





    <div class="row">
        <div class="col">
            <?php
            if (isset($_SESSION['usuario'])) {

                echo "<div class='btn-group' role='group' aria-label='Basic outlined example' style='z-index:1'>
        <button type='button' class='btn btn-outline-danger' id='mostrarCapas'>Capas</button>
        <button type='button' class='btn btn-outline-danger' id='mostrarElementos'>Elementos</button>
        <button type='button' class='btn btn-outline-danger' id='mostrarEstilo'>Estilo</button>
        <button type='button' class='btn btn-outline-danger' id='cerrarPestañas'>Cerrar pestañas</button>
        <button type='button' class='btn btn-outline-danger' id='descargarJson'>Descargar JSON</button>
        <button type='button' class='btn btn-outline-danger' id='visualizarPagina'>Visualizar</button>
        <button type='button' class='btn btn-outline-danger' id='guardarCambios'>Guardar cambios</button>
    </div>";
            } else {
                echo "<div class='btn-group' role='group' aria-label='Basic outlined example' style='z-index:1'>
        <button type='button' class='btn btn-outline-danger' id='mostrarCapas'>Capas</button>
        <button type='button' class='btn btn-outline-danger' id='mostrarElementos'>Elementos</button>
        <button type='button' class='btn btn-outline-danger' id='mostrarEstilo'>Estilo</button>
        <button type='button' class='btn btn-outline-danger' id='cerrarPestañas'>Cerrar pestañas</button>
        <button type='button' class='btn btn-outline-danger' id='descargarJson'>Descargar JSON</button>
        <button type='button' class='btn btn-outline-danger' id='visualizarPagina'>Visualizar</button>
    </div>";
            }

            ?>
        </div>
    </div>

    <hr class="hrLinea">
    
    <div class='alert alert-success offset-3' role='alert' style="width:40em; text-align:center " id="proyectoGuardadoMessage"><b>Proyecto guardado correctamente</b></div>


    <div class="container" id="proyecto">


    </div>

</body>

</html>