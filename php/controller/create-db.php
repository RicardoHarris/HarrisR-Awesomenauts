<?php
    require_once(__DIR__ . "/../model/config.php");
    require_once(__DIR__ . "/../controller/login-verify.php");
    //Requires the config and login-verify pages
    
    if(!authenticateUser()){
        header("Location: " . $path . "index.php");
        die();
    }
    //Kills the program if someone who is not logged in attempts to create a database

$query = $_SESSION["connection"]->query("CREATE TABLE posts ("
        . "id int(11) NOT NULL AUTO_INCREMENT,"
        . "title varchar(255) NOT NULL,"
        . "post text NOT NULL,"
        . "PRIMARY KEY (id))");
//Creates the post table

if ($query) {
    echo "<p>Successfully created table: posts</p>";
} else {
    echo "<p>" . $_SESSION["connection"]->error . "</p>";
}
//Notifies the user if the posts table was created or not

$query = $_SESSION["connection"]->query("CREATE TABLE users("
        . "id int(11) NOT NULL AUTO_INCREMENT,"
        . "username varchar(30) NOT NULL,"
        . "email varchar(50) NOT NULL,"
        . "password char(128) NOT NULL,"
        . "salt char(128) NOT NULL,"
        . "exp int(4),"
        . "exp1 int(4),"
        . "exp2 int(4),"
        . "exp int(4),"
        . "PRIMARY KEY (id))");
//Creates a users table

if($query) {
    echo "<p>Successfully created table: users</p>";
}
else {
    echo "<p>" . $_SESSION["connection"]->error . "</p>";
}
//Notifies the user of whether the users table was created or not
