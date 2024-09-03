<html lang="es">

<head>

    <link rel="stylesheet" href="../SRC/CSS/seleccion_base.css" type="text/css">
    <link rel="stylesheet" href="../SRC/bases_paginas/headerStyle.css">
    <link rel="stylesheet" href="../SRC/CSS/font_family.css">

    <meta charset="UTF-8" />
    <title>Weizz - Elegir base</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    <script src="../controlador/seleccion_bases.js" type="module"></script>


</head>


<body style="background-color: #EFEFEF;">
    <?php
    include_once("../SRC/bases_paginas/header.php")
    ?>

    <div class="row container-fluid">
        <div class="col-3 offset-1 mt-4">
            <label for="importButton" class="baseTitle">Importar proyecto</label>
            <input type="file" id="importButton" class=" btn btn-danger importButton" accept="application/JSON"></input>
        </div>
    </div>
    <br><br>
    <div class="row justify-content-center container-fluid">

        <div class="col-2 colCuadroBase">
            <a class="seleccionBase" data-base='basico'>
                <div class="cuadroBase" id="baseBasico">
                </div>
                <h3 class="baseTitle"><b>Básico</b></h3>
            </a>
        </div>

        <div class="col-2 colCuadroBase">
            <a class="seleccionBase" data-base='multiple'>

                <div class="cuadroBase" id="baseMultiple">

                </div>
                <h3 class="baseTitle"><b>Múltiple</b></h3>
            </a>
        </div>

    </div>



</body>

</html>