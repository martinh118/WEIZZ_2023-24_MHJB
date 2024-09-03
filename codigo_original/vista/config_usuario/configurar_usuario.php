<html lang="es">

<head>
    <script src="https://code.jquery.com/jquery-3.6.3.min.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="../../SRC/CSS/config_users/configurar_usuario.css">
    <link rel="stylesheet" href="../../SRC/bases_paginas/headerStyle.css">
    <link rel="stylesheet" href="../../SRC/CSS/font_family.css">
    <title>Weizz - Tu cuenta</title>
</head>


<body>

<?php 
    include_once("../../SRC/bases_paginas/header.php")
    ?>



    <div class="row container-fluid">
        <h2 id="welcomeTitle">Tu cuenta</h2>
    </div>

    <div class="container">
        <div class="row mt-3">
            <div class="col-6">
                <div class="row infoUser">

                    <?php
                    echo "<p><u>Nombre de usuario</u>: <b>" . $_SESSION['usuario'] . "</b></p>";
                    ?>
                </div>
                <div class="row infoUser">
                    <?php
                    echo "<p><u>Correo electrónico</u>: <b>" . $_SESSION['email'] . "</b></p>";
                    ?>
                </div>
            </div>

            <div class="col offset-2">
               <div class='btn-group-vertical btn-group-lg' role='group' aria-label='Basic outlined example' style='z-index:1;'>
                    <a href="./editar_nombre_usuario.php" type='button' class='btn btn-outline-danger'>Editar Nombre de usuario</a>
                    <br>
                    <a href="./cambiar_contraseña.php" type='button' class='btn btn-outline-danger'>Cambiar contraseña</a>
                    <br>
                    <a href="../../index.php" type='button' class='btn btn-outline-danger'>Tus proyectos</a>
                    <br>
                    <a href="" type='button' class='btn btn-outline-danger' data-bs-toggle="modal" data-bs-target="#exampleModal">Eliminar cuenta</a>
                </div>
            </div>
        </div>
    </div>

<!-- Modal Preguntar eliminar cuenta de usuario -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
        <div class="modal-body">
            <h5>
              ¿Deseas eliminar tu cuenta de usuario?
            </h5>
            <h5 id="titleDeleteUser">Tu cuenta y todos tus proyectos serán eliminados permanentemente.</h5>
        </div>
      <div class="modal-footer">
          <a href="../../controlador/config_usuario/controlador_eliminar_usuario.php" type="button" class="btn btn-danger">Eliminar cuenta</a>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
      </div>
    </div>
  </div>
</div>
</body>

</html>