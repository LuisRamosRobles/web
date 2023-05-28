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
        session_start();
        $_SESSION['logeado'] = true;
        $_SESSION['usuario'] = $usuario;
        header("location: ../index.html");
        exit;
    }else{
        echo'
            <script>
                alert("El usuario introducido no existe, por favor compruebe 
                que los datos sean correctos o registrese");
                window.location = "../html/logreg.html";
            </script>
        ';

        exit;
    }


?>