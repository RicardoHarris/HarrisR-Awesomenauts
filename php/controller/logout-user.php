<?php
    require_once(__DIR__ . "/../model/config.php");
    
    unset($_SESSION["authenticated"]);
    //deletes variable
    
    session_destroy();
    header("Location: " . $path . "index.php");
    //Destroys session and redirects page


