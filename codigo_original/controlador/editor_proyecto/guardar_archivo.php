<?php
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_FILES["file"])) {
    $targetDirectory = "../../SRC/imagenes_usuario/"; // Ruta de la carpeta donde deseas guardar el archivo
    $targetFile = $targetDirectory . basename($_FILES["file"]["name"]);
    if (move_uploaded_file($_FILES["file"]["tmp_name"], $targetFile)) {
        echo "El archivo " . basename($_FILES["file"]["name"]) . " ha sido subido correctamente.";
    } else {
        echo "Lo sentimos, hubo un error al subir el archivo.";
    }
} else {
    echo "Por favor, sube un archivo.";
}
?>