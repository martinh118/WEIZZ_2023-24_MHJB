<html lang="es">

<head>

    <link rel="stylesheet" href="../SRC/CSS/seleccion_base.css" type="text/css">
    <!-- <link rel="stylesheet" href="../SRC/CSS/proyecto1.css" type="text/css"> -->
    <meta charset="UTF-8" />
    <title>Weizz - Elegir base</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    <script src="../controlador/seleccion_bases.js" type="module"></script>


</head>
<?php
session_start();
?>

<body style="background-color: #EFEFEF;">


    <header class="">
        <div class="row container-fluid" id="encabezado">
            <div class="col">
                <a href="../index.php">
                    <img src="../SRC/imagenes_web/logo_weizz_fondo.png" alt="logo_weizz" id="logo_weizz">
                </a>

            </div>
            <div class="col">
                <h2 id="inicioPage"><a href="../index.php" class="tituloHeader">Inicio</a></h2>
            </div>
            <div class="col"></div>
            <?php
            if (isset($_SESSION['usuario'])) {

                echo "<div class='col-4 offset-2'>
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

    <div class="row container-fluid">
        <div class="col-3 offset-1 mt-4">
            <label for="importButton" class="baseTitle">Importar proyecto</label>
            <input type="file" id="importButton" class=" btn btn-danger importButton" accept="application/JSON"></input>
        </div>
    </div>
    <br><br>
    <div class="row justify-content-center container-fluid">

        <div class="col-2 colCuadroBase" >
            <a class="seleccionBase" data-base='basico'>
                <div class="cuadroBase" id="baseBasico">
                </div>
                <h3 class="baseTitle"><b>Básico</b></h3>
            </a>
        </div>

        <div class="col-2 colCuadroBase">
            <a class="seleccionBase"  data-base='multiple'>

                <div class="cuadroBase" id="baseMultiple">

                </div>
                <h3 class="baseTitle"><b>Múltiple</b></h3>
            </a>
        </div>

    </div>



</body>

</html>