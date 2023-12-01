<?php
include('connection.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

   
    $stmt = $con->prepare("SELECT * FROM accounts WHERE username = ? AND password = ?");
    $stmt->bind_param("ss", $username, $password);
    $stmt->execute();
    $result = $stmt->get_result();
    $count = $result->num_rows;

    if ($count == 1) {
        $updateQuery = $con->prepare("UPDATE accounts SET status = 'online' WHERE username = ?");
        $updateQuery->bind_param("s", $username);
        $updateQuery->execute();
        echo "Login successful";
    } else {
        echo "Your Login Name or Password is invalid";
    }
    $stmt->close();
    $updateQuery->close();
}
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
?>
