<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $username = $_POST["username"];
    $password = $_POST["password"];

    $authenticated = true;

    if ($authenticated) {
        header("Location: welcome.php");
        exit();
    } else {
        $error_message = "Invalid username or password";
    }
}
?>

