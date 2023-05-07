<?php

    include 'conexion.php';

    $usuario = $_POST['username'];
    $correo = $_POST['email'];
    $password = $_POST['password'];

    //Encrptación de contraseña
    $password_enc = hash('sha512', $password);

    $query = "INSERT INTO usuarios(usuario, correo, password)
              VALUES('$usuario', '$correo', '$password_enc')";

    // Verificación de que el correo introducido no se repita en la base de datos
    $verificar_correo = mysqli_query($conexion, "SELECT * FROM usuarios 
                        WHERE correo = '$correo' ");

    if(mysqli_num_rows($verificar_correo) > 0){
        echo'
            <script>
                alert("Este correo ya está registrado, usa otro correo por favor.");
                window.location = "../html/logreg.php"
            </script>
        ';

        exit();
    }

    // Verificación de que el usuario introducido no se repita en la base de datos
    $verificar_usuario = mysqli_query($conexion, "SELECT * FROM usuarios 
                        WHERE usuario = '$usuario' ");

    if(mysqli_num_rows($verificar_usuario) > 0){
        echo'
            <script>
                alert("Este nombre de usuario ya está cogida, elige otro nombre por favor.");
                window.location = "../html/logreg.php"
            </script>
        ';

        exit();
    }


    $ejecutar = mysqli_query($conexion, $query);

    if($ejecutar){
        echo'
            <script>
                alert("Usuario almacenado exitosamente");
                window.location = "../index.html"
            </script>        
        ';
    } else {
        echo'
            <script>
                alert("Inténtalo de nuevo, usuario no alamacenado");
                window.location = "../html/logreg.php"
            </script>        
        ';
    }

    mysqli_close($conexion)

?>