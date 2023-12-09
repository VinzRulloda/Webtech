<?php
session_start();

if ($_FILES['video']['error'] === UPLOAD_ERR_OK && isset($_SESSION['username'])) {
    $uploadDir = 'uploads/';
    $uploadFile = $uploadDir . basename($_FILES['video']['name']);

    if (move_uploaded_file($_FILES['video']['tmp_name'], $uploadFile)) {
        require 'db_connection.php';

        $title = basename($_FILES['video']['name']);
        $filePath = $uploadFile;
        $uploadedBy = $_SESSION['username'];

        $duration = getVideoDuration($filePath);

        $stmt = $pdo->prepare('INSERT INTO videos (title, file_path, uploaded_by, duration) VALUES (?, ?, ?, ?)');
        $stmt->execute([$title, $filePath, $uploadedBy, $duration]);

        var_dump($_FILES);
    }
}

function getVideoDuration($file) {
    $output = shell_exec('ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 ' . $file);
    return gmdate('H:i:s', round($output));
}
?>