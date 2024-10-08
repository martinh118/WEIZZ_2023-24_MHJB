<html lang="es">

<head>
    <script src="https://code.jquery.com/jquery-3.6.3.min.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="./SRC/CSS/index.css">
    <link rel="stylesheet" href="./SRC/bases_paginas/headerStyle.css">
    <link rel="stylesheet" href="./SRC/CSS/font_family.css">

    <script src="./controlador/controlador_welcome.js"></script>
    <title>Weizz - Welcome page</title>
</head>

<body>
    <?php
    include_once("./SRC/bases_paginas/header.php");
    require_once("./controlador/config_proyecto/controlador_mostrar_proyectos.php");
    ?>


    <div class="row container-fluid">
        <h2 id="welcomeTitle">¡Bienvenido!</h2>
    </div>

    <div class="row container-fluid">

        <div class="col-2 colNuevoProyecto">
            <a href="./vista/seleccion_bases.php">
                <div id="cuadroCrearProyecto">
                    <img src="./SRC/imagenes_web/crear_plus.png" alt="crearProyecto" id="crearProyectoSimbol">
                </div>
            </a>
            <h3 id="crearProyectoTitle"><b>Crear proyecto</b></h3>
        </div>

    </div>



    <?php
    if (isset($_SESSION['usuario'])) {
        echo "<div class='row container-fluid'>
        <h2 class='col offset-2 ' id='tusProyectos'>Tus proyectos:</h2>
    </div>";
        mostrarProyectosUser($_SESSION['ID']);
    }

    ?>

    <!-- Modal Preguntar eliminar proyecto -->
    <div class="modal fade" id="eliminarProyecto" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <h5 class="modal-body">
                    ¿Deseas eliminar el proyecto seleccionado?
                </h5>
                <div class="modal-footer">
                    <a href="" type="button" class="btn btn-danger" id="botonEliminarProyecto">Eliminar proyecto</a>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Preguntar duplicar proyecto -->
    <div class="modal fade" id="duplicarProyecto" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <h5 class="modal-body">
                    ¿Duplicar proyecto?
                </h5>
                <div class="modal-footer">
                    <a href="" type="button" class="btn btn-danger" id="botonDuplicarPrpyecto">Duplicar</a>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Preguntar cambiar nombre de proyecto -->
    <div class="modal fade" id="cambiarNombre" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form action="./controlador/config_proyecto/controlador_cambiar_nombre.php" method="POST">
                    <div class="modal-body">
                        <h5>Escribe el nuevo nombre para tu proyecto: <br>
                            (25 char max)</h5>
                        <input type="number" hidden name="idProyecto" id="idProyecto">
                        <input type="text" name="nuevoNombre" id="nuevoNombre">
                    </div>
                    <div class="modal-footer">
                        <input type="submit" class="btn btn-danger" value="Guardar">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Modal mostrar información del proyecto -->
    <div class="modal fade" id="infoProyecto" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <h5>Información sobre el proyecto:</h5>
                    <p id="infoIdProyecto"> </p>
                    <p id="infoNombreProyecto"></p>
                    <p id="infoFechaCreacion"></p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>


</body>

</html>