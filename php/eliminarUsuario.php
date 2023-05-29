<?php

    include 'conexion.php';

    // Obtener el ID del usuario a eliminar desde la solicitud
    $data = json_decode(file_get_contents('php://input'), true);
    $id = $data['id'];

    // Consulta para eliminar el usuario
    $sql = "DELETE FROM usuarios WHERE id = '$id'";

    if ($conexion->query($sql) === TRUE) {
        // Eliminación exitosa
        $response = array('message' => 'Usuario eliminado correctamente');
        echo json_encode($response);
    } else {
        // Error al eliminar el usuario
        $response = array('message' => 'Error al eliminar el usuario: ' . $conexion->error);
        echo json_encode($response);
    }

    // Cerrar la conexión
    mysqli_close($conexion);

?>
