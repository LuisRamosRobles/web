<?php

    include 'conexion.php';

    $usuario = $_POST['username'];
    $correo = $_POST['email'];
    $password = $_POST['password'];

    //Encrptación de contraseña
    $password_enc = hash('sha512', $password);

    $query = "INSERT INTO usuarios(usuario, admin, correo, password)
              VALUES('$usuario', '0', '$correo', '$password_enc')";

    // Verificación de que el correo introducido no se repita en la base de datos
    $verificar_correo = mysqli_query($conexion, "SELECT * FROM usuarios 
                        WHERE correo = '$correo' ");

    if(mysqli_num_rows($verificar_correo) > 0){
        echo'
            <script>
                window.location = "../html/errorRegistro.html?error=correo"
            </script>
        ';

        exit;
    }

    // Verificación de que el usuario introducido no se repita en la base de datos
    $verificar_usuario = mysqli_query($conexion, "SELECT * FROM usuarios 
                        WHERE usuario = '$usuario' ");

    if(mysqli_num_rows($verificar_usuario) > 0){
        echo'
            <script>
                window.location = "../html/errorRegistro.html?error=usuario"
            </script>
        ';

        exit;
    }


    $ejecutar = mysqli_query($conexion, $query);

    if($ejecutar){
        echo'
            <script>
                window.location = "../html/regCorrecto.html"
            </script>        
        ';
    } else {
        echo'
            <script>
                window.location = "../html/errorRegistro.html?error=comun"
            </script>        
        ';
    }

    mysqli_close($conexion)

?>