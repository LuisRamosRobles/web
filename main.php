<?php

$dbhost = "localhost";
$dbuser = "root";
$dbpass = "";
$dbname = "test";

$conn = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);

if(!$conn){
    die("No hay conexión".mysqli_connect_error());
}

$nombre = $_POST["username"];
$password = $_POST["password"];

$query = mysqli_query($conn, "SELECT * FROM login WHERE usuario = '" .$nombre."' and password = '" .$password. "'");

$nr = mysqli_num_rows($query);

if($nr == 1){
    //header("Location: pagina.html") para redireccionar a otra pagina
    echo "Bienvenido:" .$nombre;

}
if ($nr == 0) 
{
    header("Location: main.html");
    //echo "No ingreso";

}

?>