<?php 
require_once("../../modelo/modelo_principal.php");

$datos = json_decode(file_get_contents("php://input"), true);
$proyectoId = $datos['id'];
$project = $datos['proyecto'];

try {
    $connexio = conectar();

    $statement = $connexio->prepare("UPDATE proyectos SET contenido = :contenido WHERE ID = :id");
    $statement->execute(
        array(
            ':id' => $proyectoId,
            ':contenido' => $project
        )
    );
    header('Content-Type: application/json');
    echo json_encode(array("mensaje" => "Contenido HTML guardado correctamente en la base de datos."));
} catch (PDOException $e) {
    echo json_encode(array("error" => "Error al guardar el contenido HTML: " . $e->getMessage()));
}

?>