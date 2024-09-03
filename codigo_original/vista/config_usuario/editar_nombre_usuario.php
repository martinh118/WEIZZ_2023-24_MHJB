<html lang="es">

<head>
    <script src="https://code.jquery.com/jquery-3.6.3.min.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="../../SRC/CSS/config_users/editar_nombre_usuario.css">
    <link rel="stylesheet" href="../../SRC/bases_paginas/headerStyle.css">
    <link rel="stylesheet" href="../../SRC/CSS/font_family.css">
    <title>Weizz - Nombre de usuario</title>
</head>



<body>

    <?php 
    include_once("../../SRC/bases_paginas/header.php")
    ?>


    <div class="row container-fluid">
        <h2 id="welcomeTitle">Editar usuario</h2>
    </div>

    <?php
    if (isset($_SESSION['errorName'])) {
        $error = $_SESSION['errorName'];
        echo "<div class='alert alert-danger mx-auto' role='alert' style='width:40em; text-align:center'> <b>" . $error . "</b></div>";
        // session_unset();
    } else if (isset($_SESSION['success'])) {
        $success = $_SESSION['successName'];
        echo "<div class='alert alert-success mx-auto' role='alert' style='width:40em; text-align:center'><b>" . $success . "</b></div>";
    }

    ?>

    <form action="../../controlador/config_usuario/controlador_cambiar_nombre_usuario.php" class="formTable" method="POST">
        <div class="row">
            <label for="newUserName" class="agrandir">Nuevo nombre de usuario:</label>
            <input type="text" name="newUserName" id="newUserName">
        </div>
        <br>
        <input type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" class="submitButton col-5 offset-2 btn btn-outline-danger" value="Cambiar">
           <!-- Modal Preguntar eliminar cuenta de usuario -->
<div class='modal fade' id='exampleModal' tabindex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true'>
    <div class='modal-dialog'>
        <div class='modal-content'>
            <h5 class='modal-body'>
                ¿Cambiar nombre de usuario?
            </h5>
            <div class='modal-footer'>

                <input type="submit"  type='button'class='btn btn-danger' value="Confirmar">
                <button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>Cancelar</button>
            </div>
        </div>
    </div>
</div>
    </form>


 

</body>

</html>