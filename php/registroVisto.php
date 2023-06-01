<?php

    include 'conexion.php';

    $data = json_decode(file_get_contents('php://input'), true);

    if ($data) {

        session_start();
        $userId = $_SESSION['id'];

        $movieId = $data['movieId'];

        $query = "INSERT INTO vistos(idPelicula, idUsuario)
              VALUES('$movieId', '$userId')";

        $ejecutar = mysqli_query($conexion, $query);

        if($ejecutar){
            echo'correcto';
        } else {
            echo'incorrecto';
        }

    }else{
        echo "error en la data";
    }

    mysqli_close($conexion)

?>