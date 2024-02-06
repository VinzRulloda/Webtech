<?php
    require 'db_connection.php';

    $rawData = json_decode(file_get_contents('php://input'));
    $videoid = $rawData->videoid;
    $filepath = $rawData->path;

    chmod($filepath, 0777);
    unlink($filepath);
    $stmt = $pdo->prepare("DELETE FROM uploads where id=?");
    $stmt->execute([$videoid]); 
?>