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


/**
 * 
 */
function obtenerProyectos(){
    try {
        $connexio = conectar();
        $statement = $connexio->prepare('SELECT * FROM proyectos');
        $statement->execute();
        
        return $statement;
    } catch (PDOException $e) { //
        // mostrarem els errors
        echo "Error obtenerUsuarios: " . $e->getMessage();
    }
}

/**
 * 
 */
function obtenerElementosBasicos(){
    try {
        $connexio = conectar();
        $statement = $connexio->prepare('SELECT * FROM elementos_basicos');
        $statement->execute();
        
        return $statement;
    } catch (PDOException $e) { //
        // mostrarem els errors
        echo "Error obtenerUsuarios: " . $e->getMessage();
    }
}