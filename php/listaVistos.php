<?php

    include 'conexion.php';

    session_start();
    $userId = $_SESSION['id'];

    $query = "SELECT DISTINCT idPelicula FROM vistos WHERE idUsuario = $userId";
    $result = mysqli_query($conexion, $query);

    if ($result) {
        $idsPelicula = array();

        while ($row = mysqli_fetch_assoc($result)) {
            $idsPelicula[] = $row['idPelicula'];
        }

        $json = json_encode($idsPelicula);
        echo $json;
    } else {
        echo json_encode(array('error' => 'Error al obtener los IDs de película.'));
    }

?>