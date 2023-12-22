<?php
    require 'db_connection.php';

    $rawData = json_decode(file_get_contents('php://input'));
    $videoid = $rawData->videoid;

    $stmt = $pdo->prepare("SELECT file_path FROM uploads where id=?");
    $stmt->execute([$videoid]); 
    $row = $stmt->fetch();

    $filepath = $row['file_path'];
    chmod($filepath, 0777);
    unlink($filepath);
    $stmt = $pdo->prepare("DELETE FROM uploads where id=?");
    $stmt->execute([$videoid]); 
?>