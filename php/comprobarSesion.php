<?php

    session_start();
    if (isset($_SESSION['logeado']) && $_SESSION['logeado'] === true) {
        echo "true";
    } else {
        echo "false";
    }
    
?>