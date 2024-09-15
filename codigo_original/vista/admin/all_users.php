<html>

<head>
    <script src="https://code.jquery.com/jquery-3.6.3.min.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
        crossorigin="anonymous"></script>
    <link rel="stylesheet" href="../../SRC/CSS/admin/all_users.css">
    <link rel="stylesheet" href="../../SRC/bases_paginas/headerStyle.css">
    <link rel="stylesheet" href="../../SRC/CSS/font_family.css">
    <script src="../../controlador/config_admin/controlador_info_users.js"></script>
    <title>Weizz - Usuarios</title>

</head>
<?php
require_once("../../controlador/config_admin/mostrar_usuarios.php");
?>



<body>
    <?php
    include_once("../../SRC/bases_paginas/header.php")
    ?>
    <div class="row container-fluid">
        <h2 id="mainTitle">Usuarios</h2>
    </div>


    <?php
    mostrarConfigUsuarios();
    ?>

    <!-- Modal mostrar información del usuario -->
    <div class="modal fade" id="infoUsuario" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <h5>Información sobre el usuario:</h5>
                    <p id="infoIdUsusario"> </p>
                    <p id="infoNombreUsusario"></p>
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