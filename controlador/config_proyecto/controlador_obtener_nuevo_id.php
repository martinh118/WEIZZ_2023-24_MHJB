<?php
require_once("../../modelo/modelo_principal.php");

$lastProject = obtenerUltimoProyecto()->fetch();

if ($lastProject !== false && $lastProject !== null) {
    echo json_encode(['ID' => $lastProject['ID']]);
} else {
    echo json_encode(['error' => 'No se encontró ningún proyecto']);
}