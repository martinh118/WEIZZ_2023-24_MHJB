<html>

<head>
    <script src="https://code.jquery.com/jquery-3.6.3.min.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="./SRC/CSS/welcome_page.css">
    <script type="module" src="./controlador/welcome_page.js"></script>

</head>



<body>

    <header>
        <div class="row" id="encabezado">
            <div class="col ">
                <a href="./welcome_page.html">
                    <img src="./SRC/imagenes_web/logo_weizz_fondo.png" alt="logo_weizz" id="logo_weizz">
                </a>

            </div>
            <div class="col">
                <h2 id="inicioPage"><a href="./welcome_page.html" class="tituloHeader">Inicio</a></h2>
            </div>
            <div class="col">
                <h2 id="proyectosPage">
                    <a href="" class="tituloHeader">Proyectos</a>
                </h2>
            </div>
            <div class="col"></div>
            <div class="col-2 offset-2">
                <h2 id="iniciarSesionPage">
                    <a href="" class="tituloHeader">Iniciar Sesión</a>
                </h2>
            </div>
            <div class="col-3">
                <h2 id="registroPage">
                    <a href="" class="tituloHeader">Crear cuenta</a>
                </h2>

            </div>
        </div>

        <hr class="hrLinea">

    </header>


    <div class="row">
        <h2 id="welcomeTitle">¡Bienvenido!</h2>
    </div>

    <div class="row">
        <h2 id="tusProyectos">Tus proyectos:</h2>
    </div>

    <div class="row">

        <div class="col-2 colNuevoProyecto">
            <a href="">
                <div id="cuadroCrearProyecto">
                    <img src="./SRC/imagenes_web/crear_plus.png" alt="crearProyecto" id="crearProyectoSimbol">
                </div>
            </a>
            <h3 id="crearProyectoTitle"><b>Crear proyecto</b></h3>
        </div>

    </div>


</body>

</html>