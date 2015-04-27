<?php
    require_once(__DIR__ . "/../model/config.php");
    //Requires the config
    $email = filter_input(INPUT_POST, "email", FILTER_SANITIZE_STRING);
    $username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_STRING);
    $password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING);
    //Cleanses the email, username, and password to prevent hacking
    
    $salt = "$5$" . "rounds=9001$" . uniqid(mt_rand(), true) . "$";
    //Sets  the rounds of salts to 9001
   
    $hashedPassword = crypt($password, $salt);
    //Encrypts user password
    
   $query = $_SESSION["connection"]->query("SELECT username FROM users WHERE BINARY username = '$username'");
   //Selects username from users table
    
    if($query->num_rows == 0){
        echo "Successfully created user '$username'!";
         $query2 = $_SESSION["connection"]->query("INSERT INTO users SET "
            . "email = '$email',"
            . "username = '$username',"
            . "password = '$hashedPassword',"
            . "salt = '$salt',"
            . "exp = 0, "
            . "exp1 = 0, "
            . "exp2 = 0, "
            . "exp3 = 0, "
            . "exp4 = 0");
         //Inserts user data
         
         $_SESSION["name"];
    }
    else {
        echo "Username already exists!";
    }
    //Tellsabcdefghijklmnopqstuvwxz hi ricardo
    
    if($query) {
        //need this for AJAX on index.php
        echo "true";
    }else{
        echo "<p>" . $_SESSION["connection"]->error . "</p>";
    }
    //Sets values of "email", "username", "password", and "salt"
    