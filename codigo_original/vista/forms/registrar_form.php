<html lang="es">

<head>
    <script src="https://code.jquery.com/jquery-3.6.3.min.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="../../SRC/CSS/forms/registrar_form.css">
    <link rel="stylesheet" href="../../SRC/bases_paginas/headerStyle.css">
    <link rel="stylesheet" href="../../SRC/CSS/font_family.css">
</head>

<?php 
    require_once("../../controlador/forms/controlador_registrar_form.php");
?>

<body>

<?php 
    include_once("../../SRC/bases_paginas/header.php")
    ?>
    <?php
    if (isset($_SESSION['error'])) {
        $error = $_SESSION['error'];
        echo "<div class='alert alert-danger mx-auto' role='alert' style='width:40em; text-align:center'><b>" . $error . "</b></div>";
        session_unset();
    } else if (isset($_SESSION['success'])){
        $success = $_SESSION['success'];
        echo "<div class='alert alert-success mx-auto' role='alert' style='width:40em; text-align:center'><b>" . $success . "</b></div>";
        session_unset();
    }

    ?>

    <div class="row container-fluid">
        <h2 id="welcomeTitle">Registrar usuario</h2>
    </div>

    <form action="../../controlador/forms/controlador_registrar_form.php" class="formTable" method="POST">
        <div class="row">
            <label for="email" class="agrandir">Correo electronico:</label>
            <input type="email" name="email" id="email">
        </div>
        <br>  
        <div class="row">
            <label for="userName" class="agrandir">Nombre de usuario:</label>
            <input type="text" name="userName" id="userName">
        </div>
        <br>
        <div class=" row">
        <label for="pass" class="agrandir">Contraseña:</label>
            <input type="password" name="pass" id="pass">
        </div>
        <br>
        <div class=" row">
        <label for="pass2" class="agrandir">Repetir contraseña:</label>
            <input type="password" name="pass2" id="pass2">
        </div>
        <div class="row">
            <a href="./iniciar_sesion_form.php" id="contraOlvidada" class="col-5">Ya tengo una cuenta.</a>
            <input type="submit" class="submitButton col-5 offset-2 btn btn-outline-danger" value="Registrar usuario">
        </div>
        
    </form>


</body>

</html>