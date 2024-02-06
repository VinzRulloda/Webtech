<?php
    require 'db_connection.php';

    $rawData = json_decode(file_get_contents('php://input'));
    $videoid = $rawData->videoid;
    $filepath = realpath($rawData->path);

    chmod($filepath, 0777);
    unlink($filepath);

    $stmt = $conn->prepare("DELETE FROM uploads where id=?");
    $stmt->bind_param("i", $videoid);
    $stmt->execute(); 
?>