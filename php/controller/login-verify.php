<?php
    require_once (__DIR__ . "/../model/config.php");
    //Requires the config for this page to function
    
    function authenticateUser() {
        if(!isset($_SESSION["authenticated"])) {
            return false;
        }
        else {
            if($_SESSION["authenticated"] != true){
                return false;
            }
            else {
                return true;
            }
        }
    }
    //Makes sure the user is logged in