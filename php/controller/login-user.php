<?php

require_once(__DIR__ . "/../model/config.php");

$array = array(
    'exp' => '',
    'exp1' => '',
    'exp2' => '',
    'exp3' => '',
    'exp4' => '',
);

$username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_STRING);
$password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING);
//Adds an input for the username and password on the login page

$query = $_SESSION["connection"]->query("SELECT * FROM users WHERE BINARY username = '$username'");
//Selects the salt and password from the useres table within my database where username is equal to the usename variable

if ($query->num_rows == 1) {
    $row = $query->fetch_array();

    if ($row["password"] === crypt($password, $row["salt"])) {
        $_SESSION["authenticated"] = true;
        $array["exp"] = $row["exp"];
        $array["exp1"] = $row["exp1"];
        $array["exp2"] = $row["exp2"];
        $array["exp3"] = $row["exp3"];
        $array["exp4"] = $row["exp4"];
        
        echo json_encode($array);
        
    } else {
        echo "Invalid username/password";
    }
} else {
    echo "Invalid username/password";
}
        //If there is only one of these users active and the pasword is correct the user is taken to the index if not they are notified of an invalid username/password