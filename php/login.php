<?php

    include 'conexion.php';

    $username = $_POST['username'];
    $password = $_POST['password'];
    $password_enc = hash('sha512', $password);

    $validar_login = mysqli_query($conexion, "SELECT * FROM usuarios WHERE usuario = '$username'
    AND password = '$password_enc'");

    if(mysqli_num_rows($validar_login) > 0){
        $row = mysqli_fetch_assoc($validar_login);
        $usuario = $row['usuario'];
        $admin = $row['admin'];
        $id = $row['id'];
        session_start();
        $_SESSION['logeado'] = true;
        $_SESSION['usuario'] = $usuario;
        $_SESSION['admin'] = $admin;
        $_SESSION['id'] = $id;
        header("location: ../index.html");
        exit;
    }else{
        header("location: ../html/errorLogin.html");
        exit;
    }

    mysqli_close($conexion)

?>