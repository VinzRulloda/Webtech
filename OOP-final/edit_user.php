<?php
$host = "localhost";
$user = "root";
$password = "";
$db = "users";

session_start();

$userId = $_POST['userId'];
$alertMessages = [];

$conn = new mysqli($host, $user, $password, $db);

if ($conn->connect_error) {
    $alertMessages[] = "Connection failed: " . $conn->connect_error;
}

$fieldsToUpdate = [
    'newFirstName' => 'fname',
    'newLastName' => 'lname',
    'newUsername' => 'username',
    'newPassword' => 'password',
    'newUserType' => 'usertype'
];

foreach ($fieldsToUpdate as $postKey => $dbField) {
    if (isset($_POST[$postKey])) {
        $fieldValue = $_POST[$postKey];

        if ($postKey === 'newUserType') {
            $newUserType = $_POST['newUserType'];
            if ($newUserType !== 'admin' && $newUserType !== 'user') {
                $alertMessages[] = "Invalid userType. Please enter 'admin' or 'user'.";
            } else {
                updateField($dbField, $newUserType, $userId, $conn);
            }
        } else {
            updateField($dbField, $fieldValue, $userId, $conn);
        }
    }
}

function updateField($field, $value, $userId, $conn) {
    global $alertMessages;
    $stmt = $conn->prepare("UPDATE acc SET $field = ? WHERE id = ?");
    $stmt->bind_param("si", $value, $userId);
    $stmt->execute();
    if ($stmt->error) {
        $alertMessages[] = "SQL Error: " . $stmt->error;
    }
    $stmt->close();
}

$conn->close();

foreach ($alertMessages as $message) {
    echo $message;
}
?>
