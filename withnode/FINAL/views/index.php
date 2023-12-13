<?php

$host="localhost";
$user="root";
$password="";
$db="users";

session_start();

$data=mysqli_connect($host, $user, $password, $db);
if($data===false){
    die("connection failed");
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $password = $_POST["password"];

    $username = mysqli_real_escape_string($data, $username);
    $password = mysqli_real_escape_string($data, $password);

    $sql = "SELECT * FROM acc WHERE username='" . $username . "' AND password='" . $password . "'";
    $result = mysqli_query($data, $sql);

    if ($result) {
        $row = mysqli_fetch_array($result);

        if ($row && isset($row["usertype"])) {
            if ($row["usertype"] == "user") {
                $_SESSION["username"] = $username;
                $_SESSION["user_id"] = $row["id"];
                header("location: manager.php");
                exit();
            } elseif ($row["usertype"] == "admin") {
                $_SESSION["username"] = $username;
                $_SESSION["user_id"] = $row["id"];
                header("location: admin.php");
                exit();
            } else {
                
                echo '<script>alert("Incorrect username or password.");</script>';
            }
        } else {
          
            echo '<script>alert("Incorrect username or password.");</script>';
        }
    } else {
       
        echo '<script>alert("Error executing query.");</script>';
    }
}

?>
