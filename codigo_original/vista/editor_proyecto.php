<html>

<head>

    <link rel="stylesheet" href="../SRC/CSS/editor_proyecto.css" type="text/css">
    <!-- <link rel="stylesheet" href="../SRC/CSS/proyecto1.css" type="text/css"> -->
    <meta charset="UTF-8" />
    <title>Weizz</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>

    <script type="module" src="../controlador/editor_proyecto.js"></script>
</head>

<body style="background-color: #EFEFEF;">


    <header class="g-0">
        <div class="row g-0" id="encabezado">
            <div class="col-2 ">
                <a href="../welcome_page.php">
                    <img src="../SRC/imagenes_web/logo_weizz_fondo.png" alt="logo_weizz" id="logo_weizz">
                </a>

            </div>
            <div class="col-1">
                <h2 id="inicioPage"><a href="../welcome_page.php" class="tituloHeader">Inicio</a></h2>
            </div>
            <div class="col-1">
                <h2 id="proyectosPage">
                    <a href="" class="tituloHeader">Proyectos</a>
                </h2>
            </div>
            <div class="col"></div>

        </div>

        <hr class="hrLinea">

    </header>

    <div class="row">
        <div class="col">
            <div class="btn-group" role="group" aria-label="Basic outlined example">
                <button type="button" class="btn btn-outline-danger">Capas</button>
                <button type="button" class="btn btn-outline-danger">Elementos</button>
                <button type="button" class="btn btn-outline-danger">Estilo</button>
                <button type="button" class="btn btn-outline-danger">Cerrar pestañas</button>
                <button type="button" class="btn btn-outline-danger">Descargar JSON</button>
                <button type="button" class="btn btn-outline-danger">Visualizar</button>
                <button type="button" class="btn btn-outline-danger">Guardar cambios</button>
            </div>
        </div>
    </div>

    <hr class="hrLinea">
    <div class="container" id="proyecto">
        <html>

        <div class="row border-bottom border-dark border-2" id="headerProject">

            <div class="col" id="colHeaderProject">
                <h1>header</h1>
            </div>
        </div>
        <br><br>
        <div class="row" id="bodyProject">
        
        </div>

        <br><br>

        <div class="row border-top border-dark border-2" id="footerProject">

            <div class="col ">
                <h1>footer</h1>
            </div>
        </div>


        </html>

    </div>

</body>

</html>