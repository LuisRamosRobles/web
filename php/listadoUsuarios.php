<?php

    include 'conexion.php';

    session_start();
    if (isset($_SESSION['usuario'])) {
        $usuario = $_SESSION['usuario'];
    }

    // Consulta a la base de datos
    $result = mysqli_query($conexion, "SELECT * FROM usuarios WHERE usuario NOT IN ('$usuario')");

    if (mysqli_num_rows($result) > 0) {
        $usuarios = array();

        while ($row = $result->fetch_assoc()) {
            $usuarios[] = $row;
        }

        // Devolver resultados en formato JSON
        header('Content-Type: application/json');
        echo json_encode($usuarios);
    } else {
        echo "No se encontraron usuarios.";
    }

    mysqli_close($conexion);

?>