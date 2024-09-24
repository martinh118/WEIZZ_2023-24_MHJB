<?php
/**
 * Crea la connexió a la base de dades i retorna la petició.
 * @return connexio: objecte PDO amb la connexió directa a la base de dades.
 */
function conectar()
{
    try {
        $connexio = new PDO('mysql:host=localhost;dbname=proyecto_final_2023_24_mhjb', 'root', '');
        //echo "Connexio correcta!!" . "<br />";
        return $connexio;
    } catch (PDOException $e) { //
        // mostrarem els errors
        echo "Error conectar: " . $e->getMessage();
    }
}

function obtenerProyectosUser($idUser){
    try {
        $connexio = conectar();
        $statement = $connexio->prepare('SELECT * FROM proyectos WHERE id_usuario = :idUser');
        $statement->execute(
            array(
                ':idUser' => $idUser
            )
        );
        
        return $statement;
    } catch (PDOException $e) { //
        // mostrarem els errors
        echo "Error obtenerProyectosUser: " . $e->getMessage();
    }
}

function obtenerUsuarioUnicoId($id)
{
    try {
        $connexio = conectar();
        $statement = $connexio->prepare('SELECT * FROM usuarios WHERE ID = :id');
        $statement->execute(
            array(
                ':id' => $id
            )
        );

        return $statement;
    } catch (PDOException $e) { //
        // mostrarem els errors
        echo "Error obtenerUsuarios: " . $e->getMessage();
    }
}