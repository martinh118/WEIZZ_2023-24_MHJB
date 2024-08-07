<?php
require_once("../controlador/config_proyecto/controlador_obtener_proyecto.php");
session_start();


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['contenido'])) {
        $contenido = $_POST['contenido'];
?>
        <script>
            var contenidoProyecto = <?php echo $contenido; ?>;
        </script>
    <?php
    }
}
else if (isset($_GET['idProject'])) {
    $proyecto = cargarProyecto($_GET['idProject']);
    $contenido = $proyecto['contenido'];
?>
    <script>
        var contenidoProyecto = <?php echo $contenido; ?>
    </script>
<?php
}
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>

    <script type="module" src="../controlador/controlador_visualizador_proyecto.js"></script>
    <title>Weizz - Visualizador</title>

</head>

<body>
    <div class="container" id="visualizadorProyecto">
        


    </div>

</body>

</html>