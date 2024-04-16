<html>

<head>
    <script src="https://code.jquery.com/jquery-3.6.3.min.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="../../SRC/CSS/config_users/configurar_usuario.css">
    <title>Weizz - Tu cuenta</title>
</head>
<?php
session_start();
?>


<body>

    <header>
        <div class="row" id="encabezado">
            <div class="col ">
                <a href="../../welcome_page.php">
                    <img src="../../SRC/imagenes_web/logo_weizz_fondo.png" alt="logo_weizz" id="logo_weizz">
                </a>

            </div>
            <div class="col">
                <h2 id="inicioPage"><a href="../../welcome_page.php" class="tituloHeader">Inicio</a></h2>
            </div>
            <div class="col">
                <h2 id="proyectosPage">
                    <a href="" class="tituloHeader">Proyectos</a>
                </h2>
            </div>
            <div class="col"></div>

            <?php
            if (isset($_SESSION['usuario'])) {

                echo "<div class='col-4 offset-2'>
                <h2 id='iniciarSesionPage'>
                    <a href='' class='tituloHeader'><b>" . $_SESSION['usuario'] . "</b></a>&nbsp;&nbsp;
                    <a href='../../controlador/forms/controlador_cerrar_sesion.php' class='tituloHeader'>Cerrar Sesión</a>
                </h2>
            </div>";
            } else {
                echo "ERROR";
            }

            ?>

        </div>

        <hr class="hrLinea">

    </header>


    <div class="row">
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
                    echo "<p><u>Correo electronico</u>: <b>" . $_SESSION['email'] . "</b></p>";
                    ?>
                </div>
            </div>

            <div class="col offset-2">
               <div class='btn-group-vertical btn-group-lg' role='group' aria-label='Basic outlined example' style='z-index:1;'>
                    <a href="./editar_nombre_usuario.php" type='button' class='btn btn-outline-danger'>Editar Nombre de usuario</a>
                    <br>
                    <a href="" type='button' class='btn btn-outline-danger'>Cambiar contraseña</a>
                    <br>
                    <a href="../../welcome_page.php" type='button' class='btn btn-outline-danger'>Tus proyectos</a>
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
      <h5 class="modal-body">
        ¿Deseas eliminar tu cuenta de usuario?
      </h5>
      <div class="modal-footer">
          <a href="../../controlador/config_usuario/controlador_eliminar_usuario.php" type="button" class="btn btn-danger">Eliminar cuenta</a>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
      </div>
    </div>
  </div>
</div>
</body>

</html>