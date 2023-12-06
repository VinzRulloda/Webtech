<?php

$host = "localhost";
$user = "root";
$password = "";
$db = "users";

session_start();

$userId = $_POST['userId'];
$errorMessage = "";

$conn = new mysqli($host, $user, $password, $db);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if (isset($_POST['newFirstName'])) {
    $newFirstName = $_POST['newFirstName'];

    $sql = "UPDATE acc SET fname = '$newFirstName' WHERE id = $userId";
    $conn->query($sql);
}

if (isset($_POST['newLastName'])) {
    $newLastName = $_POST['newLastName'];

    $sql = "UPDATE acc SET lname = '$newLastName' WHERE id = $userId";
    $conn->query($sql);
}

if (isset($_POST['newUsername'])) {
    $newUsername = $_POST['newUsername'];

    $sql = "UPDATE acc SET username = '$newUsername' WHERE id = $userId";
    $conn->query($sql);
}

if (isset($_POST['newPassword'])) {
    $newPassword = $_POST['newPassword'];

    $sql = "UPDATE acc SET password = '$newPassword' WHERE id = $userId";
    $conn->query($sql);
}

if (isset($_POST['newUserType'])) {
    $newUserType = $_POST['newUserType'];

    if ($newUserType !== 'admin' && $newUserType !== 'user') {
        $errorMessage = "Invalid userType. Please enter 'admin' or 'user'.";
    } else {
        $sql = "UPDATE acc SET usertype = '$newUserType' WHERE id = $userId";
        $conn->query($sql);
    }
}

if ($conn->error) {
    $errorMessage = "SQL Error: " . $conn->error;
}

$conn->close();

if ($errorMessage !== "") {
    echo $errorMessage;
} else {
    echo "User edited successfully.";
}
?>
