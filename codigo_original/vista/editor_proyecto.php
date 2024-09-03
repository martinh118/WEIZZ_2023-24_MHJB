<html lang="es">

<head>

    <link rel="stylesheet" href="../SRC/CSS/editor_proyecto.css" type="text/css">
    <link rel="stylesheet" href="../SRC/bases_paginas/headerStyle.css">
    <link rel="stylesheet" href="../SRC/CSS/font_family.css">


    <meta charset="UTF-8" />
    <title>Weizz</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>

    <script type="module" src="../controlador/editor_proyecto/config_mostrar_capas.js"></script>
    <script type="module" src="../controlador/editor_proyecto/config_mostrar_elementos.js"></script>
    <script type="module" src="../controlador/editor_proyecto/config_mostrar_estilo.js"></script>
    <script type="module" src="../controlador/editor_proyecto/editor_proyecto.js"></script>
    <script type="module" src="../controlador/editor_proyecto/arrastrar_elementos.js"></script>
    <script type="module" src="../controlador/editor_proyecto/visualizar_proyecto.js"></script>
</head>
<?php
require_once("../controlador/config_proyecto/controlador_obtener_proyecto.php");
?>

<script>
    function dragStart(event) {
        //CREAR VARIABLE GLOBAL.
        var tipoElemento = event.target.dataset.elemento;
        document.getElementById("tipoElemento").innerHTML = tipoElemento;
        // event.dataTransfer.setData("text/plain", tipoElemento);   
    }
</script>


<body style="background-color: #EFEFEF;">


    <?php 
    include_once("../SRC/bases_paginas/header.php")
    ?>
    <!-- border-secondary border-4 border-top border-bottom -->
    <div class="row container-fluid ">
        <div class="col ">
            <div class='btn-group' role='group' aria-label='Basic outlined example' style='z-index:1'>
                <button type='button' class='btn btn-outline-danger' id='mostrarCapas'>Capas</button>
                <button type='button' class='btn btn-outline-danger' id='mostrarElementos'>Elementos</button>
                <button type='button' class='btn btn-outline-danger' id='mostrarEstilo'>Estilo</button>
                <button type='button' class='btn btn-outline-danger' id='cerrarPestañas'>Cerrar pestañas</button>
                <button type='button' class='btn btn-outline-danger' id='descargarJson'>Descargar JSON</button>
                <button type='button' class='btn btn-outline-danger' id='visualizarPagina'>Visualizar</button>

                <?php
                if (isset($_SESSION['usuario'])) {
                    echo "<button type='button' class='btn btn-outline-danger' id='guardarCambios'>Guardar cambios</button></div>";
                } else {
                    echo "</div>";
                }

                ?>
            </div>
        </div>

        <hr class="hrLinea" id="bottomHr">

        <div class='alert alert-success text-center mx-auto' role='alert' style="width:40em; text-align:center " id="proyectoGuardadoMessage"><b>Proyecto guardado correctamente</b></div>

    </div>

    <?php
    if (isset($_GET['idProject'])) {
        echo "<div id='idProject' hidden>" . $_GET['idProject'] . "</div>";
    }

    ?>
    <div id="tipoElemento" hidden></div>
    <div class="container" id="proyecto">
        <?php
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            if (isset($_POST['contenido'])) {
                $contenido = $_POST['contenido'];
        ?>
                <script>
                    var contenidoProyecto = <?php echo $contenido; ?>;
                </script>
            <?php
            }
        } else if (isset($_GET['idProject'])) {
            $proyecto = cargarProyecto($_GET['idProject']);
            $contenido = $proyecto['contenido'];
            ?>
            <script>
                var contenidoProyecto = <?php echo $contenido; ?>
            </script>

        <?php
        } else if (isset($_GET['baseAnonimo'])) {
            $base = $_GET['baseAnonimo'];
            $contenido = "";
            switch ($base) {
                case "basico":
                    $contenido = file_get_contents('../SRC/plantillas_base/plantilla_base_basico_2.json');
                    break;
                case "multiple":
                    $contenido = file_get_contents('../SRC/plantillas_base/plantilla_base_multiple_2.json');
                    break;
            }
        ?>
            <script>
                var contenidoProyecto = <?php echo $contenido; ?>
            </script>

        <?php
        }
        ?>

    </div>
    
</body>


</html>