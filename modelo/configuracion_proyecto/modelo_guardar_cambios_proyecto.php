<?php 
require_once("../modelo_principal.php");

$datos = json_decode(file_get_contents("php://input"), true);
$proyectoId = $datos['id'];
$project = $datos['proyecto'];

try {
    $connexio = conectar();

    $stmt = $connexio->prepare("INSERT INTO proyectos (contenido) VALUES (:contenido) WHERE ID = :id");
    $stmt->bindParam(':contenido', $project);
    $stmt->bindParam(':id', $proyectoId);
    $stmt->execute();

    echo "Contenido HTML guardado correctamente en la base de datos.";
} catch (PDOException $e) {
    echo "Error al guardar el contenido HTML: " . $e->getMessage();
}

?>